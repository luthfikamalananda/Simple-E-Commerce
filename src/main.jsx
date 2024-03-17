import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './routes/Login.jsx'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import Header from './components/header.jsx';
import Products from './routes/Products.jsx';
import DetailProduct from './routes/DetailProduct.jsx';
import Checkout from './routes/Checkout.jsx';
import CartProvider from './context/CartProvider.jsx';
import AuthProvider from './context/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "products",
    element: <Products/>
  },
  {
    path: "products/:productId",
    element: <DetailProduct/>,
    loader:  async ({params}) => {
      const getData = await fetch(`https://fakestoreapi.com/products/${params.productId}`);
      const fetchedData = await getData.json()
      console.log('params:', event);
      return fetchedData;
    }
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "checkout",
    element: <Checkout/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router}/>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)
