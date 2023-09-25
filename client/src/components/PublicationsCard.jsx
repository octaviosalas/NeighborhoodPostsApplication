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
import RateReviewIcon from '@mui/icons-material/RateReview';
import ShareIcon from '@mui/icons-material/Share';


const PublicationsCard = ({pub}) => {

          const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
          const [isShareModalOpen, setIsShareModalOpen] = useState(false)
          const [pubChoosen, setPubChoosen] = useState([])
          const [publicationChoosenFirstImage, setPublicationChoosenFirstImage] = useState("")
          const [publicationChoosenSecondImage, setPublicationChoosenSecondImage] = useState("")
          const [publicationChoosenId, setPublicationChoosenId] = useState("")
          const [publicationChoosenUserProfileImage, setPublicationChoosenUserProfileImage] = useState("")
          const [publicationChoosenName, setPublicationChoosenName] = useState("")
          const [publicationChoosenaddresseeName, setPublicationChoosenaddresseeName] = useState("")
          const [publicationComments, setPublicationComments] = useState([])
          const [quantityComments, setQuantityComments] = useState(0)
          const [showComments, setShowComments] = useState(false)
          const [loadComments, setLoadComments] = useState(false)
          const userContx = useContext(UserContext)
          const { data, loading } = useGetBackendQueries(`getOtherUsersPublications`); 


          useEffect(() => { 
            axios.get(`http://localhost:4000/viewPublicationComments/${pub._id}`)
                .then((res) => { 
                  setQuantityComments(res.data.length)
                })
                .catch((err) => { 
                  console.log(err)
             })
          }, [])

          const settingPubData = (x) => { 
              setPubChoosen(x)
              setPublicationChoosenFirstImage(x.publicationImages[0])
              setPublicationChoosenSecondImage(x.publicationImages[1])
              setPublicationChoosenId(x._id)
              setPublicationChoosenName(x.creatorName)
              setPublicationChoosenaddresseeName(x.creatorId)
              setPublicationChoosenUserProfileImage(x.creatorProfileImage)
              
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

          const closeModalShareNow  = () => { 
            setIsShareModalOpen(false)
          }


        const openCommentModal = (pub) => {
          settingPubData(pub);
          setIsCommentModalOpen(true);
        };
      
        const openShareModal = (pub) => {
          settingPubData(pub);
          setIsShareModalOpen(true);
        };

  return (
    <div>
         <div className="card w-[500px] bg-base-100 shadow-2xl shadow-side-left mt-4">
                                <div className="card-body" key={pub._id}>
                                        <div className='flex'>
                                               <div className="avatar">
                                                    <div className="w-8 rounded-full">
                                                        <img src={pub.creatorProfileImage}  />
                                                    </div>
                                                </div>

                                                <div className='flex flex-grow'>

                                                      <div className='flex justify-start'>
                                                        <p className="text-black text-sm ml-2 mt-[6px]">{pub.creatorName}</p>
                                                      </div>

                                                      <div className='flex justify-end'>
                                                        <Link to={`/publicationsSearched/${pub.typeOfPublication}`}> <p className='ml-8 whitespace-no-wrap text-sm  h-6  cursor-pointer hover:font-bold w-[70px]'>
                                                          {pub.typeOfPublication}
                                                        </p></Link>
                                                    </div>
                                                    
                                                </div>

                                                

                                                
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

                                                         <div>
                                                           {isCommentModalOpen ? null : <button onClick={() => openCommentModal(pub)}><RateReviewIcon/></button>}
                                                            {isCommentModalOpen && (
                                                              <CommentModal  publicationId={publicationChoosenId} creatorName={publicationChoosenName}  creatorId={publicationChoosenaddresseeName}/>  )}
                                                         </div> 

                                                         <div>
                                                           {isShareModalOpen ? null : <button onClick={() => openShareModal(pub)}><ShareIcon/></button>}
                                                            {isShareModalOpen && (
                                                              <ShareModal 
                                                              pubChoosen={pubChoosen}
                                                              publicationId={publicationChoosenId} 
                                                              creatorName={publicationChoosenName}  
                                                              creatorId={publicationChoosenaddresseeName}
                                                              closeModalShare={closeModalShareNow}
                                                              profileImage ={publicationChoosenUserProfileImage}
                                                              firstImage= {publicationChoosenFirstImage}
                                                              secondImage= {publicationChoosenSecondImage}
                                                              /> 
                                                              )}
                                                         </div> 
                                                    
                                             </div>                                                     
                                </div>

                                           {loadComments ? (
                                              <div>
                                                <LoadingPublications text={"comments"}/>
                                              </div>
                                            ) : showComments ? (
                                              <div>
                                                <CommentsPublications comments={publicationComments} close={() => setShowComments(false)}/>
                                              </div>
                                            ) : null}
                        </div>
      

      <ToastContainer/>
        
    </div>
  )
}

export default PublicationsCard
