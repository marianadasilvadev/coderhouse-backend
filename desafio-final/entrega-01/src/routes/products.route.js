const express = require('express')

const productsController = require('../controllers/products.controller')

const router = express.Router()

router.get('/', productsController.getAll)

router.get('/:pid', productsController.getById)

router.post('/', productsController.create)

router.put('/:pid', productsController.update)

router.delete('/:pid', productsController.remove)

module.exports = router
