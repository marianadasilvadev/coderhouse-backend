const fs = require('fs')

class ProductsManager {
  #path = ''

  constructor(path) {
    this.#path = path
  }

  async #readFile() {
    try {
      const content = await fs.promises.readFile(this.#path, 'utf-8')
      return JSON.parse(content)
    } catch (error) {
      return []
    }
  }

  async #writeFile(products) {
    await fs.promises.writeFile(this.#path, JSON.stringify(products))
  }

  async #syncLastId() {
    const products = await this.#readFile()
    return products.length + 1
  }

  async create({ name, description, price }) {
    const products = await this.#readFile()

    if (!this.#isProductValid({ name, description, price })) throw 'Failed creating product'

    const lastId = await this.#syncLastId()

    const product = {
      id: lastId + 1,
      name,
      description,
      price: +price
    }

    await this.#writeFile([...products, product])

    return product
  }

  async getAll() {
    const products = await this.#readFile()
    return products
  }

  async delete(id) {
    const products = await this.#readFile()
    const newProducts = products.filter(p => p.id !== +id)

    await this.#writeFile([...newProducts])
  }

  #isProductValid({ name, description, price }) {
    if (name === '' || description === '' || price === '') return false
    return true
  }
}

module.exports = ProductsManager
