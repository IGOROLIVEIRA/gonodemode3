const Ad = require('../models/Ad')
const User = require('../models/User')
const PurchaseMail = require('../jobs/PurchaseMail')
const Purchase = require('../models/Purchase')
const Queue = require('../services/Queue')

class PurchasesController {
  async store (req, res) {
    const { ad, content } = req.body
    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    // envia email com a intenção de compra
    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    const purchase = await Purchase.create({ ...req.body, buyer: req.userId })

    return res.json(purchase)
  }
}

module.exports = new PurchasesController()
