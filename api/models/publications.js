import mongoose from "mongoose";
const { Schema } = mongoose;


const publicationsSchema = mongoose.Schema( { 
    creatorName: { 
        type: String,
        required: true
    }, 
    creatorId: { 
        type: String,
        required: true,
        unique: true
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
   


})

const Publications = mongoose.model("Publications", publicationsSchema)

export default Publications;
