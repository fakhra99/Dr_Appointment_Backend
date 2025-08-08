import doctorModel from "../models/doctorModel.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createDoctor = async(req: Request, res: Response)=> {
    try{
    const {name, email, password, confirmPassword, phone, age, gender, address, role, specialization, degree, experience, availability} = req.body;

    const image = req.file? `${req.protocol}://${req.get("host")}/uploads/profile/${req.file.filename}` : undefined;
    if(!name || !email || !password || !confirmPassword || !phone || !age || !gender || !address || !role || !specialization || !degree || !experience){
        return res.status(409).json({message: "All fields are required"})
    }
    if(password !== confirmPassword){
        return res.status(409).json({message: "password does not match"})
    }
    
    const existingDoctor = await doctorModel.findOne({email});

    if(existingDoctor){
        return res.status(409).json({message: "This doctor is already registered"})
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newDoctor = new doctorModel({name, email, password: hashPassword, confirmPassword, phone, age, gender, address, role, image,specialization, degree, experience, availability })

     await newDoctor.save()

        return res.status(200).json({message: "Doctor data saved successfully", newDoctor})
    }
    catch(error){
        console.error("An error has occured", error)
        return res.status(500).json({message: "internal server error"})
    }
}

// login doctor
export const loginDoctor = async(req: Request, res: Response)=> {
    try{
const {email, password} = req.body;
    const existingDoctor = await doctorModel.findOne({email});
    if(!existingDoctor){
        return res.status(401).json({message: "This user does not exist in our system"})
    }
    const matchPassword = await bcrypt.compare(password, existingDoctor.password);
    if(!matchPassword){
        return res.status(401).json({message: "Password do not match"})
    }

    const jwtToken = jwt.sign({
        name: existingDoctor.name,
        email: existingDoctor.email,
        role: existingDoctor.role
    },
    process.env.PRIVATE_KEY as string,
    {expiresIn: "1d"})

    return res.status(200).json({message: "Login successful", jwtToken})
    }
    catch(error){
        return res.status(500).json({message: "Internal server error", error})
    }
}
    