import express from "express";
import { uploads } from "../middlewares/multerMiddleware.js";
import { createDoctor, loginDoctor } from "../controllers/doctorController.js";

const router = express.Router();

router.post("/createDoctor", uploads.single("image"), createDoctor);
router.post("/loginDoctor", loginDoctor);

export default router;