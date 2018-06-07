const router = require('express').Router()
const { OrderLineItem } = require('../db/models')

//Order Line Items Route
router.get('/:id', (req, res, next) => {

    OrderLineItem.findAll({
        where: {
            orderId: req.params.id
        }
    })
        .then(lineItems => res.json(lineItems))
        .catch(next)
})

//Creat New Line Item Route
router.post('/', (req, res, next) => {
    OrderLineItem.create(req.body)
        .then(lineItem => res.status(201).json(lineItem))
        .catch(next)
})

//Update Product Route
router.put('/:lineItemId', (req, res, next) => {
    const lineItemId = req.params.lineItemId;
    OrderLineItem.findById(lineItemId)
    .then(lineItem => {
        lineItem
        .update(req.body)
        .then(updatedItem => res.json(updatedItem))
        .catch(next)
    })
})



module.exports = router
