import React from 'react'

export default function Button({onClick, text}) {
   return (
      <button className='bg-brand text-black md:py-2 md:px-4 hover:bg-slate-200 text-sm ' onClick={onClick}>{text}</button>
   )
}
