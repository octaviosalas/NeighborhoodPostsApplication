import React from 'react'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useState, useEffect, useM } from 'react';
import { UserContext } from '../store/usercontext';
import { useContext } from 'react';
import axios from 'axios';
import CommentPub from './CommentPub';
import { Link } from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify"


const PublicationsCard = ({pub}) => {

      const [liked, setLiked] = useState(false);
      const [allPublications, setAllPublications] = useState([])
      const [publicationChoosenId, setPublicationChoosenId] = useState("")
      const [publicationChoosenName, setPublicationChoosenName] = useState("")
      const [publicationChoosenaddresseeName, setPublicationChoosenaddresseeName] = useState("")
      const [commentText, setCommentText] = useState("")
      const [backendMessageOfFavs, setBackendMessageOfFavs] = useState("")
      const userContx = useContext(UserContext)

          function openModalThree() {
            const modal = document.getElementById('my_modal_3');
            modal.showModal();
          }

          function openModalFour() {
            const modal = document.getElementById('my_modal_4');
            modal.showModal();
          }

          const toggleLike = () => {
                setLiked(!liked);
          };

          const settingPubData = (x) => { 
              setPublicationChoosenId(x._id)
              setPublicationChoosenName(x.creatorName)
              setPublicationChoosenaddresseeName(x.creatorId)
           }

          const getActualDate = () => {
            const fechaActual = new Date();
            const year = fechaActual.getFullYear();
            const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
            const day = String(fechaActual.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          };
        
          const actualDate = getActualDate();

          useEffect(() => { 
              axios.get("http://localhost:4000/getOtherUsersPublications")
                    .then((res) => { 
                      console.log(res.data)
                      setAllPublications(res.data)
                    })
                    .catch((err) => { 
                      console.log(err)
                    })
          }, [])

          const sendMyComment = () => { 
              const newComment = ( { 
                senderName: userContx.userName,
                senderId: userContx.userId,
                senderProfileImage: userContx.userProfileImage,
                publicationId: publicationChoosenId,
                addresseeName: publicationChoosenName,
                addresseeId: publicationChoosenaddresseeName,
                commentDate: actualDate,
                comment: commentText
              })
              axios.post("http://localhost:4000/saveComment", newComment)
                  .then((res) => { 
                    console.log(res.data)
                  })
                  .catch((err) => { 
                    console.log(err)
                  })
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


    

   

  return (
    <div>

      {allPublications.map((pub) => ( 
        <div className="card w-96 bg-base-100 shadow-2xl shadow-side-left mt-4">
                                <div className="card-body" key={pub._id}>
                                 
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
                                          <p className='font-bold text-sm color-black'>{pub.publicationTitle}</p>
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
                                    <div className='flex justify-between mt-4'>

                                         <button className="btn border-none" onClick={() => saveInFavorites(pub)}>
                                           <FavoriteBorderIcon />
                                         </button>  

                                         <div onClick={() => settingPubData(pub)}>
                                            <button className="btn" onClick={() => openModalThree()}><MarkUnreadChatAltIcon/></button>
                                          </div>    

                                        <button className="btn" onClick={() => openModalFour()}><ShareIcon/></button>
                                           </div>

                                           <dialog id="my_modal_3" className="modal">
                                                  <form method="dialog" className="modal-box">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    <div className='flex items-center space-x-2'>
                                                        <div className="avatar">                                                     
                                                          <div className="w-8 rounded-full">
                                                              <img src={userContx.userProfileImage} />                                               
                                                          </div>
                                                          <p className='ml-2 text-gray-500 text-sm'>{userContx.userName}</p>
                                                        </div>
                                                    </div>
                                                      <textarea className='mt-2 border border-gray-400 w-full rounded-xl text-sm text-center'
                                                       placeholder='Write your commnent..' onChange={(e) => setCommentText(e.target.value)}/>
                                                      <div className='flex justify-end'>
                                                          <button className='bg-blue-950 border-none mt-2 h-9 w-18 text-sm text-white hover:text-black hover:bg-yellow-400' onClick={sendMyComment}>
                                                              Send
                                                            </button>
                                                      </div>
                                                  </form>
                                                </dialog> 
                                                  

                                                <dialog id="my_modal_4" className="modal">
                                                  <form method="dialog" className="modal-box w-80">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    <h3 className="font-bold text-sm flex justify-start">Compartir reclamo en mi muro</h3>
                                                    <div className=''>
                                                          <button className='bg-blue-950 border-none mt-4 h-9 w-18 text-sm text-white hover:text-black hover:bg-yellow-400'>Share</button>
                                                      </div>
                                                  </form>
                                                </dialog>              
                                   </div>
                        </div>
      ))}

      <ToastContainer/>
        
    </div>
  )
}

export default PublicationsCard

