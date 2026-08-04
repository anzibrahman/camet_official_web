// models/HeroBanner.js
import mongoose from 'mongoose'

const heroBannerSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      default: 'home',
      unique: true,
      trim: true,
    },
    badgeText: {
      type: String,
      default: 'CAMET IT SOLUTIONS LLP',
      trim: true,
    },
    titleLine1: {
      type: String,
      required: true,
      trim: true,
    },
    titleLine2: {
      type: String,
      required: true,
      trim: true,
    },
    titleHighlight: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    primaryCtaText: {
      type: String,
      default: 'Schedule a Call',
      trim: true,
    },
    primaryCtaLink: {
      type: String,
      default: 'tel:9072632605',
      trim: true,
    },
    secondaryCtaText: {
      type: String,
      default: 'Chat on WhatsApp',
      trim: true,
    },
    secondaryCtaLink: {
      type: String,
      default:
        'https://wa.me/919876543210?text=Hello%20CAMET%20IT%20Solutions%2C%20I%20want%20to%20know%20more%20about%20your%20services.',
      trim: true,
    },
    bannerImageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

const HeroBanner = mongoose.model('HeroBanner', heroBannerSchema)
export default HeroBanner