import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CartPopup } from './CartPopup'
import { Link, useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import { ToastContainer , toast} from 'react-toastify'
import { loggedInUser } from '../utils/userSlice'
import { ClearCart } from '../utils/cartSlice'
import Cookies from 'js-cookie'


Modal.setAppElement("#root")
function Header() {

  const customLoginStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    },
    overlay: {
      backgroundColor: 'rgb(136, 136, 136, 0.65)'
    }
  };

  let dispatch = useDispatch();
  let userID = useSelector(store => store.userInfo.userID);
  let username = useSelector(store => store.userInfo.username);
  let CartItems = useSelector(state => state.Cart.items)

  const navigate = useNavigate();
  const [loginModelOpen, setloginModelOpen] = useState(false);
  const [registerModelOpen, setregisterModelOpen] = useState(false);
  const [successStatus, setSuccessStatus] = useState("")
  //const [username, setUsername] = useState("")

  useEffect(() => {
    
    console.log('user info', username, userID)

    // const fetchUserCart = async () => {

    //   const requestOptions = {

    //     method: 'GET',
    //     mode:'cors',
    //     headers: { 'Content-Type': 'application/json'}
    //    }
      
    //     const res = await fetch(`http://localhost:4002/api/cart/${userID}`, requestOptions)

    //     let result = await res.json();

    //     let data = await result.UserCart.products;

    //     return data;
    // }

    // const result = fetchUserCart() || [];

    // console.log('user cart', result)

  }, [userID, username])
  
  
  function openLoginModal() {
    setloginModelOpen(true);
  }

  function closeLoginModal() {
    setloginModelOpen(false);
  }

  function openRegisterModal() {
    setloginModelOpen(true);
  }

  function closeRegisterModal() {
    setregisterModelOpen(false);
  }

  const handleError = (err) => toast.error(err, { position: 'top-right' })
  

  const handleSuccess = (msg) => toast.success(msg, { position: 'top-right' })
  

  // form usage

  const handleRegisterForm = async (e) => {
    e.preventDefault()

    const userRegisterationForm = document.getElementById('userRegisterForm');

    const userFormdata = new FormData(userRegisterationForm);

    const userformValues = {
      Firstname : userFormdata.get('firstname'),
      Lastname : userFormdata.get('lastname'),
      email : userFormdata.get('email'),
      password: userFormdata.get('password')
    }

    const requestOptions = {

      method: 'POST',
      mode:'cors',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(userformValues)

     }

     try{
      const res = await fetch('https://shoppe-globe-app.onrender.com/api/register', requestOptions)
      const data = await res.json();
      console.log('data',data)
      const { success, message } = data
      if(success){
        handleSuccess(message);
        setSuccessStatus(message + "!")
        closeRegisterModal()
      }else{
        handleError(message)
        setSuccessStatus("User Already Exists with the given email !!")
      }
     }catch(e){
        console.log('Error',e);
     }
     
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    const userloginInfo = document.getElementById('userloginform');

    const userLoginData = new FormData(userloginInfo);

    let loginDetails = {
      email : userLoginData.get('email'),
      password : userLoginData.get('password')
    }

    const requestOptions = {

      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginDetails)

     }

     try{
      const res = await fetch('https://shoppe-globe-app.onrender.com/api/login', requestOptions)
      const data = await res.json();
      
      
      const { message, success, userID , username, token } = data
      if(success){
        handleSuccess(message + " Welcome, " + username);
        setSuccessStatus(message)
        dispatch(loggedInUser({userID : userID, username : username}))
        Cookies.set('access-token',token)
        closeLoginModal()
      }else{
        handleError(message)
        setSuccessStatus("User Already Exists with the given email !!")
      }
     }catch(e){
        console.log('Error',e);
     }


  }

  const handleViewCart = async () => {

      let accesstoken = Cookies.get('access-token')
    
      const requestOptions = {

        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: { 
          'Authorization': `Bearer ${accesstoken}`,
          'Content-Type': 'application/json'
        }
       }
  
       try{
        const res = await fetch('https://shoppe-globe-app.onrender.com/api/cartAuth', requestOptions)
        const data = await res.json()
        console.log('cart response', data)
        const { success, message, user} = data;

        if(success){
          navigate('/Cart')
        }else{
          if(message == 'TokenExpiredError'){
              let customErrorMessage = 'Session Expired. Please Login to continue..'
              LogoutCart(customErrorMessage, message)
          }else{
            handleError('Please Login to View Cart !')
          }
          
        }
        
       }catch(err){
        console.log('Error',err);
        handleError('Please Login to View Cart !')
     }
  }

  const Logout = async () => {

      let accesstoken = Cookies.get('access-token')
      
      const requestOptions = {

        method: 'DELETE',
        credentials: 'include',
        mode: 'cors',
        headers: { 
          'Authorization': `Bearer ${accesstoken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userid: userID,
          cartitems: CartItems,
          message: 'user logout'
        })
       }

       try{
        
        const res = await fetch('https://shoppe-globe-app.onrender.com/api/logout', requestOptions)
        const data = await res.json();
      
        const { success, message, userID, user} = data;
        if(success){
          Cookies.remove('access-token')
          setTimeout(() => {
            navigate('/')
          }, 1000);

          handleSuccess(message)
          dispatch(ClearCart())
          dispatch(loggedInUser({userID : userID, username : user}))
          
        }else{
          Cookies.remove('access-token')
          setTimeout(() => {
            navigate('/')
          }, 1000);

          handleError(message)
          dispatch(loggedInUser({userID : 100, username : 'Guest'}))
        }
       }catch(e){
          console.log('Catch error',e)
       }

    
  }

  const LogoutCart = async (msg, errmsg) => {
     
    let accesstoken = Cookies.get('access-token')

    let checkCart = {
      userid: userID,
      cartitems: CartItems,
      message: errmsg
    }
      
      const requestOptions = {

        method: 'DELETE',
        credentials: 'include',
        mode: 'cors',
        headers: { 
          'Authorization': `Bearer ${accesstoken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkCart)
       }
 
       try {

        const res = await fetch('https://shoppe-globe-app.onrender.com/api/logoutSession', requestOptions)
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
    <div id='home' className='@container/nav_list'>
      <header className='flex logo_header relative'>
        <h1 className='logo p-2 pl-10 @max-md/nav_list:pl-6 @max-xs/nav_list:text-nowrap @max-xs/nav_list:pl-2 @max-xs/nav_list:text-[.8rem] @min-xl/nav_list:text-[1.5rem]'>Shoppe Globe</h1>
        <div className='Login_Section flex items-center m-auto @max-xs/nav_list:text-nowrap gap-1 @max-xs/nav_list:static @min-sm/nav_list:absolute 
        @max-xs/nav_list:right-0 @min-md/nav_list:text-[1rem] @min-sm/nav_list:right-3 @max-sm/nav_list:text-[.7rem] @max-md/nav_list:text-[.7rem]'>
          <h1 className='m-2'>Hi, {username}</h1>
          {username == "Guest" && <button className='@max-xss/nav_list:p-1 @max-xss/nav_list:w-max @min-xss/nav_list:p-2 @min-xss/nav_list:w-max @max-md/nav_list:w-18 
          @max-xss/nav_list:h-7 @min-xss/nav_list:h-7 @max-sm/nav_list:h-9 @min-sm/nav_list:h-9 @max-md/nav_list:h-10 ring-1 rounded-md' onClick={() => setloginModelOpen(true)}>Log In</button>}
          {username !== "Guest" && <button className='@max-xss/nav_list:p-1 @max-xss/nav_list:w-max @min-xss/nav_list:p-2 @min-xss/nav_list:w-max @max-md/nav_list:w-18 
          @max-xss/nav_list:h-7 @min-xss/nav_list:h-7 @max-sm/nav_list:h-9 @min-sm/nav_list:h-9 @max-md/nav_list:h-10 ring-1 rounded-md' onClick={() => Logout()}>Log Out</button>}
          <Modal
            isOpen={loginModelOpen}
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeLoginModal}
            style={customLoginStyles}
            contentLabel="Login User Modal"
          >
            <button onClick={closeLoginModal}>close</button>
            <div className='text-2xl'>Login</div>
            <form id='userloginform' className='loginform_style grid border-2 gap-2 p-5'>
              <div className='flex justify-end'>
                <label htmlFor="email">Email :</label>
                <input type="text" name="email" id="email" />
              </div>
              <div className='flex justify-center'>
                <label htmlFor="password">Password :</label>
                <input type="password" name="password" id="password" />
              </div>
              <input className='w-16 ring-2 place-self-center' onClick={(e) => handleLogin(e)} type="submit" value="Login" />
            </form>
          </Modal>

          <button className='@max-xss/nav_list:p-1 @max-xss/nav_list:w-max @min-xss/nav_list:p-2 @min-xss/nav_list:w-max @max-md/nav_list:w-18 
          @max-xss/nav_list:h-7 @min-xss/nav_list:h-7 @max-sm/nav_list:h-9 @min-sm/nav_list:h-9 @max-md/nav_list:h-10 ring-1 rounded-md' onClick={() => setregisterModelOpen(true)}>Sign up</button>

          <Modal
            isOpen={registerModelOpen}
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeRegisterModal}
            style={customLoginStyles}
            contentLabel="Register User Modal"
          >
            <button onClick={closeRegisterModal}>close</button>
            <div>Registeration form</div>
            <form id='userRegisterForm' className='Registerform_style grid border-2 gap-2 p-5'>

              <div className='flex justify-center'>
                <label htmlFor="fname">FirstName :</label>
                <input className='ring-2' type="text" name="firstname" id="fname" />
              </div>
              <div className='flex justify-center pl-1'>
                <label htmlFor="lname">LastName :</label>
                <input className='ring-2' type="text" name="lastname" id="lname" />
              </div>
              <div className='flex justify-end'>
                <label htmlFor="email">Email :</label>
                <input className='ring-2' type="text" name="email" id="email" />
              </div>
              <div className='flex justify-center pl-2'>
                <label htmlFor="password">Password : </label>
                <input className='ring-2' type="password" name="password" id="password" />
              </div>

              <input className='w-16 ring-2 place-self-center' onClick={(e) => handleRegisterForm(e)} type="submit" value="Register" />
        
            </form>
          </Modal>

        </div>
      </header>

      <nav className='navbar'>
        <ul className='navlist flex w-full @min-6xl/nav_list:gap-30 @min-5xl/nav_list:gap-20 @min-5xl/nav_list:p-[.8rem]
             @min-xl/nav_list:p-[.4rem] @min-xl/nav_list:justify-center @min-xl/nav_list:mr-6 @min-xl/nav_list:gap-8
             @min-xss/nav_list:pl-4 @min-xss/nav_list:gap-4 @max-sm/nav_list:pl-2 @max-md/nav_list:p-[.8rem] @min-sm/nav_list:text-[.9rem] @min-sm/nav_list:mr-14 @min-sm/nav_list:pl-1
             @max-sm/nav_list:justify-start @max-md/nav_list:justify-start @max-sm/nav_list:text-sm 
             @max-sm/nav_list:gap-2 @md/nav_list:text-[1.2rem] @max-md/nav_list:gap-2'>
          <li><Link to='/' style={{ textDecoration: 'none' }}>Home</Link></li>
          <li><Link to='/contact' style={{ textDecoration: 'none' }}>Contact Us</Link></li>
          <li><Link to='/about' style={{ textDecoration: 'none' }}>About</Link></li>
          <li onClick={() => handleViewCart()}>View Cart</li>
        </ul>
        {username !== "Guest" && <CartPopup />}
      </nav>
    </div>
  )
}

export default Header