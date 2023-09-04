import express from "express"
const publicationsRoutes = express.Router()
import { savePublication, getAllPublications, myPublications, getPublicationWithParam, getOnePublication, savePubInFavs, getFavs, deleteMyPub } from "../controllers/publications.controllers.js"

publicationsRoutes.post("/saveNewPublication", savePublication)
publicationsRoutes.get("/getMyPublications/:userId", myPublications)
publicationsRoutes.get("/getOtherUsersPublications", getAllPublications)
publicationsRoutes.get("/getPublicationsWithParams/:searchParam", getPublicationWithParam)
publicationsRoutes.get("/getOnePublication/:publicationId", getOnePublication)
publicationsRoutes.put("/changePublicationData/:id")
publicationsRoutes.delete("/deleteMyPublication/:id", deleteMyPub)
publicationsRoutes.post("/markAsFavorite", savePubInFavs)
publicationsRoutes.get("/getMyFavs/:userId", getFavs)


export default publicationsRoutes;