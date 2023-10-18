import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../store/usercontext'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SendIcon from '@mui/icons-material/Send';


const CommentsPublications = ({comments, close}) => {
    console.log(comments) 

    const [noComments, setNoComments] = useState(false)
    const [showAnswer, setShowAnswer] = useState({})
    const [responseComment, setResponseComment] = useState("")
    const userCtx = useContext(UserContext)

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

    const sendMyLike = (commentId) => { 
       const userData = ({ 
         likerName: userCtx.userName,
         likerProfileImage: userCtx.userProfileImage,
         likerId: userCtx.userId
       }) 
      axios.post(`https://app-citizens.onrender.com/likeComment/${commentId}`, userData)
           .then((res) => { 
            console.log(res.data)
            close()
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

 /*   const sendMyResponse = () => { 
      const myResponse = ( { 
        senderName: userCtx.userName,
        senderId: userCtx.userId,
        senderProfileImage: userCtx.userProfileImage,
        addresseeId: 
      })
      axios.post("http://localhost:4000/saveResponseToComment")
    }*/

    

  return (
    <div className=''>
      <div className='flex flex-grow justify-end'>
          <small onClick={close} className='cursor-pointer font-bold'>X</small>
      </div>
      {noComments ? <small className='font-bold'>This Publication has no comments yet</small> : 
       <>
       <div className='overflow-auto max-h-[400px] mt-2'>
          {comments.map((c, index) => ( 
            <div className='mt-8'>
                <div className='flex flex-grow items-start justify-start'>
                    <div className='flex justify-start'>
                        <img src={c.senderProfileImage} className='h-8 w-8 rounded-xl'/>
                      <Link to={`/userProfile/${c.senderId}`}><small className='text-xs font-bold text-black ml-2 mt-2'>{c.senderName}</small></Link>
                    </div>

                    <div className='flex justify-end ml-auto'>
                        <small>{c.commentDate}</small>
                    </div>
                </div>

                <div className='h-12 w-auto mt-4'> 
                    <div className='flex justify-start items-start'>
                       <small className=' text-sm'>{c.comment}</small>
                    </div>            
                    <div className='flex flex-grow mt-2'>
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
                    </div>
                </div>
                {showAnswer[index] ? (
                <div className='flex items-start justify-start mt-2'>
                  <input type="text" className='rounded-xl' placeholder='Answer..' onChange={(e) => setResponseComment(e.target.value)}/>
                  <SendIcon style={{height: "20px", cursor:"pointer", marginTop:"9px"}}/>
                </div>
              ) : null}
            </div>
          ))}
          
          </div>
       </>
      }
       
    </div>
  )
}

export default CommentsPublications

/*
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../store/usercontext'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


const CommentsPublications = ({comments, close}) => {
    console.log(comments) 

    const [noComments, setNoComments] = useState(false)
    const [showIconLike, setShowIconLike] = useState(false)
    const userCtx = useContext(UserContext)

    useEffect(() => { 
      if(comments.length === 0) { 
        setNoComments(true)
      }
    })

    const sendMyLike = (commentId) => { 
       const userData = ({ 
         likerName: userCtx.userName,
         likerProfileImage: userCtx.userProfileImage,
         likerId: userCtx.userId
       }) 
      axios.post(`https://app-citizens.onrender.com/likeComment/${commentId}`, userData)
           .then((res) => { 
            console.log(res.data)
            setShowIconLike(true)
           })
           .catch((err) => { 
            console.log(err)
           })
    }

    const deleteMylike = (commentId, likeId) => { 
      console.log(commentId, likeId)
      axios.delete(`http://localhost:4000/deleteLikeComment/${commentId}/${likeId}`)
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
          {comments.map((c) => ( 
            <div className='mt-8'>
                <div className='flex flex-grow items-start justify-start'>
                    <div className='flex justify-start'>
                        <img src={c.senderProfileImage} className='h-8 w-8 rounded-xl'/>
                      <Link to={`/userProfile/${c.senderId}`}><small className='text-xs font-bold text-black ml-2 mt-2'>{c.senderName}</small></Link>
                    </div>

                    <div className='flex justify-end ml-auto'>
                        <small>{c.commentDate}</small>
                    </div>
                </div>

                <div className='h-12 w-auto mt-4'> 
                    <div className='flex justify-start items-start'>
                       <small className=' text-sm'>{c.comment}</small>
                    </div>            
                    <div className='flex flex-grow mt-2'>
                         {
                            c.commentLikesReceived ? (
                              c.commentLikesReceived.some((l) => l.likerId === userCtx.userId) ? (
                                <ThumbUpIcon style={{ height: "20px" }} onClick={() => deleteMylike(c._id, c.commentLikesReceived.map((l) => l._id))}/>
                              ) : (
                                <small className='text-xs text-gray-600 cursor-pointer' onClick={() => sendMyLike(c._id)}>Like</small>
                              )
                            ) : (
                              <small className='text-xs text-gray-600 cursor-pointer' onClick={() => sendMyLike(c._id)}>Like</small>
                            )
                          }
                      <small className='text-xs text-gray-600 ml-4 '>|</small>
                      <small className="text-xs text-gray-600 ml-4 cursor-pointer">Answer</small>
                    </div>
                </div>
            </div>
          ))}
          </div>
       </>
      }
       
    </div>
  )
}

export default CommentsPublications
*/