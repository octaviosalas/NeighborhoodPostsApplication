import React from 'react'
import { useEffect, useState } from 'react';
import useGetBackendQueries from '../../Hooks/useGetBackendQueries';
import axios from "axios"

const WhoSharedPub = ({quantity, publicationId}) => {
        
    const [peopleWhoShared, setPeopleWhoShared] = useState([])
  
        useEffect(() => { 
            axios.get(`http://localhost:4000/getSharedNumber/${publicationId}`)
            .then((res) => { 
                setPeopleWhoShared(res.data)
                console.log(res.data)
            })
            .catch((err) => { 
              console.log(err)
         })
          }, [publicationId])
  

    function openModalThree() {
        const modal = document.getElementById('my_modal_3');
        modal.showModal();
      }



  return (
    <div>
         <div>
         <small className='text-xs text-gray-500 ml-2 cursor-pointer underline' onClick={() => openModalThree()} >{quantity} Shared</small> 
                
                        <dialog id="my_modal_3" className="modal">
                            <form method="dialog" className="modal-box">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</button>
                                                <div className='flex items-center space-x-2'>
                                                        <div className="avatar">                                                     
                                                               
                                                            <p className='ml-2 text-gray-500 text-sm'>aaaa</p>
                                                        </div>
                                                </div>
                                    <textarea className='mt-2 border border-gray-400 w-full rounded-xl text-sm text-center'
                                            placeholder='Write your commnent..' />
                                <div className='flex justify-end'>
                                    <button className='bg-blue-950 border-none mt-2 h-9 w-18 text-sm text-white hover:text-black hover:bg-yellow-400' >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </dialog> 
           
    </div>
    </div>
  )
}

export default WhoSharedPub
