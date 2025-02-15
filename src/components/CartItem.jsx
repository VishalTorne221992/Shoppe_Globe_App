import React from 'react'
import '../css/Shoppe_Globe_Main_css.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateQuantityIncrement, updateQuantityDecrement, DeleteItem, updateTotalPrice, DecTotalPrice } from '../utils/cartSlice.js'

function CartItem(props) {

  // let CartItems = useSelector(state => state.Cart.items)
  // let CartTotalPrice = useSelector(state => state.Cart.Total_Price)

  let dispatch = useDispatch();

  function handleInc() {

    // dispatch increment quantity function increment quantity of cart item
    dispatch(updateQuantityIncrement(props.Cart.id))
    dispatch(updateTotalPrice(props.Cart.price))

  }

  function handleDec() {

    // dispatch decrement quantity function decrement quantity of cart item
    dispatch(updateQuantityDecrement(props.Cart.id))
    dispatch(DecTotalPrice(props.Cart.price))

  }

  function handleDeleteItem() {

    // deduct the amount added by the deleted product from cart
    let itemTotalPrice = props.Cart.quantity * props.Cart.price;

    // dispatch functions to delete item from cart and update total price
    dispatch(DecTotalPrice(itemTotalPrice))
    dispatch(DeleteItem(props.Cart.id))
  }


  return (
    <div className='cartitem_popup border-2 flex items-center
    min-[767px]:w-[30em] min-[767px]:m-auto min-[767px]:gap-2
    @min-xl/cart_page:w-[38em] @min-xl/cart_page:m-auto
    max-[321px]:w-[18em] max-[460px]:w-[21em]
    @max-sm/cart_page:gap-1 @max-md/cart_page:gap-3 relative min-h-max'>
      
      <div className="imgitem 
      @min-5xl:/cart_page:w-[5em] @min-5xl:/cart_page:h-[6em]
      @min-xl/cart_page:w-[9em] min-[767px]:w-[7em]
      max-sm:w-[2em] @max-sm/cart_page:w-[6em] @max-sm/cart_page:h-[6em] @max-md/cart_page:w-[6rem]
      @max-md/cart_page:h-[5rem] @max-sm/nav_list:w-[2em] @max-md/nav_list:w-[9em]">
        <img className='w-full h-full object-contain justify-self-center' src={props.Cart.img} alt={props.Cart.sname} />
      </div>
      
      <div className="cartitemName min-w-max flex flex-col p-1 gap-3.5 flex-wrap">
        <p className='font-bold underline'>{props.Cart.sname}</p>
        <div className="cartitem_details flex flex-col text-[.9rem]">
          <p className='font-medium'>Quantity : {props.Cart.quantity}</p>
          <p className='font-medium'>Item Total Price : {props.Cart.quantity * props.Cart.ItemTotalPrice}</p>
        </div>
      </div>

      <div className="CartOperations flex items-center absolute 
       min-[767px]:absolute min-[767px]:right-2 min-[767px]:top-15
       @min-xl/cart_page:absolute @min-xl/cart_page:right-2 
       @max-sm/cart_page:right-2 @max-md/cart_page:right-16 @max-sm/cart_page:top-6 @max-sm/cart_page:gap-1 @max-md/cart_page:gap-5 
       @max-sm/cart_page:p-0 @max-md/cart_page:p-2 @max-md/cart_page:top-2
       max-sm:right-1">

        <div className="btn_updateQuatity flex justify-center items-center p-1 @max-sm/cart_page:text-sm @max-sm/cart_page:h-max gap-1">
          <button className="btn min-[767px]:w-[1.5em] min-[767px]:h-[1.5em] @min-xl/cart_page:w-[2.2em] @min-xl/cart_page:h-[2.3em] max-sm:w-[1.6em] @max-sm/cart_page:w-[1.6em] @max-sm/cart_page:h-[1.6em] @max-md/cart_page:w-[2.2rem] @max-md/cart_page:h-[2.4rem] font-extrabold bg-blue-300 rounded minus" onClick={() => handleDec()}> <span className='minusSign @min-xl/cart_page:text-3xl font-bold'> - </span> </button>
          <button className="btn min-[767px]:flex min-[767px]:items-center min-[767px]:justify-center min-[767px]:w-[1.5em] min-[767px]:h-[1.5em] @min-xl/cart_page:w-[2.2em] @min-xl/cart_page:h-[2.3em] max-sm:w-[1.6em] @max-sm/cart_page:w-[1.6em] @max-sm/cart_page:h-[1.6em] @max-md/cart_page:w-[2.2rem] @max-md/cart_page:h-[2.4rem] bg-green-500 border-2 text-white border-black"> <span className='min-[767px]:text-sm @min-xl/cart_page:text-xl @min-xl/cart_page:font-bold'> {props.Cart.quantity < 0 ? 0 : props.Cart.quantity} </span>  </button>
          <button className="btn plus min-[767px]:w-[1.5em] min-[767px]:h-[1.5em] @min-xl/cart_page:w-[2.2em] @min-xl/cart_page:h-[2.3em] max-sm:w-[1.6em] @max-sm/cart_page:w-[1.6em] @max-sm/cart_page:h-[1.6em] @max-md/cart_page:w-[2.2rem] @max-md/cart_page:h-[2.4rem] minus font-extrabold bg-blue-300 rounded" onClick={() => handleInc()}> <span className='plusSign @min-xl/cart_page:text-2xl font-bold'> + </span>   </button>
        </div>

        <button className="delete_CartItem bg-red-600 border-2 
        @max-sm/cart_page:w-[4.2em] @min-xl/cart_page:w-[4.2em] @min-xl/cart_page:h-[2.3em] min-[767px]:w-[4.2em] min-[767px]:h-[2.3em]
        @max-sm/cart_page:h-[2.2em] @max-sm/cart_page:text-xs border-black @max-md/cart_page:w-[23em] 
        @max-md/cart_page:h-[2.4rem] font-extrabold text-white rounded-sm
        flex justify-center items-center" onClick={() => handleDeleteItem()}>DELETE</button>

      </div>

    </div>
  )
}

export default CartItem