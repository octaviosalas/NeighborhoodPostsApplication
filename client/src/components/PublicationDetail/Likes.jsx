import React from 'react'

const Likes = ({likes}) => {
  
  return (
    <div className=' flex flex-col  m-4 max-w-fit-contain overflow-auto max-h-[120px] md:max-h-[250px]'>
            {likes.map((l) => ( 
                <div className=''>
                    <div className='flex mt-2'> 
                        <div>
                          <img className='h-full w-12 md:w-20 rounded-full' src={l.likedByPhoto}/>
                        </div>

                        <div className='flex flex-col items-start justify-start'>
                            <small className='ml-2 text-sm tengo-black font-bold'> {l.likedBy}</small>
                            <p className="ml-2 text-xxs text-gray-500" >Liked this post</p>
                        </div>
                    </div>            
                </div>
            ))}
    </div>
  )
}

export default Likes
