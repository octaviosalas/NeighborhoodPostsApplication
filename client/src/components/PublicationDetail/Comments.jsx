import React from 'react'

const Comments = ({comments}) => {
  return (
    <div className=' flex flex-col justify-center m-4 max-w-fit-contain overflow-auto max-h-[500px]'>
            {comments.map((c) => ( 
                <div className=''>
                    <div className='flex items-center mt-2'> 
                        <div>
                          <img className='h-full w-20 rounded-full' src={c.senderProfileImage}/>
                        </div>

                        <div className='flex flex-col items-start justify-start'>
                            <small className='ml-2 text-sm tengo-black font-bold'> {c.senderName}</small>
                            <p className="ml-2 text-xxs text-gray-500" >{c.comment}</p>
                        </div>
                    </div>            
                </div>
               
            ))}
    </div>
  )
}

export default Comments
