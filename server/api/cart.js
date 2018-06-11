const router = require('express').Router()
const { Order, OrderLineItem } = require('../db/models')

//Get all Order line items Route
router.get('/orders/:userId', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId,
      orderPlaced: false
  }})
    .then(returnedOrder => res.json(returnedOrder))
    .catch(next)
}) //A refactor is required via model method

router.get('/:orderId', (req, res, next) => {
  OrderLineItem.findAll({
    where: {
      orderId: req.params.orderId
  }})
    .then(returnedOrderLineItems => res.json(returnedOrderLineItems))
    .catch(next)
})


module.exports = router