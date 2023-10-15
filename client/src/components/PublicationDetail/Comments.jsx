import React from 'react'
import { Link } from 'react-router-dom'

const Comments = ({comments}) => {
  return (
    <div className=' flex flex-col  m-4 max-w-fit-contain overflow-auto max-h-[130px] md:max-h-[250px]'>
            {comments.map((c) => ( 
                <div className=''>
                    <div className='flex mt-2'> 
                        <div>
                          <img className='h-12 md:h-16 w-12 md:w-16 rounded-full' src={c.senderProfileImage}/>
                        </div>

                        <div className='flex flex-col items-start justify-start'>
                          <Link to={`/userProfile/${c.senderId}`}><small className='ml-2 text-sm tengo-black font-bold cusror-pointer'> {c.senderName}</small></Link>
                            <p className="ml-2 text-xxs text-gray-500 items-start" >{c.comment}</p>
                        </div>
                    </div>            
                </div>
               
            ))}
    </div>
  )
}

export default Comments
