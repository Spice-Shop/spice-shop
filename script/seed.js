const db = require('../server/db');
const Product = require('../server/db/models/product');
const User = require('../server/db/models/user');

//list of products to seed
const products = [{
  "name": "Oregano",
  "imgUrl": "oregano.jpg",
  "description": "great for pizza",
  "rating": "5",
}, {
  "name": "Tumeric",
  "imgUrl": "oregano.jpg",
  "description": "great for superpowers",
  "rating": "5",
}, {
  "name": "Pepper",
  "imgUrl": "oregano.jpg",
  "description": "can\'t live without it",
  "rating": "5",
}, {
  "name": "Curry",
  "imgUrl": "oregano.jpg",
  "description": "I can\t live without it",
  "rating": "5",
}];

const users = [{
  "email": 'cody@email.com',
  "password": '123'
}, {
  "email": 'murphy@email.com',
  "password": '123'
}]

//create each seed file
const seed = () =>
  Promise.all(products.map(product =>
    Product.create(product))
  )
    .then(() =>
      Promise.all(users.map(user =>
        User.create(user))
      )
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