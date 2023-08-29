import express from "express"
const publicationsRoutes = express.Router()

publicationsRoutes.post("/saveNewPublication")
publicationsRoutes.get("/getMyPublications/:id")
publicationsRoutes.post("/getOtherUserPublications")
publicationsRoutes.put("/changePublicationData/:id")
publicationsRoutes.delete("/deleteMyPublication/:id")
publicationsRoutes.post("/saveMyComment")



export default publicationsRoutes;