// services/authService.ts
import {Otp} from "../models/otpModel.js";
import bcrypt from "bcrypt";
import { sendOtpEmail } from "./emailService.js";

export const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit

export const sendOtp = async (email: string) => {
  const otp = generateOtp();
   const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await Otp.findOneAndUpdate(
    { email },
    { otp, expiresAt },
    { upsert: true, new: true }
  );

  await sendOtpEmail(email, otp);
};

export const verifyOtp = async (email: string, otp: string) => {
  const record = await Otp.findOne({ email, otp });
  if (!record) return false;
  if (record.expiresAt < new Date()) return false;

  return true;
};

export const resetPassword = async (email: string, newPassword: string, model: any) => {
  const hashed = await bcrypt.hash(newPassword, 10);
  const user = await model.findOneAndUpdate(
    { email: email.trim().toLowerCase() },
    { password: hashed },
    { new: true }
  );
  if (!user) throw new Error("User not found");
  await Otp.deleteOne({ email: email.trim().toLowerCase() });
  return user;
};
