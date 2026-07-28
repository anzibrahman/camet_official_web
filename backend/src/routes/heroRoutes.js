import express from 'express'
import { getHeroBanner, createOrUpdateHeroBanner } from '../controllers/heroController.js'


const router = express.Router()

router.get('/hero-banner', getHeroBanner)
router.post('/hero-banner', createOrUpdateHeroBanner)

export default router