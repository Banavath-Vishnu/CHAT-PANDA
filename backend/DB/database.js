import mongoose from 'mongoose'

const URL = "mongodb+srv://vishnubhanavath:vicky@chatpanda.mw2wu4d.mongodb.net/?retryWrites=true&w=majority&appName=ChatPanda"

const connection = () => {
    mongoose.connect(URL).then(() => {
        console.log('Database connected Successfully')
    }).catch ((err) => {
        console.log('error in connecting to database\n', err.message)
    })
    
}

export default connection;