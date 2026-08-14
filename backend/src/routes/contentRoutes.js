import express from 'express'
import Solution from '../models/Solution.js'
import Addon from '../models/Addon.js'
import GalleryItem from '../models/GalleryItem.js'
import Review from '../models/Review.js'
import { createContentController } from '../controllers/contentController.js'

const router = express.Router()
const resources = [
  ['solutions', Solution, 'Solution', true],
  ['addons', Addon, 'Add-on', true],
  ['gallery', GalleryItem, 'Gallery item', false],
  ['reviews', Review, 'Review', false],
]

resources.forEach(([path, Model, name, hasSlug]) => {
  const controller = createContentController(Model, name)
  router.get(`/${path}`, controller.listPublic)
  router.get(`/admin/${path}`, controller.listAdmin)
  if (hasSlug) router.get(`/${path}/:slug`, controller.getPublic)
  router.post(`/${path}`, controller.create)
  router.put(`/${path}/:id`, controller.update)
  router.delete(`/${path}/:id`, controller.remove)
})

export default router
