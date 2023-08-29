import express from "express"
const usersRoutes = express.Router()

usersRoutes.post("/registerNewUser")
usersRoutes.get("/getUserData/:id")
usersRoutes.post("/login")
usersRoutes.put("/modifiedUserData/:id")


export default usersRoutes;