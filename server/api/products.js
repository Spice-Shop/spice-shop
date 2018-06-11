const router = require('express').Router()
const { Product } = require('../db/models')

//route to find single product by ID
// router.param('productId', (req, res, next, id) => {
//   Product.findById(id)
//     .then(product => {
//       if (!product) {
//         const err = Error('Product not found')
//         err.status = 404
//         throw err
//       }
//       req.product = product
//       next()
//     })
//     .catch(next)
// })

//All Products Route
router.get('/', (req, res, next) => {
  Product.findAll({})
    .then(products => res.json(products))
    .catch(next)
})

//Creat New Product Route

//CG: need security plz....
router.post('/', (req, res, next) => {
  Product.create(req.body) //CG: this is dangerous
    .then(product => res.status(201).json(product))
    .catch(next)
})

//Get Single Product Route
router.get('/:productId', (req, res, next) => {
  let product = req.params.productId;

  Product.findById(product)
    .then(product => res.json(product))
    .catch(next);
})

//Update Single Product Route
router.put('/:productId', (req, res, next) => {
  let product = req.params.productId;

  Product.findById(product)
    .then(foundProduct => foundProduct.update(req.body)) //CG: this is dangerous
    .then(updatedProduct => res.json(updatedProduct))
    .catch(next)
})

//Delete Single Product Route
router.delete('/:productId', (req, res, next) => {
  let product = req.params.productId;

  Product.findById(product)
    .then(foundProduct => foundProduct.destroy())
    .then(res.status(204))
    .catch(next)
})

module.exports = router
