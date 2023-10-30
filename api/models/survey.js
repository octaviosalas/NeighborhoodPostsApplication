import mongoose from "mongoose";
const { Schema } = mongoose;


const surveySchema = mongoose.Schema( { 
    userName: { 
        type: String,
        required: true
    }, 
    userProfileImage: { 
        type: String,
        required: true
    },
    userId: { 
        type: String,
        required: true
    },
    location: { 
        type: String,
        required: true
    },
    securityLevel: { 
        type: String, 
        required: true
    },
    streetsLevel: {
        type: String
      },
    cleaningLevel: { 
        type: String,
        required: true
    },
    lightingLevel: { 
        type: String,
        required: true
    },
    transitLevel: { 
        type: String,
        required: true
    },
    opinion: { 
        type: String,
        required: true
    }
   


})

const Survey = mongoose.model("Survey", surveySchema)

export default Survey;
