import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  company: { type: String, default: '', trim: true },
  role: { type: String, default: '', trim: true },
  text: { type: String, required: true, trim: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  photoUrl: { type: String, default: '' },
  photoPublicId: { type: String, default: '' },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Review', reviewSchema)
