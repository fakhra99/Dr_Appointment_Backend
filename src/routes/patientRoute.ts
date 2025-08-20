import express from "express"
import {createPatient, loginPatient, patientForgetPassword, patientVerifyOtp, patientResetPassword, googleLoginPatient} from "../controllers/patientController.js";
import {uploads} from "../middlewares/multerMiddleware.js"

const router = express.Router();

router.post("/createPatient", uploads.single("image"), createPatient);
router.post("/loginPatient", loginPatient);
router.post("/forgetPass", patientForgetPassword);
router.post("/verifyOtp", patientVerifyOtp);
router.post("/resetPassword", patientResetPassword);
router.post("/googleLoginPatient", googleLoginPatient);

export default router;