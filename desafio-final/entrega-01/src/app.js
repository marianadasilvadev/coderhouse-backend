const express = require('express')

const productsRouter = require('./routes/products.route')
const cartsRouter = require('./routes/carts.route')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

module.exports = app
