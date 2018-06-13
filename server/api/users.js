const router = require('express').Router()
const {
  User
} = require('../db/models')
const OrderLineItem = require('../db/models/order-line-item')
const Order = require('../db/models/order')
const Product = require('../db/models/product')
module.exports = router

router.get('/', (req, res, next) => {
  if (req.user.isAdmin) {
    User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin']
    })
      .then(users => res.json(users))
      .catch(next)
  } else {
    res.status(403).send('Sorry you do not have permission to view this page')
  }
})

router.get('/:userId/cart', (req, res, next) => {
  let userId = req.user.id
  if (userId) {
    User.getCart(userId)
      .then(returnedCartLineItems => {
        if (!returnedCartLineItems.length) {
          res.send([])
        } else {
          res.json(returnedCartLineItems)
        }
      })
      .catch(next)
  } else {
    res.status(403).send('Sorry you do not have permission to view this page')
  }
})

// Create Line Item 
router.post('/cart', (req, res, next) => {
  let productId = req.body.productId
  let quantity = 1
  let userId = req.user.id

  if (userId) {
    Order.findOrCreate({
      where: {
        orderPlaced: false,
        userId
      }
    })
      .then(result => {
        let orderId = result[0].id
        return Product.findById(productId)
          .then(foundProduct => {
            return foundProduct.price
          })
          .then(productPrice => {
            let price = productPrice
            return OrderLineItem.findOrCreate({
              where: {
                orderId,
                productId
              }
            }
            )
              .then(item => {
                let quantity = item[0].dataValues.quantity + 1
                return item[0].update({
                  quantity,
                  subtotal: quantity * price
                })
              })
              .then(createdLineItem => res.json(createdLineItem))
          })
          .catch(next)
      })
  }
  else {
    res.status(403).send('Sorry you do not have permission to update this')
  }
})

router.get('/:userId/order-history', (req, res, next) => {
  let userId = req.params.userId
  if (Number(userId) === req.user.id) {
    User.findOrderHistoryByUserId(userId)
      .then(returnedOrderHistory => {
        if (!returnedOrderHistory.length) {
          res.send('There are no past orders to display')
        } else {
          res.json(returnedOrderHistory)
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
  let userId = req.user.id

  if (userId) {
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

//Place order route
router.put('/:userId/placeOrder', (req, res, next) => {
  let userId = req.user.id;
  let total;

  if (userId) {
    return User.findOrderByUserId(userId)
      .then(foundOrder => {
        return OrderLineItem.findAll({
          where: {
            orderId: foundOrder.id
          }
        })
      })
      .then(returnedLineItems => {
        let subtotals = [];
        returnedLineItems.forEach(lineItem => subtotals.push(lineItem.dataValues.subtotal))

        total = subtotals.reduce((acc, cv) => acc + cv)
      })
      .then(() => {
        return User.findOrderByUserId(userId)
      })
      .then(foundOrder => {
        return foundOrder.update({
          total,
          orderPlaced: true
        })
      })
      .then(res.sendStatus(204))
      .catch(next)
  } else {
    res.status(403).send('Sorry you do not have permission to place this order')
  }
})
