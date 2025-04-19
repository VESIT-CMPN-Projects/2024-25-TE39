import mongoose, { Schema, Document } from 'mongoose';

interface IRecommendation extends Document {
    state: string;
    district: string;
    market: string;
    latitude: number;
    longitude: number;
    N: number;
    P: number;
    K: number;
    temperature: number;
    humidity: number;
    ph: number;
    rainfall: number;
    recordedAt: Date;
}

const recommendationSchema = new Schema<IRecommendation>({
    state: { type: String, required: true },
    district: { type: String, required: true },
    market: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    N: { type: Number, required: true },
    P: { type: Number, required: true },
    K: { type: Number, required: true },
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    ph: { type: Number, required: true },
    rainfall: { type: Number, required: true },
    recordedAt: { type: Date, default: Date.now }
});

export const recommendData = mongoose.model<IRecommendation>('recommendData', recommendationSchema);
