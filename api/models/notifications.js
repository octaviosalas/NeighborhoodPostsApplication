import mongoose from "mongoose";
import User from "./users.js";
const { Schema } = mongoose;


const notificationSchema = mongoose.Schema( { 
    creator: {
        type: mongoose.Schema.Types.Mixed,
        ref: User,
      },
    typeOfNotification: {
        type: String,
        enum: ['like', 'comment', 'share', 'responseComment'],
      },
    dateNotification: {
        type: String
    },
    message: { 
        type: String,
    },
    isRead: { 
        type: Boolean
    },
    recipientId: { 
        type: String
    },
    recipientName: { 
        type: String
    },
    publicationId: { 
        type: String,
    }
})

const Notifications = mongoose.model("Notifications", notificationSchema)

export default Notifications;
