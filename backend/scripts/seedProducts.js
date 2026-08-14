import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import vm from 'vm'
import { fileURLToPath } from 'url'
import connectDB from '../src/config/db.js'
import Product from '../src/models/Product.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sourcePath = path.resolve(__dirname, '../../frontend/src/data/Product.jsx')
const source = fs.readFileSync(sourcePath, 'utf8')
const arrayText = source.match(/export const products = (\[[\s\S]*?\])\s*\n\s*export const productSections/)?.[1]
if (!arrayText) throw new Error('Could not read the products array from the frontend')

const context = {}
vm.createContext(context)
vm.runInContext(`products = ${arrayText.replace(/icon:\s*([A-Za-z0-9_]+)/g, "icon: '$1'")}`, context)

await connectDB()
await Promise.all(context.products.map((product) => Product.findOneAndUpdate(
  { slug: product.slug }, product, { upsert: true, new: true, runValidators: true }
)))
console.log(`${context.products.length} products seeded successfully`)
process.exit(0)
