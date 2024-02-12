const CartsManager = require('../CartsManager')

const cartsManager = new CartsManager('src/data/carts.json')

const getById = async (req, res) => {
  const { cid } = req.params
  try {
    const cart = await cartsManager.getCartById(cid)
    if (cart) {
      return res.status(200).json({
        data: cart
      })
    }
    return res.status(404).json({
      message: 'Cart not found'
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const create = async (req, res) => {
  const { products } = req.body
  try {
    const cart = await cartsManager.addCart({ products })
    if (cart) {
      return res.status(200).json({
        data: cart
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

const postProduct = async (req, res) => {
  const { cid, pid } = req.params
  try {
    const cart = await cartsManager.postProductIntoCart(cid, pid)
    if (cart) {
      return res.status(200).json({
        data: cart
      })
    }
    return res.status(404).json({
      message: 'Cart not found'
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  getById,
  create,
  postProduct
}