import 'dotenv/config'
import connectDB from '../src/config/db.js'
import HeroBanner from '../src/models/HeroBanner.js'

await connectDB()
await HeroBanner.updateMany({}, {
  primaryCtaLink: 'tel:9072632603',
  secondaryCtaLink: 'https://wa.me/919072632603?text=Hello%20CAMET%20IT%20Solutions%2C%20I%20want%20to%20know%20more%20about%20your%20services.',
})
console.log('Hero contact and WhatsApp links updated')
process.exit(0)
