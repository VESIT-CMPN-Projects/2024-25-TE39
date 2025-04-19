import { Request, Response } from "express";
import { S3 } from "aws-sdk";
import multer from "multer";
import * as path from "path";

// Initialize S3 client
const s3 = new S3();

// Set up multer storage
const storage = multer.memoryStorage(); // Using memory storage for direct upload to S3
const upload = multer({ storage: storage });

// Endpoint to upload image
export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const file = req.file;
    const fileName = `${Date.now()}_${file.originalname}`; // Unique name based on timestamp

    const params = {
      Bucket: "plant-disease-images-bucket", // Your S3 bucket name
      Key: fileName, // The key is the unique file name
      Body: file.buffer, // File content
      ContentType: file.mimetype, // File type (e.g., image/jpeg)
      // This will make the file public (optional)
    };

    // Upload file to S3
    const uploadResult = await s3.upload(params).promise();

    // You can replace this with a call to a plant disease detection model here.
    // Assuming it's done and you return a result.
    const result = "Disease detected: Example Disease"; // Placeholder result

    // Return success response with uploaded file URL
    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: uploadResult.Location, // URL to the uploaded file
      result, // This can be replaced with the actual result of your disease detection
    });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res.status(500).send("Error uploading file");
  }
};
