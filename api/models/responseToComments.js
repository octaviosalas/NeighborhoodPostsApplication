import mongoose from "mongoose";
const { Schema } = mongoose;


const responseToCommentsSchema = mongoose.Schema( { 
   
    senderName: { 
        type: String
    },
    senderId: { 
        type: String
    },
    senderProfileImage: { 
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
    targetCommentId: { 
        type: String
    }


   
})

const ResponseToComments = mongoose.model("ResponseToComments", responseToCommentsSchema)

export default ResponseToComments;
