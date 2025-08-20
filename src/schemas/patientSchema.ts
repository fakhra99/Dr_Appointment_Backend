import z from "zod";

export const patientSchema = z.object({
    name:z.string().min(1, "name is required"),
    email:z.string().email("email is required"),
    password:z.string().min(6, "password is required"),
    googleId: z.string(),
    confirmPassword: z.string().min(6, "confirm password is required"),
    phone:z.string().regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number"),
    age:z.number().min(0, "age must be a positive integer"),
    gender:z.string(),
    address: z.string().min(5, "Address is required"),
    role:z.string(),
    image:z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });