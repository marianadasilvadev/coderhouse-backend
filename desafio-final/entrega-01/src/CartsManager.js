const fs = require('fs')

const ProductsManager = require('./ProductsManager')

const productsManager = new ProductsManager('src/data/products.json')

class CartsManager {
  #path
  #id = 0

  constructor(path) {
    this.#path = path
  }

  async #readPathFile() {
    const carts = await fs.promises.readFile(this.#path, 'utf-8')
    const result = JSON.parse(carts)
    return result
  }

  async #savePathFile(carts) {
    await fs.promises.writeFile(this.#path, JSON.stringify(carts))
  }

  async getCarts() {
    const carts = await this.#readPathFile()
    return carts
  }

  async #setId() {
    const carts = await this.#readPathFile()
    let maxId = -Infinity
    carts.forEach(cart => {
      if (cart.id > maxId)
        maxId = cart.id
    })
    this.#id = maxId
  }

  async addCart({ products }) {
    const carts = await this.#readPathFile()

    const isCartValid = await this.#isCartValid(products)

    if (!isCartValid) {
      throw Error('Product listed not found')
    }

    await this.#setId()

    const cart = {
      id: ++this.#id,
      products
    }

    carts.push(cart)

    await this.#savePathFile(carts)

    return cart
  }

  async getCartById(id) {
    const carts = await this.#readPathFile()
    const cart = carts.find(c => c.id === +id)

    return cart
  }

  async postProductIntoCart(id, productId) {
    const carts = await this.getCarts()
    const foundCart = carts.find(c => c.id === +id)

    if (!foundCart) {
      return undefined
    }

    const cart = await this.getCartById(+id)

    const isCartValid = await this.#isCartValid([{ id: +productId }])

    if (!isCartValid) {
      throw Error('Product listed not found')
    }

    await this.#setId()

    const updatedCart = {
      id: cart.id,
      products: cart.products.map(p => {
        if (p.id === +productId)
          return { ...p, quantity: p.quantity + 1 }
        return p
      })
    }

    await this.updateCart(+id, updatedCart)

    return updatedCart
  }

  async updateCart(id, data = {}) {
    const carts = await this.#readPathFile()
    const cart = carts.find(p => p.id === id)

    let updatedCart = undefined

    if (cart) {
      const updatedCarts = carts.filter(p => p.id !== id)
      updatedCart = {
        id,
        ...cart,
        ...data
      }
      updatedCarts.push(updatedCart)

      this.#savePathFile(updatedCarts)
    }

    return updatedCart
  }

  async #isCartValid(products) {
    const savedProducts = await productsManager.getProducts()

    for (let product of products) {
      const foundProduct = savedProducts.find(p => p.id === product.id)

      if (!foundProduct) {
        return false
      }
    }

    return true
  }
}

module.exports = CartsManager
