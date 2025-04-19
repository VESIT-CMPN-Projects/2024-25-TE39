import { Request, Response } from "express";
import { uploadImageToS3 } from "../services/awsService"; // Importing AWS S3 service
import { modelPrediction } from "../services/modelService"; // Importing model prediction service
import { DynamoDB } from "aws-sdk";

// AWS DynamoDB setup
const dynamoDb = new DynamoDB.DocumentClient();
const TABLE_NAME = "PlantDiseasePredictions";

// Plant disease prediction function
export const predictPlantDisease = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const file = req.file;

    // Remove the validation check for now (commenting it out)
    // if (!allowedFile(file.originalname)) {
    //   return res.status(400).send("Invalid file type. Only images are allowed.");
    // }

    // Upload the image to S3
    const fileUrl = await uploadImageToS3(file);

    // Get the predicted disease from the model
    const predictedDisease = await modelPrediction(fileUrl);

    // Save to DynamoDB
    const item = {
      TableName: TABLE_NAME,
      Item: {
        id: Date.now().toString(),
        fileUrl,
        predictedDisease,
        timestamp: new Date().toISOString(),
      },
    };

    await dynamoDb.put(item).promise();

    res.status(200).json({
      message: "Image uploaded and disease predicted successfully",
      fileUrl,
      predictedDisease,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).send("Error processing the file and prediction.");
  }
};
