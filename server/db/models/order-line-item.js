const db = require('../db')
const Sequelize = require('sequelize')

//This is our order route
const OrderLineItem = db.define('orderLineItem', {
    quantity: {
        type: Sequelize.INTEGER
    }
})

//salePrice is separate from product price and can be decided on the front end.

module.exports = OrderLineItem
