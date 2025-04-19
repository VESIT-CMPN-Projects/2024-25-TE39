import mongoose, { Schema, Document } from 'mongoose';


interface ICrop extends Document {
    name: string;
    preferred_conditions: {
      soil_pH_range: [number, number];
      temperature_range: [number, number];
      humidity_range: [number, number];
      rainfall_range: [number, number];
      soil_humidity_range: [number, number];
    };
    growth_period: string;
  }
  
  const CropSchema = new Schema<ICrop>({
    name: { type: String, required: true },
    preferred_conditions: {
      soil_pH_range: [{ type: Number }],
      temperature_range: [{ type: Number }],
      humidity_range: [{ type: Number }],
      rainfall_range: [{ type: Number }],
      soil_humidity_range: [{ type: Number }],
    },
    growth_period: { type: String },
  });
  

  export const Crop = mongoose.model<ICrop>('Crop', CropSchema);
