import mongoose from "mongoose";
const { Schema } = mongoose;


const publicationsSchema = mongoose.Schema( { 
    creatorName: { 
        type: String,
        required: true
    }, 
    creatorId: { 
        type: String
    },
    publicationDate: { 
        type: String, 
        required: true
    },
    publicationImages: {
        type: [String]
      },
    publicationTitle: { 
        type: String,
        required: true
    },
    publicationDescription: { 
        type: String
    },
    typeOfPublication: { 
        type: String,
        required: true
    },
    creatorLocation: { 
        type: String
    },
    address: { 
        type: String,
        required: true
    },
    creatorProfileImage: { 
        type: String
    },
    resolved: {
        type: Boolean,
        default: false,
      },
      resolvedImages: {
        type: [String],
        default: [],
      },
      resolvedComment: {
        type: String,
        default: "",
      },
   
   
})

const Publications = mongoose.model("Publications", publicationsSchema)

export default Publications;
