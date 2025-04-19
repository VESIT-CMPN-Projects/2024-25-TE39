"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageUpload_controller_1 = require("./imageUpload.controller"); // Import the controller
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
// Configure multer for handling file upload
const upload = (0, multer_1.default)();
// Define the route for uploading images
router.post("/upload-image", upload.single("image"), imageUpload_controller_1.uploadImage);
exports.default = router;
