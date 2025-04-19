import { Request, Response } from 'express';
import { sensorData } from '../Models/liveData';

export const getAllSensorData = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await sensorData.find()
            .sort({ timestamp: -1 }) // Sort by latest
            .limit(1000) // Limit to prevent overload
            .exec(); // Ensures query execution

        if (!data.length) {
            res.status(404).json({ message: 'No sensor data found' });
            return;
        }

        console.log("data of iot in backend",data);
        res.status(200).json(data);
        return;
    } catch (error) {
        res.status(500).json({ error: '❌ Error fetching data', details: (error as Error).message });
        return;
    }
};
