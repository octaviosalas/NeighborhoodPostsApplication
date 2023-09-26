import React from 'react'
import { useEffect, useState, useRef } from 'react';
import useGetBackendQueries from '../../Hooks/useGetBackendQueries';
import axios from "axios"

const WhoSharedPub = ({quantity, publicationId}) => {
        
     const [peopleWhoShared, setPeopleWhoShared] = useState([]);
     const [loadInfo, setLoadInfo] = useState(true);

  // Utiliza useRef para mantener vivo el valor de publicationId
     const publicationIdRef = useRef(null);
     const datosBackendRef = useRef(null)

  useEffect(() => {
    // Actualiza publicationIdRef.current cuando publicationId cambia
    publicationIdRef.current = publicationId;
  }, [publicationId]);

  
  useEffect(() => {
    // Actualiza publicationIdRef.current cuando publicationId cambia
    datosBackendRef.current = peopleWhoShared;
  }, [peopleWhoShared]);

  useEffect(() => {
    
        axios.get(`http://localhost:4000/getSharedNumber/${publicationIdRef.current}`)
             .then((res) => { 
               
                  console.log(res.data)
                  setPeopleWhoShared(res.data);
                  setTimeout(() => { 
                     setLoadInfo(false);
                  }, 5500)
             })
             .catch((err) => { 
                console.log(err)
             })

    }, [publicationId]);

  useEffect(() => {
    console.log(peopleWhoShared);
    console.log(datosBackendRef)
  }, [peopleWhoShared]);


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
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => {setLoadInfo(true)}}>✕</button> 
                                             
                                             <div>

                                             {loadInfo ? (
                                                        <p>...</p>
                                                        ) : (
                                                        <p>{datosBackendRef.current.length}</p>
                                                        )}
                                             </div>
                                       
                                              
                            </form>
                        </dialog> 
           
    </div>
    </div>
  )
}

export default WhoSharedPub
