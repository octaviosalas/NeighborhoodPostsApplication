import React from 'react'
import ShareIcon from '@mui/icons-material/Share';
import { useEffect } from 'react';

const ShareModal = ({publication}) => {

  useEffect(() => { 
    console.log(publication)
  }, [publication])

    function openModalFour() {
        const modal = document.getElementById('my_modal_4');
        modal.showModal();
      }


  return (
    <div>
         <button className="btn" onClick={() => openModalFour()}><ShareIcon/></button>
       <dialog id="my_modal_4" className="modal">
                                                      <form method="dialog" className="modal-box w-80">
                                                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                          <h3 className="font-bold text-sm flex justify-start">{publication.CreatorName}</h3>
                                                          <div className=''>
                                                                <button className='bg-blue-950 border-none mt-4 h-9 w-18 text-sm text-white hover:text-black hover:bg-yellow-400'>Share</button>
                                                            </div>
                                                      </form>
                                                </dialog>  
    </div>
  )
}

export default ShareModal
