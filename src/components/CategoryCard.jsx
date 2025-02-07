import React from 'react'
import { Link } from 'react-router-dom'

function CategoryCard(props) {
  
  return (
    <>
      <div className='card border-2 flex flex-col'>
          <Link to={`/category/${props.category}`} style={{textDecoration:'none', cursor:'auto'}}>
          <img className='object-cover w-72 h-56' src={`/public/${props.category}.jpg`} alt=""/>
          <h1>{props.category}</h1>
          </Link>
      </div>
    </>
  )
}

export default CategoryCard