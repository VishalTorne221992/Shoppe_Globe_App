import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addCartItem, updateTotalPrice } from '/src/utils/cartSlice.js'

function ProductDetail() {

    const params = useParams();
    
    let id = parseInt(params.id)
    let dispatch = useDispatch();

    const [details, setDetails] = useState()

    function getProducts(){
      let localProducts = JSON.parse(localStorage.getItem('products'))
      return localProducts.products;
    }

    // Get products from the catalog of redux
    let ProductsData = useSelector(store => store.catalog.products);
  
    // Get products or get it from local storages
    let products = ProductsData.products || getProducts();

    console.log('products',products)

    useEffect(() => {

      // get the product only when there is change only in params id
      const findProducts = () => {

        let productsofCategory = products.filter(p => {
             if(p.category === params.name){
               return p;
             }
             return;
        })
  
        return productsofCategory;
      }
  
      const cat_Products = findProducts();
  
      const productDetail = cat_Products.filter(c => c.id === id)

      setDetails(productDetail[0])

    }, [params, products, id])
    
      function handleAddItem() {
    
        let newItem = {
          id: details.id,
          sname: details.title,
          img: details.images[0],
          price: details.price,
          quantity: 1,
          ItemTotalPrice: details.price
        }
    
        dispatch(addCartItem(newItem))
        dispatch(updateTotalPrice(details.price))
        
      }
  
    console.log('prdo deta',details)
    
  
  return (
    <div className='@container h-dvh border-2 bg-blue-100 flex justify-center'>

        {details && <div className='Product_Detail_card flex w-[40em] h-[25em] mt-14 bg-white shadow-lg shadow-black'>
          <div className="detailImg w-[50%] h-full flex justify-center items-center">
              <img className='w-[100%] h-[100%] object-contain p-2' src={details.images[1]} alt={details.title} />
          </div>
          <div className="P_details w-[50%] h-full flex flex-col gap-2 m-5">
               <div className='font-bold underline'>{details.title}</div>
               <div className="details_description"><span className='font-semibold'>Description : </span>{details.description}</div>
               <div className="rating"><span className='font-semibold'>Rating :</span>Rating : {details.rating}</div>
               <div className="warranty"><span className='font-semibold'>Warranty : </span>{details.warrantyInformation}</div>
               <div className="shippinginfo"><span className='font-semibold'>Shipping Info : </span>{details.shippingInformation} </div>
               <div className="returnPolicy font-semibold">{details.returnPolicy}</div>
               <button className='btnCart w-36 h-10 rounded-md
              bg-red-800 text-md font-bold text-white mt-3' onClick={() => handleAddItem()}>
          Add item to Cart</button>
          </div>

      </div>}
        
    </div>
  )
}

export default ProductDetail