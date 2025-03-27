import React,{useContext} from 'react'
import authContext from '../../../context/authContext.js'
import { convertToHHMM } from './timeConversion.js';


const MessageChat = ({message}) => {

    const {user} = useContext(authContext);

  return (
    <div className="w-full h-full px-2 py-0.5 relative">
    <div className={`${message.sender === user.email?'justify-end':'justify-start'} w-full flex after:content-[''] after:absolute after:h-full after:-top-1/2
    after:translate-y-1/2 after:bg-slate-800 after:w-[2px] `}>
        <div className="w-fit max-w-[65%] whitespace-break-spaces text-wrap overflow-hidden ">  
        <p className={`${message.sender === user.email?'mr-4':'ml-4 bg-slate-200'} rounded-2xl p-4 border-2 border-slate-50 shadow-md `}>{message.message}</p>
        <p className={`text-xs italic mt-1 ${message.sender === user.email?'text-left ml-4':'text-right mr-4'}`}>{convertToHHMM(message.createdAt)}</p>
        </div> 
        </div>
        </div>
  )
}

export default MessageChat

 