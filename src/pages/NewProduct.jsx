import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { uploaderImage } from '../api/uploader';
import { addNewProduct } from '../api/firebase';



//일반 사용자들은 볼 수 없게 admin만 볼 수 있게
export default function NewProduct() {
   // 고른 이미지가 있으면 미리보기
   const [file, setFile] = useState();//이미지(로컬url)를 임시로 저장해주는 state
   const [product, setProduct] = useState({})//각제품의 모든 입력값을 모아주는 object
   const [isUploading,setIsUploading] =useState(false)//업로드중
   const [success,setSuccess] =useState(true)//업로드 성공표시


   const handleChange = (e) => {
      console.log(e.target.files)
      const { name, value, files } = e.target
      if (name === 'img') {
         setFile(files && files[0])
         return;
      }
      setProduct((product) => ({ ...product, [name]: value }))
      console.log('product??',product)
      //모든 정보를 모아둔 함수 >>> 정보를 모아서 porduct로 보내고 addnewproduct에서 또 받아서 firebase로 보낸다
   }

   //클라우드너리에 이미지를 업로드
   //uploder.js와 연결
   const handleSubmit = (e) => {
      e.preventDefault();
      setIsUploading(true);
      uploaderImage(file)
      .then(url => {
         // console.log('url???', url);
         addNewProduct(product,url)// 파이어베이스에 데이터 자료 입력
         .then(()=>{
            setSuccess(' 🎉 성공적으로 제품이 추가되었습니다 🎉')//제품성공 알림
            setTimeout(()=>{//4초 후에 성공알림 사라지게
               setSuccess(null)
            },4000)
         })
      })//file을 uploader.js안에 함수로 매개변수로 보내준다 then은 console로 url확인해보려고 사용 없어도 됨
      .finally(()=>setIsUploading(false))//주소가 받아지면서 setisuploading을 끝낸다
   }

   return (
      <section className='w-full max-w-xl m-auto pt-32'>
      
         {success ? (<h3 className='text-center text-2xl font-bold pd-6'>상품을 골라 주세욤{success}</h3>):(<h2 className='text-2xl text-center font-bold pb-6'>새로운 제품 등록</h2>)
         }
         {file && <img className=' h-150 mx-auto mb-2' src={URL.createObjectURL(file)} alt='localFile' />}
         <form className='flex flex-col px-12' onSubmit={handleSubmit}>
            <input
               type="file"
               accept='image/*'
               name='img'
               onChange={handleChange} 
               required //비어있는 input이 있으면 안 넘어가지게 막아준다
               />
            <input
               type="text"
               name='title'
               placeholder='제품명'
               onChange={handleChange} 
               // value={product.title ?? ''}  
               required
               />
            <input
               type="number"
               name='price'
               placeholder='가격'
               onChange={handleChange} 
               // value={product.price ?? ''} 
               required
               />
            <input
               type="text"
               name='category'
               placeholder='카테고리'
               onChange={handleChange} 
               // value={product.category ?? ''} 
               required
               />
            <input
               type="text"
               name='description'
               placeholder='제품설명'
               onChange={handleChange}
               // value={product.description ?? ''} 
               required
               />
            <input
               type="text"
               name='option'
               placeholder='옵션들(콤마(,)로 구분)'
               onChange={handleChange} 
               // value={product.options ?? ''}
               required
               />
            <Button text={isUploading ? '업로드 중...' : '제품 등록하기'} />
         </form>
      </section>
   )
}
