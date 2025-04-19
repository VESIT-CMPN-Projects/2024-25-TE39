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
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictPlantDisease = void 0;
const awsService_1 = require("../services/awsService"); // Importing AWS S3 service
const modelService_1 = require("../services/modelService"); // Importing model prediction service
const aws_sdk_1 = require("aws-sdk");
// AWS DynamoDB setup
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const TABLE_NAME = "PlantDiseasePredictions";
// Plant disease prediction function
const predictPlantDisease = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const fileUrl = yield (0, awsService_1.uploadImageToS3)(file);
        // Get the predicted disease from the model
        const predictedDisease = yield (0, modelService_1.modelPrediction)(fileUrl);
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
        yield dynamoDb.put(item).promise();
        res.status(200).json({
            message: "Image uploaded and disease predicted successfully",
            fileUrl,
            predictedDisease,
        });
    }
    catch (error) {
        console.error("❌ Error:", error);
        res.status(500).send("Error processing the file and prediction.");
    }
});
exports.predictPlantDisease = predictPlantDisease;
