import React,{useContext} from 'react'
import authContext from '../../context/authContext.js'
import Avatar from 'react-avatar'

const NewContactList = ({contact, setAddUserDialog}) => {


    const {user, setSelectedContact} = useContext(authContext)

    const handleSelectedContact = () => {
      setSelectedContact(contact)
      setAddUserDialog(prev => !prev)
      
    }

  return (

         <div className="w-full h-20 bg-slate-100 rounded-3xl px-4 py-2 flex items-center cursor-pointer hover:shadow-md border-4 mb-2 border-slate-50 justify-between hover:bg-zinc-200" onClick={handleSelectedContact}>
            <div className="flex items-center justify-center">
<Avatar src={contact.profilePic} name='v' color='white' fgColor='black' round={true} size='60' className='shadow-md' />
<div className="ml-4">
<p className='text-xl font-bold'>{contact.name}</p>
<p className='text-xs font-semibold'>{contact.bio}</p>
</div>

    </div>
    <div className={`text-xs font-bold text-green-500 ${user.email !== contact.email?'hidden':''}`}>you</div>
    <div className="text-xs font-semibold text-slate-500">{contact.email}</div>
    </div> 
  
  )
}

export default NewContactList