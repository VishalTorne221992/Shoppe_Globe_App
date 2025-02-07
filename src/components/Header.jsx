import React from 'react'
import { useSelector } from 'react-redux'
import { CartPopup } from './CartPopup'

function Header() {


  return (
    <>
        <header>
              <h1 className='logo'>Shoppe Globe</h1>
        </header>
        <nav className='navbar'>
             <ul className='navlist'>
              <li>Home</li>
              <li>Contact Us</li>
              <li>About</li>
             </ul>
             <CartPopup />
        </nav>
    </>
  )
}

export default Header