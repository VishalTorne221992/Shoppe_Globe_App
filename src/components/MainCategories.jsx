import React from 'react'
import { useSelector } from 'react-redux';
import CategoryCard from './CategoryCard';

function MainCategories() {

    // Get category and products from the catalogslice
    let ProductsData = useSelector(store => store.catalog.products);
    let categories = useSelector(store => store.catalog.categories);

    let products = ProductsData.products;

  return (
    <div className='@container/main_cat flex justify-center items-center flex-wrap gap-8 mt-6 m-3'>
       {categories && categories.map(category => {
        return <CategoryCard key={category} category={category}/>
       }
       )}
    </div>
  )
}

export default MainCategories