import express from "express"
const notificationsRoutes = express.Router()
import {saveNotification, searchingNotifications} from "../controllers/notifications.controllers..js"

notificationsRoutes.post("/saveNewNotification", saveNotification)
notificationsRoutes.get("/getMyNotifications/:userId", searchingNotifications)

export default notificationsRoutes;