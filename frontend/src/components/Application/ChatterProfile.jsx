import React,{useContext} from 'react'
import authContext from '../../context/authContext.js'
import Avatar from 'react-avatar'

import {convertToReadableDate} from './chatContainer/timeConversion.js'

const ChatterProfile = ({setChatterProfileDialog, chatterProfileDialog}) => {

    const {selectedContact} = useContext(authContext)

  return (
   <>
   
<div className={`absolute bg-[#00000055] w-full h-screen flex justify-center items-center ${chatterProfileDialog?'':'hidden'}`}>
      <div className="relative mt-16  mb-32 max-w-sm mx-auto w-3/4 h-[44%]">
        <div className=" overflow-hidden shadow-md rounded-3xl bg-white w-full h-full ">
          <div className="absolute -mt-16 w-full flex justify-center">
            <div className="h-30 w-30 grid place-items-center rounded-full bg-transparent border-4 border-slate-50">
            <Avatar src={selectedContact.profilePic} name={selectedContact.name} className='rounded-full shadow-md' size='100'  />
            </div>
          </div>
          <div className="px-6 mt-16">
            <h1 className="font-semibold text-xl text-center mb-1">{selectedContact.name}</h1>
            <p className=" italic text-xs text-zinc-400 text-center">{selectedContact.email}</p>
            <p className="text-center text-zinc-600 text-base pt-3 font-normal">
             {selectedContact.bio}
            </p>
            <p className="text-center mt-2 font-semibold">Joined at : {convertToReadableDate(selectedContact.createdAt)}</p>
            <p className="text-center mt-2 italic text-zinc-400">online</p>
          </div>
          <div className="flex justify-center items-center mt-8">
         <button className='px-8 py-2 bg-blue-500 text-slate-50 hover:translate-y-1 transition-transform shadow-lg rounded-3xl'onClick={() => setChatterProfileDialog(p => !p)} >Close</button>
         </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default ChatterProfile