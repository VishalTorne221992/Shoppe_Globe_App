import React from 'react'

export default function About() {

  return (
    <div className='flex flex-col gap-5 m-5'>
          <header className='text-3xl font-bold'>About Shoppe Globe</header>

          <article className='font-semibold flex flex-col gap-2'> 
            <p>Shoppe Globe is online shopping website with variety of products and categories 
            to choose from and buy.</p>
            <p>We can select the products from the given categories and add it to the Cart and proceed to checkout</p>
            <p>Shoppe Globe website contains variety of products we can select and view details and buy as per our
              convenience.
            </p>
          </article>
          <footer className='font-semibold'>Copyright - 2025</footer>
    </div>
  )
}
