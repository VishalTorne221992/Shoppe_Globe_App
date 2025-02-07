import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addCartItem, updateTotalPrice } from '/src/utils/cartSlice.js'

function ProductCard(props) {

   let dispatch = useDispatch();

  function handleAddItem(){

    let newItem = {
        id: props.cat_products.id,
        sname : props.cat_products.title,
        img : props.cat_products.images[0],
        price : props.cat_products.price,
        quantity : 1
      
    }

     dispatch(addCartItem(newItem))
     dispatch(updateTotalPrice(Math.round(props.cat_products.price),2))
  
  }

  return (
    <div className='cat_Products_Style border-2 w-[22%] h-[23rem] m-6 grid justify-items-center relative'>
          <div className="cardTop absolute top-8">
           <img className='w-[12em] h-[12em] border-2 object-contain justify-self-center' src={props.cat_products.images[0]} alt={props.cat_products.title} />
           <h1 className='m-3 justify-self-center font-bold underline'>{props.cat_products.title}</h1>
           </div>
           <div className="cardBottom bottom-5 border-2 w-full h-max p-3 place-self-end flex justify-start">
             <button className='btnCart w-36 h-10 rounded-md
              bg-red-800 text-md font-bold text-white' onClick={() => handleAddItem()}>
              Add item to Cart</button>
           </div>
    </div>
  )
}

export default ProductCard