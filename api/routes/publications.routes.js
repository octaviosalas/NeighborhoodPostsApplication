import express from "express"
const publicationsRoutes = express.Router()
import { savePublication, getAllPublications, myPublications, getPublicationWithParam, getOnePublication, savePubInFavs } from "../controllers/publications.controllers.js"

publicationsRoutes.post("/saveNewPublication", savePublication)
publicationsRoutes.get("/getMyPublications/:userId", myPublications)
publicationsRoutes.get("/getOtherUsersPublications", getAllPublications)
publicationsRoutes.get("/getPublicationsWithParams/:searchParam", getPublicationWithParam)
publicationsRoutes.get("/getOnePublication/:publicationId", getOnePublication)
publicationsRoutes.put("/changePublicationData/:id")
publicationsRoutes.delete("/deleteMyPublication/:id")
publicationsRoutes.post("/markAsFavorite", savePubInFavs)



export default publicationsRoutes;