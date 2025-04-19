import express from "express";
import { uploadImage } from "./imageUpload.controller"; // Import the controller
import multer from "multer";

const router = express.Router();

// Configure multer for handling file upload
const upload = multer();

// Define the route for uploading images
router.post("/upload-image", upload.single("image"), uploadImage);

export default router;
