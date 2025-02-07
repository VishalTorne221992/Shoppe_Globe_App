import React from 'react'
import '../css/Shoppe_Globe_Main_css.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateQuantityIncrement } from '../utils/cartSlice.js'

function CartItem(props) {

  // let CartItems = useSelector(state => state.Cart.items)
  // let CartTotalPrice = useSelector(state => state.Cart.Total_Price)

  let dispatch = useDispatch();

  function handleInc(){

    dispatch(updateQuantityIncrement(props.Cart.id))

  }

 
  return (
    <div className='cartitem_popup border-2 flex gap-1 relative'>
          <div className="imgitem w-[6rem] h-[5rem] border-2">
              <img className='w-full h-full object-contain' src={props.Cart.img} alt={props.Cart.sname}/>
          </div>
          <div className="citemName min-w-max h-[5rem] border-2 flex items-center p-1 flex-wrap">
          {props.Cart.sname}
          </div>

          <div className="CartOperations flex items-center absolute right-2 top-1 gap-5 border-2 border-red-600 p-2">
          
                <div className="btn_updateQuatity border-2 flex justify-center items-center p-1 w-[8em] gap-1">
                <button className="btn minus border-2"> <span className='minusSign'> - </span> </button>
                <button className="btn quantityMenuStyle"> <span className='quantityPopup_Display'> {props.Cart.quantity < 0 ? 0 : props.Cart.quantity} </span>  </button>
                <button className="btn plus border-2" onClick={() => handleInc()}> <span className='plusSign'> + </span>   </button>
                </div>

                <button className="delete_CartItem bg-red-600 w-[4.5rem] h-[2.4rem] font-extrabold text-white rounded-sm
                flex justify-center items-center">DELETE</button>

          </div>
          
    </div>
  )
}

export default CartItem