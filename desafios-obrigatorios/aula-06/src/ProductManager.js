const fs = require('fs')

class ProductManager {
  #path

  constructor(path) {
    this.#path = path
  }

  async #readFile() {
    const fileContent = await fs.promises.readFile(this.#path, 'utf-8')
    return JSON.parse(fileContent)
  }

  async getProducts() {
    const products = await this.#readFile()
    return products
  }
}

module.exports = ProductManager
