
import mongoose from "mongoose";

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODBURI);
        console.log('Connect to MongoDB');
    } catch (error) {
        console.log('Error connectig to MongoDB:', error.message);
    }
}