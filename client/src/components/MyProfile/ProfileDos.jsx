import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../store/usercontext'
import ConfigIcon from "../../img/configuracion.svg"
import ModalProfileChangePicture from './ModalProfileChangePicture'
import { useState, useEffect } from 'react'
import Privacity from './Privacity'
import Favorites from './Favorites'
import MyPubs from './MyPubs'



const ProfileDos = () => {

   const userCtx = useContext(UserContext)
   const [showFavorites, setShowFavorites] = useState(false)
   const [showPrivacity, setShowPrivacity] = useState(true)
   const [showMyPubs, setShowMyPubs] = useState(false)
 
 
   const skipPrivacity = () => { 
    setShowPrivacity(false)
   }

   const showJustPrivacy = () => { 
    setShowFavorites(false)
    setShowPrivacity(true)
    setShowMyPubs(false)
   }

   const showJustFavorites = () => { 
    setShowFavorites(true)
    setShowPrivacity(false)
    setShowMyPubs(false)
   }

   const showJustMyPubs = () => { 
    setShowFavorites(false)
    setShowPrivacity(false)
    setShowMyPubs(true)
   }

  return (
    <>

    <div className=' mt-22 xxs:mt-12 '>
        <div className='grid grid-cols-7 max-w-fit-contain sm:flex-col bg-gray-100 '>
            <div className='grid border col-span-7 mt-24 xxs:mt-16'>
                 <div className='flex justify-end items-center'>
                    <img src={ConfigIcon} className='cursor-pointer mt-2 mr-2'></img>
                 </div>
                <div className='flex '>
                    <div className='flex justify-start items-center'>
                        <ModalProfileChangePicture photo={userCtx.userProfileImage}/>
                        <div className='flex-box'>
                            <h4 className='ml-2 font-bold text-sm xxs:text-xl'>{userCtx.userName}</h4>
                            <small className='text-sm text-gray-500 cursor-pointer underline'>Change Picture</small>
                        </div>
                    </div>
                </div>
                <div className='flex items-centert justify-center content-between gap-0 lg:gap-6 mt-6 max-w-fit-contain ml-2 mr-2 mb-2 max-w-fit-contain'>
                    <small className={`font-bold text-xxs ml-8 xxs:ml-2 sm:ml-16 ${showPrivacity ? 'text-gray-500 font-bold' : ''} underline cursor-pointer`} onClick={() => showJustPrivacy()}>Privacity </small>
                    <small className={`font-bold text-xxs ml-8 xxs:ml-2 sm:ml-16 ${showFavorites ? 'text-gray-500 font-bold' : ''} underline cursor-pointer`} onClick={() => showJustFavorites()}>Favorites </small>
                    <small className={`font-bold text-xxs ml-8 xxs:ml-2 sm:ml-12 ${showMyPubs ? 'text-gray-500 font-bold' : ''} underline cursor-pointer`} onClick={() => showJustMyPubs()}>Publications </small>
                    
                </div>
            </div>
        </div>  

        <div className='mt-2'>
            {showPrivacity ?  <Privacity close={() => skipPrivacity()}/> : null}
            {showFavorites ?  <Favorites/> : null}
            {showMyPubs ?     <MyPubs/> : null}
        </div>  
    </div>
    
 </>

  )
}

export default ProfileDos
