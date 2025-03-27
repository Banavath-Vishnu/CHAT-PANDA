import React,{useContext, useEffect, useState} from 'react'
import authContext from '../../context/authContext.js'

import { useNavigate } from 'react-router-dom'

import LeftScreen from './Leftscreen/LeftScreen.jsx'
import EmptyChat from './EmptyChat.jsx'

import { toast } from 'react-toastify'

import {getUserDetails} from '../../backendconnection/backendapi.js'
import AddContact from './AddContact.jsx'
import ChatContainer from './chatContainer/ChatContainer.jsx'
import ChatterProfile from './ChatterProfile.jsx'

const Messender = () => {
  const {user, setUser, selectedContact} = useContext(authContext)

  const navigate = useNavigate()
  const [addUserDialog,setAddUserDialog] = useState(false);
  const [chatterProfileDialog,setChatterProfileDialog] = useState(false);


  useEffect(() => {
    const getProfilefromDBc = async () => {
      
     const response = await getUserDetails();
 
    if(response.status === 201) {
     toast.error(response.data.message)
     console.log(response.status)
     return navigate('/');
    }
 
    setUser(prev => ({ ...prev,
     name:response.data.name,
     email:response.data.email,
     bio:response.data.bio,
     profilePic:response.data.profilePic,
     profileSetup:response.data.profileSetup
    }))
    }
 
    getProfilefromDBc()
     
   },[setUser])
  return (
    <div className='flex w-full h-screen overflow-hidden'>
    <LeftScreen user={user} setAddUserDialog={setAddUserDialog} />
    <div className="p-0.5 bg-slate-50"> </div>
    {Object.keys(selectedContact).length === 0?<EmptyChat />:<ChatContainer setChatterProfileDialog={setChatterProfileDialog}  />}    
    <AddContact addUserDialog={addUserDialog} user={user} setAddUserDialog={setAddUserDialog} />
    <ChatterProfile setChatterProfileDialog={setChatterProfileDialog} chatterProfileDialog={chatterProfileDialog} />
    </div>
  )
}

export default Messender