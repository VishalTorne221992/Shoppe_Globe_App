import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addCartItem, updateTotalPrice } from '/src/utils/cartSlice.js'
import { Link } from 'react-router-dom';

function ProductCard(props) {

  let CartItems = useSelector(state => state.Cart.items)
  let CartTotalPrice = useSelector(state => state.Cart.Total_Price)

  let dispatch = useDispatch();

  function handleAddItem() {

    // check if items is already added to the cart we have to search in cartitem
    // which we obtain from state (redux)
    let foundItem = CartItems.filter(prod => prod.id === props.cat_products.id);

    if (foundItem.length !== 0) {
      alert('Item already added in cart. Please increase quantity. Please view Cart.')
      return
    }

    // add new item to cart
    let newItem = {
      id: props.cat_products.id,
      sname: props.cat_products.title,
      img: props.cat_products.images[0],
      price: props.cat_products.price,
      quantity: 1,
      ItemTotalPrice: props.cat_products.price
    }

    // dispatch the functions to redux reducers to additem to cart and update total price
    
    dispatch(addCartItem(newItem))
    dispatch(updateTotalPrice(props.cat_products.price))

  }

  return (
      <div className='cat_Products_Style @min-xl/cat_products:m-3
      @min-5xl/cat_products:w-[20rem] @min-5xl/cat_products:m-5
      @max-sm/cat_products:text-sm @max-sm/cat_products:w-[65%] @max-sm/cat_products:min-h-[16em]
      @max-sm/cat_products:m-2 @max-sm/cat_products:text-nowrap border-2 @max-md/cat_products:w-max 
      @max-md/cat_products:h-max @max-md/cat_products:m-4 @max-md/cat_products:text-sm 
      @max-md/cat_products:text-nowrap grid justify-items-center relative @max-md/cat_products:place-self-center'>
        
        <div className="cardTop flex flex-col border-2 @min-5xl/cat_products:gap-2 @min-5xl/cat_products:p-2
         @max-sm/cat_products:gap-2 @max-md/cat_products:gap-2 @max-md/cat_products:items-center m-3 gap-3">
          <img className='@min-5xl/cat_products:w-[15em] @min-5xl/cat_products:h-[12em] @max-sm/cat_products:w-[8em] @max-sm/cat_products:h-[8em] @max-md/cat_products:w-[6em] 
          @max-md/cat_products:h-[4em] border-2 object-contain' src={props.cat_products.images[0]} alt={props.cat_products.title} />
          <h1 className='@min-5xl/cat_products:text-lg @min-5xl/cat_products:text-nowrap font-bold underline text-[.7rem]'>{props.cat_products.title}</h1>
          <h1 className='@min-5xl/cat_products:text-md @min-5xl/cat_products:text-nowrap font-bold'>Price: Rs.{props.cat_products.price.toFixed(2)}</h1>
          <button className='font-bold border-2 bg-sky-100 p-1 rounded-sm'><Link to={`/category/${props.category}/${props.cat_products.id}`}> View Details </Link></button>
        </div>
        
        <div className="cardBottom bottom-5 w-full h-max @min-5xl:justify-self-center
        @min-5xl/cat_products:justify-self-start @min-5xl/cat_products:ml-2
        @min-xl/cat_products:p-2 @min-xl/cat_products:mb-2 @min-xl/cat_products:place-self-center 
        @max-sm/cat_products:p-1 @max-md/cat_products:p-1 
        @max-md/cat_products:place-self-center flex justify-start">
          <button className='btnCart @min-xl/cat_products:w-36 @min-xl/cat_products:h-9 @max-sm/cat_products:w-32 @max-sm/cat_products:h-8 
          @max-md/cat_products:w-max @max-md/cat_products:h-10 @max-md/cat_products:p-2 rounded-md
              bg-red-800 text-md font-bold text-white' onClick={() => handleAddItem()}>
            Add item to Cart</button>
        </div>
      </div>
  )
}

export default ProductCard