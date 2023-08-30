import express from "express"
const publicationsRoutes = express.Router()
import { savePublication, getAllPublications } from "../controllers/publications.controllers.js"

publicationsRoutes.post("/saveNewPublication", savePublication)
publicationsRoutes.get("/getMyPublications/:id")
publicationsRoutes.get("/getOtherUsersPublications", getAllPublications)
publicationsRoutes.put("/changePublicationData/:id")
publicationsRoutes.delete("/deleteMyPublication/:id")
publicationsRoutes.post("/saveMyComment")



export default publicationsRoutes;