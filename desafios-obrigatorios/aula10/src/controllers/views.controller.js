const ProductsManager = require('../ProductsManager')

const productsManager = new ProductsManager('src/data/products.json')

const getHome = async (req, res) => {
  const products = await productsManager.getAll()
  res.render('home', {
    products
  })
}

const getRealTimeProducts = async (req, res) => {
  res.render('realTimeProducts')
}

module.exports = {
  getHome,
  getRealTimeProducts
}
