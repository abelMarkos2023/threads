import mongoose from 'mongoose';

export const connectToDB = async() => {

    if (mongoose.connection.readyState === 1) {
        console.log("Already Connected to DB");
        return;
    }
    if (!process.env.MONGODB_URL) {
        console.log("MONGO_URL wasn't found");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to DB");
    } catch (error) {
        console.error("Failed to connect to DB", error);
        throw error;
    }
};
