import mongoose, { Schema, Document } from 'mongoose';

export interface IIoTSensorData extends Document {
    temperature?: number;
    humidity?: number;
    soilMoisture?: number;
    [key: string]: any; // Allow dynamic fields
    timestamp: Date;
}

const IoTSensorDataSchema = new Schema<IIoTSensorData>({
    temperature: { type: Number },
    humidity: { type: Number },
    soilMoisture: { type: Number },
    timestamp: { type: Date, default: Date.now, index: true }, // Indexed for fast queries
}, { strict: false }); // Allows storing dynamic fields

export const sensorData = mongoose.model<IIoTSensorData>('sensorData', IoTSensorDataSchema);
