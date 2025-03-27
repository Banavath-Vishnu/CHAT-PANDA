import mongoose from 'mongoose'

import bcrypt from 'bcrypt'

const newUserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    },
    profileSetup: {
        type: Boolean,
        default: false
    },
    bio: {
        type:String,
        default:''
    }
},{
    timestamps:true
}
)

newUserSchema.pre("save", async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
   });
 
  

const NewUser = mongoose.model('users', newUserSchema)

export default NewUser;