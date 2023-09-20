import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useEffect, useM } from 'react';
import { UserContext } from '../store/usercontext';
import { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify"
import useGetBackendQueries from '../Hooks/useGetBackendQueries';
import CommentModal from './Modals/CommentModal';
import ShareModal from './Modals/ShareModal';
import CommentsPublications from './CommentsPublications';
import LoadingPublications from '../Hooks/LoadingPublications';


const PublicationsCard = ({pubs}) => {
  console.log(pubs)

   
          const [publicationChoosenId, setPublicationChoosenId] = useState("")
        //  const [publicationChoosenName, setPublicationChoosenName] = useState("")
        //  const [publicationChoosenaddresseeName, setPublicationChoosenaddresseeName] = useState("")
          const [publicationComments, setPublicationComments] = useState([])
          const [quantityComments, setQuantityComments] = useState(0)
          const [showComments, setShowComments] = useState(false)
          const [loadComments, setLoadComments] = useState(false)
          const userContx = useContext(UserContext)
          const [publicationSelectedToShare, setPublicationSelectedToShare] = useState("")
         
        

          useEffect(() => { 
            axios.get(`http://localhost:4000/viewPublicationComments/${pubs._id}`)
                .then((res) => { 
                  setQuantityComments(res.data.length)
                })
                .catch((err) => { 
                  console.log(err)
             })
          }, [])

          const settingPubData = (x) => { 
            console.log(x)
              setPublicationChoosenId(x)
             
           }

           const settingPubDataShared = (x) => { 
            console.log(x.creatorName)
            setPublicationSelectedToShare(x)
           }
          
          const notificacionDeToast = () =>{ 
            toast.success("Publication was saved in your Favorites", {
              position: toast.POSITION.TOP_CENTER,
              style: {
                color: "#082E58", 
              },
            });
          }

          const saveInFavorites = (pub) => { 
            const newFavPub = ({ 
               publicationId: pub._id,
               userId: userContx.userId,
               publicationAddress: pub.address,
               publicationCreatorName: pub.creatorName,
               publicationImages: pub.publicationImages,
               publicationTitle: pub.publicationTitle, 
               publicationDescription: pub.publicationDescription,
               typeOfPublication: pub.typeOfPublication,
               creatorLocation: pub.creatorLocation, 
               creatorProfileImage: pub.creatorProfileImage,
               creatorName: pub.creatorName
            })
            axios.post("http://localhost:4000/markAsFavorite", newFavPub)
                 .then((res) => { 
                 console.log(res.data) 
                    notificacionDeToast()                        
                 })
                 .catch((err) => { 
                  console.log(err)
                 })
          }

          const getPublicationComments = (idPublication) => { 
            axios.get(`http://localhost:4000/viewPublicationComments/${idPublication}`)
                 .then((res) => { 
                  console.log(res.data)
                  setPublicationComments(res.data)
                  setLoadComments(true)
                  setTimeout(() => { 
                    setShowComments(true)
                      setLoadComments(false)
                  }, 2700)
                 })
                 .catch((err) => { 
                  console.log(err)
                 })
          }

         
       const cancelPublication = () => { 
        setPublicationSelectedToShare(null)
        console.log("Seteado")
       }
      

  return (
    <div>

      {pubs.map((pub) => (  
         <div className="card w-[500px] bg-base-100 shadow-2xl shadow-side-left mt-4"  key={pub._id}>
                                <div className="card-body" onClick={() => console.log(pub._id)}>
                                        <div className='flex'>
                                               <div className="avatar">
                                                    <div className="w-8 rounded-full">
                                                        <img src={pub.creatorProfileImage}  />
                                                    </div>
                                                </div>

                                                <div className=''>
                                                    <p className="text-black text-sm ml-2">{pub.creatorName}</p>
                                                </div>

                                                <Link to={`/publicationsSearched/${pub.typeOfPublication}`}> <p className='justify-end ml-8 whitespace-no-wrap text-sm  h-6  cursor-pointer hover:font-bold w-[70px]'>
                                                    {pub.typeOfPublication}
                                                  </p></Link>
                                         </div>


                                         <div className=' ml-4'>
                                                  <Link to={`/publication/${pub._id}`}> <p className='font-bold text-sm text-black'>{pub.publicationTitle}</p></Link> 
                                                  <p className='justify-center  text-xs mr-4'>{pub.publicationDescription}</p>

                                                  <div className='mt-4 whitespace-no-wrap'>
                                                      <p className=' text-xs mr-4  whitespace-no-wrap'>{pub.creatorLocation}, {pub.address}</p>
                                                      <p className=' text-xs mr-4 underline cursor-pointer'>Ver en Mapa</p>
                                                  </div>
                                         </div>


                                       <div className='flex justify-center mt-2'>
                                               <div className="avatar">
                                                    <div className="w-24 rounded">
                                                        <img src={pub.publicationImages[0]} />
                                                    </div>
                                              </div>

                                               <div className="avatar">
                                                    <div className="w-24 rounded ml-4">
                                                        <img src={pub.publicationImages[1]} />
                                                    </div>
                                               </div>
                                         </div> 


                                          <div className="h-6 bg-gray-100">
                                                <div className='flex flex-grow justify-end'>
                                                    <small className='text-xs text-gray-500 cursor-pointer underline' onClick={() => getPublicationComments(pub._id)}>{quantityComments} Comments  </small>
                                                    <small className='text-xs text-gray-500 ml-2 cursor-pointer underline'>1 Shared</small>
                                                </div>
                                          </div>

                                             <div className='flex justify-between '>
                                                        <button className="btn border-none" onClick={() => saveInFavorites(pub)}>
                                                          <FavoriteBorderIcon />
                                                        </button>  

                                                        <div  >                                                    
                                                            <CommentModal  publicationId={pub._id}  />
                                                         </div>   

                                                       
                                                            <div onClick={()=> settingPubDataShared(pub)}>
                                                              <ShareModal publication={publicationSelectedToShare} cancelPub={cancelPublication}/>
                                                            </div>
                                                         
                                             </div>                                                     
                                </div>

                                           {loadComments ? (
                                              <div>
                                                <LoadingPublications text={"comments"}/>
                                              </div>
                                            ) : showComments ? (
                                              <div className='bg-white'>
                                                <CommentsPublications comments={publicationComments} close={() => setShowComments(false)}/>
                                              </div>
                                            ) : null}
                        </div>
      ))}
       
         
      

      <ToastContainer/>
        
    </div>
  )
}

export default PublicationsCard
