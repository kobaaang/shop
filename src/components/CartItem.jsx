import React from 'react'
import { CiSquareMinus, CiSquarePlus, CiSquareRemove } from "react-icons/ci";
import { addOrUpdateToCart, removeFromCart } from '../api/firebase';
import { useQueryClient, useMutation } from '@tanstack/react-query';

export default function CartItem({ product, product: { id, image, title, options, price, quantity }, uid }) {
   console.log('멀까요', product)


   const queryClient = useQueryClient()
   const addOrUpdatePlus = useMutation((product) =>
      addOrUpdateToCart(uid, { ...product, quantity: quantity + 1 }),
      {
         onSuccess: () => queryClient.invalidateQueries(['carts', uid])
         //carts키를 가진 쿼리를 무효화(+uid를 확인하고 바로 업데이트 해줘!)
      });
   const addOrUpdateMinus = useMutation((product) =>
      addOrUpdateToCart(uid, { ...product, quantity: quantity - 1 }),
      {
         onSuccess: () => queryClient.invalidateQueries(['carts', uid])
         //carts키를 가진 쿼리를 무효화(+uid를 확인하고 바로 업데이트 해줘!)
      });
   const removeCart = useMutation(() =>
      removeFromCart(uid, id), {
      onSuccess: () => queryClient.invalidateQueries(['carts', uid])
   });


   const handleMinus = () => {
      if (quantity < 2) return;
      //if(quantity<2)return; quantity가 1일때는 더이상 마이너스가 안 되게 1이 되면 return으로 밖으로 내보낸다
      addOrUpdateMinus.mutate(product)
   }
   const handlePlus = () => {
      addOrUpdatePlus.mutate(product)//즉시 작동하게 Mutations사용해서 바로바로 업데이트 되게 설정

      // addOrUpdateToCart(uid,{...product,quantity:product.quantity+1} )
      // porduct를 풀고 그안에 quantitly에서 quantity에서 수량을 하나 추가해서 넣는다
   }
   //삭제함수
   const handleDelect = () => removeCart.mutate(uid, id)


   return (
      <li className='flex justify-between mb-8'>
         <img className='w-48' src={image} alt="title" />
         <div className='flex-1 ml-4'>
            <div>
               <p className='text-sm mt-28'>{title}</p>
               <p className='text-xs mt-3'>SIZE: {options}</p>
               <p className='text-xs mt-3'>KRW {price}</p>
            </div>
            <div className='flex items-center gap-2 text-xl'>
               {/* 수량 더하고 뺄 수 있는 button quantity:수량임 */}
               <CiSquareMinus className='text-slate-400 cursor-pointer' onClick={handleMinus} />
               <span className='ml-2'>{quantity}</span>
               <CiSquarePlus className='text-slate-400 cursor-pointer' onClick={handlePlus} />
               <CiSquareRemove className='text-2xl cursor-pointer' onClick={handleDelect} />
            </div>
         </div>
      </li>
   )
}
