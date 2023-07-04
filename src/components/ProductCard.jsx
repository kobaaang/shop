import React from 'react'
import { useNavigate } from "react-router-dom";

//분해의 분해함
export default function ProductCard({product, product:{id,image,title,price,category}}) {
   const navigate  = useNavigate();
   return (
      //navigate는 콜백함수형태 product/detail로 넘겨준다
      <li onClick={()=>{navigate(`./products/:${id}`,{state:{product}} )}}//key=state 
         className='' >
         <img className='w-full cursor-pointer h-96' src={image} alt=''/>
         <div className='flex justify-between mt-6 mb-2'>
            <h3 className='truncate text-xs w-64 cursor-pointer'>{title}</h3>{/*text over view  : truncate*/}
            <p className='text-sm'>{`KRW ${price}`}</p>
         </div>
         <p className='text-sm text-slate-400'>{category}</p>
      </li>
   )
}
