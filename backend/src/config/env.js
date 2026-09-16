import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'

// PM2 may start the app outside backend/. Resolve settings relative to this
// module instead of process.cwd(), while preserving host-provided variables.
dotenv.config({
  path: fileURLToPath(new URL('../../.env', import.meta.url)),
  quiet: true,
})
