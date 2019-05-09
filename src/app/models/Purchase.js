const mongoose = require('mongoose')

const mongoosePaginate = require('mongoose-paginate')

const Purchase = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  ad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad',
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
Purchase.plugin(mongoosePaginate)
module.exports = mongoose.model('Purchase', Purchase)
