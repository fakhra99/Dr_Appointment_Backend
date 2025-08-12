import mongoose, { Document, Schema } from "mongoose";

// Interface for type checking
export interface IOtp extends Document {
  email: string;
  otp: number;
  expiresAt: Date;
}

const otpSchema = new Schema<IOtp>(
  {
    email: { type: String, required: true },
    otp: { type: Number, required: true },
    expiresAt: { type: Date, required: true }
  },
  {
    timestamps: true,
  }
);

export const Otp = mongoose.model<IOtp>("Otp", otpSchema);