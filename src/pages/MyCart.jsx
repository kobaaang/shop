import React from 'react';
import { useAuthContext } from '../components/context/AuthContext';
import { getCart } from '../api/firebase';
import {useQuery} from '@tanstack/react-query';
import CartItem from '../components/CartItem';
import Button from '../components/ui/Button';


export default function MyCart() {
   
   const {uid} = useAuthContext();
   const { isLoading, data:products } = useQuery(['carts', uid || ''],()=> getCart(uid),{ staleTime: 1000 });

   if(isLoading) return <p>Loading....</p>

   const hasProducts = products && products.length > 0 ;       //쇼핑카트에 아이템이 있는 검사

   const totalPrice = products && products.reduce(
      (sum, value)=> sum + (parseInt(value.price) * value.quantity),0)     //상품 총액 확인하는 함수
   // reduce함수 products((총합)=>{요소 하나하나}),0 초기값은 0
   // array의 price들을 계속 더하는 것임 reude함수를 이용

   const SHIPPING = 3000; //배송액 나중에 변경하기 편함



   return (
      <section className='w-full max-w-screen-2xl py-24 mb:py-40 m-auto'>
         <div>
            <h2 className='text-center text-2xl'>쇼핑백</h2>
            <div>
               <ul>
                  {!hasProducts && <p className='text-xl text-center mt-10'>****상품을 담아주세요****</p>}
                  {products && products.map((product)=>(
                     <CartItem  key={product.id} product={product} uid={uid}/>
                  ))}
               </ul>
               <div className='flex justify-between items-center mb-5 px-2 lg:px20'>
                     상품 총액 KRW {totalPrice} 
                     +
                     배송비 KRW {SHIPPING}        {/*문자열을 변수처럼 사용할 때는 대문자로 사용하는 게 원칙임*/}
                     =
                     총가격 : KRW {totalPrice + SHIPPING}
               </div>{/*금액계산*/}
               <div className='ml-2'>
                     <Button text='주문하기' onClick=''/>
               </div>
               
            </div>
         </div>
      </section>
   )
}
