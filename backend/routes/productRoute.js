const express = require('express')
const {createProduct, getAllProducts, singleProduct, updateProduct, deleteProduct} = require('../controllers/productController')
const router = express.Router()
const {protect, admin} = require('../middleware/authMiddleware')

router.route('/')
      .get(getAllProducts)
      .post(protect, admin, createProduct)

router.route('/:id')
      .get(singleProduct)
      .put(protect, admin, updateProduct)
      .delete(protect, admin, deleteProduct)
      
module.exports = router