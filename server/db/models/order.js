const db = require('../db')
const Sequelize = require('sequelize')

//This is our order route
const Order = db.define('order', {
    total: {
        type: Sequelize.FLOAT //Update this to reflect actual order total
    },
    orderPlaced: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})
module.exports = Order
