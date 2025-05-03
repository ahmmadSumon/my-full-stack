const product = require('../models/product')
const Product = require('../models/product')

const createProduct = async (req, res) => {
    try {
        const product = await create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllProducts = async (req, res) => {
    try {
      const {inStock, sort, search, page =1, limit =10} = req.query
      const productObject = {}

      //filter
      if(inStock ){
        productObject.inStock = inStock === "true"
      }

      //search
      if(search){
        productObject.name = {$regex : search , $options : "i"}
      }
      let productQuerry  = Product.find(productObject)

      //sort
      if(sort === "price_asc"){
        productQuerry = productQuerry.sort({price : 1})
      }else if (sort === "price_desc"){
        productQuerry = productQuerry.sort({price:-1})
      }

      //pagination
      const skip = (Number(page - 1) * Number*(limit))
      productQuerry = productQuerry.skip(skip).limit(Number(limit))

      const products = await productQuerry

      res.status(200).json(products)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//get single product

const singleProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        if(!product){
            return res.status(404).json({error : "Product not found"})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })  
    }
}

//update PRODUCT

const updateProduct = async (req, res) => {
    try {
   const update = await product.findByIdAndUpdate(req.params.id, req.body, {new : true})
   res.status(200).json(update)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const deleteProduct = async (req, res) => {
    try {
      
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product){
            return res.status(404).json({error : "Product not found"})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {createProduct, getAllProducts, singleProduct, updateProduct, deleteProduct}