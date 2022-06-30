import multer from "multer";
import express from "express"
import { middleware } from '../controller/authcontroller.js';
import User from "../models/usermodel.js";

const route = express.Router()

const storage = multer.diskStorage({
    destination: function (req, files, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, files, cb) {
        cb(null, files.fieldname + Date.now() + files.originalname);
    }
})
const upload = multer({ storage: storage });
route.put('/:id',middleware, upload.fields([{ name: 'coverpicture' }, { name: 'profilepicture' }]), async (req, res) => {
    const id = req.params.id
    try {
        if (req.files.profilepicture[0].filename) {
            await User.findByIdAndUpdate(id, { $set: { profilepicture: req.files.profilepicture[0].filename } })
            await User.findByIdAndUpdate(id, { $set: { coverpicture: req.files.coverpicture[0].filename } })
            res.status(200)
        }
    } catch (error) {
        res.status(500)
        console.log({"MESSAGE":error.message})
    }
})
export default route;