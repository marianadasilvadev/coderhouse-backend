const ProductsManager = require('../ProductsManager')

const productsManager = new ProductsManager('src/data/products.json')

const createProduct = async (req, res) => {
  const { name, description, price } = req.body
  try {
    const product = await productsManager.create({ name, description, price })
    res.status(200).json({
      message: 'Product created successfully',
      data: product
    })
  } catch (error) {
    console.log({ error })
    res.status(500).json({
      message: error
    })
  }
}

const getAll = async (req, res) => {
  try {
    const products = await productsManager.getAll()
    res.status(200).json({
      data: products
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}

const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    await productsManager.delete(id)
    res.status(200).json({
      message: 'Product deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}

module.exports = {
  createProduct,
  getAll,
  deleteProduct
}
