import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logo.png';
import Avatar from 'react-avatar';
import { IoMdLogOut } from 'react-icons/io';
import { BiUserPlus } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { logOutUser, getDirectContacts } from '../../../backendconnection/backendapi.js';
import DMContact from './DMContact.jsx';

const LeftScreen = ({ user, setAddUserDialog }) => {
  const navigate = useNavigate();
  const [dmContact, setDmContact] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getDMContacts = async () => {
      try {
        const { data } = await getDirectContacts();
        setDmContact(data);
      } catch (error) {
        toast.error('Failed to fetch contacts');
      } finally {
        setLoading(false);
      }
    };
    getDMContacts();
  }, []);

  const handleLogOut = async () => {
    try {
      let response = await logOutUser();
      toast.success(response.message);
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredContacts = Object.keys(dmContact).filter(key =>
    dmContact[key].name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className='top-header-brand h-screen w-1/4 flex flex-col'>
      <div className='flex select-none flex-row justify-start w-full text-center bg-slate-200 p-4'>
        <img src={Logo} alt="" className='w-16 p-1 border border-slate-50 bg-slate-50 ml-10 shadow-md rounded-full' />
        <div className="flex flex-col items-center justify-center">
          <p className='font-bold text-2xl ml-2 text-center tracking-widest'>Chat Panda</p>
          <p className='text-xs font-semibold text-zinc-400'>Simple and Dynamic</p>
        </div>
      </div>
      <div className="searchbar p-2 flex justify-center items-center">
        <input
          type="search"
          className='w-5/6 bg-slate-100 h-10 rounded-full p-4 text-sm focus:outline-none'
          placeholder='search contacts'
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="bg-slate-300 p-[1px] shadow-md"></div>
      <div className="flex-1 bg-slate-200 p-4">
        {loading ? (
          <p>Loading...</p>
        ) : filteredContacts.length > 0 ? (
          filteredContacts.map((key) => <DMContact key={key} contact={dmContact[key]} />)
        ) : (
          <div className="flex flex-col justify-center items-center"><img src={Logo} className='w-2/6' alt="" />
          <p className='text-sm italic mx-4'>No Contacts found on search term <span className='text-slate-400'>{searchTerm}</span></p></div>
        )}
      </div>
      <div className="bg-slate-50 p-[1px] shadow-xl"></div>
      <div className="lower-user-profiles p-4 w-full bg-slate-200">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center justify-center select-none">
            <div className="p-0.5 bg-slate-50 rounded-full">
              <Avatar
                name={user.name}
                src={user.profilePic}
                title="Tap to Edit Profile"
                round={true}
                size='55'
                color='#f5f5f5'
                fgColor="black"
                className="shadow-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate('/profile')}
              />
            </div>
            <p className='font-medium mx-5'>{user.name}</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="cursor-pointer p-2 hover:bg-slate-50 rounded-full mr-1" onClick={() => setAddUserDialog(prev => !prev)}>
              <BiUserPlus size='30px' />
            </div>
            <div className="cursor-pointer p-2 hover:bg-slate-50 rounded-full" onClick={handleLogOut}>
              <IoMdLogOut size='25px' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftScreen;
