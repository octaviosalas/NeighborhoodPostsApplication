import mongoose from "mongoose";
const { Schema } = mongoose;


const usersSchema = mongoose.Schema( { 
    name: { 
        type: String,
        required: true
    }, 
    email: { 
        type: String,
        required: true,
        unique: true
    },
    birthdate: { 
        type: String, 
        required: true
    },
    profileImage: {
        type: String
      },
    password: { 
        type: String,
        required: true
    },
    location: { 
        type: String,
        required: true
    }
   


})

const User = mongoose.model("Users", usersSchema)

export default User;
