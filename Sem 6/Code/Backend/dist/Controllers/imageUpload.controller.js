"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const aws_sdk_1 = require("aws-sdk");
const multer_1 = __importDefault(require("multer"));
// Initialize S3 instance
const s3 = new aws_sdk_1.S3({
    region: "ap-south-1", // Your S3 bucket region
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Your AWS Access Key
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Your AWS Secret Access Key
});
// Multer setup
const upload = (0, multer_1.default)(); // For handling multipart/form-data
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const uploadResult = yield s3.upload(params).promise();
        // Send response with the file URL
        res.status(200).json({
            message: "File uploaded successfully",
            fileUrl: uploadResult.Location, // URL of the uploaded file
        });
    }
    catch (error) {
        console.error("Error uploading file to S3:", error);
        res.status(500).send("Error uploading file");
    }
});
exports.uploadImage = uploadImage;
