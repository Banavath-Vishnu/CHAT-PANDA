import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import {createServer} from 'http'
import path from 'path'
import { fileURLToPath } from 'url';

import connection from './DB/database.js'
import route from './routes/routes.js';
import socketConnection from './socket.js';

const app = express()
const Server = createServer(app)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname,'./uploads')))
app.use('/fileMessage', express.static(path.join(__dirname,'./fileMessage')));



connection();


app.use('/', route)

Server.listen(3000, () => {
    console.log('Server is running on port 3000')
})

socketConnection(Server);


