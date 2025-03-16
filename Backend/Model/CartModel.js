import mongoose from "mongoose";
import { set } from "mongoose";

function roundToTwo(value){
    return (Math.round(value * 100) / 100)
 }
// Mongoose schema that creates a blueprint for the mongodb database documents
// Added required field validation so that the required field should be filled
const cartSchema = new mongoose.Schema({
    userId : {
        type: String,
        required : [true, "id is required"]
    },
    products : [{
        item_id : {
            type: String,
            required: true
        },
        title : {
            type: String,
            required: true
        },
        product_image : {
            type: String,
            required: true
        },
        price : {
            type: Number,
            required : true
        },
        quantity : {
            type : Number,
            required : true
        },
        ItemTotalPrice : {
            type : Number,
            required : true
        }
    }],
    CartTotal : {
        type : mongoose.SchemaTypes.Decimal128,    // Store floating point numbers using precision using Decimal128
        get: v => v.toString(),
        set: v => {
            return new mongoose.Types.Decimal128(parseFloat(v).toFixed(2))
        },
        default: 0,
        required: true                        
    },
    ModifiedOn : {
        type: Date,
        default: Date.now
    }
})

const CartModel = mongoose.model('cart', cartSchema);

export default CartModel;