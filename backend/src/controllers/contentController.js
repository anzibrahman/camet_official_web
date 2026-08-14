const sortContent = { displayOrder: 1, createdAt: -1 }

const handleError = (res, error) => {
  const status = error.name === 'ValidationError' || error.code === 11000 ? 400 : 500
  return res.status(status).json({ success: false, message: error.code === 11000 ? 'A record with this slug already exists' : error.message })
}

export const createContentController = (Model, name) => ({
  listPublic: async (req, res) => {
    try { res.json({ success: true, data: await Model.find({ isActive: true }).sort(sortContent) }) }
    catch (error) { handleError(res, error) }
  },
  listAdmin: async (req, res) => {
    try { res.json({ success: true, data: await Model.find().sort(sortContent) }) }
    catch (error) { handleError(res, error) }
  },
  getPublic: async (req, res) => {
    try {
      const item = await Model.findOne({ slug: req.params.slug, isActive: true })
      if (!item) return res.status(404).json({ success: false, message: `${name} not found` })
      res.json({ success: true, data: item })
    } catch (error) { handleError(res, error) }
  },
  create: async (req, res) => {
    try { res.status(201).json({ success: true, data: await Model.create(req.body) }) }
    catch (error) { handleError(res, error) }
  },
  update: async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      if (!item) return res.status(404).json({ success: false, message: `${name} not found` })
      res.json({ success: true, data: item })
    } catch (error) { handleError(res, error) }
  },
  remove: async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id)
      if (!item) return res.status(404).json({ success: false, message: `${name} not found` })
      res.json({ success: true, message: `${name} deleted successfully` })
    } catch (error) { handleError(res, error) }
  },
})
