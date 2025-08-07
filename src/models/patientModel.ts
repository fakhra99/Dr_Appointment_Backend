import mongoose, {Document} from "mongoose";

export interface IPatient extends Document {
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
    gender:string,
    address:string,
    role: string,
    image?: string
}

const patientSchema = new mongoose.Schema ({
    name: {type: String,required: true},
    email: {type: String,required: true,unique: true},
    password: {type: String,required: true},
    phone: {type: String,required: true,},
    age: {type: Number,required: true},
    gender: {type: String,required: true,enum: ["Male", "Female"]},
    address: {type: String,required: true},
    // mrNumber: {type: String,required: true,unique: true},
    role: {type: String,enum: ["admin", "patient"], default: "patient" },
    image: {type: String}
})

const patientModel = mongoose.model<IPatient>('patient', patientSchema)
export default patientModel