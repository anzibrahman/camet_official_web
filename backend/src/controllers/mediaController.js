import streamifier from 'streamifier'
import cloudinary from '../utils/cloudinary.js'

const uploadToCloudinary = (file) => new Promise((resolve, reject) => {
  const resourceType = file.mimetype.startsWith('video/') ? 'video' : 'image'
  const stream = cloudinary.uploader.upload_stream(
    { folder: 'camet', resource_type: resourceType },
    (error, result) => error ? reject(error) : resolve({ url: result.secure_url, publicId: result.public_id, resourceType })
  )
  streamifier.createReadStream(file.buffer).pipe(stream)
})

export const uploadMedia = async (req, res) => {
  try {
    if (!req.files?.length) return res.status(400).json({ success: false, message: 'Select at least one image or video' })
    const data = await Promise.all(req.files.map(uploadToCloudinary))
    res.status(201).json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
