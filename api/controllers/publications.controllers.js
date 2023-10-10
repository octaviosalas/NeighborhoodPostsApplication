import Publications from "../models/publications.js"
import Favorites from "../models/favorites.js"
import SharedPublications from "../models/shared.js"


export const savePublication = async (req, res) => { 
   
    const {creatorName, creatorId, publicationDate, publicationImages, publicationTitle, typeOfPublication, creatorLocation, address, creatorProfileImage, publicationDescription} = req.body
    console.log(req.body)
    

    try {
       const saveNewPub = new Publications ( { 
         creatorName: creatorName,
         creatorId: creatorId,
         publicationDate: publicationDate,
         publicationImages: publicationImages,
         publicationTitle: publicationTitle,
         typeOfPublication: typeOfPublication,
         creatorLocation: creatorLocation,
         address: address,
         creatorProfileImage: creatorProfileImage,
         publicationDescription: publicationDescription
       })
       saveNewPub.save()
                 .then((saved) => { 
                  res.json({message: "The Publication was Posted Succesfully!", saved})
                 })
                 .catch((err) => { 
                  console.log(err)
                 })
    } catch (error) {
      console.log(error)
    }
}

export const getAllPublications = async (req, res) => { 
   Publications.find()
               .then((pubs) => { 
                  res.send(pubs)
               })
               .catch((err) => { 
                  console.log(err)
               })
}

export const getUserPublications = async (req, res) => { 
   const {userId} = req.params
   console.log(req.params)

   Publications.find({creatorId: userId})
               .then((pubs) => { 
                  res.send(pubs)
               })
               .catch((err) => { 
                  console.log(err)
               })
}



export const myPublications = async (req, res) => { 
   
   const {userId} = req.params

   Publications.find({creatorId: userId})
               .then((pubs) => { 
                  res.json(pubs)
               })
               .catch((err) => { 
                  console.log(err)
               })
}


export const getPublicationWithParam = async (req, res) => { 
   const { searchParam } = req.params;
   console.log("RECIBI", req.params)
   const regex = new RegExp(searchParam, 'i');
 
   Publications.find({
     $or: [
       { creatorName: regex },
       { publicationTitle: regex }, 
       { typeOfPublication: regex },   
       { creatorLocation: regex},
       { address: regex}
     ],
   })
     .then((results) => {
       res.json(results);
     })
     .catch((err) => console.log(err));
}


export const getOnePublication = async (req, res) => { 
   const {publicationId} = req.params

   Publications.find({_id: publicationId})
               .then((pub) => { 
                  res.json(pub)
               })
               .catch((err) => { 
                  console.log(err)
               })
}

export const savePubInFavs = async (req, res) => { 

    const {publicationId, userId, publicationAddress, publicationCreatorName,
           publicationImages, publicationTitle, publicationDescription, 
           typeOfPublication, creatorLocation, creatorProfileImage, creatorName, likedBy, likedByPhoto} = req.body

     try {
       const newFavPublication = new Favorites({ 
         publicationId, 
         userId, 
         publicationAddress, 
         publicationCreatorName,
         publicationImages, 
         publicationTitle, 
         publicationDescription, 
         typeOfPublication, 
         creatorLocation, 
         creatorProfileImage,
         creatorName,
         likedBy,
         likedByPhoto
       })
       await newFavPublication.save()
                              .then((saved) => { 
                                 res.json({message: "The Publication was saved in your Favorites", saved})
                              })
                              .catch((err) => { 
                                 console.log(err)
                              })
     } catch (error) {
      
     }      
}

export const getFavs = async (req, res) => { 
   const {userId} = req.params
   Favorites.find({userId: userId})
            .then((favs) => { 
               res.json(favs)
            })
            .catch((err) => { 
               console.log(err)
            })
}

export const deleteMyPub = async (req, res) => { 
   const {id} = req.params
   
   try {
      Publications.findOneAndDelete({_id: id})
                  .then((publi) => { 
                     if (publi) {
                        res.json({ message: "The Publication has been deleted", publi });
                     } else {
                        res.status(404).json({ message: "Publication not found" });
                     }
                  })
                  .catch((err) => { 
                     console.log(err)
                  })
   } catch (error) {
      console.log(error)
   }
}

export const sharePublication = async (req, res) => { 
    const {publicationId} = req.params
      const {sharer, sharerId, sharerProfileImage, publicationCreatorId, publicationCreatorName, 
      publicationCreatorProfileImage, sharingDate, comment, pubDate, categoryPub, publicationImages, publicationDescription, publicationTitle, publicationUbication, publicationAddress} = req.body
    console.log(req.body)
    console.log(sharerProfileImage)

    try {
      const newPublicationToShareInMyWall = new SharedPublications({ 
         sharer,
         sharerId,
         sharerProfileImage,
         publicationCreatorId,
         publicationCreatorName,
         publicationCreatorProfileImage,
         sharingDate,
         comment,
         publicationId,
         publicationImages,
         pubDate,
         categoryPub,
         publicationDescription,
         publicationTitle,
         publicationAddress,
         publicationUbication

       })
       await newPublicationToShareInMyWall.save()
                                          .then((saved) => { 
                                             res.json({message: "The Publication was shared in your Wall", saved})
                                          })
                                          .catch((err) => { 
                                             console.log(err)
                                          })

    } catch (error) {
      console.log(error)
    }
}

export const mySharedPublications = async (req, res) => { 
   const {userId} = req.params
   SharedPublications.find({sharerId: userId})
                     .then((pubs) => { 
                        res.json(pubs)
                     })
                     .catch((err) =>  {
                        console.log(err)
                     })
}

export const getSharedNumber = async (req, res) => { 
   console.log("Me llego", req.params)
    const {publicationId} = req.params
    SharedPublications.find({publicationId: publicationId})
                      .then((pubs) => { 
                        res.json(pubs)
                      })
                      .catch((err) => { 
                        console.log(err)
                      })
}

export const getPublicationLikes = async (req, res) => { 
    const {publicationId} = req.params
    Favorites.find({publicationId: publicationId})
             .then((favs) => { 
               res.json(favs)
             })
             .catch((err) => { 
               console.log(err)
             })
}