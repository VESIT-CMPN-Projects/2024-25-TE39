import axios from "axios";

// Placeholder function to call the Flask API for plant disease prediction
export const modelPrediction = async (imageUrl: string): Promise<string> => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/predict_plant_disease",
      { imageUrl }
    );

    // Explicitly type response.data
    const result = response.data as { predicted_disease: string };
    return result.predicted_disease;
  } catch (error) {
    throw new Error("Error calling the Flask model API");
  }
};
