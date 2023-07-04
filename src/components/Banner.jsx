import React from 'react'

export default function Banner() {
   return (
      <section className='relative top-12'>
         <div className=''>
            <img className='hidden md:block w-full' src="./images/Group 1.jpg" alt="pc" />
            <img className='md:hidden' src="./images/banner_m3.jpg" alt="mobile" />
         </div>
         <div className='absolute top-1/2 m-auto md:top-1/2 w-full text-center' >
            {/* <img className='w-3/1 m-auto' src="./images/wooyoungmi-logo.png" alt="" /> */}
            <p className='text-white'></p>
         </div>
      </section>
   )
}
