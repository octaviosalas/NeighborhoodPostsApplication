import React from 'react'
import { useEffect, useState } from 'react'
import WhoSharedPub from '../Modals/WhoSharedPub'
import ModalWhoSharedDetail from './ModalWhoSharedDetail'

const WhoSharedDetail = ({sharedData}) => {

  const [noShared, setNoShared ]= useState(false)

  useEffect(() => { 
    if(sharedData.length === 0) { 
      setNoShared(true)
    }
}, [noShared])
   
   
  return (
    <div className=' flex flex-col  m-4 max-w-fit-contain overflow-auto max-h-[120px] md:max-h-[250px]'> 
    {noShared ? (
       <p className='font-bold text-black text-sm'>The Publication has not been Shared yet </p>
    ) : ( 
      sharedData.map((s) => ( 
        <div className=''>
            <div className='flex  mt-2'> 
                <div>
                  <img className='h-full w-12 md:w-20 rounded-full' src={s.sharerProfileImage}/>
                </div>

                <div className='flex flex-col items-start justify-start'>
                    <small className='ml-2 text-sm tengo-black font-bold'> {s.sharer}</small>
                    <small className='text-xxs ml-2 text-gray-500'>Has shared your post on his wall</small>
                   <ModalWhoSharedDetail publicationId={s.publicationId}/>
                </div>
            </div>            
        </div>
       
       ))
       )}
        
    </div>
  )
}

export default WhoSharedDetail
