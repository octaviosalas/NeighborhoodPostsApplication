import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../store/usercontext'
import ConfigIcon from "../../img/configuracion.svg"
import ModalProfileChangePicture from './ModalProfileChangePicture'
import { useState, useEffect } from 'react'
import Privacity from './Privacity'
import Favorites from './Favorites'



const ProfileDos = () => {

   const userCtx = useContext(UserContext)
   const [showFavorites, setShowFavorites] = useState(false)
   const [showPrivacity, setShowPrivacity] = useState(true)
 
 
   const skipPrivacity = () => { 
    setShowPrivacity(false)
   }

   const showJustPrivacy = () => { 
    setShowFavorites(false)
    setShowPrivacity(true)
   }

   const showJustFavorites = () => { 
    setShowFavorites(true)
    setShowPrivacity(false)
   }

  return (
    <>
    <div className='mt-22'>
        <div className='grid grid-cols-7 max-w-fit-contain sm:flex-col'>
            <div className='grid border col-span-7  sm'>
                 <div className='flex justify-end items-center'>
                    <img src={ConfigIcon} className='cursor-pointer mt-2 mr-2'></img>
                 </div>
                <div className='flex '>
                    <div className='flex justify-start items-center'>
                        <ModalProfileChangePicture photo={userCtx.userProfileImage}/>
                        <div className='flex-box'>
                            <h4 className='ml-4 font-bold text-xl'>{userCtx.userName}</h4>
                            <small className='text-sm text-gray-500 cursor-pointer underline'>Change Picture</small>
                        </div>
                    </div>
                </div>
                <div className='flex items-centert justify-center content-between gap-0 lg:gap-6 mt-6 max-w-fit-contain ml-2 mr-2 mb-2 max-w-fit-contain'>
                    <small className={`font-bold text-xxs ml-2 sm:ml-16 ${showPrivacity ? 'text-blue-600' : ''} underline cursor-pointer`} onClick={() => showJustPrivacy()}>Privacity </small>
                    <small className={`font-bold text-xxs ml-2 sm:ml-16 ${showFavorites ? 'text-blue-600' : ''} underline cursor-pointer`} onClick={() => showJustFavorites()}>Favorites </small>
                    <small className='font-bold text-xxs ml-2 sm:ml-16 underline cursor-pointer'>Publications </small>
                    <small className='font-bold text-xxs ml-2 sm:ml-16 underline cursor-pointer'>Pagina Principal </small>
                    <small className='font-bold text-xxs ml-2 sm:ml-16 mr-2 sm:mr-8 underline cursor-pointer'>Pagina Principal </small>
                </div>
            </div>
        </div>    

      {showPrivacity ?  <Privacity close={() => skipPrivacity()}/> : null}
      {showFavorites ?  <Favorites/> : null}
    </div>
    
 </>

  )
}

export default ProfileDos
