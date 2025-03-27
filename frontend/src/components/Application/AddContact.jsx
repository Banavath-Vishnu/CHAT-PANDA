
import React, { useState, useCallback } from 'react';
import Avatar from 'react-avatar';
import logo from '../../assets/logo.png';
import { IoIosCloseCircle } from 'react-icons/io';
import { addAllContacts } from '../../backendconnection/backendapi.js';
import NewContactList from './NewContactList.jsx';
// import PropTypes from 'prop-types';

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const AddContact = ({ addUserDialog, user, setAddUserDialog }) => {
    const [searchedContact, setSearchedContact] = useState('');
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const debouncedSearch = useCallback(
        debounce(async (query) => {
            if (query === '') {
                setContacts([]);
                setSearchedContact('');
                return;
            }
            setLoading(true);
            try {
                const results = await addAllContacts(query);
                setContacts(results);
            } catch (err) {
                setError('Failed to fetch contacts');
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchedContact(value);
        debouncedSearch(value);
    };

    return (
        <div className={`absolute bg-[#00000055] w-full h-screen flex justify-center items-center ${addUserDialog ? "" : "hidden"}`}>
            <div className="w-2/5 h-4/5 bg-slate-50 flex flex-col justify-center">
                <div className="w-full h-16 bg-slate-200 flex justify-between items-center px-10">
                    <div>
                        <p className='font-semibold text-sm text-zinc-600'>Add Contacts</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="p-4">
                            <Avatar src={user.profilePic} name={user.name} round={true} size={45} className='shadow-md bg-slate-400' />
                            <span className='text-xs font-semibold ml-2'>{user.name}</span>
                        </div>
                        <IoIosCloseCircle size={35} className='cursor-pointer' onClick={() => setAddUserDialog(prev => !prev)} />
                    </div>
                </div>

                <div className="w-full p-4 bg-slate-100 flex justify-center items-center">
                    <input
                        type="search"
                        className='w-4/5 h-10 p-4 bg-slate-200 rounded-xl text-sm focus:outline-none'
                        placeholder='Search with Email'
                        onChange={handleSearch}
                        value={searchedContact}
                    />
                </div>

                <div className="w-full flex flex-col flex-1 bg-slate-200 p-4">
                    {searchedContact !== '' ? (
                        <div className='flex w-full h-full'>
                            <div className="w-full h-full">
                                {loading ? (
                                    <div className="w-full h-full flex justify-center mt-10">
                                   <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute">
                                   </div>
                                   </div>
                                ) : error ? (
                                    <p className='text-red-500'>{error}</p>
                                ) : (
                                    contacts.map((contact, index) => (
                                        <NewContactList contact={contact} key={index} setAddUserDialog={setAddUserDialog} />
                                    ))
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center flex-col items-center flex-1">
                            <img src={logo} alt="" className='w-2/5 p-4 border-4 border-slate-50 rounded-full transition-transform hover:rotate-2' />
                            <p className='text-sm font-bold text-zinc-500 mt-10'>Search for Contacts</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// AddContact.propTypes = {
//     addUserDialog: PropTypes.bool.isRequired,
//     user: PropTypes.shape({
//         profilePic: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//     }).isRequired,
//     setAddUserDialog: PropTypes.func.isRequired,
// };

export default AddContact;
