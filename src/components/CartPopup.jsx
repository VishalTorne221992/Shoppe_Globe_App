import React, { useEffect } from 'react'
import Popup from 'reactjs-popup'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from './CartItem'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { loggedInUser } from '../utils/userSlice'

export const CartPopup = () => {

  function getlocalCart(){
    let localcart = JSON.parse(localStorage.getItem('cart'))
    return localcart
  }
  
  let navigate = useNavigate();
  let dispatch = useDispatch();

  
  // Get cartitems from the cartslice of redux
  let CartItems = useSelector(state => state.Cart.items) || getlocalCart()
  let CartTotalPrice = useSelector(state => state.Cart.Total_Price)

   const handleError = (err) => toast.error(err, { position: 'top-right' })
   const handleSuccess = (msg) => toast.success(msg, { position: 'top-right' })
  
  const handleCartPopup = async () => {
     let accesstoken = Cookies.get('access-token')
          console.log('access token in cart popup', accesstoken)
    
          const requestOptions = {
    
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
            headers: { 
              'Authorization': `Bearer ${accesstoken}`,
              'Content-Type': 'application/json'
            }
           }
    
          try {
            const res = await fetch('https://shoppe-globe-app.onrender.com/api/cartAuth', requestOptions)
            const data = await res.json()
            console.log('cart popup response', data)
            const { success, message, user} = data;
    
            if(success){
              navigate('/Cart')
            }else{
              if(message == 'TokenExpiredError'){
                  let customErrorMessage = 'Session Expired. Please Login to continue..'
                  LogoutCartPopup(customErrorMessage)
              }else{
                  handleError('Please Login to View Cart !')
              }
              
            }
          } catch (error) {
            console.log(error)
          }
  }

    const LogoutCartPopup = async (msg) => {
         
        let accesstoken = Cookies.get('access-token')
          
          const requestOptions = {
    
            method: 'DELETE',
            credentials: 'include',
            mode: 'cors',
            headers: { 
              'Authorization': `Bearer ${accesstoken}`,
              'Content-Type': 'application/json'
            }
           }
    
           try {
    
            const res = await fetch('https://shoppe-globe-app.onrender.com/api/logout', requestOptions)
            const data = await res.json();
            const { success, user} = data;
    
            if(success){
  
              handleSuccess(msg)
              setTimeout(() => {
                navigate('/')
              }, 1000);
    
              
              Cookies.remove('access-token')
              dispatch(loggedInUser(user))
    
            }
           } catch (error) {
              console.log(error)
           }
    
      }
    
  

  return (
    <Popup
      trigger={<button className="Cart flex gap-2 p-1 @min-5xl/nav_list:text-lg @min-6xl/nav_list:right-32
      @min-5xl/nav_list:h-[2.8rem] @min-5xl/nav_list:items-center @min-5xl/nav_list:absolute @min-5xl/nav_list:right-18
      @min-xl/nav_list:w-[7rem] @min-xl/nav_list:items-center @min-xl/nav_list:absolute @min-xl/nav_list:right-[.5rem] @min-xl/nav_list:h-[2.2rem]  
      @max-sm/nav_list:min-w-[3rem] @max-sm/nav_list:max-w-[3rem] @max-sm/nav_list:items-center 
      @max-sm/nav_list:justify-center @max-sm/nav_list:h-[1.8rem] @max-sm/nav_list:text-[.8rem] @max-md/nav_list:w-[7rem] @min-xss/nav_list:w-[5.6rem]
      @max-lg/nav_list:right-2 @max-md/nav_list:text-[1rem] @max-md/nav_list:h-[2rem] @max-sm/nav_list:absolute @max-sm/nav_list:right-[.1em] @max-md/nav_list:absolute @max-md/nav_list:right-[.5em]"> 
      
      <img className='@min-xl/nav_list:h-7 @max-sm/nav_list:w-6 @max-sm/nav_list:h-6' src='https://img.icons8.com/?size=100&id=7ykGA0wEPoEb&format=png&color=000000' alt="" />
       <span className='@max-sm/nav_list:hidden @min-xss/nav_list:text-[.9em]' onClick={() => handleCartPopup()}>Cart : {CartItems.length}</span></button>}
      modal
      nested
    >
      {close => (
        <div className="modal bg-white min-sm:overflow-scroll relative
        max-sm:w-full min-sm:h-full">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className='Cart_style bg-amber-200 border-2 flex flex-col'>

            <div className="Cartheader font-extrabold text-xl"> Items in your Cart : </div>

            <div className="cartItems flex flex-col m-3 min-[767px]:gap-2 min-[767px]:w-[32em]">

              {CartItems.length > 0 ? CartItems.map(cart => {
                return <CartItem key={cart.sname} Cart={cart} />
              }) : <h1>No items in Cart</h1>}

            </div>

            <div className="checkout_cartpop flex flex-col items-center gap-4 p-5 
              @max-lg:mb-20
              min-[767px]:pl-10 min-[767px]:gap-2 min-[767px]:mb-12">
              <div className='@max-md:flex'>
                       <h1 className="totalcartprice_cart font-bold text-xl max-md:mb-4"><span className='font-bold text-2xl'>Total Amount :</span> <span className='text-red-700'>Rs. {CartTotalPrice.toFixed(2)}</span></h1>
                       <button className="checkout_btn w-[16rem] h-[2.4rem] font-extrabold rounded-2xl
                       border-2 bg-blue-800 text-white" onClick={() => {console.log('modal closed '); 
                        close();
                      }}><Link to='/Cart/checkout'>Proceed to Checkout</Link></button>
              </div>
              <button className="button
            bottom-5 checkout_btn w-[16rem] h-[2.4rem] font-extrabold rounded-2xl border-2 bg-black text-white" onClick={() => {
              console.log('modal closed ');
              close();
            }}
            > Close Modal </button>
            </div>

            
          </div>
        </div>

      )}
    </Popup>

  )
}
