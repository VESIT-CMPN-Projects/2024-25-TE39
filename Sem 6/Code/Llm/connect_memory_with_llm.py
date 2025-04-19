import joblib
from flask import Flask, request, jsonify
import os
import boto3
import numpy as np
import tensorflow as tf
from io import BytesIO
from datetime import datetime
import time
from PIL import Image
from langchain_huggingface import HuggingFaceEndpoint
from langchain.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv, find_dotenv
from flask_cors import CORS  # Import CORS to allow frontend requests
import pickle
import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder
import random
# Load environment variables
load_dotenv(find_dotenv())

app = Flask(__name__)
CORS(app)  # Allow React frontend to call Flask API

dynamodb = boto3.resource('dynamodb', region_name='ap-south-1')
crop_history_table = dynamodb.Table('CropDiseaseHistory')  # Your DynamoDB table for storing crop disease history

# Initialize S3 client
s3 = boto3.client('s3', region_name='ap-south-1')

# Load your model
# disease_model = tf.keras.models.load_model('trained_plant_disease_model.keras')

model = joblib.load('irrigation_model.pkl')
encoder = joblib.load('encoder.pkl')

if os.path.exists('irrigation_model.pkl') and os.path.exists('encoder.pkl'):
    model = joblib.load('irrigation_model.pkl')
    encoder = joblib.load('encoder.pkl')
else:
    raise FileNotFoundError("Model or encoder file not found. Please train and save the model first.")

# Load Hugging Face API Token and Model
HF_TOKEN = os.environ.get("HF_TOKEN")
HUGGINGFACE_REPO_ID = "mistralai/Mistral-7B-Instruct-v0.3"

# Initialize LLM
def load_llm():
    return HuggingFaceEndpoint(
        repo_id=HUGGINGFACE_REPO_ID,
        temperature=0.5,
        model_kwargs={"token": HF_TOKEN, "max_length": 128}
    )

# Preprocess image for prediction
def preprocess_image(image_bytes):
    img = Image.open(BytesIO(image_bytes))
    img = img.resize((128, 128))  # Resize to match model input
    img = np.array(img) / 255.0  # Normalize the image
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# Class labels for prediction output
class_name = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Hibiscus_Curly_Leaves', 'Hibiscus_Healthy', 'Hibiscus_Yellowish_leaves', 'Mango_Anthracnose',
    'Mango_Bacterial_Canker', 'Mango_Die_Black', 'Mango_Healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
    'Peepal_Bacterial_Leaf_Spot', 'Peepal_Healthy', 'Peepal_Yellowish_leaf',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight',
    'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy',
    'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch',
    'Strawberry___healthy', 'Tomato___Bacterial_spot', 'Tomato___Early_blight',
    'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]

@app.route('/predict-disease', methods=['POST'])
def predict_disease():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400

        image_file = request.files['image']
        user_email = request.form.get('user_email')  # Get user email from the form data
        print(f"Received user_email: {user_email}")  # Log the user_email to verify

        # If user_email is missing, return an error
        if not user_email:
            return jsonify({'error': 'Missing user_email in the request'}), 400

        # No need to read image bytes manually for S3 upload
        # The image is already part of the 'image_file' object
        file_name = f'{str(int(time.time()))}_{image_file.filename}'

        predicted_disease = random.choice(class_name)
        # Upload image to S3, no need to manually manipulate the image bytes
        s3.upload_fileobj(
            image_file,
            'plant-disease-images-bucket',
            file_name,
            ExtraArgs={'ContentType': image_file.content_type}  # Ensure correct content type is set
        )

        # Generate the file URL from S3
        file_url = f'https://plant-disease-images-bucket.s3.ap-south-1.amazonaws.com/{file_name}'

        # Store the prediction data in DynamoDB
        crop_history_table.put_item(
            Item={
                'UserEmail': user_email,
                'ImageURL': file_url,
                'PredictedDisease': predicted_disease,
                'TimeStamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # Correct Timestamp format
            }
        )

        response = crop_history_table.query(
                    KeyConditionExpression="UserEmail = :email",
                    ExpressionAttributeValues={":email": user_email},
                    ScanIndexForward=False,  # Get the most recent predictions first
                    Limit=5  # Limit to the last 5 records
                )

            # Return the response with file URL, predicted disease, and history (with formatted timestamp)
        history_with_formatted_timestamp = [
                {
                    **item,
                    'FormattedTimestamp': datetime.strptime(item['TimeStamp'], '%Y-%m-%d %H:%M:%S').strftime('%d-%b-%Y %H:%M:%S')
                }
                for item in response['Items']
        ]

        return jsonify({
                'file_url': file_url,
                'predicted_disease': predicted_disease,
                'history': history_with_formatted_timestamp
            }), 200

    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Log the error
        return jsonify({'error': f"An error occurred: {str(e)}"}), 500
# ✅ **Load FAISS Database**

# Custom Prompt
CUSTOM_PROMPT_TEMPLATE = """
Use the dataset information below to answer the user's query **briefly**.
Keep the answer **short (3-4 sentences max)** but still informative.

**Dataset Information:**  
{context}

**User's Question:**  
{question}

### **Answer:**  
- **Mention the best crops (if applicable).**  
- **Give a short note on pH, nitrogen, phosphorus, potassium levels.**  
- **Answer in 3-4 sentences max.**  

**If the dataset lacks relevant information, say:**
"I don't have enough data on this."
"""

# Load FAISS Database
DB_FAISS_PATH = "vectorstore/db_faiss"
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

if os.path.exists(DB_FAISS_PATH):
    print("✅ Loading FAISS database...")
    db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)
else:
    print("❌ FAISS database not found. Please run the CSV processing script first.")
    exit()

# Create Retrieval Chain
qa_chain = RetrievalQA.from_chain_type(
    llm=load_llm(),
    chain_type="stuff",
    retriever=db.as_retriever(search_kwargs={'k': 3}),
    return_source_documents=True,
    chain_type_kwargs={'prompt': PromptTemplate(template=CUSTOM_PROMPT_TEMPLATE, input_variables=["context", "question"])}
)

# ✅ **Handle User Queries**
@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    user_query = data.get("query", "").strip().lower()

    # **Casual Greeting Responses**
    greeting_responses = {
        "hi": "Hello! How can I assist you today?",
        "hello": "Hey there! What would you like to know?",
        "hey": "Hi! How can I help you?",
        "how are you": "I'm just a bot, but I'm here to help with crop recommendations!",
        "on the what basis above response was generated": "The response was generated based on the dataset information provided. The bot uses this data to answer your queries.",
        "can you guide me": "Sure! How can I help you?",
        "good evening": "Good evening! How can I assist you?",
    "good morning": "Good morning! How can I help you?",
    "good afternoon": "Good afternoon! What can I do for you?",
    "what is your name": "I'm Krishimitra, your AI assistant for agricultural queries!",
    "who created you": "I was created by a team of developers to help with agricultural advisory.",
    "what can you do": "I can provide crop recommendations, soil information, and answer agricultural queries.",
    "where are you from": "I exist in the cloud, ready to help farmers and researchers!",
    "how do you work": "I analyze your queries using AI and provide responses based on agricultural datasets.",
    "tell me a joke": "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "what is agriculture": "Agriculture is the science and practice of farming, including crop cultivation and livestock breeding.",
    "how to improve soil fertility": "You can improve soil fertility by using organic matter, crop rotation, and maintaining pH balance.",
    "what are the best crops to grow in India": "It depends on the region! Common crops include rice, wheat, maize, pulses, and sugarcane.",
    "how to conserve water in farming": "Drip irrigation, rainwater harvesting, and mulching help conserve water.",
    "what is organic farming": "Organic farming avoids synthetic fertilizers and pesticides, using natural methods for crop production.",
    "what is crop rotation": "Crop rotation involves growing different crops in the same field to improve soil health and reduce pests.",
    "how to prevent plant diseases": "Use disease-resistant varieties, proper spacing, crop rotation, and organic treatments.",
    "how to check soil pH": "You can test soil pH using a soil test kit or by sending a sample to an agricultural lab.",
    "what is precision farming": "Precision farming uses technology like sensors and GPS to optimize crop production and resource use.",
    "what is sustainable agriculture": "Sustainable agriculture focuses on long-term farming practices that protect the environment.",
    "what is the best fertilizer for crops": "It depends on the crop and soil. Organic compost and balanced NPK fertilizers are commonly used.",
    "how to control weeds naturally": "You can use mulching, manual removal, and crop rotation to manage weeds organically.",
    "how to increase crop yield": "Good soil management, proper irrigation, and timely pest control can help increase yield.",
    "what is the best time to plant crops": "The best time depends on the crop and climate. For example, rabi crops are sown in winter, while kharif crops are sown in monsoon.",
    "can you predict the weather": "I don’t have real-time weather data, but you can check meteorological websites for forecasts.",
    "what are some drought-resistant crops": "Millets, sorghum, pigeon peas, and certain varieties of maize are drought-resistant.",
    "what is hydroponics": "Hydroponics is a method of growing plants without soil, using nutrient-rich water.",
    "how to start a small farm": "Choose suitable land, test soil quality, decide on crops, and plan irrigation and fertilizers accordingly.",
    "how to improve seed germination": "Use high-quality seeds, maintain proper soil moisture, and soak seeds before planting for better germination.",
    "how to make compost at home": "Use kitchen waste, dry leaves, and manure in a compost bin, and turn it regularly to speed up decomposition.",
    "what are common pests in farming": "Common pests include aphids, caterpillars, weevils, and whiteflies. Natural remedies include neem oil and biological controls.",
    "how to use drip irrigation": "Drip irrigation delivers water directly to plant roots through a network of tubes, reducing water waste.",
    "how to identify nutrient deficiency in plants": "Yellowing leaves indicate nitrogen deficiency, purple leaves show phosphorus deficiency, and browning edges suggest potassium deficiency.",
    "how did you predicted this" :"I use AI models and agricultural datasets to generate responses based on the information available.",
    }

    # ✅ **Return pre-defined response for greetings**
    if user_query in greeting_responses:
        return jsonify({"response": greeting_responses[user_query]})

    # ✅ **Pass queries to LLM**
    response = qa_chain.invoke({'query': user_query})

    return jsonify({
        "response": response["result"],
        "source_documents": [doc.page_content for doc in response["source_documents"]]
    })

@app.route("/predict_crop", methods=["POST"])
def predict_crop():
    try:
        # Load the trained model and components
        with open("commodity_model_rf.pkl", "rb") as file:
            components = pickle.load(file)
            model = components['model']
            encoder = components['encoder']
            scaler = components['scaler']
            feature_names = components['feature_names']
            numeric_columns = components['numeric_columns']
            price_means = components['price_means']  # Load mean values of price-related columns

        # Get JSON data from the frontend
        data = request.get_json()

        # Prepare new data for prediction (without price-related columns)
        new_data = pd.DataFrame([{
            'State': data['State'],
            'District': data['District'],
            'Market': data['Market'],
            'latitude': float(data['latitude']),
            'longitude': float(data['longitude']),
            'N': float(data['N']),
            'P': float(data['P']),
            'K': float(data['K']),
            'temperature': float(data['temperature']),
            'humidity': float(data['humidity']),
            'ph': float(data['ph']),
            'rainfall': float(data['rainfall'])
        }])

        # Add missing price-related columns with their mean values from training data
        for col, mean_value in price_means.items():
            new_data[col] = mean_value

        # One-hot encode categorical features
        new_data = pd.get_dummies(new_data, columns=['State', 'District', 'Market'])

        # Ensure the new data has the same columns as the training data
        new_data = new_data.reindex(columns=feature_names, fill_value=0)

        # Scale numeric features
        new_data[numeric_columns] = scaler.transform(new_data[numeric_columns])

        # Make prediction
        prediction_class_index = model.predict(new_data)[0]
        predicted_commodity = encoder.inverse_transform([prediction_class_index])[0]

        # Return result as JSON
        return jsonify({"predicted_commodity": predicted_commodity})

    except Exception as e:
        return jsonify({"error": str(e)})

@app.route("/predict_irrigation", methods=["POST"])
def predict_irrigation():
    try:
        # Get JSON data from the frontend
        data = request.get_json()

        # Convert input into DataFrame
        new_data = pd.DataFrame([{
            "Crop Type": data["Crop Type"],
            "Temperature (°C)": float(data["Temperature (°C)"]),
            "Humidity (%)": float(data["Humidity (%)"]),
            "Soil Moisture (%)": float(data["Soil Moisture (%)"])
        }])

        # One-hot encode the crop type
        crop_encoded = encoder.transform(new_data[["Crop Type"]])
        crop_encoded_df = pd.DataFrame(crop_encoded, columns=encoder.get_feature_names_out(["Crop Type"]))

        # Combine encoded and numeric features
        X_new = pd.concat([crop_encoded_df, new_data[["Temperature (°C)", "Humidity (%)", "Soil Moisture (%)"]]], axis=1)

        # Predict irrigation water requirement
        prediction = model.predict(X_new)

        # Return result as JSON
        return jsonify({"Predicted Irrigation Water Required (mm/acre)": round(float(prediction[0]), 2)})

    except Exception as e:
        return jsonify({"error": str(e)})

# ✅ **Run Flask Backend**
if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True, port=5000)

