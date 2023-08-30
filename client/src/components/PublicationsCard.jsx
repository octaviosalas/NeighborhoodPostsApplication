import React from 'react'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';

const PublicationsCard = ({pub}) => {

  function openModalThree() {
    const modal = document.getElementById('my_modal_3');
    modal.showModal();
  }

  function openModalFour() {
    const modal = document.getElementById('my_modal_4');
    modal.showModal();
  }

  

  return (
    <div>
        <div className="card w-96 bg-base-100 shadow-2xl shadow-side-left">
                                <div className="card-body">
                                    <div className='flex'>
                                       <div className="avatar">
                                          <div className="w-8 rounded-full">
                                              <img src={pub.creatorProfileImage} />
                                           </div>
                                       </div>
                                      <p className="text-gray-400 ml-6">{pub.creatorName}</p>
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

                                       <button className="btn"><FavoriteBorderIcon/></button>
                                        <button className="btn" onClick={() => openModalThree()}><MarkUnreadChatAltIcon/></button>
                                        <button className="btn" onClick={() => openModalFour()}><ShareIcon/></button>
                                           </div>

                                              <dialog id="my_modal_3" className="modal">
                                                  <form method="dialog" className="modal-box">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    <div className='flex items-center space-x-2'>
                                                        <div className="avatar">                                                     
                                                          <div className="w-8 rounded-full">
                                                              <img src="https://p1.pxfuel.com/preview/473/60/844/model-portrait-girl-woman.jpg" />                                               
                                                          </div>
                                                          <p className='ml-2 text-gray-500 text-sm'>Marisa Dinamond</p>
                                                        </div>
                                                    </div>
                                                      <textarea className='mt-2 border border-gray-400 w-full rounded-xl text-sm text-center' placeholder='Write your commnent..'/>
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
                                   </div>
                        </div>
    </div>
  )
}

export default PublicationsCard