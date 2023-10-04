import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../store/usercontext'



const ProfileDos = () => {

   const userCtx = useContext(UserContext)

  return (
    <>
    <div className=' m-24 mt-22'>
        <div className='grid grid-cols-7 max-w-fit-contain'>
            <div className='grid border col-span-7'>
                <div className='flex mt-2'>
                    <div className='flex justify-start items-center'>
                        <img src={userCtx.userProfileImage} className='rounded-full m-2 h-36 w-36'></img>
                        <div className='flex-box'>
                            <h4 className='ml-4 font-bold text-lg'>{userCtx.userName}</h4>
                            <small className='text-xs text-gray-500 cursor-pointer underline'>Change Picture</small>
                        </div>
                        
                    </div>
                </div>
                <div className='flex items-centert justify-center mt-6 max-w-fit-contain'>
                    <small className='font-bold text-sm ml-6'>Pagina Principal </small>
                    <small className='font-bold text-sm ml-6'>Pagina Principal </small>
                    <small className='font-bold text-sm ml-6'>Pagina Principal</small>
                    <small className='font-bold text-sm ml-6'>Pagina Principal </small>
                    <small className='font-bold text-sm ml-6'>Pagina Principal </small>
                </div>
            </div>
        </div>    

        <div className=' grid grid-cols-7 mt-2 max-w-fit-contain border border-gray-300'>
            <div className='grid col-span-7 '>
                <div className='mt-2 col-span-2'>
                    <div className='flex justify-start items-center ml-2'>
                        <small className='text-gray-500 text-sm'>General</small>
                    </div>
                </div>
                <div className='gris col-span-5 ml-2 mt-2'>
                   <div className='flex flex-justify-start'>
                      <small className='text-xl font-bold'>General</small>
                   </div>
                </div>
                <div className='grid col-span-3 ml-2'>
                    <div className='flex items-center'>
                        <small className='text-xs font-bold'>Nombre:</small>
                        <input type="text" placeholder='Nombre..' className="ml-6 text-sm h-6 border border-gray-200  h-"/>
                    </div>
                    <div className='flex items-center'>
                        <small className='text-xs font-bold'>Nombre:</small>
                        <input type="text" placeholder='Nombre..' className="ml-6 text-sm h-6 border border-gray-200  h-"/>
                    </div>
                    <div className='flex items-center'>
                        <small className='text-xs font-bold'>Nombre:</small>
                        <input type="text" placeholder='Nombre..' className="ml-6 text-sm h-6 border border-gray-200  h-"/>
                    </div>
                    <div className='flex items-center'>
                        <small className='text-xs font-bold'>Nombre:</small>
                        <input type="text" placeholder='Nombre..' className="ml-6 text-sm h-6 border border-gray-200  h-"/>
                    </div>
                </div>
            </div>
        </div>    
    </div>
      
    </>

  )
}

export default ProfileDos
