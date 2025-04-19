// services/awsService.ts
import * as path from "path";
import { S3 } from "aws-sdk";

const s3 = new S3();
const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

// Helper function to validate file type
const allowedFile = (filename: string) => {
  const ext = path.extname(filename).toLowerCase();
  return allowedExtensions.includes(ext.substring(1));
};

// Upload image to AWS S3
export const uploadImageToS3 = async (
  file: Express.Multer.File
): Promise<string> => {
  const fileName = `${Date.now()}_${file.originalname}`;
  const params = {
    Bucket: "plant-disease-images-bucket",
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location; // Return the URL of the uploaded file
};
