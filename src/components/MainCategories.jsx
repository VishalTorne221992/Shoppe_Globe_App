import React from 'react'
import { useSelector } from 'react-redux';
import CategoryCard from './CategoryCard';

function MainCategories() {

    let ProductsData = useSelector(store => store.catalog.products);
    let categories = useSelector(store => store.catalog.categories);

    let products = ProductsData.products;

  return (
    <div className='flex justify-center items-center flex-wrap gap-3 mt-6'>
       {categories && categories.map(category => {
        return <CategoryCard key={category} category={category}/>
       }
       )}
    </div>
  )
}

export default MainCategories