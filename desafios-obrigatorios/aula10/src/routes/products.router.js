const express = require('express')

const productsController = require('../controllers/products.controller')

const router = express.Router()

router.post('/', productsController.createProduct)

router.delete('/:id', productsController.deleteProduct)

module.exports = router
