import React, { useState } from 'react'
import axios from 'axios'
import { useContext } from "react";
import { UserContext } from "../store/usercontext";

const ResponseOneComment = ({addresseeId, targetCommentId}) => {

    const userContx = useContext(UserContext)
    const [commentText, setCommentText] = useState("")

    const getActualDate = () => {
        const fechaActual = new Date();
        const year = fechaActual.getFullYear();
        const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
        const day = String(fechaActual.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
    
      const actualDate = getActualDate();

    const sendResponseToOneComment = () => { 
        const responseData = ({ 
          senderName: userContx.userName, 
          senderId: userContx.userId,
          senderProfileImage: userContx.userProfileImage,
          addresseeId: addresseeId,
          commentDate: actualDate, 
          comment: commentText,
          targetCommentId:targetCommentId
        })
        axios.post("http://localhost:4000/saveResponseToComment", responseData)
             .then((res) => { 
              console.log(res.data)
              setTimeout(() => { 
                    window.location.reload()
              }, 1000)
             })
             .catch((err) => { 
              console.log(err)
             })
        
       }


  return (
    <div>
            <div>
                <textarea type="text" placeholder='Write your response..' className='mt-2 border border-greay-200 w-full text-center' onChange={(e) => setCommentText(e.target.value)}/>
                <button onClick={() => sendResponseToOneComment()}>Send</button>
            </div>
    </div>
  )
}

export default ResponseOneComment
