import 'dotenv/config'
import connectDB from '../src/config/db.js'
import Addon from '../src/models/Addon.js'

const addonTitles = [
  'Address Book',
  'Auto Mailing',
  'Auto Receipt Voucher From Sales',
  'Below Purchase Rate Blocking In Sales Voucher',
  'Bulk Expense Posting',
  'Cost Centre Wise Outstanding Filtration',
  'Credit Days Blocking with Approval',
  'Dashboard Report',
  'Daybook Total and Selected Line Total',
  'Envelope Printing',
  'Fast and Slow Moving Items',
  'Godown Wise Re-Order Level',
  'GST Bill Control',
  'Item STD Cost & Selling Rate Update From Purchase Voucher',
  'Item Wise Budget Analysis',
  'Item Wise Margin Set',
  'Item Wise Profit View in Sales',
  'Multiple Rack Setting',
  'Recycle Bin in Tally',
  'Salesman Module',
  'Sales & Purchase Excel Import for Tax Practitioner',
  'IMEI Number Tracking',
  'System Date as Current Date',
  'SMS Integration for Tally',
]

const slugify = (value) => value
  .toLowerCase()
  .replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '')

await connectDB()
await Addon.bulkWrite(addonTitles.map((title, index) => ({
  updateOne: {
    filter: { slug: slugify(title) },
    update: {
      $set: {
        title,
        subtitle: 'TallyPrime customization',
        points: [],
        displayOrder: index + 1,
        isActive: true,
      },
    },
    upsert: true,
  },
})))

console.log(`${addonTitles.length} TallyPrime customizations added successfully`)
process.exit(0)
