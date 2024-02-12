const ProductsManager = require('../ProductsManager')

const productsManager = new ProductsManager('src/data/products.json')

const getAll = async (req, res) => {
  const { limit } = req.query
  try {
    const products = await productsManager.getProducts()

    return res.status(200).json({
      data: products.slice(0, limit)
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const getById = async (req, res) => {
  const { pid } = req.params
  try {
    const product = await productsManager.getProductById(pid)
    if (product) {
      return res.status(200).json({
        data: product
      })
    }
    return res.status(404).json({
      message: 'Product not found'
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const create = async (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body
  try {
    const product = await productsManager
      .addProduct({ title, description, code, price, status, stock, category, thumbnails })

    return res.status(200).json({
      message: 'Product created successfully',
      data: product
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const update = async (req, res) => {
  const { pid } = req.params
  const data = req.body
  try {
    const product = await productsManager.updateProduct(pid, data)
    if (product) {
      return res.status(200).json({
        data: product
      })
    }
    return res.status(404).json({
      message: 'Product not found'
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const remove = async (req, res) => {
  const { pid } = req.params
  try {
    const product = await productsManager.deleteProduct(pid)
    if (product) {
      return res.status(200).json({
        message: 'Product deleted successfully'
      })
    }
    return res.status(404).json({
      message: 'Product not found'
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
}
