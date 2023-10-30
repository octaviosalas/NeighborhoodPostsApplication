import Survey from "../models/survey.js";

export const saveSurvey = async (req, res) => { 
    
   const {userName, userProfileImage, userId, location, securityLevel, streetsLevel, cleaningLevel, lightingLevel, transitLevel, opinion} = req.body
    
    try {
        const newSurveyToBeSaved = new Survey({ 
            userName,
            userProfileImage,
            userId,
            location,
            securityLevel,
            streetsLevel,
            cleaningLevel,
            lightingLevel,
            transitLevel,
            opinion
        })
        newSurveyToBeSaved.save()
                          .then((sur) => { 
                            res.json({message: "The survey has been saved!", sur})
                          })
                          .catch((err) => { 
                            console.log(err)
                          })
    } catch (error) {
       console.log(err)
       req.send("The survey has not been saved.")
    }
}