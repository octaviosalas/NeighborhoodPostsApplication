import React, { useEffect } from 'react'
import { useState } from 'react'

const CommentsPublications = ({comments, close}) => {
    console.log(comments) 

    const [noComments, setNoComments] = useState(false)

    useEffect(() => { 
      if(comments.length === 0) { 
        setNoComments(true)
      }
    })

  return (
    <div>
      <div className='flex flex-grow justify-end'>
          <small onClick={close} className='cursor-pointer'>X</small>
      </div>
      {noComments ? <small className='font-bold'>This Publication has no comments yet</small> : 
       <>
          {comments.map((c) => ( 
            <div className='mt-2'>
                <div className='flex flex-grow'>
                    <div className='flex justify-start'>
                        <img src={c.senderProfileImage} className='h-8 w-8 rounded-xl'/>
                        <small className='text-xs font-bold text-black ml-2 mt-2'>{c.senderName}</small>
                    </div>

                    <div className='flex justify-end ml-auto'>
                        <small>{c.commentDate}</small>
                    </div>
                </div>

                <div className='h-12 w-auto  mt-4'> 
                    <small className='flex justify-start text-sm'>{c.comment}</small>
                    <div className='flex flex-grow mt-2'>
                      <small className='text-xs text-gray-600 cursor-pointer'>Like</small>
                      <small className='text-xs text-gray-600 ml-4 '>|</small>
                      <small className="text-xs text-gray-600 ml-4 cursor-pointer">Answer</small>
                </div>
                </div>
            </div>
          ))}
       </>
      }
       
    </div>
  )
}

export default CommentsPublications
