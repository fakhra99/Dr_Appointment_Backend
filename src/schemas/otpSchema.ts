import { z } from "zod";

export const otpSchema = z.object({
  email: z.string().email("A valid email is required"),
  otp: z.number(),
});