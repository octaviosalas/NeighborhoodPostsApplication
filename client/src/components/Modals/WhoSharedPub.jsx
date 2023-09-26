import React from 'react'
import { useEffect, useState } from 'react';
import useGetBackendQueries from '../../Hooks/useGetBackendQueries';
import axios from "axios"

const WhoSharedPub = ({quantity, publicationId}) => {
    const [peopleWhoShared, setPeopleWhoShared] = useState([]);
    const [loadInfo, setLoadInfo] = useState(true);
    var infoShared;
    var idSharedPeople;
  
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
  
    function openModalFive() {
      const modal = document.getElementById('my_modal_5');
      modal.showModal();
    }
    
    useEffect(() => { 
        console.log(peopleWhoShared.length)
    }, [peopleWhoShared])

    useEffect(() => { 
        console.log(peopleWhoShared)
        var infoShared = peopleWhoShared.length
        var idSharedPeople = peopleWhoShared.map((p) => p._id)
        console.log("Info Shared Length: ", infoShared)
        console.log("Info Shared ID: ", idSharedPeople)
    }, [peopleWhoShared])
   
   
    

    

  
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

            
         {idSharedPeople !== 0 ? <p>{idSharedPeople.map((c) => <p>{c}</p>)}</p> : <p>bbbb</p>} 
       
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