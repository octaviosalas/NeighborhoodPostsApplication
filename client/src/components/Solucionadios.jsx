import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../store/usercontext';

const Solucionadios = () => {
 
    const userCtx = useContext(UserContext)

  return (
    <div className='border w-80'>
        <div className='flex flex-col '>
            <div className='flex items-center justify-center'>
                <h4 className='text-md font-bold'>Complaints resolved</h4>
            </div>

            <div className='flex border'>
                <div className='ml-2'>
                    <img src={userCtx.userProfileImage} className='h-full w-12 rounded-lg'/>
                </div>
                <div className='flex flex-col items-start justify-center mt-2 ml-4'>
                    <small className='text-md font-bold'>Darwin Roxel Publication's</small>
                    <small className='font-bold text-sm'>Streets in bad state</small>
                    <small className='text-sm text-gray-500 underline cursor-pointer'>View Publication</small>
                </div>
            </div>

            <div className='flex border'>
                <div className='ml-2'>
                    <img src={userCtx.userProfileImage} className='h-full w-12 rounded-lg'/>
                </div>
                <div className='flex flex-col items-start justify-center mt-2 ml-4'>
                    <small className='text-md font-bold'>Darwin Roxel Publication's</small>
                    <small className='font-bold text-sm'>Streets in bad state</small>
                    <small className='text-sm text-gray-500 underline cursor-pointer'>View Publication</small>
                </div>
            </div>

            <div className='flex border'>

                    <div className='ml-2'>
                        <img src={userCtx.userProfileImage} className='h-full w-12 rounded-lg'/>
                    </div>

                    <div className='flex flex-col items-start justify-center mt-2 ml-4'>
                        <small className='text-md font-bold'>Darwin Roxel Publication's</small>
                        <small className='font-bold text-sm'>Streets in bad state</small>
                        <small className='text-sm text-gray-500 underline cursor-pointer'>View Publication</small>
                    </div>
            </div>
            
        </div>
    </div>
  )
}

export default Solucionadios
