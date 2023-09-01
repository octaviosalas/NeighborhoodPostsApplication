import Publications from "../models/publications.js"



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
