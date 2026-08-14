import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import vm from 'vm'
import { fileURLToPath } from 'url'
import connectDB from '../src/config/db.js'
import Solution from '../src/models/Solution.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sourcePath = path.resolve(__dirname, '../../frontend/src/data/solutions.js')

// This imports the existing frontend data without copying it by hand. Icons are
// stored as their component names, which is what the API returns to the frontend.
const source = fs.readFileSync(sourcePath, 'utf8')
const arrayText = source.match(/export const solutions = (\[[\s\S]*\])\s*$/)?.[1]
if (!arrayText) throw new Error('Could not read the solutions array from the frontend')
const executable = `solutions = ${arrayText.replace(/icon:\s*([A-Za-z0-9_]+)/g, "icon: '$1'")}`
const context = {}
vm.createContext(context)
vm.runInContext(executable, context)

await connectDB()
const records = context.solutions.filter((solution) => solution.slug !== 'all-solutions')
await Promise.all(records.map(({ _id, ...solution }) => Solution.findOneAndUpdate(
  { slug: solution.slug },
  solution,
  { upsert: true, new: true, runValidators: true }
)))
console.log(`${records.length} solutions seeded successfully`)
process.exit(0)
