import mongoose, {Document, mongo} from "mongoose";

export interface IPatient extends Document {
    name: string,
    email: string,
    password: string,
    role: string,
    image?: string
}

const patientSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "patient"],
        default: "patient"
    },
    image: {
        type: String
    }
})

const patientModel = mongoose.model<IPatient>('patient', patientSchema)
export default patientModel