import express from "express"
const commentsRoutes = express.Router()
import { saveComment } from "../controllers/comments.controllers.js"



commentsRoutes.post("/saveComment", saveComment)
commentsRoutes.get("/getPublicationComments/:id")
commentsRoutes.get("/getAllMyComments")
commentsRoutes.put("/editComment/")
commentsRoutes.delete("/deleteMyComment/:id")




export default commentsRoutes;