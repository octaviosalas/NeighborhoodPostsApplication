import Publications from "../models/publications.js"
import Favorites from "../models/favorites.js"
import SharedPublications from "../models/shared.js"


export const savePublication = async (req, res) => { 
   
    const {creatorName, creatorId, publicationDate, publicationImages, publicationTitle, typeOfPublication, creatorLocation, address, creatorProfileImage, publicationDescription, resolved} = req.body
    console.log(req.body)
    console.log("RECIBI UNA NUEVA PUBLICACION")
    

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
         publicationDescription: publicationDescription,
         resolved: resolved
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
   const { category } = req.params;
   console.log(req.params);
   console.log("RECIBI", req.params);
   const regex = new RegExp(category, 'i');

   if (category !== "Resolved Claims") { 
      Publications.find({
         $or: [
           { creatorName: regex },
           { creatorLocation: regex },
           { publicationTitle: regex }, 
           { typeOfPublication: regex },   
           { address: regex}
         ],
       })
         .then((results) => {
           res.json(results);
         })
         .catch((err) => console.log(err));
   } else if (category === "Resolved Claims") { 
      Publications.find({resolved: true })
                  .then((resultss) => { 
                     res.json(resultss);
                  })
                  .catch((err) => console.log(err));
   } else if (category === "Claims still unresolved") { 
      Publications.find({resolved: false })
                  .then((onlyUnesolved) => { 
                     res.json(onlyUnesolved);
                  })
                  .catch((err) => console.log(err));
   } 
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

export const deleteFavorite = async (req, res) => { 
   const {id} = req.params 

   try {
        Favorites.findOneAndDelete({_id: id})
                 .then((favorite) => { 
                  res.json({message:"The Publication was removed of Favorites", favorite})
                 })
                 .catch((err) => { 
                  console.log(err)
                 })
   } catch (error) {
       console.log(error)
   }
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
 
export const deleteSharedPublication = async (req, res) => { 
   const {id} = req.params
   try {
      SharedPublications.findOneAndDelete({_id: id})
                        .then((deleted) => { 
                           res.json({message: "The Publication has been deleted of your Wall", deleted})
                        })
                        .catch((err) => console.log(err))
   } catch (error) {
       console.log(error)
   }
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


export const markPublicationAsResolved = async (req, res) => { 
   const { publicationId } = req.params;
   const { comment, images } = req.body;
   
   console.log("Recibi por parametro a ", publicationId)
   console.log(comment, images)


   try {
       const thePublication = await Publications.findOne({ _id: publicationId });

       if (!thePublication) {
           return res.status(404).json({ message: "Publicación no encontrada" });
       }

       thePublication.resolvedImages.push(...images);
       thePublication.resolvedComment = comment;
       thePublication.resolved = true;

       const updatedPublication = await thePublication.save();
       return res.status(200).json(updatedPublication);
   } catch (error) {
       return res.status(500).json({ message: "Error", error: error.message });
   }
}