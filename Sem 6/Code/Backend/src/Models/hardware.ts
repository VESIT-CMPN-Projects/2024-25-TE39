import mongoose, { Schema, Document } from 'mongoose';

interface IHardwareData extends Document {
    temperature: number;
    humidity: number;
    soilMoisture: number;
    recordedAt: Date;
}

const HardwareDataSchema = new Schema<IHardwareData>({
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    soilMoisture: { type: Number, required: true },
    recordedAt: { type: Date, default: Date.now }
});

export const HardwareData = mongoose.model<IHardwareData>('HardwareData', HardwareDataSchema);
