import React from 'react'

const Comments = ({comments}) => {
  return (
    <div className=' flex flex-col  m-4 max-w-fit-contain overflow-auto max-h-[130px] md:max-h-[250px]'>
            {comments.map((c) => ( 
                <div className=''>
                    <div className='flex mt-2'> 
                        <div>
                          <img className='h-full w-12 md:w-20 rounded-full' src={c.senderProfileImage}/>
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
