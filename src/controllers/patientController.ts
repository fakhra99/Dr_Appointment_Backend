import patientModel from "../models/patientModel.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

// login
export const loginPatient = async(req: Request, res: Response)=> {
    try{
        const {email, password} = req.body;
    const patientexists = await patientModel.findOne({email});
    if(!patientexists){
        return res.status(401).json({message: "This patient does not exist in our system"})
    }
    const matchPassword = await bcrypt.compare(password, patientexists.password);
    if(!matchPassword){
        return res.status(401).json({message: "Invalid credentials"})
    }
    const jwtToken = jwt.sign({
        name:patientexists.name,
        emai:patientexists.email,
        role:patientexists.role
    },
    process.env.PRIVATE_KEY as string,
    {expiresIn: "1d"}
    )

    return res.status(200).json({message: "login successful", jwtToken})
    }
    catch (error){
        return res.status(500).json({message: "Internal server Error"})
    } 
}