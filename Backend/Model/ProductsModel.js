import mongoose from "mongoose";


// Created products schema with required fields to store info in the mongodb
// Added required field validation so that the required field should be filled
const productSchema = new mongoose.Schema({
    title : {
        type: String,
        required : [true, "Product name is required"]
    },
    description : {
        type: String,
        required : [true, "Description required"]
    },
    category : {
        type : String,
        required: [true, "Category name required"],                        
    },
    price : {
        type: Number,
        required : [true, "Product Price required"]
    },
    rating : {
        type: Number,
        required : [true, "Rating required"]
    },
    stock : {
        type: Number,
        required : [true, "Stock is required"]
    },
    warrantyInformation : {
        type: String,
        required : [true, "Warranty info is required"]
    },
    shippingInformation : {
        type: String,
        required : [true, "Shipping info is required"]
    },
    returnPolicy : {
        type: String,
        required : [true, "Return policy is required"]
    },
    images : {
        type: Array,
        required : [true, "Product image required"]
    },
    thumbnail : {
        type: String,
        required : [true, "Product thumbnail is required"]
    }
})

const ProductsModel = mongoose.model('products', productSchema);

export default ProductsModel;