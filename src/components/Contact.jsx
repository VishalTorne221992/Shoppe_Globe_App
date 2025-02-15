import React from 'react'

export default function Contact() {

  return (
    <div className='@container/contact bg-blue-100 flex flex-col items-center border-2 w-full h-dvh'>
      <div className='font-bold text-4xl m-2'>Contact Us</div>

      <div className='contact_form bg-yellow-100 flex justify-center items-center border-2 w-[95%] @max-xss/contact:p-1 @max-sm/contact:p-0
      @min-mdx/contact:p-8 @min-xs/contact:pt-5 @max-xss/contact:pt-5'>
        <form className='grid @max-xss/contact:gap-5 @min-xs/contact:gap-5 m-auto @min-mdx/contact:p-8 @max-xss/contact:p-0 @max-sm/contact:p-0 place-items-center gap-y-2 w-[18rem]
        @max-sm/contact:w-[30rem] @min-sm/contact:w-[40rem] @max-md/contact:w-[40rem] @min-mdx/contact:w-[60rem]'>

          <div className='space-x-2'>
            <label className='font-bold @min-xss/contact:w-[12rem] @max-xs/contact:w-[12rem] @min-2xl/contact:w-[25rem]' htmlFor="">First Name :</label>
            <input className='bg-white @max-xss/contact:w-[10rem] @min-xss/contact:w-[11rem] place-self-center
          @min-smx/contact:w-[14rem] @max-md/contact:w-[14rem] @min-mdx/contact:w-[22rem] @min-2xl/contact:w-[25rem]
          @max-sm/contact:w-[11rem] border-2 rounded-md' type="text" name="fname" id="fname" />
          </div>

          <div className='space-x-2'>
            <label className='font-bold @max-xs/contact:w-[12rem]' htmlFor="">Last Name :</label>
            <input className='@max-xss/contact:w-[10rem] bg-white
            @min-smx/contact:w-[14rem] @max-md/contact:w-[14rem] @min-mdx/contact:w-[22rem] @min-2xl/contact:w-[25rem]
            @min-xss/contact:w-[11rem] @max-sm/contact:w-[11rem] border-2 rounded-md' type="text" name="lname" id="lname" />
          </div>

          <div className='space-x-2'>
            <label className='font-bold @max-xs/contact:w-[12rem]' htmlFor="">Email :</label>
            <input className='@max-xss/contact:w-[10rem] ml-[38px] bg-white
            @min-smx/contact:w-[14rem] @max-md/contact:w-[14rem] @min-mdx/contact:w-[22rem] @min-2xl/contact:w-[25rem]
            @min-xss/contact:w-[11rem] @max-sm/contact:w-[11rem] border-2 rounded-md' type="email" name="lname" id="lname" />
          </div>

          <div className='space-x-2'>
            <label className='font-bold @max-xs/contact:w-[12rem]' htmlFor="">Message :</label>
            <textarea cols='30' rows='5' className='@max-xss/contact:w-[10rem] align-middle ml-3.5 bg-white
            @min-smx/contact:w-[14rem] @max-md/contact:w-[14rem] @min-mdx/contact:w-[22rem] @min-2xl/contact:w-[25rem]
            @min-xss/contact:w-[11rem] @max-sm/contact:w-[11rem] border-2 rounded-md' type="email" name="lname" id="lname" />
          </div>

          <input type="button" value="Submit" 
          className='ring-2 @max-xss/contact:p-1 @max-xss/contact:w-[6rem] @max-xss/contact:h-[2.5rem] w-[5rem] h-[2.5rem] font-bold bg-red-200 p-2 rounded-md' />

        </form>
      </div>
    </div>
  )
}
