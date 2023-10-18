import mongoose from "mongoose";
const { Schema } = mongoose;


const commentsSchema = mongoose.Schema( { 
   
    senderName: { 
        type: String
    },
    senderId: { 
        type: String
    },
    senderProfileImage: { 
        type: String
    },
    publicationId: { 
        type: String
    },
    addresseeName: { 
        type: String
    },
    addresseeId: { 
        type: String
    },
    commentDate: { 
        type: String
    },
    comment: { 
        type: String
    },
    commentLikesReceived: [{
        likerName: {
            type: String
        },
        likerProfileImage: {
            type: String
        },
        likerId: { 
            type: String
        }
    }]


   
})

const Comments = mongoose.model("Comments", commentsSchema)

export default Comments;
