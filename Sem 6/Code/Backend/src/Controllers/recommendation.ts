import axios from 'axios';
import { Request, Response } from 'express';
import { recommendData } from '../Models/recommendations.model';

// @desc Predict Crop Recommendation
// @route POST /predict
export const predictCrop = async (req: Request, res: Response): Promise<void> => {
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
        const flaskResponse = await axios.post<{ recommended_crop: string }>(
            'http://127.0.0.1:5000/predict_crop', 
            { state, district, market, latitude, longitude, N, P, K, temperature, humidity, ph, rainfall }
        );

        const { recommended_crop } = flaskResponse.data; // ✅ TypeScript now recognizes this

        // Save data in MongoDB (Optional)
        const newSensorData = new recommendData({ 
            state, district, market, latitude, longitude, N, P, K, temperature, humidity, ph, rainfall, recommended_crop 
        });
        await newSensorData.save();

        res.status(200).json({ recommended_crop });
        return;

    } catch (error) {
        console.error('❌ Error fetching prediction:', error);
        res.status(500).json({ error: '❌ Failed to get crop recommendation' });
        return;
    }
};
