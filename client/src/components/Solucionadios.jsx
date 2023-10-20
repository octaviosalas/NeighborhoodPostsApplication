import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../store/usercontext';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Solucionadios = () => {
 
    const userCtx = useContext(UserContext)

  return (
    <div className='border w-60 xl:w-80'  style={{background:"#F2F2F2"}}>
        <div className='flex flex-col '>
        <div className='flex justify-between'>
            <p className='text-left ml-2 font-bold text-sm'>Resolved Complains</p>
            <div className="tooltip text-right mr-2" data-tip="Check real events that have been solved">
               <AnnouncementIcon style={{height:"20px", width:"20px"}}/>
            </div>
        </div>


            <div className='flex  mt-4'>
                <div className='ml-2'>
                    <img src="https://modaellos.com/wp-content/uploads/2017/11/cortes-tipo-rostro-ovalado-istock.jpg" className='h-12 w-12 rounded-full'/>
                </div>
                <div className='flex flex-col items-start justify-center mt-2 ml-4'>
                    <small className='text-md font-bold'>Darwin Roxel Publication's</small>
                    <small className='font-bold text-sm  mt-2'>Streets in bad state</small>
                    <small className='text-sm text-gray-500 underline cursor-pointer'>View Publication</small>
                </div>
            </div>

            <div className='flex mt-4'>
                <div className='ml-2 mt-2'>
                    <img src="https://media.istockphoto.com/id/1165314753/es/foto/nacido-y-criado-en-la-ciudad.jpg?s=612x612&w=0&k=20&c=JTn2xOHnXnY6jvcm-b5xn1_TAy05fWGGXF0BsnUNOwc=" className='h-12 w-12  rounded-full'/>
                </div>
                <div className='flex flex-col items-start justify-center mt-2 ml-4'>
                    <small className='text-md font-bold'>Darwin Roxel Publication's</small>
                    <small className='font-bold text-sm mt-2'>Impossible to transit</small>
                    <small className='text-sm text-gray-500 underline cursor-pointer'>View Publication</small>
                </div>
            </div>

            <div className='flex mt-4'>
                    <div className='ml-2 mt-2'>
                        <img src="https://www.instyle.es/medio/2023/07/31/ejercicios-par-afinar-el-rostro_edcfc074_230731085749_1280x853.jpg" className='h-12 w-12  rounded-full'/>
                    </div>
                    <div className='flex flex-col items-start justify-center mt-2 ml-4'>
                        <small className='text-md font-bold'>Darwin Roxel Publication's</small>
                        <small className='font-bold text-sm  mt-2'>Destroyed Streets</small>
                        <small className='text-sm text-gray-500 underline cursor-pointer'>View Publication</small>
                    </div>
            </div>
            <div className='flex items-center justify-start mt-4 ml-2'>
                <small className='text-gray-400 font-bold cursor-pointer underline hover:text-black'>See all success stories</small>
            </div>
            
        </div>
    </div>
  )
}

export default Solucionadios
