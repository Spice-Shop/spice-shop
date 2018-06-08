const db = require('../db')
const Sequelize = require('sequelize')

//This is our product route
const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  imgUrl: { //CG: validate as a url. defaultValue
    type: Sequelize.STRING,
    defaultValue: 'https://www.organicfacts.net/wp-content/uploads/2013/08/Spices.jpg',
    validate: {
      isUrl: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  rating: {
    type: Sequelize.INTEGER,
    min: 1,
    max: 5
  },
  heatLevel: {
    type: Sequelize.ENUM('mild', 'medium', 'hot')
  }, // an infinite amount...this is great.
    //if therea are exactly 3-10 categories we can use an ENUM
    //if we want control over our infinite amount of categories we can use another model 
    /*
    Category Ideas
    -Heat
    -Cuisuine
    */
  price: {
    type: Sequelize.INTEGER
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
