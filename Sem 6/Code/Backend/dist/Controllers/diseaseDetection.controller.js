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
// Initialize S3 client
const s3 = new aws_sdk_1.S3();
// Set up multer storage
const storage = multer_1.default.memoryStorage(); // Using memory storage for direct upload to S3
const upload = (0, multer_1.default)({ storage: storage });
// Endpoint to upload image
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const uploadResult = yield s3.upload(params).promise();
        // You can replace this with a call to a plant disease detection model here.
        // Assuming it's done and you return a result.
        const result = "Disease detected: Example Disease"; // Placeholder result
        // Return success response with uploaded file URL
        res.status(200).json({
            message: "File uploaded successfully",
            fileUrl: uploadResult.Location, // URL to the uploaded file
            result, // This can be replaced with the actual result of your disease detection
        });
    }
    catch (error) {
        console.error("Error uploading file to S3:", error);
        res.status(500).send("Error uploading file");
    }
});
exports.uploadImage = uploadImage;
