import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import heroRoutes from './routes/heroRoutes.js'
import contactRoutes from './routes/contact.js' // Add this import
import productRoutes from './routes/productRoutes.js'
import contentRoutes from './routes/contentRoutes.js'
import mediaRoutes from './routes/mediaRoutes.js'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', heroRoutes)
app.use('/api', contactRoutes)
app.use('/api', productRoutes) // Add this line to register product routes
app.use('/api', contentRoutes)
app.use('/api', mediaRoutes)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('env', process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {
  console.log(process.env.NODE_ENV)
  console.log('hai')

  const parentDir = path.join(__dirname, '..', '..')
  console.log('hello', parentDir)

  app.use(express.static(path.join(parentDir, 'frontend', 'dist')))

  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(parentDir, 'frontend', 'dist', 'index.html'))
  })
} else {
  console.log(process.env.NODE_ENV)

  app.get('/', (req, res) => {
    res.send('Server is Ready')
  })
}

export default app
