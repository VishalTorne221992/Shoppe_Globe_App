import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../utils/useFetch';
import ProductCard from './ProductCard';

function Cat_ProductsPage() {

    const data = useParams();
    let cat_name = data.name;

    const [Category_Products, setCategory_Products] = useState([])

    const resp = useFetch(`https://dummyjson.com/products/category/${cat_name}`);
    
    useEffect(() => {
      
      setCategory_Products(resp.products)

    }, [resp, cat_name])
    
    console.log('cat prod',Category_Products)

  return (
    <div className='Cat_Products_wrapper border-2 flex flex-auto flex-wrap gap-3
     justify-center items-center w-full basis-0'>
             
        {Category_Products && Category_Products.map(cat_prod => {
            return <ProductCard key={cat_prod.id} cat_products={cat_prod}/>
        })}
        
    </div>
  )
}

export default Cat_ProductsPage