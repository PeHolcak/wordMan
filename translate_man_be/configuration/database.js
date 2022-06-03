import dotenv from "dotenv";

import mongoose from "mongoose";
import colors from "colors";

dotenv.config();

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.info(`MongoDB Connected: ${conn.connection.host}`.green.bold);
    }catch(error){
        console.error(`Error: ${error.message}`.red.bold);
        process.exit(1);
    }
};

export default connectDB;