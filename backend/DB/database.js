import mongoose from 'mongoose'

const URL = "YOUR_MONGO_URL"

const connection = () => {
    mongoose.connect(URL).then(() => {
        console.log('Database connected Successfully')
    }).catch ((err) => {
        console.log('error in connecting to database\n', err.message)
    })
    
}

export default connection;
