import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        await mongoose.connect(uri);

        console.log('MongoDB connected successfully ✅');
    } catch (error) {
        console.error(`MongoDB connection error: ${(error as Error).message}`);
        process.exit(1); // Exit with failure
    }
};

export default connectDB;
