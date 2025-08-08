import express from "express";
import {connectDb} from "./utils/conntDb.js";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/indexRoutes.js"

dotenv.config();
const app = express();

const port = process.env.PORT

connectDb()

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router)
app.use("/uploads", express.static("uploads")); 

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})