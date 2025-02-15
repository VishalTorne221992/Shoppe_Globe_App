import React from 'react'
import { Link } from 'react-router-dom'

function CategoryCard(props) {
  
  return (
    <>
      <div className='card flex flex-col justify-center items-center shadow-sm shadow-black @min-5xl/main_cat:w-[20em]'>
          <Link to={`/category/${props.category}`} style={{textDecoration:'none', cursor:'auto'}}>
          <img className='object-cover w-72 h-56' src={`/${props.category}.jpg`} alt=""/>
          <h1 className='text-center font-bold capitalize text-xl '>{props.category}</h1>
          </Link>
      </div>
    </>
  )
}

export default CategoryCard