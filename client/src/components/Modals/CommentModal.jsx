import React from 'react'
import { UserContext } from '../../store/usercontext';
import { useContext } from 'react';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';


const CommentModal = ({publicationId, creatorName, creatorId}) => {

     const userContx = useContext(UserContext)
     const [commentText, setCommentText] = useState("")


     useEffect(() => { 
      console.log(publicationId)
     }, [])

    function openModalThree() {
        const modal = document.getElementById('my_modal_3');
        modal.showModal();
      }

      const getActualDate = () => {
        const fechaActual = new Date();
        const year = fechaActual.getFullYear();
        const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
        const day = String(fechaActual.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
    
      const actualDate = getActualDate();

      const sendMyComment = () => { 
        const newComment = ( { 
          senderName: userContx.userName,
          senderId: userContx.userId,
          senderProfileImage: userContx.userProfileImage,
          publicationId: publicationId,
          addresseeName: creatorName,
          addresseeId: creatorId,
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


  return (
    <div>
         <button className="btn" onClick={() => openModalThree()} title="Leave a Comment"><MarkUnreadChatAltIcon/></button> 
         
                <dialog id="my_modal_3" className="modal">
                     <form method="dialog" className="modal-box">
                                     <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</button>
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
                             <button className='bg-blue-950 border-none mt-2 h-9 w-18 text-sm text-white hover:text-black hover:bg-yellow-400' onClick={() => sendMyComment()}>
                                Send
                             </button>
                         </div>
                     </form>
                 </dialog> 
    </div>
  )
}

export default CommentModal
