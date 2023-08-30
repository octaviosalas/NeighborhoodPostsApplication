import express from "express"
const usersRoutes = express.Router()
import { registerNewAccount } from "../controllers/users.controllers.js"

usersRoutes.post("/registerNewUser", registerNewAccount)
usersRoutes.get("/getUserData/:id")
usersRoutes.post("/login")
usersRoutes.put("/modifiedUserData/:id")


export default usersRoutes;