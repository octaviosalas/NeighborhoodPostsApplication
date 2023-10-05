import express from "express"
const usersRoutes = express.Router()
import { registerNewAccount, login, getUserData } from "../controllers/users.controllers.js"

usersRoutes.post("/registerNewUser", registerNewAccount)
usersRoutes.get("/getUserData/:userId", getUserData)
usersRoutes.post("/login", login)
usersRoutes.put("/modifiedUserData/:id")


export default usersRoutes;