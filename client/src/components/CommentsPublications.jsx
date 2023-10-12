import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const CommentsPublications = ({comments, close}) => {
    console.log(comments) 

    const [noComments, setNoComments] = useState(false)

    useEffect(() => { 
      if(comments.length === 0) { 
        setNoComments(true)
      }
    })

  return (
    <div className=''>
      <div className='flex flex-grow justify-end'>
          <small onClick={close} className='cursor-pointer font-bold'>X</small>
      </div>
      {noComments ? <small className='font-bold'>This Publication has no comments yet</small> : 
       <>
          {comments.map((c) => ( 
            <div className='mt-6'>
                <div className='flex flex-grow items-start justify-start'>
                    <div className='flex justify-start'>
                        <img src={c.senderProfileImage} className='h-8 w-8 rounded-xl'/>
                      <Link to={`/userProfile/${c.senderId}`}><small className='text-xs font-bold text-black ml-2 mt-2'>{c.senderName}</small></Link>
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
