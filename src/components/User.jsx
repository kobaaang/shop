import React from 'react'

export default function User({user:{displayName
,photoURL
}}) {
   // console.log('user',user)
   return (
      <div className='flex items-center shrink-0'>
         <img className='w-10 h-10 rounded-full mr-2 font-bold' src={photoURL} alt={photoURL}/>
         <span className='hidden md:block'>{displayName}</span>
      </div>
   )
}