import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import appstore from './utils/appstore.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './components/Error.jsx'
import MainCategories from './components/MainCategories'
import Cat_ProductsPage from './components/Cat_ProductsPage.jsx';


const About = lazy(() => import('./components/About.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'))

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
        path:"/category/:name",
        element: <Cat_ProductsPage />
      }
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
