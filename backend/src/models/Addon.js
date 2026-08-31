import mongoose from 'mongoose'

const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true, trim: true },
  publicId: { type: String, default: '' },
  resourceType: { type: String, enum: ['image', 'video'], default: 'video' },
  alt: { type: String, default: '' },
}, { _id: false })

const addonSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  title: { type: String, required: true, trim: true },
  subtitle: { type: String, default: '', trim: true },
  points: [{ type: String, trim: true }],
  video: { type: mediaSchema, default: null },
  thumbnail: { type: mediaSchema, default: null },
  isFavorite: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Addon', addonSchema)
