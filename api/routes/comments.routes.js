import express from "express"
const commentsRoutes = express.Router()
import { saveComment, getMyComments, getMyCommentsSent, sendResponseToOneComment, viewPublicationComments, likeComment, deleteMyLike, deleteMyResponse } from "../controllers/comments.controllers.js"



commentsRoutes.post("/saveComment", saveComment)
commentsRoutes.get("/getPublicationComments/:userId", getMyComments)
commentsRoutes.post("/saveResponseToComment/:commentId", sendResponseToOneComment)
commentsRoutes.delete("/deleteMyResponse/:commentId/:responseId", deleteMyResponse)
commentsRoutes.get("/getAllMyComments")
commentsRoutes.get("/getMyCommentsSent/:userId", getMyCommentsSent)
commentsRoutes.delete("/deleteMyComment/:id")
commentsRoutes.get("/viewPublicationComments/:idPublication", viewPublicationComments)
commentsRoutes.post("/likeComment/:commentId", likeComment)
commentsRoutes.delete("/deleteLikeComment/:commentId/:likeId", deleteMyLike)




export default commentsRoutes;