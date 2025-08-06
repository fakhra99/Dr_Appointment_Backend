import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DBURI = process.env.MongoURI as string;
export const connectDb = async ()=> {
    try{
    await mongoose.connect(DBURI)
    console.log("database is connected")
    }
    catch (error){
        console.log("Could not connect to database", error);
        
    }
}