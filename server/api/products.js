const router = require('express').Router()
const {Product} = require('../db/models')

//route to find single product by ID
router.param('productId', (req, res, next, id) => {
  Product.findById(id)
  .then(product => {
    if (!product) {
      const err = Error('Product not found');
      err.status = 404;
      throw err
    }
    req.product = product;
    next();
    return null;
  })
  .catch(next);
});

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
