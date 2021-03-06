'use strict'

const db = require('../server/db')
const { User, Product, Order, OrderLineItem } = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  //FIRST USER NOW ADMIN
  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123', isAdmin: true }),
    User.create({ email: 'murphy@email.com', password: '123' })
  ])
  const products = await Promise.all([
    Product.create({
      name: 'Oregano',
      description: 'great for pizza',
      imgUrl:
        'https://cdn.shopify.com/s/files/1/0156/0137/products/refill_0020_oregano.jpg?v=1522849769',
      rating: 3,
      price: 1.0,
      originCategory: 'Italy'
    }),
    Product.create({
      name: 'Turmeric',
      description: 'heals what ails you',
      imgUrl:
        'https://www.hiltonherbs.com/image/cache/data/STRAIGHT%20HERBS/Curcuma-600x600.jpg',
      rating: 4,
      price: 4.0,
      originCategory: 'India'
    }),
    Product.create({
      name: 'Pepper',
      description: "can't live without it",
      imgUrl:
        'https://static.thespicehouse.com/images/image/40/large_pepper.JPG',
      rating: 5,
      price: 2.0,
      originCategory: 'Vietnam'
    }),
    Product.create({
      name: 'Curry',
      description: 'will curry your favor',
      imgUrl:
        'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/spice_rack_herbs_slideshow/getty_rf_photo_of_variety_of_spices_in_bowls.jpg',
      rating: 5,
      price: 3.0,
      originCategory: 'Vietnam'
    })
  ])
  const orders = await Promise.all([
    Order.create({ id: 1, total: 3, orderPlaced: true, userId: 1 }),
    Order.create({ id: 2, total: 2, orderPlaced: true, userId: 1 })
  ])
  const orderLineItems = await Promise.all([
    OrderLineItem.create({
      quantity: 3,
      subTotal: 15,
      orderId: 1,
      productId: 2
    }),
    OrderLineItem.create({
      quantity: 5,
      subTotal: 10,
      orderId: 1,
      productId: 1
    }),
    OrderLineItem.create({
      quantity: 6,
      subTotal: 12,
      orderId: 2,
      productId: 3
    })
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${orderLineItems.length} order line items`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  seed()
    .catch(err => {
      console.error(err)
      process.exitCode = 1
    })
    .finally(() => {
      // `finally` is like then + catch. It runs no matter what.
      console.log('closing db connection')
      db.close()
      console.log('db connection closed')
    })
  /*
   * note: everything outside of the async function is totally synchronous
   * The console.log below will occur before any of the logs that occur inside
   * of the async function
   */
  console.log('seeding...')
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
