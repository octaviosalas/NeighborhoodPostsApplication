import React from 'react'
import { useEffect, useState } from 'react';
import useGetBackendQueries from '../../Hooks/useGetBackendQueries';
import axios from "axios"

const WhoSharedPub = ({quantity, publicationId, closeShared}) => {
        
    const [peopleWhoShared, setPeopleWhoShared] = useState([])
    const [loadInfo, setLoadInfo] = useState(true)
  
        useEffect(() => { 
            axios.get(`http://localhost:4000/getSharedNumber/${publicationId}`)
            .then((res) => { 
                setPeopleWhoShared(res.data)
                console.log(res.data)
                setTimeout(() => { 
                     setLoadInfo(false)
                }, 2500)
            })
            .catch((err) => { 
              console.log(err)
         })
          }, [publicationId])


    function openModalFive() {
        const modal = document.getElementById('my_modal_5');
        modal.showModal();
      }



  return (
    <div>
         <div>
         <small className='text-xs text-gray-500 ml-2 cursor-pointer underline' onClick={() => openModalFive()} >{quantity} Shared</small> 
                
                        <dialog id="my_modal_5" className="modal">
                            <form method="dialog" className="modal-box">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeShared(null)}>✕</button> 

                                            {loadInfo ? <p>Cargando..</p> 
                                                      :
                                                      <div>
                                                        {peopleWhoShared.map((p) => ( 
                                                            <div className="flex flex-grow">
                                                                <img className='rounded-xl h-8 w-8' src={p.sharerProfileImage}/>
                                                                <small className='text-sm font-bold'>{p.sharer}</small>
                                                            </div>
                                                        ))}
                                                        iii
                                                   </div>        
                                                }
                                              
                            </form>
                        </dialog> 
           
    </div>
    </div>
  )
}

export default WhoSharedPub
