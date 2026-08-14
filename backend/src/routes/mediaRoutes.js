import express from 'express'
import multer from 'multer'
import { uploadMedia } from '../controllers/mediaController.js'

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => cb(null, file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')),
  limits: { fileSize: 100 * 1024 * 1024 },
})
const router = express.Router()
router.post('/media', upload.array('files', 10), uploadMedia)
export default router
