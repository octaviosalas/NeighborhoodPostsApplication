import Comments from "../models/comments.js"

export const saveComment = async (req, res) => { 
    
    const {senderName, senderId, senderProfileImage, publicationId, addresseeName, addresseeId, commentDate, comment} = req.body
    
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