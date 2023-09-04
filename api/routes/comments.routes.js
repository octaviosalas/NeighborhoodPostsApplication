import express from "express"
const commentsRoutes = express.Router()
import { saveComment, getMyComments, getMyCommentsSent } from "../controllers/comments.controllers.js"



commentsRoutes.post("/saveComment", saveComment)
commentsRoutes.get("/getPublicationComments/:userId", getMyComments)
commentsRoutes.get("/getAllMyComments")
commentsRoutes.get("/getMyCommentsSent/:userId", getMyCommentsSent)
commentsRoutes.put("/editComment/")
commentsRoutes.delete("/deleteMyComment/:id")




export default commentsRoutes;