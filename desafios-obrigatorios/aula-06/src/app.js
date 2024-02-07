const express = require('express')

const ProductManager = require('./ProductManager')

const PORT = 8000

const app = express()

const productManager = new ProductManager('./src/data/products.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/products', async (req, res) => {
  const { limit } = req.query   
  try {
    const products = await productManager.getProducts()

    return res.status(200).json({
      data: products.slice(0, limit)
    })
  } catch (error) {
    console.log({ error })
    res.status(500).json({
      message: 'Internal server error'
    })
  }
})

app.get('/products/:pid', async (req, res) => {
  const { pid } = req.params
  try {
    const products = await productManager.getProducts()
    const product = products.find((p) => p.id === +pid)

    if (product !== undefined) {
      return res.status(200).json({
        data: product
      })
    }
    return res.status(404).json({
      message: 'Product not found'
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error'
    })
  }
})

app.listen(PORT, () => {
  console.log('Server listening on port', PORT)
})
