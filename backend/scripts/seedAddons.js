import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import vm from 'vm'
import { fileURLToPath } from 'url'
import connectDB from '../src/config/db.js'
import Addon from '../src/models/Addon.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const source = fs.readFileSync(path.resolve(__dirname, '../../frontend/src/pages/TallyAddonsPage.jsx'), 'utf8')
const arrayText = source.match(/const tallyAddonsSlides = (\[[\s\S]*?\])\s*\n\s*function/)?.[1]
if (!arrayText) throw new Error('Could not read the add-ons data from the frontend')

const context = {}
vm.createContext(context)
vm.runInContext(`addons = ${arrayText}`, context)
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

await connectDB()
await Promise.all(context.addons.map((addon, index) => Addon.findOneAndUpdate(
  { slug: slugify(addon.title) },
  { ...addon, slug: slugify(addon.title), displayOrder: index, isActive: true },
  { upsert: true, new: true, runValidators: true }
)))
console.log(`${context.addons.length} add-ons seeded successfully`)
process.exit(0)
