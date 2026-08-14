// src/models/Product.js
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Tally Products', 'Business Software Products']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  path: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true,
    enum: ['FaLaptopCode', 'FaDatabase', 'FaCloud', 'FaClipboardCheck', 
           'FaFileInvoiceDollar', 'FaServer', 'MdMiscellaneousServices', 
           'BsFillGearFill', 'HiOutlineWrenchScrewdriver']
  },
  iconBg: {
    type: String,
    default: 'bg-blue-100'
  },
  iconColor: {
    type: String,
    default: 'text-blue-700'
  },
  pricing: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  features: [{
    type: String
  }],
  notes: [{
    type: String
  }],
  useCases: [{
    type: String
  }],
  ctaTitle: String,
  ctaText: String,
  heroImage: { type: String, default: '' },
  gallery: [{
    url: { type: String, required: true },
    publicId: { type: String, default: '' },
    resourceType: { type: String, enum: ['image', 'video'], default: 'image' },
    alt: { type: String, default: '' }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)
export default Product
