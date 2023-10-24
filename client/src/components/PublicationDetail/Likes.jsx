import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Likes = ({likes}) => {

  console.log(likes)

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
      <div className='bg-white rounded-xl overflow-auto max-h-[130px] md:max-h-[250px]'>
        <div className='flex m-4'>
          <div>
            <img className='h-12 w-12 md:h-16 md:w-16 rounded-full' src={l.likedByPhoto} alt={l.likedBy} />
          </div>
          <div className='flex flex-col items-center justify-center'>
          <Link to={`/userProfile/${l.likedById}`}> <small className='ml-2 text-sm tengo-black font-bold text-black  hover:text-blue-700'>{l.likedBy}</small> </Link>
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
