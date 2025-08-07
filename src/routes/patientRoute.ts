import express from "express"
import {createPatient} from "../controllers/patientController.js";
import {uploads} from "../middlewares/multerMiddleware.js"

const router = express.Router();

router.post("/createPatient", uploads.single("image"), createPatient)

export default router;