import { model, Types } from "mongoose";
import CartModel from "../Model/CartModel.js"


// Add product to the cart 
export const AddProductCart = async (req, res) => {

    const {
        userID,
        item_id,
        title,
        product_image,
        price,
        quantity,
        ItemTotalPrice,
        CartTotal
      } = req.body;

      let newCartItem = new CartModel({
        userId : userID,
        products : [{
        item_id : item_id,
        title : title,
        product_image : product_image,
        price : price,
        quantity : quantity,
        ItemTotalPrice : ItemTotalPrice
        }],
        CartTotal : CartTotal
      })

      try{

        // find the user cart from db
        let cart = await CartModel.findOne({ userId : userID })

        if(cart){

         let foundProduct = cart.products.findIndex(prod => prod.item_id == item_id)   

         // if product already added show error
         if(foundProduct > -1){
            return res.json({ message : "Product Already added with the given ID. Please add a different product"})
         }
        
        // create a new item to be added
        let newItem = {item_id, title, product_image, price, quantity, ItemTotalPrice}

        // if cart is created push the new products to the products array and increment cart total
        await cart.collection.findOneAndUpdate({ userId : userID }, {
            $push: { products : newItem },
            $inc: { CartTotal : new Types.Decimal128(CartTotal.toString())}
        }, { new : true, returnDocument: 'after' }).then(data => {
            res.status(200).json({message : 'Added successfully', cart : data})
        }).catch(err => {
            res.status(200).json({error : err})
        })
         

        }else{

           // if cart not created, create a new cart and add the new product
           let newCart = await newCartItem.save()

           // send the successful response with the cart details
           res.status(201).json({message : 'Cart Created and Item added', cart : newCart})

        }

      }catch(err){

        // send error if something goes wrong and console the error for more info about the error
        console.log(err);
        res.status(500).send("something went wrong")
      }
}

// get all cart items
export const getCartItems = async (req, res) => {
    
    const data = await CartModel.find({});
    res.send(data)
}

// update quantity by 1 (either by increment or decrement depending on the request

export const updateQuantityCart = async (req, res) => {

    const { operation, itemPrice, quantity,  userID } = req.body;
    let id = req.params.id;
    console.log('update req body', req.body);
    
    // increment the cart product quantity by 1 and also add the Cart total with the price of the product
    if(operation == 'increment'){

        try {
            await CartModel.findOneAndUpdate({ userId :userID, "products.item_id" : id }, {
                $inc: { "products.$.quantity" : 1 , "products.$.ItemTotalPrice" : itemPrice, CartTotal : itemPrice }
            }, { new : true})
            .then(data => {
                res.json({ message : "Incremented quantity", data: data})
            }).catch(err => {
                res.status(500).json({ error : err})
            })
        } catch (err) {
            console.log(err)
        }

    }
    // decrement the cart product quantity by 1 and also deduct the Cart total with the price of the product
    else if(operation == 'decrement'){

        if( quantity <= 1){

            await CartModel.findOneAndUpdate({ userId : userID, CartTotal: { $gte: 1 } }, {
                $inc: { CartTotal : -itemPrice },
                $pull: {
                    products: { item_id : id }
                }
            }, { new : true })
            .then(data => {
                res.json({message : "Successfully deleted product quantity less than 1", data:data})
            }).catch(err => {
                res.status(500).json({ error : err})
            }) 
        }else{

            try {
                await CartModel.findOneAndUpdate({ userId :userID, "products.item_id" : id, CartTotal: { $gte: 1 } }, {
                    $inc: { "products.$.quantity" : -1 , "products.$.ItemTotalPrice" : -itemPrice, CartTotal : -itemPrice }
                }, { new : true })
                .then(data => {
                    res.json({ message : "Decremented quantity", data: data})
                }).catch(err => {
                    res.status(500).json({ error : err})
                })
            } catch (err) {
                console.log(err) 
            }

        }

    }else{
        res.send({ error : 'Invalid Operation'})
    }
       
}


export const getUserCart = async (req, res) => {
    
    const userid = req.params.id;

    let userCart = await CartModel.findOne({ userId : userid })
    
    res.json({ UserCart : userCart })

}

// delete the product using the id of the  product from mongodb

export const deleteProductCart = async (req, res) => {
    
    const {  userID, ItemTotalPrice } = req.body;
    const id = req.params.id;

    await CartModel.findOneAndUpdate({ userId : userID, CartTotal: { $gte: 1 } }, {
        $inc: { CartTotal : -ItemTotalPrice },
        $pull: {
            products: { item_id : id }
        }
    }, { new : true })
    .then(data => {
        res.json({message : "Successfully deleted product", data:data})
    }).catch(err => {
        res.status(500).json({ error : err})
    }) 
    
} 