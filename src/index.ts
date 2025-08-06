import express from "express";
import {connectDb} from "./utils/conntDb.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

const port = process.env.PORT

// middlewares
app.use(cors());
app.use(express.json())

connectDb()

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})