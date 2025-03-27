import axios from 'axios'
const URL = "http://localhost:3000"

// ROUTES FOR AUTHENTICATION AND PROFILE IMAGE HANDLING

export const userLogin = async  (loginDetails) => {
   const response = await axios.post(`${URL}/loginUser`, loginDetails, {withCredentials:true})
  return response
    
}

export const userSignUp = async  (signUpDetails) => {
   const response = await axios.post(`${URL}/signUpUser`, signUpDetails, {withCredentials:true})
   return response
}

export const profileSetup = async  (profileSetup) => {
   const response = await axios.put(`${URL}/profileSetup`, profileSetup, {withCredentials:true})
   return response
}

export const imageSetUp = async (imageSetUp) => {
  const response = await axios.post(`${URL}/imageSetUp`, imageSetUp, {withCredentials:true})
  return response.data
}

export const deleteImage = async () => {
   const response = await axios.put(`${URL}/deleteImage`, {withCredentials:true})
   return response.data
 }

 export const getUserDetails = async () => {
   const response = await axios.get(`${URL}/getUserDetails`, {withCredentials:true})
   return response
 }

 export const deleteUser = async () => {
  const response = await axios.delete(`${URL}/deleteUser`, {withCredentials:true})
  return response.data
}

 export const logOutUser = async () => {
  const response = await axios.get(`${URL}/logOutUser`, {withCredentials:true})
  return response.data
}


// ROUTES FOR CHATTING AND MESSAGE HANDLING

export const addAllContacts = async(searchedContact) => {
 let response = await axios.get(`${URL}/search?q=${searchedContact}`,{withCredentials:true})
return response.data
}



export const getMessageFromDb = async (sender, reciever) => {
 let response =  await axios.get(`${URL}/messages/${sender}/${reciever}`)
  return(response)
}

export const getDirectContacts = async () => {
  let response =  await axios.get(`${URL}/contacts/getDirectContacts`, {withCredentials:true})
  return response
 }

export const fileMessage = async (fileMessage) => {
  const response = await axios.post(`${URL}/fileMessage`, fileMessage)
  return response.data
}