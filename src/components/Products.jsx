import React from 'react'
import {useQuery} from '@tanstack/react-query';
import { getProduct } from '../api/firebase';
import ProductCard from './ProductCard';


export default function Products() {

   //usequery(외부 라이브러리):usestate여러개 관리, 외부API사용하는데 특화되어 있다 
   //isLoading, error, data:products 기본 요소
   //data:products:필수 요소 data를 담음

   const { isLoading, error, data:products } = useQuery(['product'],getProduct)
   console.log('프로덕트',products)


   return (
      <div className='w-full max-w-screen-2xl m-auto py-16 md:py-32'>
         { isLoading && <p>Loading...</p>}
         {error && <p>{error} 😣 </p>}
         <h2 className='text-1xl pb-4 font-bold'>WOOYOOUNGMI BEST COLLECTION</h2>
         <ul className='grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8 lg:gap-6 lg:gap-y-12'>
            {/* products가 있으면 mpa으로 돌려서 productCard로 넘김 */}
            {products && products.map(product=><ProductCard key={product.id} product={product}/>)}
         </ul>
      </div>

   )
}
