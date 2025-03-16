import React from 'react'
import { useSelector } from 'react-redux';
import CategoryCard from './CategoryCard';
import { categories } from '../utils/categories.js'

function MainCategories() {

    // Get category and products from the catalogslice
    let ProductsData = useSelector(store => store.catalog.products);
    

  return (
    <div className='@container/main_cat flex justify-center items-center flex-wrap gap-8 mt-6 m-3'>
       {categories && categories.map(category => {
        return <CategoryCard key={category} category={category}/>
       })}
    </div>
  )
}

export default MainCategories