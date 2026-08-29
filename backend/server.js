import 'dotenv/config'
import app from './src/app.js'
import connectDB from './src/config/db.js'
import dns from "dns"
const PORT = process.env.PORT || 5000


dns.setServers(["8.8.8.8", "8.8.4.4"]);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})