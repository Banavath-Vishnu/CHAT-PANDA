import {useState, useEffect} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { io } from "socket.io-client";

import Login from "./components/Login.jsx"
import Application from "./components/Application.jsx"
import Profile from "./components/Profile.jsx"

import authContext from './context/authContext.js'

import {  Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [user, setUser] = useState({})
  const [selectedContact, setSelectedContact] = useState({});
  const [socket, setSocket] = useState();

  useEffect(() => {
    const socket = io("http://localhost:3000");
    
    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
    
    socket.on('reconnect', () => {
      console.log('Reconnected to server');
      // Rejoin room if user is logged in
      if (user.email) {
        socket.emit('join', user.email);
      }
    });
    
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  // Join user's room when user state changes
  useEffect(() => {
    if (socket && user.email) {
      socket.emit('join', user.email);
    }
  }, [user.email, socket]);

  return (
    <BrowserRouter>
    <authContext.Provider value={{
          user, setUser, selectedContact, setSelectedContact, socket } }>  
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/application' element={<Application />} />
      <Route path='*' element={< Navigate to='/' replace={true}/>} />
    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="light"
      transition={Flip}
    />
    </authContext.Provider>
    </BrowserRouter>
  )
}

export default App
