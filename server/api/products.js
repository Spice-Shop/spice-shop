const router = require('express').Router()
const { Product } = require('../db/models')

//route to find single product by ID
router.param('productId', (req, res, next, id) => {
  Product.findById(id)
    .then(product => {
      if (!product) {
        const err = Error('Product not found')
        err.status = 404
        throw err
      }
      req.product = product
      next()
    })
    .catch(next)
})

//All Products Route
router.get('/', (req, res, next) => {
  Product.findAll({})
    .then(products => res.json(products))
    .catch(next)
})

//Creat New Product Route
router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next)
})

//Update Product Route
router.put('/:productId', (req, res, next) => {
  req.product
    .update(req.body)
    .then(product => res.json(product))
    .catch(next)
})

router.delete('/:productId', (req, res, next) => {
  req.product
    .destroy()
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
