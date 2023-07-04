import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { addOrUpdateToCart } from '../api/firebase';
import { useAuthContext } from '../components/context/AuthContext';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export default function ProductDetail() {

   //context에서 적용이 된 함수에  uid(userid)를 사용 할 것임

   //현재 사용자가 누구인지 알아오는 함수
   const {uid} = useAuthContext();

   const {state: {product: {category,id,image,options,price,title}}} = useLocation();
   //state안에 product안에 category,description,id,image,option,price,title를 구조분해해서 가져온다
   // console.log('useLocationaa?',aa) 

   const [selected, setSelected] =useState(options && options[0]);
   //초기값을 options 중의 첫 번째 값으로 설정 options && options[0]

   //useQuery Mutation사용: 실시간 업데이트를 위해서~!~!~!~!~!~!~!~!\
   //addOrUpdateToCart 함수가 작동시 바로바로 업데이트 하게 할 것임
   
   const [success,setSuccess] = useState();  //성공표시

   const queryClient = useQueryClient()

   const addOrUpdateItem = useMutation((product)=>addOrUpdateToCart(uid,product),
   {
      onSuccess:() => {
         queryClient.invalidateQueries(['carts', uid])
         //cart키를 가진 query를 무효화(+uid를 확인하고 바로 업데이트 해조) status.jsx와 같이 봐라
      }
   }
   )
   //const addOrUpdateItem = useMutation((addOrUpdateToCart에서 사용하는 키값)=>addOrUpdateToCart(uid,product))
   //queryClient.invalidateQueries([query key 값이 들어간다])


   const handleSelect = (e) => {
      setSelected(e.target.value)
      console.log('select에서 발생하는 이벤트',e.target.value)
      //움직일 때 마다 setSelected가 작동

   }
   const handleClick = (e) => {
       //장바구니추가 버튼
      //firebase.js 의 addOrUpdateToCart함수 확인
      //Mutations :react-query 변화를 바로 적용해준다
      const product = {id, image, options:selected, price, title, quantity:1} 
      addOrUpdateItem.mutate(product,{
         onSuccess:() => {
            setSuccess('장바구니에 추가완룡')
            setTimeout(()=>{
               setSuccess(null)
            },3000)
         }
      })
      // addOrUpdateToCart(uid, product)
      //사용자의 id를 가져와야함
      
   }

   return(
      <div className='w-full max-w-screen-2xl py-24 mb:py-40 m-auto'>
         <section className='flex flex-col md:flex-row'>
            <img className='w-full max-w-3xl basis-7/12' src={image} alt="title" />
            <div className='w-full basis-5/12 flex flex-col p-8 md:p-0'>
               <p className='text-slate-700'>{category}</p>
               <h1 className='text-2xl font-bold py-6'>{title}</h1>
               <p className='text-xl pt-4 pb-10 text-red-700 border-b border-gray-400'>{`KRW ${price}`}</p>
               <div>
                  <label className='text-slate-950' htmlFor="select">옵션</label>
                  <select name="" id="select" onChange={handleSelect} value={selected}>
                     {/* selected 선택한 값을 알 수 있는 함수 */}
                     {options && options.map((option, index)=>(
                        <option key={index}>{option}</option>
                     )).reverse()}
                  </select>
               </div>
               {success && (<p className='text-center text-2xl pb-6'>{success}</p>)}
               <Button onClick={handleClick} text="장바구니에 추가"/>
            </div>
         </section>
      </div>
   ) 
}

//여기가 무슨 페이지일꼬...입력하는 페이지