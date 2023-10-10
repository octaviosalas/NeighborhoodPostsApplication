import mongoose from "mongoose";
const { Schema } = mongoose;


const favsSchema = mongoose.Schema( { 
    publicationId: { 
        type: String,
        required: true
    }, 
    userId: { 
        type: String
    },
    publicationAddress: { 
        type: String, 
        required: true
    },
    publicationCreatorName: { 
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
    creatorProfileImage: { 
        type: String
    },
    creatorName: { 
        type: String
    },
    likedBy: { 
        type: String
    },
    likedByPhoto: { 
        type: String
    }
   


})

const Favorites = mongoose.model("Favorites", favsSchema)

export default Favorites;
