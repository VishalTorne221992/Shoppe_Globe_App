import React, { useEffect } from 'react'
import Popup from 'reactjs-popup'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'

export const CartPopup = () => {

  function getlocalCart(){
    let localcart = JSON.parse(localStorage.getItem('cart'))
    return localcart
  }

  let CartItems = useSelector(state => state.Cart.items) || getlocalCart()
  let CartTotalPrice = useSelector(state => state.Cart.Total_Price)
  

  return (
    <Popup
      trigger={<button className="Cart flex gap-2 p-1 @min-5xl/nav_list:text-lg @min-6xl/nav_list:right-36
      @min-5xl/nav_list:h-[2.8rem] @min-5xl/nav_list:items-center @min-5xl/nav_list:absolute @min-5xl/nav_list:right-20
      @min-xl/nav_list:w-[7rem] @min-xl/nav_list:items-center @min-xl/nav_list:absolute @min-xl/nav_list:right-[1rem] @min-xl/nav_list:h-[2.2rem]  
      @max-sm/nav_list:min-w-[3rem] @max-sm/nav_list:max-w-[3rem] @max-sm/nav_list:items-center @max-sm/nav_list:justify-center @max-sm/nav_list:h-[1.8rem] @max-sm/nav_list:text-[.8rem] @max-md/nav_list:w-[7rem] 
      @max-md/nav_list:text-[1rem] @max-md/nav_list:h-[2rem] @max-sm/nav_list:absolute @max-sm/nav_list:right-[.8em] @max-md/nav_list:absolute @max-md/nav_list:right-[.1em]"> 
      <img className='@min-xl/nav_list:h-7 @max-sm/nav_list:w-6 @max-sm/nav_list:h-6 w-8 h-8' src='https://img.icons8.com/?size=100&id=7ykGA0wEPoEb&format=png&color=000000' alt="" />
       <span className='@max-sm/nav_list:hidden'>Cart : {CartItems.length}</span></button>}
      modal
      nested
    >
      {close => (
        <div className="modal bg-white min-sm:overflow-scroll relative">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className='Cart_style bg-amber-200 border-2 w-full min-sm:h-[38em] min-sm:overflow-scroll
          flex flex-col min-[767px]:gap-1'>

            <div className="Cartheader font-extrabold text-xl"> Items in your Cart : </div>

            <div className="cartItems flex flex-col m-3 min-[767px]:gap-2
            max-[766px]:w-max min-[767px]:w-[32em] min-sm:min-h-max">

              {CartItems.length > 0 ? CartItems.map(cart => {
                return <CartItem key={cart.sname} Cart={cart} />
              }) : <h1>No items in Cart</h1>}

            </div>

            <div className="checkout_cartpop flex flex-col gap-4 p-5 
              min-[767px]:pl-10 min-[767px]:gap-2 min-[767px]:mb-12">
              <div className='min-[767px]:flex min-[767px]:flex-col min-[767px]:gap-5 min-[767px]:mb-5'>
                       <h1 className="totalcartprice_cart font-bold text-xl"><span className='font-bold text-2xl'>Total Amount :</span> <span className='text-red-700'>Rs. {CartTotalPrice.toFixed(2)}</span></h1>
                       <button className="checkout_btn w-[16rem] h-[2.4rem] font-extrabold rounded-2xl
                       border-2 bg-blue-800 text-white" onClick={() => {console.log('modal closed '); 
                        close();
                      }}><Link to='/Cart/checkout'>Proceed to Checkout</Link></button>
              </div>
            </div>

            <button className="button min-sm:bottom-3 min-sm:fixed
            min-[767px]:absolute min-[767px]:bottom-2
            absolute bottom-5 left-[50%] translate-x-[-50%] checkout_btn w-[16rem] h-[2.4rem] font-extrabold rounded-2xl border-2 bg-black text-white" onClick={() => {
              console.log('modal closed ');
              close();
            }}
            > Close Modal </button>
          </div>
        </div>

      )}
    </Popup>

  )
}
