import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SharedPublicationsCard from '../Cards/SharedPublicationsCard'

const ModalWhoSharedDetail = ({publicationId}) => {

    const [publicationData, setPublicationData] = useState([])

    useEffect(() => {
        console.log("enviando", publicationId)
        axios.get(`https://app-citizens.onrender.com/getSharedNumber/${publicationId}`)
          .then((res) => {
            setPublicationData(res.data);
            setTimeout(() => { 
              console.log(res.data)
            }, 2000)
          })
          .catch((err) => {
            console.log(err);
          });
      }, [publicationId]);

      

  return (
    <div>
        <small className="text-xs text-gray-500 cursor-pointer underline ml-2" onClick={()=>document.getElementById('my_modal_1').showModal()}>View Publication</small>
            <dialog id="my_modal_1" className="modal">
            <div className="modal-box  flex flex-col  justify-center items-center overflow-auto  max-w-[300px] md:max-w-[530px]">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle fixed btn-ghost  right-2 top-2">✕</button>
                </form> 
                <div className='mt-24 md:mt-6'>
                  {publicationData.map((p) => <SharedPublicationsCard pub={p}/>)}
                </div>
               
            </div>
            </dialog>
    </div>
  )
}

export default ModalWhoSharedDetail
