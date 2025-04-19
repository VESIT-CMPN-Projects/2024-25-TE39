import { Request, Response } from "express";
import { S3 } from "aws-sdk";
import multer from "multer";

// Initialize S3 instance
const s3 = new S3({
  region: "ap-south-1", // Your S3 bucket region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Your AWS Access Key
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Your AWS Secret Access Key
});

// Multer setup
const upload = multer(); // For handling multipart/form-data

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) {
    // If no file was uploaded, return a 400 error
    res.status(400).send("No file uploaded");
    return;
  }

  const file = req.file;
  const fileName = `${Date.now()}_${file.originalname}`; // Generate unique file name

  // Set S3 upload parameters
  const params = {
    Bucket: "plant-disease-images-bucket", // Your S3 Bucket Name
    Key: fileName, // The name of the file in S3
    Body: file.buffer, // File content
    ContentType: file.mimetype, // File type (e.g., image/jpeg)
    // Make the file public (optional)
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    // Send response with the file URL
    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: uploadResult.Location, // URL of the uploaded file
    });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res.status(500).send("Error uploading file");
  }
};
