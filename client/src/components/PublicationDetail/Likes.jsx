import React, { useState } from 'react'
import { useEffect } from 'react'

const Likes = ({likes}) => {

  const [noLikes, setNoLikes ]= useState(false)

  useEffect(() => { 
      if(likes.length === 0) { 
       setNoLikes(true)
      }
  }, [likes])
  
  return (
    <div className='flex flex-col m-4 max-w-fit-contain overflow-auto max-h-[120px] md:max-h-[250px]'>
  {noLikes ? (
    <p className='font-bold text-black text-sm'>The Publication has not received Likes yet </p>
  ) : (
    likes.map((l) => (
      <div className=''>
        <div className='flex mt-2'>
          <div>
            <img className='h-full w-12 md:w-20 rounded-full' src={l.likedByPhoto} alt={l.likedBy} />
          </div>
          <div className='flex flex-col items-start justify-start'>
            <small className='ml-2 text-sm tengo-black font-bold'>{l.likedBy}</small>
            <p className="ml-2 text-xxs text-gray-500">Liked this post</p>
          </div>
        </div>
      </div>
    ))
  )}
</div>
  )
}

export default Likes
