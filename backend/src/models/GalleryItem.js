import mongoose from 'mongoose'

const galleryItemSchema = new mongoose.Schema({
  category: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  dateLabel: { type: String, default: '', trim: true },
  mediaUrl: { type: String, required: true, trim: true },
  publicId: { type: String, default: '' },
  mediaType: { type: String, enum: ['image', 'video'], default: 'image' },
  alt: { type: String, default: '' },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('GalleryItem', galleryItemSchema)
