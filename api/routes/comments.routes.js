import express from "express"
const commentsRoutes = express.Router()
import { saveComment, getMyComments, getMyCommentsSent, sendResponseToOneComment, viewPublicationComments, likeComment } from "../controllers/comments.controllers.js"



commentsRoutes.post("/saveComment", saveComment)
commentsRoutes.get("/getPublicationComments/:userId", getMyComments)
commentsRoutes.post("/saveResponseToComment", sendResponseToOneComment)
commentsRoutes.get("/getAllMyComments")
commentsRoutes.get("/getMyCommentsSent/:userId", getMyCommentsSent)
commentsRoutes.delete("/deleteMyComment/:id")
commentsRoutes.get("/viewPublicationComments/:idPublication", viewPublicationComments)
commentsRoutes.post("/likeComment/:commentId", likeComment)




export default commentsRoutes;