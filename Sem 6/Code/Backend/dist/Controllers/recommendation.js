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
exports.predictCrop = void 0;
const axios_1 = __importDefault(require("axios"));
const recommendations_model_1 = require("../Models/recommendations.model");
// @desc Predict Crop Recommendation
// @route POST /predict
const predictCrop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { state, district, market, latitude, longitude, N, P, K, temperature, humidity, ph, rainfall } = req.body;
        // Validate required fields
        if (!state || !district || !market || latitude === undefined || longitude === undefined ||
            N === undefined || P === undefined || K === undefined ||
            temperature === undefined || humidity === undefined || ph === undefined || rainfall === undefined) {
            res.status(400).json({ error: '❌ All fields are required.' });
            return;
        }
        // Send data to Flask API for prediction
        const flaskResponse = yield axios_1.default.post('http://127.0.0.1:5000/predict_crop', { state, district, market, latitude, longitude, N, P, K, temperature, humidity, ph, rainfall });
        const { recommended_crop } = flaskResponse.data; // ✅ TypeScript now recognizes this
        // Save data in MongoDB (Optional)
        const newSensorData = new recommendations_model_1.recommendData({
            state, district, market, latitude, longitude, N, P, K, temperature, humidity, ph, rainfall, recommended_crop
        });
        yield newSensorData.save();
        res.status(200).json({ recommended_crop });
        return;
    }
    catch (error) {
        console.error('❌ Error fetching prediction:', error);
        res.status(500).json({ error: '❌ Failed to get crop recommendation' });
        return;
    }
});
exports.predictCrop = predictCrop;
