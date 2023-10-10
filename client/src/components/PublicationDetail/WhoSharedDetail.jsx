import React from 'react'
import WhoSharedPub from '../Modals/WhoSharedPub'
import ModalWhoSharedDetail from './ModalWhoSharedDetail'

const WhoSharedDetail = ({sharedData}) => {
   
   
  return (
    <div className=' flex flex-col  m-4 max-w-fit-contain overflow-auto max-h-[120px] md:max-h-[250px]'>
            {sharedData.map((s) => ( 
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
               
            ))}
    </div>
  )
}

export default WhoSharedDetail
