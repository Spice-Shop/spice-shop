const router = require('express').Router()
const {
  User
} = require('../db/models')
const OrderLineItem = require('../db/models/order-line-item')
const Product = require('../db/models/product')
module.exports = router

router.get('/', (req, res, next) => {
  if (req.user.isAdmin) {
    User.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email']
      })
      .then(users => res.json(users))
      .catch(next)
  } else {
    res.status(403).send('Sorry you do not have permission to view this page')
  }
})

router.get('/:userId/cart', (req, res, next) => {
  let userId = req.params.userId
  if (Number(userId) === req.user.id) {
    User.getCart(userId)
      .then(returnedCartLineItems => {
        if (!returnedCartLineItems.length) {
          res.send('There are no items in this cart')
        } else {
          res.json(returnedCartLineItems)
        }
      })
      .catch(next)
  } else {
    res.status(403).send('Sorry you do not have permission to view this page')
  }
})

// Update Line Item quantity & subtotal
router.put('/:userId/cart', (req, res, next) => {
  let productId = req.body.productId
  let quantity = req.body.quantity
  let orderId = req.body.orderId
  let userId = req.params.userId

  if (Number(userId) === req.user.id) {
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
  } else {
    res.status(403).send('Sorry you do not have permission to update this')  
  }
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
