import Comments from "../models/comments.js"
import ResponseToComments from "../models/responseToComments.js"

export const saveComment = async (req, res) => { 
    
    const {senderName, senderId, senderProfileImage, publicationId, addresseeName, addresseeId, commentDate, comment} = req.body
    console.log(req.body)
    
    try {
        const commentToBeSaved = new Comments( { 
             senderName: senderName,
             senderId: senderId,
             senderProfileImage: senderProfileImage,
             publicationId: publicationId,
             addresseeId: addresseeId,
             addresseeName: addresseeName,
             commentDate: commentDate,
             comment: comment
        }) 
        commentToBeSaved.save()
                        .then((c) => { 
                            res.json({message: "The comment has been sent", c})
                        })
                        .catch((err) => { 
                            console.log(err)
                        })
    } catch (error) {
        console.log(error)
    }
}

export const getMyComments = async (req, res) => { 
    const {userId} = req.params


    Comments.find({addresseeId: userId})
            .then((com) => { 
                res.json(com)
            })
            .catch((err) => { 
                console.log(err)
            })
}


export const viewPublicationComments = async (req, res) => { 
    const {idPublication} = req.params
    console.log("Me llego algo!", req.params)
    
    Comments.find({publicationId: idPublication})
            .then((comments) => { 
                res.json(comments)
            })
            .catch((err) => { 
                console.log(err)
            })
}



export const getMyCommentsSent = async (req, res) => { 
    const {userId} = req.params

    Comments.find({senderId: userId})
            .then((com) => { 
                res.json(com)
            })
            .catch((err) => { 
                console.log(err)
            })
}

export const sendResponseToOneComment = async (req, res) => { 
   console.log(req.body)
   const {senderName, senderId, senderProfileImage, addresseeId, commentDate, comment, targetCommentId} = req.body

   try {
     const newResponseForComment = new ResponseToComments( { 
        senderName, 
        senderId, 
        senderProfileImage, 
        addresseeId, 
        commentDate, 
        comment, 
        targetCommentId
     })
     newResponseForComment.save()
                           .then((saved) => { 
                            res.json({message: "Yout comment has been Send!", saved})
                           })
                           .catch((err) => { 
                            console.log(err)
                           })
   } catch (error) {
    
   }
}

export const getResponsesToMyComments = async (req, res) => { 
    
 }