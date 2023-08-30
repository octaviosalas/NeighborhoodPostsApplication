import User from "../models/users.js"

export const registerNewAccount = async (req, res) => { 
    const {name, email, password, location, profileImage, birthdate} = req.body
    
    const newUserToBeRegistered = new User ( { 
        name, 
        email,
        password,
        location,
        profileImage,
        birthdate
    })
    newUserToBeRegistered.save()
                         .then((registered) => { 
                            res.json({message: "Your Account has been created succesfully", registered})
                         })
                         .catch((err) => { 
                            console.log(err)
                         })
}