import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import NewProduct from './pages/NewProduct';
import ProductDetail from './pages/ProductDetail';
import MyCart from './pages/MyCart';
import ProtectedRoute from './components/ProtectedRoute';



const router = createBrowserRouter([
   {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: [
         { index: true, path: '/', element: <Home /> },
         { path: '/products', element: <AllProducts /> },
         { path: '/products/new', element: (
         <ProtectedRoute requireAdmin={true}>
            <NewProduct />
         </ProtectedRoute>) 
         },//admin만 접속 가능 한 번 걸러주는 작업필요
         { path: '/products/:id', element: <ProductDetail /> },
         { path: '/cart', element: (<ProtectedRoute><MyCart /></ProtectedRoute>) }//admin만 접속 가능 한 번 걸러주는 작업필요<MyCart />를 childern요소로 넣어준다
      ]
   }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
