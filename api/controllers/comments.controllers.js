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

export const likeComment = async (req, res) => { 
    const { commentId } = req.params;
    const { likerName, likerProfileImage, likerId } = req.body;
    console.log("El cuerpo que llega es: ", req.body)
    console.log("El ID del comentario es ", commentId)

    try {
        const comment = await Comments.findOne({ _id: commentId });

        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }

        comment.commentLikesReceived.push({
            likerName,
            likerProfileImage,
            likerId
        });

        const updatedComment = await comment.save();
        return res.status(200).json(updatedComment);
    } catch (error) {
        return res.status(500).json({ message: "Error al dar like al comentario", error: error.message });
    }
 }

 export const deleteMyLike = async (req, res) => {
    const commentId = req.params.commentId;
    const likeId = req.params.likeId;

    try {
        const comment = await Comments.findOne({ _id: commentId });

        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        const likeIndex = comment.commentLikesReceived.findIndex(like => like._id == likeId);

        if (likeIndex === -1) {
            return res.status(404).json({ message: "Like no encontrado en el comentario" });
        }

        comment.commentLikesReceived.splice(likeIndex, 1);

        const updatedComment = await comment.save();
        
        return res.status(200).json({message: "Like Eliminado", updatedComment});
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar el Like del comentario", error: error.message });
    }
}