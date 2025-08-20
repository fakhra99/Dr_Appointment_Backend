import mongoose, {Document} from "mongoose";

export interface IPatient extends Document {
    name: string,
    email: string,
    password: string,
    googleId?: string,
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
    password: { 
    type: String, 
    required: function (this: IPatient) {
    return !this.googleId;
    }
    },
    googleId: { type: String, required: false, unique: true }, // optional
    loginType: { type: String, enum: ["local","google"], default: "local" },
    phone: {type: String,required: false,},
    age: {type: Number,required: false},
    gender: {type: String,required: false,enum: ["Male", "Female"]},
    address: {type: String,required: false},
    role: {type: String, default: "Patient" },
    image: {type: String}
})

const patientModel = mongoose.model<IPatient>('patient', patientSchema)
export default patientModel