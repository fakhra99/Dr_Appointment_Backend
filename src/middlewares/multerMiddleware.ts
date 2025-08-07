import multer from "multer";
import path from "path";
import fs from "fs";

const createUploadsFolder = (folderPath: string) => {
    if(!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, {recursive:true})
    }
}

// configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadpath = path.join("uploads", "profile");
        createUploadsFolder(uploadpath)
        cb(null, uploadpath)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

// filter files for images
const fileFilter = (req: any, file: any, cb: any) => {
    const allowedTypes = /jpeg|png|jpg/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    if(extName&&mimetype) {
        return cb(null, true)
    }
    else{
        cb("only images are allowed")
    }
}

export const uploads = multer({storage, fileFilter})