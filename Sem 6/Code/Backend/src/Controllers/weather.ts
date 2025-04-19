import mongoose from "mongoose";
import { Request, Response } from "express";
import axios from "axios";
import { Weather } from "../Models/weather.model";
import { Farmer } from "../Models/farmer.model";

export const getWeatherData = async (req: Request, res: Response) => {
  const { farmerId } = req.body; // Use req.query instead of req.body
  const apiKey = "520a7ced5cef459294262942252003";
  console.log("id", farmerId);

  if (!farmerId) {
    res.status(400).json({ message: "Farmer ID is required." });
    return;
  }

  try {
    const farmer = await Farmer.findById(farmerId);
    if (!farmer || !farmer.location) {
      res.status(404).json({ message: "Farmer or region not found." });
      return;
    }

    console.log("farmer backend", farmer);

    const location = farmer.location;

    const weatherResponse = await axios.get<{
      location: { name: string };
      current: { temp_c: number; humidity: number; precip_mm?: number };
    }>(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no`
    );

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

      await Weather.create(todayWeather);

      res.status(200).json({
        message: "Weather data fetched successfully",
        weatherData,
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch weather data",
      error: (error as Error).message,
    });
    return;
  }
};
