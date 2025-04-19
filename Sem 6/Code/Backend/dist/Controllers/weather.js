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
exports.getWeatherData = void 0;
const axios_1 = __importDefault(require("axios"));
const weather_model_1 = require("../Models/weather.model");
const farmer_model_1 = require("../Models/farmer.model");
const getWeatherData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { farmerId } = req.body; // Use req.query instead of req.body
    const apiKey = "520a7ced5cef459294262942252003";
    console.log("id", farmerId);
    if (!farmerId) {
        res.status(400).json({ message: "Farmer ID is required." });
        return;
    }
    try {
        const farmer = yield farmer_model_1.Farmer.findById(farmerId);
        if (!farmer || !farmer.location) {
            res.status(404).json({ message: "Farmer or region not found." });
            return;
        }
        console.log("farmer backend", farmer);
        const location = farmer.location;
        const weatherResponse = yield axios_1.default.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no`);
        const weatherData = weatherResponse.data;
        if (farmerId) {
            const todayWeather = {
                // location_id: farmer.location,  // ✅ Correct field and data type
                location: farmer.location,
                temperature: weatherData.current.temp_c,
                humidity: weatherData.current.humidity,
                rainfall: weatherData.current.precip_mm || 0, // ✅ Added rainfall field with fallback value
                recordedAt: new Date(), // ✅ Corrected to match `recordedAt` in schema
            };
            yield weather_model_1.Weather.create(todayWeather);
            res.status(200).json({
                message: "Weather data fetched successfully",
                weatherData,
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch weather data",
            error: error.message,
        });
        return;
    }
});
exports.getWeatherData = getWeatherData;
