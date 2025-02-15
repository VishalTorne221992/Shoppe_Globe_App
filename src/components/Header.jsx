import React from 'react'
import { useSelector } from 'react-redux'
import { CartPopup } from './CartPopup'
import { Link } from 'react-router-dom'

function Header() {


  return (
    <div className='@container/nav_list'>
        <header>
              <h1 className='logo p-2 pl-10'>Shoppe Globe</h1>
        </header>
        
        <nav className='navbar'>
             <ul className='navlist flex w-full @min-6xl/nav_list:gap-30 @min-5xl/nav_list:gap-20 @min-5xl/nav_list:p-[.8rem]
             @min-xl/nav_list:p-[.4rem] @min-xl/nav_list:justify-center @min-xl/nav_list:gap-8
             @max-sm/nav_list:pl-3 @max-md/nav_list:p-[.6rem] 
             @max-sm/nav_list:justify-start @max-md/nav_list:justify-start @max-sm/nav_list:text-sm 
             @max-sm/nav_list:gap-2 @md/nav_list:text-[1.2rem] @max-md/nav_list:gap-2'>
              <li><Link to='/' style={{textDecoration:'none'}}>Home</Link></li>
              <li><Link to='/contact' style={{textDecoration:'none'}}>Contact Us</Link></li>
              <li><Link to='/about' style={{textDecoration:'none'}}>About</Link></li>
              <li><Link to='/Cart' style={{textDecoration:'none'}}>View Cart</Link></li>
             </ul>
             <CartPopup />
        </nav>
    </div>
  )
}

export default Header