/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('Product schema', () => {
    describe('Product model', () => {
      it('has a name field', () => {
        expect(Product.attributes.name).to.be.an('object')
      })
      it('has a imgUrl field', () => {
        expect(Product.attributes.imgUrl).to.be.an('object')
      })
      it('has a description field', () => {
        expect(Product.attributes.description).to.be.an('object')
      })
      it('has a rating field', () => {
        expect(Product.attributes.rating).to.be.an('object')
      })
    })
  })
})