import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    sender : {
        type:String,
        required:true
    },
    reciever : {
        type:String,
        required: true
    },
    message : {
        type: String,
        required:true
    },
    senderName : {
        type: String,
        required:true
    },
    recieverName : {
        type: String,
        required:true
    },
    type: {
        type:String,
        enum:['text', 'file']
    }
},{
    timestamps:true
}
)

const conversations = new mongoose.model('usersMessages', messageSchema);

export default conversations;