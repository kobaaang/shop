import React from 'react';
import Products from '../components/Products';

export default function AllProducts() {
   return (
      <>
         <h2 className='pl-2 pt-36 text-center pb-8'>WOOYOUNGMI 인기 컬렉션</h2>
         <Products />
      </>
   )
}

//내가 담은(firebase에) 상품 보여주는 곳~~~
