// services/googleAuthService.ts
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import patientModel from "../models/patientModel.js";
import doctorModel from "../models/doctorModel.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(idToken: string) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload) throw new Error("Invalid Google token");
  return payload;
}

export async function findOrCreateUserFromGoogle(
  payload: any,
  modelType: "patient" | "doctor"
) {
  const { sub: googleId, email, name, picture } = payload;

  if (modelType === "doctor") {
    let user = await doctorModel.findOne({ $or: [{ googleId }, { email }] });
    if (!user) {
      user = await doctorModel.create({
        googleId,
        name,
        email,
        image: picture,
        loginType: "google",
        role: "Doctor",
      });
    }
    return user;
  } else {
    let user = await patientModel.findOne({ $or: [{ googleId }, { email }] });
    if (!user) {
      user = await patientModel.create({
        googleId,
        name,
        email,
        image: picture,
        loginType: "google",
        role: "Patient",
      });
    }
    return user;
  }
}

export function generateAppJwt(user: any) {
  // create your own app token
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.PRIVATE_KEY as string,
    { expiresIn: "1d" }
  );
}