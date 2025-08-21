import mongoose, {Document} from "mongoose";

export interface IDoctor extends Document {
    name: string,
    email: string,
    password?: string,
    googleId?: string,
    loginType?: "local" | "google",
    phone: string,
    age: number,
    gender:string,
    address:string,
    role: string,
    image?: string,
    specialization: string;
    degree: string;
    experience: String;
    availability: string[]; 
}

const doctorSchema = new mongoose.Schema ({
    name: {type: String,required: true},
    email: {type: String,required: true,unique: true},
    password: {type: String,required: function (this: IDoctor) {
            return !this.googleId; // required only if not using google login
        }
    },
    googleId: { type: String, required: false, unique: true }, // <-- added
    loginType: { type: String, enum: ["local", "google"], default: "local" },
    phone: {type: String,required: false,},
    age: {type: Number,required: false},
    gender: {type: String,required: false,enum: ["Male", "Female"]},
    address: {type: String,required: false},
    role: {type: String, default: "Doctor" },
    image: {type: String},
    specialization: { type: String, required: false },
    degree: { type: String, required: false },
    experience: { type: String, required: false },
    availability: { type: [String], required: false },
});

const doctorModel = mongoose.model<IDoctor>('doctor', doctorSchema);
export default doctorModel;