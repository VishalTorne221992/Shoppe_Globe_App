import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../utils/useFetch';
import ProductCard from './ProductCard';

function Cat_ProductsPage() {

  const params = useParams();
  let cat_name = params.name;

  const [text, setText] = useState("")
  const [Category_Products, setCategory_Products] = useState([])
  const [filtered, setFiltered] = useState(Category_Products);
  const [searchFlag, setSearchFlag] = useState(false);

  const { data, error } = useFetch(`https://dummyjson.com/products/category/${cat_name}`);


  useEffect(() => {

    setCategory_Products(data.products)

  }, [data, cat_name])

  function handleChange(e) {

    setText(e.target.value)
    setSearchFlag(true)

    const filter = Category_Products.filter(c_product => {
      return c_product.title.toLowerCase().includes(text.toLowerCase());
    })
    console.log('sflag', filter, searchFlag)
    setFiltered(filter);

  }

  function handleSearch() {

    setSearchFlag(true)

    const filter = Category_Products.filter(c_product => {
      return c_product.title.toLowerCase().includes(text.toLowerCase());
    })

    setFiltered(filter);

  }


  return (
    <div className='@container/cat_products'>
      <div className="searchproducts flex justify-around border-2
       @min-5xl/cat_products:justify-start @min-5xl/cat_products:pl-8 @min-5xl/cat_products:p-1
       @min-xl/cat_products:justify-start @min-xl/cat_products:pl-6 items-center @max-md/cat_products:ml-2">

        <label className='font-bold @min-xl/cat_products:text-lg @min-5xl/cat_products:text-xl
        @max-sm/cat_products:text-xs @max-md/cat_products:text-xs' htmlFor="productSearchInput">Search Products :</label>
        
        <input className='border-2 border-b-blue-950 @max-sm/cat_products:m-3 m-5 
        @min-5xl/cat_products:w-[32em] @min-5xl/cat_products:h-[2.2rem] @min-xl/cat_products:w-[25rem]
        @max-sm/cat_products:w-[10rem] @max-sm/cat_products:h-[1.8rem]
        @max-md/cat_products:w-[13rem] h-[2rem] rounded-md indent-2'
          id='productSearchInput' type="text" onChange={(e) => handleChange(e)} />
        <button className='btnSearch border-2 bg-slate-300 p-1 @min-xl/cat_products:w-[6rem]
        @max-sm/cat_products:w-[4rem] @max-sm/cat_products:h-[2rem]
        @max-sm/cat_products:text-sm @max-md/cat_products:w-[4rem] @max-md/cat_products:text-sm
        @max-md/cat_products:h-[2rem] rounded-sm font-bold' onClick={() => handleSearch()}>Search</button>

      </div>
      <div className='Cat_Products_wrapper w-full 
       @min-5xl/cat_products:flex @min-5xl/cat_products:justify-center @min-5xl/cat_products:items-center
       @min-xl/cat_products:grid @min-xl/cat_products:grid-cols-3 @min-xl/cat_products:gap-5 
       @max-sm/cat_products:flex basis-0 flex-auto flex-wrap @max-sm/cat_products:flex-col
       @max-sm/cat_products:items-center @max-sm/cat_products:border-2 @max-sm/cat_products:flex-nowrap @max-sm/cat_products:gap-0
       @max-md/cat_products:grid @max-md/cat_products:grid-cols-2 @max-md/cat_products:m-2 
       @max-md/cat_products:gap-1 @max-md/cat_products:place-content-center @max-md/cat_products:justify-self-center'>
        {

          searchFlag && text !== "" ? filtered.map(cat_prod => {
            return <ProductCard key={cat_prod.id} cat_products={cat_prod} category={cat_name} />
          }) : Category_Products && Category_Products.map(c_prod => {
            return <ProductCard key={c_prod.id} cat_products={c_prod} category={cat_name} />
          })

        }

      </div>
    </div>
  )
}

export default Cat_ProductsPage