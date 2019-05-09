const express = require('express')
const routes = express.Router()
const authMiddlware = require('./app/middlewares/auth')
const controllers = require('./app/controllers')
const validate = require('express-validation')
const validators = require('./app/validators')
const handle = require('express-async-handler')

routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

routes.use(authMiddlware)

/**
 *  Ads
 */

routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
)
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * Purchases
 */
routes.post(
  '/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchasesController.store)
)
routes.post('/approved/:id', handle(controllers.ApprovedController.approved))
module.exports = routes
