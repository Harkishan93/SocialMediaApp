import express from 'express';
import { middleware } from '../controller/authcontroller.js';
import multer from 'multer';
const route = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  }
})

const upload = multer({ storage: storage });
route.post('/',middleware, upload.single('file'), (req, res) => {
  try {
    return res.status(200).json({ message: "File Upload Successfully" });
  } catch (error) {
    console.log({ "error": error.message })
  }
})
export default route;