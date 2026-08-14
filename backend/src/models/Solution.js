import mongoose from 'mongoose'

const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true, trim: true },
  publicId: { type: String, default: '' },
  resourceType: { type: String, enum: ['image', 'video'], default: 'image' },
  alt: { type: String, default: '' },
}, { _id: false })

const solutionSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  path: { type: String, required: true, trim: true },
  label: { type: String, required: true, trim: true },
  desc: { type: String, required: true, trim: true },
  icon: { type: String, default: 'FaLaptopCode' },
  iconBg: { type: String, default: 'bg-blue-100' },
  iconColor: { type: String, default: 'text-blue-700' },
  heroTitle: { type: String, default: '' },
  heroText: { type: String, default: '' },
  features: [{ type: String, trim: true }],
  benefits: [{ type: String, trim: true }],
  headingVideo: { type: mediaSchema, default: null },
  gallery: [mediaSchema],
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Solution', solutionSchema)
