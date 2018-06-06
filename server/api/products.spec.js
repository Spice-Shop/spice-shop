/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/products', () => {

    beforeEach('Create product', () => {
      return Product.create({
        name: 'paprika',
        imgUrl: 'fake/url',
        description: 'this is our description',
        rating: 5
    })
    })

    it('GET /products', () => {
      return request(app)
        .get('/products')
        .expect(200)
        .then(res => {
            console.log(res.body)
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal('paprika')
          expect(res.body[1].imgUrl).to.be.equal('fake/url')
          expect(res.body[2].description).to.be.equal('this is our description')
          expect(res.body[3].rating).to.be.equal(5)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
