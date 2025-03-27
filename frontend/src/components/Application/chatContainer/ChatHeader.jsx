import React,{useContext} from 'react'

import Avatar from 'react-avatar'
import { IoMdExit } from "react-icons/io";

import authContext from '../../../context/authContext.js'

import {formatDate} from './timeConversion.js'

const ChatHeader = ({setChatterProfileDialog}) => {

    const {selectedContact, setSelectedContact, user} = useContext(authContext)

  return (
    <div className='w-full h-24 bg-slate-200 flex flex-row p-4 justify-between items-center'>
        <div className="flex justify-center items-center">
          <div className="p-1 rounded-full shadow-lg bg-slate-50 flex h-fit">
        <Avatar size='65' round={true} name={selectedContact.name} src={selectedContact.profilePic} onClick={() => setChatterProfileDialog(p => !p)}  /></div>
        <div className="ml-5">
        <p className='font-semibold text-zinc-900 text-lg'>{selectedContact.name} <span className={`${user.email === selectedContact.email? 'ml-4 text-xs text-zinc-400 italic':'hidden'}`}>message Yourself</span></p>
        <p className='text-zinc-500 text-xs'>member since : {formatDate(selectedContact.createdAt)}</p>
        </div>
       
        
    
       
        </div>
        <div className="flex items-center"><p className='text-xs mr-8 font-semibold italic text-slate-400'>{selectedContact.email}</p>
        <div className="p-2 hover:bg-slate-50 transition-all cursor-pointer flex justify-center items-center rounded-3xl" onClick={() => setSelectedContact({})}>
            <IoMdExit size='30' />
        </div>
        </div>
 
    </div>
  )
}

export default ChatHeader