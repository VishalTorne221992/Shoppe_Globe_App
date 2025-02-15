import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import appstore from './utils/appstore.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './components/Error.jsx'
import MainCategories from './components/MainCategories'
import Cat_ProductsPage from './components/Cat_ProductsPage.jsx';
import CartPage from './components/CartPage.jsx';
import ProductDetailError from './components/ProductDetailError.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import Checkout from './components/Checkout.jsx';

// enable lazy loading for the some components
const About = lazy(() => import('./components/About.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'))

// defining routes for the application
const appRouter = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    errorElement: <Error/>,
    children: [
      {
        path:"/",
        element: <MainCategories />
      },
      {
        path:"/about",
        element: <Suspense fallback={<div>Loading.....</div>}><About /></Suspense>
      },
      {
        path:"/contact",
        element: <Suspense fallback={<div>Loading.....</div>}><Contact/></Suspense>
      },
      {
        path:"/Cart",
        element: <CartPage />
      },
      {
        path:"/category/:name",
        element: <Cat_ProductsPage />,
      },
      {
        path:"/category/:name/:id",
        element: <ProductDetail />,
        errorElement: <ProductDetailError />
      },
      {
        path:"/Cart/checkout",
        element: <Checkout />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(

  <Provider store={appstore}>
    <StrictMode>
    <RouterProvider router={appRouter} />
    </StrictMode>
  </Provider>
)
