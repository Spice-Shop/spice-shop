/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const User = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('Product schema', () => {
    describe('Product model', () => {
      xit('has a name field', () => {
        expect(Product.attributes.name).to.be.an('object')
      })

    })
  })
})