const db = require('../db');
const Sequelize = require('sequelize');

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
    }
})