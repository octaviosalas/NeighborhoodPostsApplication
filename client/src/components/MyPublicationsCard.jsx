import React from 'react'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { UserContext } from '../store/usercontext';


const MyPublicationsCard = ({pub}) => {

   const userContx = useContext(UserContext)

  return (
    <div>
        <div className="card w-96 bg-base-100 shadow-2xl shadow-side-left">
                                <div className="card-body">
                                <div className='flex justify-end border border-black'> 
                                    <p className='' >Edit</p>
                                    <p className=''>Delete</p>
                                  </div>

                                      <div className='flex mt-2 '>
                                            <div className="avatar">
                                                <div className="w-8 rounded-full">
                                                    <img src={pub.creatorProfileImage} />
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

                                          <div className='mt-2 '>
                                            <p className=' text-xs mr-4'>{pub.address}</p>
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
                                                                   
                                        <div className='flex'>
                                           <p className='text-sm mt-4'>1</p>
                                           <button className="btn" onClick={() => openModalThree()}><MarkUnreadChatAltIcon titleAccess='View Comments'/></button>
                                        </div>
                                        <button className="btn" onClick={() => openModalFour()}><ShareIcon/></button>
                                    </div>

                                              <dialog id="my_modal_3" className="modal">
                                                  <form method="dialog" className="modal-box">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕y</button>
                                                    <div className='flex items-center space-x-2'>
                                                        <div className="avatar">                                                     
                                                          <div className="w-8 rounded-full">
                                                              <img src={userContx.userProfileImage} />                                               
                                                          </div>
                                                          <p className='ml-2 text-gray-500 text-sm'>{userContx.userName}</p> 
                                                        </div>
                                                    </div>
                                                      <textarea className='mt-21 border border-gray-40 0w-full rounded-xl text-sm text-center' placeholder='Write yourrr commnent..'/>
                                                      <div className='flex justify-end'>
                                                          <button className='bg-blue-950 border-none mt-2 h-9 w-18 text-sm text-white hover:text-black hover:bg-yellow-400'>Send</button>
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

                                    <div className='flex justify-between'>
                                        <div>
                                           <p className='whitespace-no-wrap text-xs '>Was your claim resolved?</p> 
                                        </div>

                                        <div className='justify-end'>
                                           <p className='font-bold text-xs underline cursor-pointer'>Shared the news</p> 
                                        </div>
                                        
                                    </div>                
                                   </div>
                        </div>
    </div>
  )
}

export default MyPublicationsCard
