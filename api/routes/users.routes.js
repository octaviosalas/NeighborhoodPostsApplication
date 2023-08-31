import express from "express"
const usersRoutes = express.Router()
import { registerNewAccount, login } from "../controllers/users.controllers.js"

usersRoutes.post("/registerNewUser", registerNewAccount)
usersRoutes.get("/getUserData/:id")
usersRoutes.post("/login", login)
usersRoutes.put("/modifiedUserData/:id")


export default usersRoutes;