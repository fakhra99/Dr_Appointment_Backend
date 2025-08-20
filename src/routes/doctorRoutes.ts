import express from "express";
import { uploads } from "../middlewares/multerMiddleware.js";
import { createDoctor, loginDoctor, doctorForgetPassword, doctorVerifyOtp, doctorResetPassword, googleLoginDoctor} from "../controllers/doctorController.js";

const router = express.Router();

router.post("/createDoctor", uploads.single("image"), createDoctor);
router.post("/loginDoctor", loginDoctor);
router.post("/forgetPass", doctorForgetPassword);
router.post("/verifyOtp", doctorVerifyOtp);
router.post("/resetPassword", doctorResetPassword);
router.post("/googleLoginDoctor", googleLoginDoctor);

export default router;