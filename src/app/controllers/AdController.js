const Ad = require('../models/Ad')

class AdController {
  async index (req, res) {
    const filters = {
      purchasedBy: null
    }

    if (req.params.price_min || req.params.price_max) {
      filters.price = {}

      if (req.params.price_min) {
        filters.price.$gte = req.params.price_min
      }

      if (req.params.price_max) {
        filters.price.$lte = req.params.price_max
      }

      if (req.query.title) {
        filters.title = new RegExp(req.query.title, 'i')
      }
    }
    const ads = await Ad.paginate(
      { filters },
      {
        page: req.params.page || 1,
        limit: 20,
        populate: ['author'],
        sort: '-createdAt'
      }
    )

    return res.json(ads)
  }
  async show (req, res) {
    const ad = await Ad.findById(req.params.id)

    return res.json(ad)
  }
  async store (req, res) {
    const ad = await Ad.create({ ...req.body, author: req.userId })

    return res.json(ad)
  }
  async update (req, res) {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    return res.json(ad)
  }
  async destroy (req, res) {
    await Ad.findByIdAndDelete(req.params.id)
    return res.send()
  }
}

module.exports = new AdController()
