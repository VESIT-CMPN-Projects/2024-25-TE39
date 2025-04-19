import mongoose, { Schema, Document } from 'mongoose';


interface ISoil extends Document {
    location_id: mongoose.Types.ObjectId;
    soil_pH: number;
    soil_humidity: number;
    recordedAt: Date;
  }
  
  const SoilSchema = new Schema<ISoil>({
    location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
    soil_pH: { type: Number },
    soil_humidity: { type: Number },
    recordedAt: { type: Date, default: Date.now },
  });

export const Soil = mongoose.model<ISoil>('Soil', SoilSchema);
