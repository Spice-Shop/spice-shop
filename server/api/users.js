const router = require('express').Router()
const {
  User
} = require('../db/models')
const OrderLineItem = require('../db/models/order-line-item')
const Product = require('../db/models/product')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:userId/cart', (req, res, next) => {
  let userId = req.params.userId

  User.getCart(userId)
    .then(returnedCartLineItems => {
      res.json(returnedCartLineItems)
    })
    .catch(next)
})

// Update Line Item quantity & subtotal
router.put('/:userId/cart', (req, res, next) => {
  let productId = req.body.productId
  let quantity = req.body.quantity
  let orderId = req.body.orderId

  Product.findById(productId)
    .then(foundProduct => {
      return foundProduct.price * quantity
    })
    .then(subtotal => {
      OrderLineItem.update({
        quantity,
        subtotal
      }, {
        where: {
          productId,
          orderId
        },
        returning: true
      })
    })
    .then(updatedLineItem => res.json(updatedLineItem))
    .catch(next)
})

router.put('/:userId/placeOrder', (req, res, next) => {
  let userId = req.params.userId;
  User.findByUserId(userId)
  .then(foundOrder => {
    return foundOrder.update({
      orderPlaced: true
    })
  })
  .then(res.status(204))
})
