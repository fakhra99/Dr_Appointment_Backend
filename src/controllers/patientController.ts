import patientModel from "../models/patientModel.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const createPatient = async(req: Request, res: Response) => {
    try{
        const {name, email, password, confirmPassword, phone, age, gender, address, role} = req.body;
        const image = req.file? `${req.protocol}://${req.get("host")}/uploads/profile/${req.file.filename}`: undefined;
        if(!name || !email || !password || !confirmPassword || !phone || !age || !gender || !address){
            return res.status(400).json({message: "All fields are required"})
        }
        if(password !== confirmPassword) {
            return res.status(400).json({message: "password does not match"})
        }    
        const existingPatient = await patientModel.findOne({ email });
        if (existingPatient) {
            return res.status(409).json({ message: "This patient already exists in our system" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newPatient = new patientModel({name, email, password: hashedPassword, confirmPassword, phone, age, gender, address, role, image})
        await newPatient.save()

        return res.status(200).json({message: "Patient data saved successfully", newPatient})
    }
    catch(error){
        console.error("An error has occured", error)
        return res.status(500).json({message: "internal server error"})
    }
}