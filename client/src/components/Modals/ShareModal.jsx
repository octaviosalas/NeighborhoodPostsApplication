import React from 'react'
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState, useRef } from 'react';
import PublicationsCard from '../PublicationsCard';

const ShareModal = ({publication, cancelPub}) => {


  console.log(publication)

  
  

    function openModalFour() {
        const modal = document.getElementById('my_modal_4');
        modal.showModal();
      }


  return (
    <div>
         <button className="btn" onClick={() => openModalFour()}><ShareIcon/></button>
       <dialog id="my_modal_4" className="modal">
                                                      <form method="dialog" className="modal-box w-80">
                                                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => cancelPub()}>✕</button>
                                                          <h3 className="font-bold text-sm flex justify-start">Share Publication in my Wall</h3>
                                                            <div>
                                                                <p>{publication.creatorName}</p>
                                                                <img src={publication.creatorProfileImage}/>
                                                             
                                                               
                                                            </div>

                                                            <div className=''>
                                                                  <button className='bg-blue-950 border-none mt-4 h-9 w-18 text-sm text-white hover:text-black hover:bg-yellow-400'>Share</button>
                                                              </div>
                                                      </form>
                                                </dialog>  
    </div>
  )
}

export default ShareModal
