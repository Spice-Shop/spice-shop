const db = require('../db')
const Sequelize = require('sequelize')

//This is our product route
const Product = db.define('product', {
  name: {
    type: Sequelize.STRING
  },
  imgUrl: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  rating: {
    type: Sequelize.INTEGER,
    min: 1,
    max: 5
  },
  originCategory: {
    type: Sequelize.STRING
  }
})

Product.findByName = function(name) {
  return Product.findAll({
    where: {
      name
    }
  })
}

//Started Category instance method
// Product.findByCategory = function (category) {
//     return Product.findAll({
//         where: {
//             category
//         }
//     })
// }

module.exports = Product
