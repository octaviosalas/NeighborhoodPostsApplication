import express from "express"
const commentsRoutes = express.Router()


commentsRoutes.post("/saveComment")
commentsRoutes.get("/getPublicationComments/:id")
commentsRoutes.get("/getAllMyComments")
commentsRoutes.put("/editComment/")
commentsRoutes.delete("/deleteMyComment/:id")




export default commentsRoutes;