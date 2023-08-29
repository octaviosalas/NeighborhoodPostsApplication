import express from "express"
const publicationsRoutes = express.Router()
import { savePublication } from "../controllers/publications.controllers.js"

publicationsRoutes.post("/saveNewPublication", savePublication)
publicationsRoutes.get("/getMyPublications/:id")
publicationsRoutes.post("/getOtherUserPublications")
publicationsRoutes.put("/changePublicationData/:id")
publicationsRoutes.delete("/deleteMyPublication/:id")
publicationsRoutes.post("/saveMyComment")



export default publicationsRoutes;