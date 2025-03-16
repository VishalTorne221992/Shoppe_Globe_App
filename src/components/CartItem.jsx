import React from 'react'
import '../css/Shoppe_Globe_Main_css.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateQuantityIncrement, updateQuantityDecrement, DeleteItem, updateTotalPrice, DecTotalPrice } from '../utils/cartSlice.js'

function CartItem(props) {

  // let CartItems = useSelector(state => state.Cart.items)
  let CartTotalPrice = useSelector(state => state.Cart.Total_Price)

  let dispatch = useDispatch();
  let userID = useSelector(store => store.userInfo.userID);

  function roundToTwo(value) {
    return (Math.round(value * 100) / 100)
  }

  const handleInc = async () => {

    let incrementOptions = {
      operation: 'increment',
      itemPrice: roundToTwo(props.Cart.price),
      userID: userID
    }

    const requestOptions = {

      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(incrementOptions)

    }

    try {
      const res = await fetch(`http://localhost:4002/api/cart/${props.Cart.id}`, requestOptions)
      const data = await res.json();
      console.log('update inc response data', data)
    } catch (error) {
      console.log(error)
    }



    // dispatch increment quantity function increment quantity of cart item
    dispatch(updateQuantityIncrement(props.Cart.id))
    dispatch(updateTotalPrice(roundToTwo(props.Cart.price)))

  }

  const handleDec = async () => {

    if (props.Cart.quantity <= 1) {
      let itemTotalPrice = props.Cart.quantity * props.Cart.price;

      let DeleteProductOptions = {
        userID: userID,
        ItemTotalPrice: roundToTwo(itemTotalPrice),
      }

      const requestOptions = {

        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(DeleteProductOptions)

      }

      try {
        const res = await fetch(`http://localhost:4002/api/cart/${props.Cart.id}`, requestOptions)
        const data = await res.json();
        console.log('update dec less than 1 response data', data)
      } catch (error) {
        console.log(error)
      }

    } else {

      let decrementOptions = {
        operation: 'decrement',
        itemPrice: roundToTwo(props.Cart.price),
        itemQuantity : props.Cart.quantity,
        userID: userID
      }

      const requestOptions = {

        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(decrementOptions)

      }

      try {
        const res = await fetch(`http://localhost:4002/api/cart/${props.Cart.id}`, requestOptions)
        const data = await res.json();
        console.log('update dec response data', data)
      } catch (error) {
        console.log(error)
      }

    }


    // dispatch decrement quantity function decrement quantity of cart item
    dispatch(updateQuantityDecrement(props.Cart.id))
    dispatch(DecTotalPrice(roundToTwo(props.Cart.price)))

  }

  const handleDeleteItem = async () => {

    // deduct the amount added by the deleted product from cart
    let itemTotalPrice = props.Cart.quantity * props.Cart.price;

    let DeleteProductOptions = {
      userID: userID,
      ItemTotalPrice: roundToTwo(itemTotalPrice),
    }

    const requestOptions = {

      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(DeleteProductOptions)

    }

    try {
      const res = await fetch(`http://localhost:4002/api/cart/${props.Cart.id}`, requestOptions)
      const data = await res.json();
      console.log('update dec response data', data)
    } catch (error) {
      console.log(error)
    }


    // dispatch functions to delete item from cart and update total price
    dispatch(DecTotalPrice(roundToTwo(itemTotalPrice)))
    dispatch(DeleteItem(props.Cart.id))
  }


  return (
    <div className='cartitem_popup border-2 flex items-center
    min-[767px]:w-[30em] min-[767px]:m-auto min-[767px]:gap-2
    @min-xl/cart_page:w-[38em] @min-xl/cart_page:m-auto
    max-[321px]:w-[18em] max-[460px]:w-[21em]
    @min-xss/cart_page:w-full @max-sm/cart_page:w-full
    @max-sm/cart_page:gap-1 @max-md/cart_page:gap-3 relative min-h-max'>

      <div className="imgitem 
      min-sm:w-[5em]
      @min-5xl:/cart_page:w-[5em] @min-5xl:/cart_page:h-[6em]
      @min-xl/cart_page:w-[9em] min-[767px]:w-[7em] @min-xs/cart_page:w-[4em]
      max-sm:w-[2em] @max-sm/cart_page:w-[5em] @max-sm/cart_page:h-[6em] @max-md/cart_page:w-[6rem]
      @max-md/cart_page:h-[5rem] @max-sm/nav_list:w-[2em] @max-md/nav_list:w-[9em]">
        <img className='w-full h-full object-contain justify-self-center' src={props.Cart.img} alt={props.Cart.sname} />
      </div>

      <div className="cartitemName min-w-max flex flex-col p-1 gap-3.5 flex-wrap">
        <p className='font-bold underline @min-md/cart_page:text-lg'>{props.Cart.sname}</p>
        <div className="cartitem_details flex flex-col text-[.9rem] @min-md/cart_page:text-[1.2rem]">
          <p className='font-medium'>Quantity : {props.Cart.quantity}</p>
          <p className='font-medium'>Item Total Price : {props.Cart.quantity * props.Cart.ItemTotalPrice}</p>
        </div>
      </div>

      <div className="CartOperations flex items-center absolute 
       min-sm:right-2
       min-[767px]:absolute min-[767px]:right-2
       @min-xl/cart_page:absolute @min-xl/cart_page:right-2 
       @max-sm/cart_page:right-2 @max-md/cart_page:right-16 @max-sm/cart_page:top-6 @max-sm/cart_page:gap-1 @max-md/cart_page:gap-5 
       @max-sm/cart_page:p-0 @max-md/cart_page:p-2 @max-md/cart_page:top-2 @min-md/cart_page:top-12
       @min-xs/cart_page:right-1 @min-xs/cart_page:top-5 @min-xs/cart_page:gap-1
       max-sm:right-1">

        <div className="btn_updateQuatity flex justify-center items-center p-1 @max-sm/cart_page:text-sm @max-sm/cart_page:h-max gap-1">
          <button className="btn min-sm:w-[1.2em] min-sm:h-[1.5em] @min-xss/cart_page:min-w-[1.2em] @max-xs/cart_page:max-w-[1.4em] @min-xs/cart_page:max-w-[1.6em] @min-xs/cart_page:h-[1.9em] min-[767px]:w-[1.5em] min-[767px]:h-[1.5em] @min-xl/cart_page:w-[2.2em] @min-xl/cart_page:h-[2.3em] max-sm:w-[1.6em] @max-sm/cart_page:w-[1.6em] @max-sm/cart_page:h-[1.6em] @max-md/cart_page:w-[2.2rem] @max-md/cart_page:h-[2.4rem] font-extrabold bg-blue-300 rounded minus" onClick={() => handleDec()}> <span className='minusSign @min-xl/cart_page:text-3xl font-bold'> - </span> </button>
          <button className="btn min-sm:w-[1.2em] min-sm:h-[1.5em] @min-xss/cart_page:min-w-[1.2em] @max-xs/cart_page:max-w-[1.4em] @min-xs/cart_page:max-w-[1.6em] @min-xs/cart_page:h-[1.9em] min-[767px]:flex min-[767px]:items-center min-[767px]:justify-center min-[767px]:w-[1.5em] min-[767px]:h-[1.5em] @min-xl/cart_page:w-[2.2em] @min-xl/cart_page:h-[2.3em] max-sm:w-[1.6em] @max-sm/cart_page:w-[1.6em] @max-sm/cart_page:h-[1.6em] @max-md/cart_page:w-[2.2rem] @max-md/cart_page:h-[2.4rem] bg-green-500 border-2 text-white border-black"> <span className='min-[767px]:text-sm @min-xl/cart_page:text-xl @min-xl/cart_page:font-bold'> {props.Cart.quantity < 0 ? 0 : props.Cart.quantity} </span>  </button>
          <button className="btn plus min-sm:w-[1.2em] min-sm:h-[1.5em] @min-xss/cart_page:min-w-[1.2em] @max-xs/cart_page:max-w-[1.4em] @min-xs/cart_page:max-w-[1.6em] @min-xs/cart_page:h-[1.9em] min-[767px]:w-[1.5em] min-[767px]:h-[1.5em] @min-xl/cart_page:w-[2.2em] @min-xl/cart_page:h-[2.3em] max-sm:w-[1.6em] @max-sm/cart_page:w-[1.6em] @max-sm/cart_page:h-[1.6em] @max-md/cart_page:w-[2.2rem] @max-md/cart_page:h-[2.4rem] minus font-extrabold bg-blue-300 rounded" onClick={() => handleInc()}> <span className='plusSign @min-xl/cart_page:text-2xl font-bold'> + </span>   </button>
        </div>

        <button className="delete_CartItem bg-red-600 border-2 
        @max-sm/cart_page:w-[4.2em] @min-xl/cart_page:w-[4.2em] @min-xl/cart_page:h-[2.3em] min-[767px]:w-[4.2em] min-[767px]:h-[2.3em]
        @max-sm/cart_page:h-[2.2em] @max-sm/cart_page:text-xs border-black @max-md/cart_page:w-[23em] 
        @max-md/cart_page:h-[2.4rem] font-extrabold text-white rounded-sm
        @min-xss/cart_page:min-w-[3.8em] @max-xs/cart_page:max-w-[1.4em] @min-xs/cart_page:w-[3em] @min-xs/cart_page:h-[2.2em]
        flex justify-center items-center" onClick={() => handleDeleteItem()}>DELETE</button>

      </div>

    </div>
  )
}

export default CartItem