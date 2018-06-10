const db = require('../server/db/models');
const Product = require('../server/db/models/product');

//list of products to seed
const products = [{
    "name": "Oregano",
    "imgUrl": "oregano.jpg",
    "description": "great for pizza",
    "price": "1.00",
    "rating": "5",
  }, {
    "name": "Tumeric",
    "imgUrl": "oregano.jpg",
    "description": "great for superpowers",
    "price": "3.00",
    "rating": "5",
  }, {
    "name": "Pepper",
    "imgUrl": "oregano.jpg",
    "description": "can\'t live without it",
    "price": "1.00",
    "rating": "5",
  }, {
    "name": "Curry",
    "imgUrl": "oregano.jpg",
    "description": "I can\t live without it",
    "price": "4.00",
    "rating": "5",
  }];

//create each seed file
const seed = () =>
  Promise.all(products.map(product =>
    Product.create(product))
  )

//db force true, run seed function, close db
const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding database...');
      return seed();
    })
    .then(() => {
      db.close();
    })
    .catch(err => {
        console.log('Error while seeding');
        console.log(err.stack);
      })
};

//invoke main to start seeding process
main();