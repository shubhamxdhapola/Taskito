import express from 'express'
import multer from 'multer'
import { taskitoStorage } from '../config/cloudinary.js'
import { uploadImage } from '../controllers/uploadController.js'

const router = express.Router()
const upload = multer({storage : taskitoStorage})

router.post('/', upload.single('image'), uploadImage)

export default router