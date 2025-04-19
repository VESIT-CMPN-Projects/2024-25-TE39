import mongoose, { Schema, Document } from 'mongoose';


export interface IWeather extends Document {
    location_id: mongoose.Types.ObjectId;
    location:string;
    humidity: number;
    temperature: number;
    rainfall: number;
    recordedAt: Date;
  }
  
  const WeatherSchema = new Schema<IWeather>({
    location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' },
    location:{type:String},
    humidity: { type: Number },
    temperature: { type: Number },
    rainfall: { type: Number },
    recordedAt: { type: Date, default: Date.now },
  });


  export const Weather = mongoose.model<IWeather>('Weather', WeatherSchema);
