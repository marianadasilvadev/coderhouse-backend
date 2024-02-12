const fs = require('fs')

class ProductsManager {
  #path
  #id = 0

  constructor(path) {
    this.#path = path
  }

  async #readPathFile() {
    const products = await fs.promises.readFile(this.#path, 'utf-8')
    const result = JSON.parse(products)
    return result
  }

  async #savePathFile(products) {
    await fs.promises.writeFile(this.#path, JSON.stringify(products))
  }

  async #setId() {
    const products = await this.#readPathFile()
    let maxId = -Infinity
    products.forEach(product => {
      if (product.id > maxId)
        maxId = product.id
    })
    this.#id = maxId
  }

  async addProduct({ title, description, code, price, status = true, stock, category, thumbnails }) {
    const products = await this.#readPathFile()
    const isCodeRepeated = products.find(p => p.code === code)

    if (isCodeRepeated) {
      throw Error('There is already a product with the code provided.')
    }

    const isProductValid = this.#isProductValid(
      title, description, code, price, stock, category)

    if (!isProductValid) {
      throw Error('Product with empty fields.')
    }

    await this.#setId()

    const product = {
      id: ++this.#id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    }

    products.push(product)

    await this.#savePathFile(products)

    return product
  }

  async getProductById(id) {
    const products = await this.#readPathFile()
    const product = products.find(p => p.id === +id)

    return product
  }

  async getProducts() {
    const products = await this.#readPathFile()
    return products
  }

  async updateProduct(id, data = {}) {
    const products = await this.#readPathFile()
    const product = products.find(p => p.id === +id)

    let updatedProduct = undefined

    if (product) {
      const updatedProducts = products.filter(p => p.id !== +id)
      updatedProduct = {
        id,
        ...product,
        ...data
      }
      updatedProducts.push(updatedProduct)

      this.#savePathFile(updatedProducts)
    }

    return updatedProduct
  }

  async deleteProduct(id) {
    const products = await this.#readPathFile()
    const product = products.find(p => p.id === +id)
    const newProducts = products.filter(p => p.id !== +id)

    this.#savePathFile(newProducts)

    return newProducts ? product : undefined
  }

  #isProductValid(
    title, description, code, price = 0, stock, category
  ) {
    if (
      !title || title.trim() === '' ||
      !description || description.trim() === '' ||
      !category || category.trim() === '' ||
      !code || code.trim() === '') return false

    if (
      !price || price === 0 ||
      !code || code === 0 ||
      !stock || stock === 0
    ) return false

    return true
  }
}

module.exports = ProductsManager
