import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import useGetBackendQueries from '../../Hooks/useGetBackendQueries';


const ViewResolvedComplai = ({publicationId, reset}) => {

    
    const { data } = useGetBackendQueries(`getOnePublication/${publicationId}`);
    const [thePub, setThePub] = useState([])  
 
    useEffect(() => { 
        console.log(data)
        setThePub(data)
    }, [publicationId])

    useEffect(() => { 
        console.log(thePub)
    }, [thePub])

  return (
    <div>
      <small className="" onClick={()=>document.getElementById('my_modal_20').showModal()}><VisibilityIcon style={{cursor:"pointer", backgroundColor:"white"}}/></small>
        <dialog id="my_modal_20" className="modal">
        <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() =>reset()}>✕</button>
            </form>
         {thePub.map((c) => <h3>{c.creatorName}</h3>)}
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
        </dialog>
    </div>
  )
}

export default ViewResolvedComplai
