const router = require('express').Router()
const {Product} = require('../db/models')

//All Products Route
router.get('/', (req, res, next) => {
  Product.findAll({})
    .then(products => res.json(products))
    .catch(next)
})

//Product by Name route
router.get('/:name', (req, res, next) => {
  const name = req.params.name;

  Product.findByName(name)
  .then((products) => {
    res.json(products)
  })
  .catch(next)
})

//Started product category route
// router.get('/category/:category', (req, res, next) => {
//   const category = req.params.category;

//   Product.findByCategory(category)
//   .then((products) => {
//     res.json(products)
//   })
//   .catch(next)
// })

module.exports = router
