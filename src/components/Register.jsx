import React from 'react'

export default function Register() {
  return (
    <form className='loginform_style grid border-2 gap-2 p-5' action='/login' method='POST'>
                 <div className='flex justify-end'>
                    <label htmlFor="email">Email :</label>
                    <input className='ring-2' type="text" name="email" id="email" />
                 </div>
                 <div className='flex justify-center pl-2'>
                    <label htmlFor="password">Password : </label>
                    <input className='ring-2' type="text" name="password" id="password" />
                 </div>
                 <input className='w-16 ring-2 place-self-center' type="submit" value="Register" />
            </form>
  )
}
