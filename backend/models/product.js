const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, 'Product Name must be at least 2 characters long']
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'Product Description must be at least 10 characters long']
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Product Price must be greater than 0']
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Sports & Outdoors', 'Beauty & Personal Care', 'Toys & Games', 'Health & Wellness', 'Automotive', 'Pet Supplies', 'Office Supplies', 'Baby & Toddler', 'Food & Beverages', 'Other']
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Product Quantity must be greater than 0']
    },
    inStock: {
        type: Boolean,
        default: true
    },   
})

module.exports = mongoose.model('Product', productSchema)