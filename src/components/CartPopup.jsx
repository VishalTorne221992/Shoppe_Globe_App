import React , { useState } from 'react'
import Popup from 'reactjs-popup'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'

export const CartPopup = () => {

    let CartItems = useSelector(state => state.Cart.items)
    let CartTotalPrice = useSelector(state => state.Cart.Total_Price)

  return (
    <Popup
    trigger={<button className="Cart"> Cart : </button>}
    modal
    nested
  >
    {close => (
      <div className="modal bg-white w-[38rem] h-[34rem]">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className='Cart_style border-2 w-full h-full'>

                    <div className="Cartheader"> Items in your Cart : </div>

                    <div className="cartItems">
 
                        { CartItems.length > 0 ? CartItems.map(cart => {
                            return <CartItem key={cart.sname} Cart={cart} />
                        }) : <h1>No items in Cart</h1>}

                    </div>

                    <button className="button" onClick={() => {
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
