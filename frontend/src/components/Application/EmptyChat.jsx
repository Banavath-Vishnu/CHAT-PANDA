import React from 'react'
import Logo from '../../assets/logo.png'

const EmptyChat = () => {
  return (
    <div className='flex flex-col select-none justify-center items-center border-4 border-slate-200 bg-slate-200 w-3/4'>
        <img src={Logo} alt="" className='h-2/4 p-4 border-4 border-slate-50 rounded-full transition-transform hover:rotate-2' />
        <p className='font-bold my-4'>Tap on a Contact To start Chatting</p>
    </div>
  )
}

export default EmptyChat