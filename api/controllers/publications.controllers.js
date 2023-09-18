import Publications from "../models/publications.js"
import Favorites from "../models/favorites.js"


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



export const getPublicationWithSomeParams = async (req, res) => { 
   const { paramOne, paramTwo, paramThree, paramFour, paramFive } = req.params;
   const { searchParam } = req.query;
   const regex = new RegExp(searchParam, 'i');
 
   const query = {};

   if (paramOne) {
      query.$or = query.$or || [];
      query.$or.push({ fieldOne: paramOne });
    }
    if (paramTwo) {
      query.$or = query.$or || [];
      query.$or.push({ fieldTwo: paramTwo });
    }
    if (paramThree) {
      query.$or = query.$or || [];
      query.$or.push({ fieldThree: paramThree });
    }
    if (paramFour) {
      query.$or = query.$or || [];
      query.$or.push({ fieldFour: paramFour });
    }
    if (paramFive) {
      query.$or = query.$or || [];
      query.$or.push({ fieldFive: paramFive });
    }

    // Combinar la búsqueda por typeOfPublication y las condiciones dinámicas
    const combinedQuery = {
      $or: query.$or,
      typeOfPublication: regex
    };

    Publications.find(combinedQuery)
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
           typeOfPublication, creatorLocation, creatorProfileImage, creatorName} = req.body

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
         creatorName
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