import express from "express"
const usersRoutes = express.Router()
import { registerNewAccount, login, getUserData, editPhoto, changeUserData, getAllUsersData } from "../controllers/users.controllers.js"

usersRoutes.post("/registerNewUser", registerNewAccount)
usersRoutes.get("/getUserData/:userId", getUserData)
usersRoutes.post("/login", login)
usersRoutes.put("/changeUserData/:userId", changeUserData)
usersRoutes.put("/changeUserPhoto/:userId", editPhoto)
usersRoutes.get("/allUsersData", getAllUsersData)


export default usersRoutes;