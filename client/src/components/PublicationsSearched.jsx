import React from 'react'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useState, useEffect } from 'react';
import { UserContext } from '../store/usercontext';
import { useContext } from 'react';


const PublicationsSearched = ({pubs}) => {

    const userContx = useContext(UserContext)


  return (
    <div>
                    <div>

            {pubs.map((pub) => ( 
            <div className="card w-96 bg-base-100 shadow-2xl shadow-side-left mt-4">
                                    <div className="card-body" key={pub._id}>
                                    
                                            <div className='flex'>
                                                <div className="avatar">
                                                    <div className="w-8 rounded-full">
                                                        <img src={pub.creatorProfileImage}  />
                                                    </div>
                                                </div>

                                                <div className=''>
                                                    <p className="text-black text-sm ml-2">{pub.creatorName}</p>
                                                </div>
                                                <p className='justify-end ml-8 whitespace-no-wrap text-sm border h-6 border-black cursor-pointer rounded-full bg-blue-950 text-white hover:bg-yellow-400 hover:text-black hover:font-bold'>
                                                    {pub.typeOfPublication}
                                                </p>
                                        </div>
                                            <div className=' ml-4'>
                                                <p className='font-bold text-sm color-black'>{pub.publicationTitle}</p>
                                                <p className='justify-center  text-xs mr-4'>{pub.publicationDescription}</p>

                                                <div className='mt-4 whitespace-no-wrap'>
                                                <p className=' text-xs mr-4  whitespace-no-wrap'>{pub.creatorLocation}, {pub.address}</p>
                                                <p className=' text-xs mr-4 underline cursor-pointer'>Ver en Mapa</p>
                                                </div>
                                            </div>
                                        <div className='flex'>
                                            <div className="avatar">
                                                <div className="w-24 rounded">
                                                    <img src={pub.publicationImages[0]} />
                                                </div>
                                            </div>

                                            <div className="avatar">
                                                <div className="w-24 rounded ml-4">
                                                <img src={pub.publicationImages[1]} />
                                                </div>
                                            </div>
                                        </div> 
                                        <div className='flex justify-between'>

                                            <button className="btn border-none" >
                                             <FavoriteBorderIcon />
                                            </button>  

                                            <div onClick={() => settingPubData(pub)}>
                                                <button className="btn" onClick={() => openModalThree()}><MarkUnreadChatAltIcon/></button>
                                                </div>    

                                            <button className="btn" onClick={() => openModalFour()}><ShareIcon/></button>
                                                </div>

                                                <dialog id="my_modal_3" className="modal">
                                                        <form method="dialog" className="modal-box">
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                        <div className='flex items-center space-x-2'>
                                                            <div className="avatar">                                                     
                                                                <div className="w-8 rounded-full">
                                                                    <img src={userContx.userProfileImage} />                                               
                                                                </div>
                                                                <p className='ml-2 text-gray-500 text-sm'>{userContx.userName}</p>
                                                            </div>
                                                        </div>
                                                            <textarea className='mt-2 border border-gray-400 w-full rounded-xl text-sm text-center'
                                                            placeholder='Write your commnent..'/>
                                                            <div className='flex justify-end'>
                                                                <button className='bg-blue-950 border-none mt-2 h-9 w-18 text-sm text-white hover:text-black hover:bg-yellow-400'>
                                                                    Send
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </dialog> 
                                                        

                                                    <dialog id="my_modal_4" className="modal">
                                                        <form method="dialog" className="modal-box w-80">
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                        <h3 className="font-bold text-sm flex justify-start">Compartir reclamo en mi muro</h3>
                                                        <div className=''>
                                                                <button className='bg-blue-950 border-none mt-4 h-9 w-18 text-sm text-white hover:text-black hover:bg-yellow-400'>Share</button>
                                                            </div>
                                                        </form>
                                                    </dialog>              
                                        </div>
                            </div>
            ))}
            
            </div>
                </div>
  )
}

export default PublicationsSearched
