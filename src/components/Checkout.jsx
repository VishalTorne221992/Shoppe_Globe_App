import React from 'react'
import { useSelector } from 'react-redux'

function Checkout() {

  let CartTotalPrice = useSelector(state => state.Cart.Total_Price)

  return (
    <div className='@container/checkout h-full border-2 bg-blue-100 flex justify-center'>

      <div className='Cart_style w-[50em] h-[50em] bg-white m-3 shadow-lg shadow-black'>

        <div className="Checkoutheader w-full h-[3.5em] flex flex-col justify-center pl-5 font-extrabold text-2xl text-white bg-[#070738]"> Checkout Page </div>

        <div className='flex flex-col @max-sm/checkout:gap-5 @max-md/checkout:gap-10 
        min-[767px]:m-8 min-[767px]:text-2xl min-[767px]:gap-10
        @max-sm/checkout:m-6 @max-md/checkout:m-10'>
          <div className='@max-sm/checkout:text-[1rem] @max-md/checkout:text-3xl font-bold'>Your Total Amount to Pay is : <span className='text-red-700'>Rs. {CartTotalPrice.toFixed(2)}</span> </div>

          <button className="payout_btn min-[767px]:text-lg
           w-[16rem] h-[2.4rem] font-extrabold rounded-2xl
           border-2 bg-green-800 text-white">Continue to Payment</button>

        </div>
      </div>

    </div>
  )
}

export default Checkout