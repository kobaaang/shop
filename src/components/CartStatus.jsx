import React from 'react'
import { PiHandbagSimpleBold } from "react-icons/pi";
import { useAuthContext } from '../components/context/AuthContext';
import { getCart } from '../api/firebase';
import {useQuery} from '@tanstack/react-query';



export default function CartStatus() {
   //현재 사용자가 누구인지 알아오는 함수
   const {uid} = useAuthContext();
   const {data:products} =useQuery(['carts', uid || ''],()=> getCart(uid),{staleTime:1000});    
   //data  >>> product로 이름 바꿈 staleTime:1000*5 1초동안 캐시값을 가져올 것임ㅇㅅㅇ;
   //Mutations :react-query 변화를 바로 적용해준다 시간을 정해주지 않으면 작동을 하지 않는다
   //uid || '' 아무런 값이 없을 때는 공백
   // const {data:products} =useQuery(['carts', uid || ''],()=> getCart(uid),{staleTime:1000}); mutate를 쓰려면 query와 키값이 같아야하는데 그렇게 해주기위해서 이렇게 만듬
   console.log('cartstatus data', products);

   return (
      <div>
         <PiHandbagSimpleBold />
         {products && (<p className='text-sm absolute top-10'>{products.length}</p>)}
      </div>
   )
}
