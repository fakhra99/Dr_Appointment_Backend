import express from "express"
import {createPatient, loginPatient, patientForgetPassword, patientVerifyOtp, patientResetPassword} from "../controllers/patientController.js";
import {uploads} from "../middlewares/multerMiddleware.js"

const router = express.Router();

router.post("/createPatient", uploads.single("image"), createPatient);
router.post("/loginPatient", loginPatient);
router.post("/forgetPass", patientForgetPassword);
router.post("/verifyOtp", patientVerifyOtp);
router.post("/resetPassword", patientResetPassword);

export default router;