import mongoose, { Schema, Document } from "mongoose";

// Farmer Model
interface IFarmer extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  phone: string;
  soilType: string;
  location: {
    latitude: number;
    longitude: number;
    region: string;
  };
  crops_cultivated: string[];
  expense: number;
  income: number;
}

const FarmerSchema = new Schema<IFarmer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    soilType: { type: String, required: false },
    isVerified: { type: Boolean, default: false },
    phone: { type: String, required: false },
    location: {
      latitude: { type: Number, required: false },
      longitude: { type: Number, required: false },
      region: { type: String, required: false },
    },
    crops_cultivated: [{ type: String }],
    expense: { type: Number },
    income: { type: Number },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const Farmer = mongoose.model<IFarmer>("Farmer", FarmerSchema);
