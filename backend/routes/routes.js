import express from 'express'
import multer from 'multer'


import {signUpController, loginController, profileSetup, imageSetUpContrller, deleteImageController, getUserDetailsController,     deleteUserController, logOutController } from '../controllers/authController.js'
import {addAllContacts, getMessageFromDb, getDirectContacts} from '../controllers/messageController.js'


import {verifyToken} from '../middleWares/authMiddleWare.js'

const route = express.Router();


 const upload = multer({dest: './uploads'})

route.post('/loginUser', loginController);

route.post('/signUpUser', signUpController);

route.get('/getUserDetails', verifyToken, getUserDetailsController);


route.put('/profileSetup',verifyToken, profileSetup);

route.post('/imageSetUp', upload.single('userProfileImage'), verifyToken, imageSetUpContrller);

route.put('/deleteImage', verifyToken, deleteImageController);

route.delete('/deleteUser', verifyToken , deleteUserController);

route.get('/logOutUser',verifyToken,   logOutController);

// messaging routes and all contact routes

route.get('/search', verifyToken, addAllContacts);

// route.post('/messages/:senderId/:recieverId', saveMessagestoDb)

route.get('/messages/:sender/:reciever', getMessageFromDb)

// route.post('/fileMessage',upload.single('documentMessage'), postFileMessageController)

route.get('/contacts/getDirectContacts', verifyToken ,getDirectContacts)







export default route;