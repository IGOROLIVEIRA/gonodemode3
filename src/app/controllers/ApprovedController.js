const Purchase = require('../models/Purchase')
const Ad = require('../models/Ad')

class ApprovedController {
  async approved (req, res) {
    const { id } = req.params
    const purchase = await Purchase.findById(id).populate('ad')

    if (!purchase.ad.author.equals(req.userId)) {
      return res.status(400).json({ error: `You're not the ad author` })
    }
    if (purchase.ad.purchasead) {
      return res
        .status(400)
        .json({ error: `This ad has already been purchased` })
    }
    const ad = await Ad.findById(purchase.ad._id)
    ad.purchasedBy = id
    ad.save()
    return res.json(ad)
  }
}

module.exports = new ApprovedController()
