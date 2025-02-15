import Header from "./components/Header"
import './css/Shoppe_Globe_Main_css.css'
import { useEffect, useState } from 'react'
import { useFetch } from "/src/utils/useFetch"
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from "react-router-dom"
import {fetchProductsData, fetchCategoriesData} from './utils/catalogSlice.js'



function App() {

  let cart = useSelector(state => state.Cart.items)
  let totalPrice = useSelector(state => state.Cart.Total_Price)
  let dispatch = useDispatch();

  useEffect(() => {
     dispatch(fetchCategoriesData());
     dispatch(fetchProductsData());
  },[dispatch]);

  // let ProductsData = useSelector(store => store.catalog.products);
  // let categories = useSelector(store => store.catalog.categories);

  // console.log('products',ProductsData.products);
  // console.log('categories',categories);
  console.log("Items in cart", cart);
  console.log('total Price of cart',totalPrice)
  
  
  return (
    <div className='main'>
      <Header />
      <Outlet />
    </div>
  )
}

export default App
