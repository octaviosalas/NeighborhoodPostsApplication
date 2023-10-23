import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../store/usercontext'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SendIcon from '@mui/icons-material/Send';
import {toast, ToastContainer} from "react-toastify"


const CommentsPublications = ({comments, close}) => {
    console.log(comments) 

    const [noComments, setNoComments] = useState(false)
    const [showAnswer, setShowAnswer] = useState({})
    const [responseComment, setResponseComment] = useState("")
    const [showResponses, setShowResponses] = useState({})
    const [showLikeIcon, setShowLikeIcon] = useState(false)
    const [showLikeItem, setShowLikeItem] = useState(false)
    const userCtx = useContext(UserContext)

    const notificacionDeToast = () =>{ 
      toast.success("Your response has been send", {
        position: toast.POSITION.TOP_RIGHT_CENTER,
        style: {
          color: "#082E58", 
        },
      });
    }

    useEffect(() => { 
      if(comments.length === 0) { 
        setNoComments(true)
      }
    })

    const toggleAnswer = (index) => {
      setShowAnswer((prevState) => ({
        ...prevState,
        [index]: !prevState[index], // Cambia el estado de abierto a cerrado o viceversa
      }));
    };

    const toggleResponses = (index) => {
      setShowResponses((prevState) => ({
        ...prevState,
        [index]: !prevState[index], // Cambia el estado de abierto a cerrado o viceversa
      }));
    };

    const sendMyLike = (commentId) => { 
       const userData = ({ 
         likerName: userCtx.userName,
         likerProfileImage: userCtx.userProfileImage,
         likerId: userCtx.userId
       }) 
      axios.post(`https://app-citizens.onrender.com/likeComment/${commentId}`, userData)
           .then((res) => { 
            console.log(res.data)
            
           })
           .catch((err) => { 
            console.log(err)
           })
    }

    const deleteMylike = (commentId, likeId) => { 
      console.log(commentId, likeId)
      axios.delete(`https://app-citizens.onrender.com/deleteLikeComment/${commentId}/${likeId}`)
           .then((res) => { 
            console.log(res.data)
           })
           .catch((err) => { 
            console.log(err)
           })
    }

    const sendMyResponse = (commentId, second) => { 
      const myResponse = ({ 
        transmitterName: userCtx.userName,
        transmitterId: userCtx.userId,
        transmitterPhoto: userCtx.userProfileImage,
        commentResponse: responseComment,
        addresseeId: second
      })
      axios.post(`https://app-citizens.onrender.com/saveResponseToComment/${commentId}`, myResponse)
           .then((res) => { 
            console.log(res.data)
            setTimeout(() => { 
              setShowAnswer(false)
              notificacionDeToast()
            }, 400)
           })
           .catch((err) => { 
            console.log(err)
           })
    }

    const deleteMyResponse = (commentId, responseId) => { 
        axios.delete(`https://app-citizens.onrender.com/deleteMyResponse/${commentId}/${responseId}`)
             .then((res) => { 
              console.log(res.data)
             })
             .catch((err) => { 
              console.log(err)
             })
    }
    

  return (
    <div className=''>
      <div className='flex flex-grow justify-end'>
          <small onClick={close} className='cursor-pointer font-bold'>X</small>
      </div>
      {noComments ? <small className='font-bold'>This Publication has no comments yet</small> : 
       <>
       <div className='overflow-auto max-h-[400px] mt-2'>
          {comments.map((c, index) => ( 
            <div className='mt-8 bg-white rounded-xl'>
                <div className='flex flex-grow items-start justify-start m-2'>
                    <div className='flex justify-start'>
                        <img src={c.senderProfileImage} className='h-8 w-8 rounded-xl'/>
                      <Link to={`/userProfile/${c.senderId}`}><small className='text-xs font-bold text-black ml-2 mt-2'>{c.senderName}</small></Link>
                    </div>

                    <div className='flex justify-end ml-auto'>
                        <small>{c.commentDate}</small>
                    </div>
                </div>

                <div className='h-12 w-auto mt-4'> 
                    <div className='flex justify-start items-start m-2'>
                       <small className=' text-sm'>{c.comment}</small>
                    </div>            
                    <div className='flex flex-grow  m-2'>
                         {
                            c.commentLikesReceived ? (
                              c.commentLikesReceived.some((l) => l.likerId === userCtx.userId) ? (
                                <ThumbUpIcon style={{ height: "20px",  cursor:"pointer" }} onClick={() => deleteMylike(c._id, c.commentLikesReceived.filter(d => d.likerId === userCtx.userId).map((n) => n._id))}/>
                              ) : (
                                <small className='text-xs text-gray-600 cursor-pointer' onClick={() => sendMyLike(c._id)}>Like</small>
                              )
                            ) : (
                              <small className='text-xs text-gray-600 cursor-pointer' onClick={() => sendMyLike(c._id)}>Like</small>
                            )
                          }
                      <small className='text-xs text-gray-600 ml-4 '>|</small>
                      <small className="text-xs text-gray-600 ml-4 cursor-pointer" onClick={() => toggleAnswer(index)}>Answer</small>
                      {
                        c.commentResponsesReceived !== undefined ? (
                          c.commentResponsesReceived.length !== 0 ? (
                            <div className='flex'>
                                <small className="text-xs text-gray-600 ml-4 cursor-pointer"> | </small>
                                <small className="text-xs text-gray-600 ml-4 cursor-pointer underline" onClick={() => toggleResponses(index)}> {c.commentResponsesReceived.length} Responses </small>
                            </div>
                          ) : (
                             null
                          )
                        ) : null
                      }
                    </div>
                </div> 

                  {showAnswer[index] ? (
                    <div className='mt-4 '>
                      <div className='flex items-start justify-start mt-4 sm:mt-2'>
                        <input type="text" className='rounded-xl h-8 text-sm w-48 xl:w-56' placeholder='Answer..' onChange={(e) => setResponseComment(e.target.value)}/>
                        <SendIcon style={{height: "20px", cursor:"pointer", marginTop:"7px"}} onClick={() => sendMyResponse(c._id, c.senderId)}/>
                      </div>
                   </div>
                ) : null}
                
                  {showResponses[index] ? (
                      <div className='flex items-start justify-start mt-4 sm:mt-2 m-2'>
                        {c.commentResponsesReceived.map((res) => ( 
                          <div className='flex flex-col justify-start items-start mt-2 '>
                              <div className='flex justify-start items-start'>
                                <img src={res.transmitterPhoto} className='h-6 w-6 rounded-full'/>
                              <Link to={`/userProfile/${res.transmitterId}`}><small className='text-xs text-black font-bold ml-2'>{res.transmitterName}</small></Link>
                              </div>
                              <div className='flex items-center justify-center mt-2'>
                                  <small className='text-sm'>{res.commentResponse}</small>
                              </div>
                            {res.transmitterId === userCtx.userId ? <div className='flex items-start justify-start'>
                                  <small className='text-xs text-gray-500 underline cursor-pointer' onClick={() => deleteMyResponse(c._id, res._id)}>Delete</small>
                              </div> : null}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
              ))}             
          </div>
       </>
      }
       <ToastContainer/>
    </div>
  )
}

export default CommentsPublications

/*
*/