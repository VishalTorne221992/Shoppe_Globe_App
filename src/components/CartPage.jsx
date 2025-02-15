import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'

function CartPage() {
               
  let CartItems = useSelector(state => state.Cart.items)
  let CartTotalPrice = useSelector(state => state.Cart.Total_Price)

  console.log('cartitems view', CartItems)

  return (
    <div className='@container/cart_page h-full border-2 bg-blue-100 flex justify-center'>

      <div className='Cart_style @min-sm/cart_page:min-h-max
       @min-xl/cart_page:w-[42em]
       @max-sm/cart_page:w-[23em] @max-sm/cart_page:h-max
       @max-md/cart_page:w-[50em] @min-md/cart_page:h-[50em] bg-white m-3 shadow-lg shadow-black'>

        <div className="Cartheader w-full h-[3em] flex flex-col justify-center pl-5 font-extrabold text-2xl text-white bg-[#070738]"> Your CartItems : </div>

        <div className="cartItems m-3 flex flex-col @container/cart_page:text-lg
        @max-sm/cart_page:gap-2 @max-sm/cart_page:text-xs @max-sm/cart_page:w-[28em]">

          {CartItems.length > 0 ? CartItems.map(cart => {
            return <CartItem key={cart.sname} Cart={cart} />
          }) : <h1>No items in Cart</h1>}

        </div>

        <div className="checkout_cart border-2 @min-xl/cart_page:border-0 flex flex-col gap-4 p-5">
           <h1 className="totalcartprice_cart font-bold text-2xl"><span className='font-bold text-2xl'>Total Amount :</span> <span className='text-red-700'>Rs. {CartTotalPrice.toFixed(2)}</span></h1>
           <button className="checkout_btn w-[16rem] h-[2.4rem] font-extrabold rounded-2xl
           border-2 bg-blue-800 text-white"><Link to='/Cart/checkout'>Proceed to Checkout</Link></button>
        </div>

      </div>

    </div>
  )
}

export default CartPage