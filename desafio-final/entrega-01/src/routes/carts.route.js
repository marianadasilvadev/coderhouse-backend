const express = require('express')

const cartsController = require('../controllers/carts.controller')

const router = express.Router()

router.post('/', cartsController.create)

router.get('/:cid', cartsController.getById)

router.post('/:cid/product/:pid', cartsController.postProduct)

module.exports = router
