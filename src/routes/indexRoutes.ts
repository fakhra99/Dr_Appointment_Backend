import express from "express";
import patientRoute from "../routes/patientRoute.js";
import doctorRoute from "../routes/doctorRoutes.js";

const router = express.Router();

router.use("/patient", patientRoute);
router.use("/doctor", doctorRoute);

export default router