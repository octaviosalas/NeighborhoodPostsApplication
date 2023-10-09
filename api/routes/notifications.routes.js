import express from "express"
const notificationsRoutes = express.Router()
import {saveNotification, searchingNotifications, markAsRead} from "../controllers/notifications.controllers..js"

notificationsRoutes.post("/saveNewNotification", saveNotification)
notificationsRoutes.get("/getMyNotifications/:userId", searchingNotifications)
notificationsRoutes.put("/markAsRead/:notificationId", markAsRead)

export default notificationsRoutes;