import mongoose from "mongoose";
const { Schema } = mongoose;


const sharedSchema = mongoose.Schema( { 
   
    sharer: { 
        type: String
    },
    sharerId: { 
        type: String
    },
    sharerProfileImage: { 
        type: String
    },
    publicationCreatorId: { 
        type: String
    },
    publicationCreatorName: { 
        type: String
    },
    publicationCreatorProfileImage: { 
        type: String
    },
    sharingDate: { 
        type: String
    },
    comment: { 
        type: String
    },
    publicationId: { 
        type: String
    },
    publicationImages : { 
        type: [String]
    },
    pubDate: { 
        type: String
    },
    categoryPub: { 
        type: String
    },
    publicationDescription: { 
        type: String
    },
    publicationTitle: { 
        type: String
    },
    publicationAddress: { 
        type: String
    },
    publicationUbication: { 
        type: String
    }


   
})

const SharedPublications = mongoose.model("SharedPublications", sharedSchema)

export default SharedPublications;
