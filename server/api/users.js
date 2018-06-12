const router = require('express').Router()
const {User} = require('../db/models')
const OrderLineItem = require('../db/models/')
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

router.put('/:userId/cart', (req, res, next) => {
  console.log(req.body)
  // let productId = req.body.productId
  // let quantity = req.body.quantity
  // let orderId = req.body.orderId

  // OrderLineItem.update({
  //   quantity
  // }, {
  //   where: {productId, orderId},
  //   returning: true, // needed for affectedRows to be populated
  //   plain: true // makes sure that the returned instances are just plain objects
  // })
})
