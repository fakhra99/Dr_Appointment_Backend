import express from "express"
import {createPatient, loginPatient} from "../controllers/patientController.js";
import {uploads} from "../middlewares/multerMiddleware.js"

const router = express.Router();

router.post("/createPatient", uploads.single("image"), createPatient);
router.post("/loginPatient", loginPatient);

export default router;