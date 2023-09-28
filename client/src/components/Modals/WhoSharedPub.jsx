import React from 'react'
import { useEffect, useState } from 'react';
import useGetBackendQueries from '../../Hooks/useGetBackendQueries';
import axios from "axios"

const WhoSharedPub = ({ publicationId, close}) => {
  const [peopleWhoShared, setPeopleWhoShared] = useState([]);

  function openModalFive() {
    const modal = document.getElementById('my_modal_5');
    modal.showModal();
  }


  useEffect(() => { 
    console.log("recibi: ", publicationId)
  }, [publicationId])

  useEffect(() => { 
    console.log("cambie a: ", peopleWhoShared)
  }, [peopleWhoShared])






    useEffect(() => {
      axios.get(`http://localhost:4000/getSharedNumber/${publicationId}`)
        .then((res) => {
          setPeopleWhoShared(res.data);
          console.log(res.data)
          
        })
        .catch((err) => {
          console.log(err);
        });
    }, [publicationId]);
  

  




     return (
      <div>
        <small className='text-xs text-gray-500 ml-2 cursor-pointer underline' onClick={() => openModalFive()} > View </small>
  
        <dialog id="my_modal_5" className="modal">
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={close}>✕</button> 
 
             {peopleWhoShared.length !== 0 ? 
               <div>
                 {peopleWhoShared.map((p, index) => 
                  <div key={index} className='flex mt-2'>
                    <img src={p.sharerProfileImage} className='h-8 w-8 rounded-2xl'></img>
                    <small className='text-sm font-bold ml-2'>{p.sharer}</small>
                   </div>
                  )}
               </div> : <p>Yet, the Publications didnt Have Shared</p>
              }
            
        
       
          </form>
        </dialog>
      </div>
    );
  };
  
  export default WhoSharedPub;


  /*
  
    return (
      <div>
        <small
          className='text-xs text-gray-500 ml-2 cursor-pointer underline'
          onClick={() => openModalFive()}
        >
          {quantity} Shared
        </small>
  
        <dialog id="my_modal_5" className="modal">
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</button> 

            
         {infoShared !== 0 ? <p>Aaaaa</p> : <p>bbbb</p>} 
       
          </form>
        </dialog>
      </div>
    );
  };
  
  export default WhoSharedPub;*/