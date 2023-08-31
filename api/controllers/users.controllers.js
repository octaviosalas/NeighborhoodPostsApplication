import User from "../models/users.js"
import bcrypt from "bcrypt"


export const register = async (req, res) => { 
    
   const {name, password, email, telephone, profileImage} = req.body
   console.log(req.body)

   await User.findOne({email})
             .then((user) => { 
               if(user) { 
                   res.json({message: "The email exist in our DataBase. Please, select other"})
               } else if (!name || !email || !password) { 
                   res.json({message: "Data is missing to be able to register. Please complete all fields"})
               } else { 
                   console.log(req.body)
                   bcrypt.hash(password, 10, (err, passwordHash) => { 
                       if(err) res.json({err})
                       else { 
                           const newUser = new User ( { 
                               name: name,
                               password: passwordHash,
                               telephone: telephone,
                               email: email,
                               profileImage: profileImage
                           })
                            newUser.save()
                                   .then((user) => { 
                                       res.json({message: "Usuario creado correctamente", user})     
                                   })
                                   .catch((err) => console.log(err))               
                       }
                   })
               }
             })
}



export const registerNewAccount = async (req, res) => { 
    const {name, email, password, location, profileImage, birthdate} = req.body
    console.log(req.body)
    await User.findOne({email})
               .then((user) => { 
                     if(user) { 
                        res.json({message: "The email exist in our DataBase. Please, select other"})
                     } else if (!name || !email || !password) { 
                        res.json({message: "Data is missing to be able to register. Please complete all fields"})
                     } else { 
                        console.log(req.body)
                        bcrypt.hash(password, 10, (err, passwordHash) => { 
                           if(err) res.json({err})
                           else { 
                                 const newUser = new User ( { 
                                    name: name,
                                    password: passwordHash,
                                    location: location,
                                    email: email,
                                    profileImage: profileImage,
                                    birthdate: birthdate
                                 })
                                 newUser.save()
                                       .then((user) => { 
                                             res.json({message: "Usuario creado correctamente", user})     
                                       })
                                       .catch((err) => console.log(err))               
                           }
                        })
                     }
    })
}


export const login = async (req, res) => { 
   const {email, password} = req.body
   console.log(req.body)

   try {
      let checkUser = await User.findOne({email: email})
      if(!checkUser) { 
         res.json({message: "The Email is not Registered. Please, go to create your Account and try Again!"})
      } else { 
         const hashedPassword = checkUser.password;
         bcrypt.compare(password, hashedPassword)
               .then((samePassword) => { 
                    if(samePassword) { 
                     const {id, name, email, profileImage} = checkUser
                     res.json({
                         id: id,
                         name: name,
                         profileImage: profileImage,
                         email: email                    
                     })
                    } else { 
                     res.json({message: "You typed an incorrect password. You have 2 more tries to Login"})
                    }
               })
      }
   } catch (error) {
      res.send("The data entered is Incorrect. I cant find it")
        console.log(error)
   }

   
   
}