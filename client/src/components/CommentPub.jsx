import React from 'react'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { UserContext } from '../store/usercontext';
import { useContext } from 'react';
import { useState } from 'react';

const CommentPub = ({idPub}) => {
    
    function openModalThree() {
        const modal = document.getElementById('my_modal_3');
        modal.showModal();
      }

      const userContx = useContext(UserContext)
      console.log(idPub)

      const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
          <button className="btn" onClick={() => openModalThree()}><MarkUnreadChatAltIcon/></button>

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
                                                      <textarea className='mt-2 border border-gray-400 w-full rounded-xl text-sm text-center' placeholder='Write your commnent..'/>
                                                      <div className='flex justify-end'>
                                                          <button className='bg-blue-950 border-none mt-2 h-9 w-18 text-sm text-white hover:text-black hover:bg-yellow-400'>Send</button>
                                                      </div>
                                                  </form>
                                                </dialog> 
    </div>
  )
}

export default CommentPub
