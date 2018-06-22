const router = require('express').Router()
const { Product } = require('../db/models')

//All Products Route
router.get('/', (req, res, next) => {
  Product.findAll({})
    .then(products => res.json(products))
    .catch(next)
})

//Creat New Product Route
router.post('/', (req, res, next) => {
    if (req.user.isAdmin) {
    Product.create(req.body)
      .then(product => res.status(201).json(product))
      .catch(next)
  } else {
    res.status(403).send('Sorry you do not have permission to access this')
  }
})

//Get Single Product Route
router.get('/:productId', (req, res, next) => {
  let product = req.params.productId;
  Product.findById(product)
    .then(product => res.json(product))
    .catch(next)
})

//Update Single Product Route
router.put('/:productId', (req, res, next) => {
  let product = req.params.productId;
  if (req.user.isAdmin) {
    Product.findById(product)
      .then(foundProduct => foundProduct.update(req.body))
      .then(updatedProduct => res.json(updatedProduct))
      .catch(next)
  } else {
    res.status(403).send('Sorry you do not have permission to edit this')
  }
})

//Delete Single Product Route
router.delete('/:productId', (req, res, next) => {
  let product = req.params.productId;
  if (req.user.isAdmin){
  Product.findById(product)
    .then(foundProduct => foundProduct.destroy())
    .then(res.sendStatus(204))
    .catch(next)
  }
})

module.exports = router
