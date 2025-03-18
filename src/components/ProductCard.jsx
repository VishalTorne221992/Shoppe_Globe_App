import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addCartItem, updateTotalPrice } from '/src/utils/cartSlice.js'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { loggedInUser } from '../utils/userSlice'

import Cookies from 'js-cookie'

function ProductCard(props) {

  let userID = useSelector(store => store.userInfo.userID);
  let CartItems = useSelector(state => state.Cart.items)
  let CartTotalPrice = useSelector(state => state.Cart.Total_Price)

  const handleError = (err) => toast.error(err, { position: 'top-center' })

  const handleSuccess = (msg) => toast.success(msg, { position: 'top-right' })

  let dispatch = useDispatch();
  const navigate = useNavigate();

  function roundToTwo(value){
     return (Math.round(value * 100) / 100)
  }

  const handleAddItem = async () => {

      let accesstoken = Cookies.get('access-token')
        console.log('access token in cart', accesstoken)

      // add new item to cart
      let newItem = {
        id: props.cat_products._id,
        sname: props.cat_products.title,
        img: props.cat_products.thumbnail,
        price: roundToTwo(props.cat_products.price),
        quantity: 1,
        ItemTotalPrice: roundToTwo(props.cat_products.price)
      }

      const AddNewItem = {
        userID : userID,
        item_id: newItem.id,
        title : newItem.sname,
        product_image : newItem.img,
        price : newItem.price,
        quantity: newItem.quantity,
        ItemTotalPrice: newItem.ItemTotalPrice,
        CartTotal : newItem.price
      }  

      const requestAuthOptions = {

        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: { 
          'Authorization': `Bearer ${accesstoken}`,
          'Content-Type': 'application/json'
        }
       }
  
       try{

        const res = await fetch('https://shoppe-globe-app.onrender.com/api/cartAuth', requestAuthOptions)
        const data = await res.json()
        console.log('cart response', data)
        const { success, message, user} = data;
        
        if(success){

        const requestOptions = {

          method: 'POST',
          mode:'cors',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(AddNewItem)
    
        }
    
        try{
          
          const res = await fetch('https://shoppe-globe-app.onrender.com/api/cart', requestOptions)
          const data = await res.json()
          
        }catch(err){
          console.log('Error',err)
        }

      

      // check if items is already added to the cart we have to search in cartitem
      // which we obtain from state (redux)
      let foundItem = CartItems.filter(prod => prod.id === props.cat_products._id);

      if (foundItem.length !== 0) {
        handleError('Item Already Exists. Please view cart')
        return
      }


      // dispatch the functions to redux reducers to additem to cart and update total price
      
      dispatch(addCartItem(newItem))
      dispatch(updateTotalPrice(roundToTwo(props.cat_products.price)))


    }else{

    if(message == 'TokenExpiredError'){

          let customErrorMessage = 'Session Expired. Please Login to continue..'
          LogoutAddItem(customErrorMessage)

      }else{

        handleError('Please Login to View Cart !')
    
      }
      
    } 
    }catch(err){

      console.log('Error',err);
      handleError('Please Login to View Cart !')
      
    }
     
  }

const LogoutAddItem = async (msg) => {
    
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

        setTimeout(() => {
          navigate('/')
        }, 1000);

        handleSuccess(msg)
        Cookies.remove('access-token')
        dispatch(loggedInUser({userID : 100, username : 'Guest'}))

      }
      } catch (error) {
        console.log(error)
      }

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
          <button className='font-bold border-2 bg-sky-100 p-1 rounded-sm'><Link to={`/category/${props.category}/${props.cat_products._id}`}> View Details </Link></button>
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