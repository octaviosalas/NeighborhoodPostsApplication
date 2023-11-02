import express from "express"
const surveyRoutes = express.Router()
import { saveSurvey } from "../controllers/survey.controllers.js";


surveyRoutes.post("/saveSurvey", saveSurvey)



export default surveyRoutes;