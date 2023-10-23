import express from "express"
const publicationsRoutes = express.Router()
import { savePublication, getAllPublications, myPublications, getPublicationWithParam, getOnePublication, savePubInFavs,
getFavs, deleteMyPub, sharePublication,  mySharedPublications, getSharedNumber, getUserPublications, getPublicationLikes, 
deleteFavorite, deleteSharedPublication, markPublicationAsResolved} from "../controllers/publications.controllers.js"

publicationsRoutes.post("/saveNewPublication", savePublication)
publicationsRoutes.get("/getMyPublications/:userId", myPublications)
publicationsRoutes.get("/getOtherUsersPublications", getAllPublications)
publicationsRoutes.get("/getUserPublication/:userId", getUserPublications)
publicationsRoutes.get("/getPublicationsWithParams/:searchParam", getPublicationWithParam)
publicationsRoutes.get("/getOnePublication/:publicationId", getOnePublication)
publicationsRoutes.put("/changePublicationData/:id")
publicationsRoutes.delete("/deleteMyPublication/:id", deleteMyPub)
publicationsRoutes.post("/markAsFavorite", savePubInFavs)
publicationsRoutes.get("/getMyFavs/:userId", getFavs)
publicationsRoutes.delete("/deleteFav/:id", deleteFavorite)
publicationsRoutes.post("/sharePublication/:publicationId", sharePublication)
publicationsRoutes.get("/getMySharedPublications/:userId", mySharedPublications)
publicationsRoutes.get(`/getSharedNumber/:publicationId`, getSharedNumber)
publicationsRoutes.delete("/deleteMyShared/:id", deleteSharedPublication)
publicationsRoutes.get(`/getPublicationsLikes/:publicationId`, getPublicationLikes)
publicationsRoutes.post(`/markPublicationAsResolved/:publicationId`, markPublicationAsResolved)


export default publicationsRoutes;