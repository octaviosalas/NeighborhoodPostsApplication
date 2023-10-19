import React from 'react'
import { useEffect, useState } from 'react';
import useGetBackendQueries from '../../Hooks/useGetBackendQueries';
import axios from "axios"
import SharedPublicationsCard from '../Cards/SharedPublicationsCard';

const WhoSharedPub = ({ publicationId, close}) => {
  console.log(publicationId)
  const [peopleWhoShared, setPeopleWhoShared] = useState([]);
  const [showThePublication, setShowThePublication] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

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
      axios.get(`https://app-citizens.onrender.com/getSharedNumber/${publicationId}`)
        .then((res) => {
          setPeopleWhoShared(res.data);
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }, [publicationId]);

    useEffect(() => { 
      console.log(selectedPost)
    }, [selectedPost])

    const selectedPostToShow = (p) => { 
      setSelectedPost(p)
      setTimeout(() => { 
         setShowThePublication(true)
      }, 500)
    }
  

     return (
      <div>
        <small className='text-xs text-gray-500 ml-2 cursor-pointer underline ' onClick={() => openModalFive()} > View Shared </small>
    
  
        <dialog id="my_modal_5" className="modal border border-black max-w-fit-contain">
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={close}>✕</button> 
 
            {peopleWhoShared.length !== 0 ? (
  <div>
    {peopleWhoShared.map((p) => (

      <div key={p._id} className='flex mt-2'>
               {showThePublication ? null : 
                <div className='flex'>
                    <img src={p.sharerProfileImage} className='h-8 w-8 rounded-2xl'></img>
                    <small className='text-sm font-bold ml-2'>{p.sharer}</small>
                </div>
               }
                {showThePublication ? null : <small className='text-sm text-gray-500 ml-6 underline cursor-pointer' onClick={() => selectedPostToShow(p)}>View Post</small>}
                {showThePublication && selectedPost && selectedPost._id === p._id ? (
                          <div>
                            <SharedPublicationsCard pub={selectedPost}/> 
                              <div className=' mt-8'>
                                 <small className='text-sm underline text-gray-500 cursor-pointer' onClick={() => setShowThePublication(false)}>Close Publication</small>
                              </div>
                          </div>
                    ) : null}
                  </div>
            ))}
          </div>
        ) : (
          <p className='text-sm'>Yet, the Publications didn't Have Shared</p>
        )}

          </form>
        </dialog>
      </div>
    );
  };
  
  export default WhoSharedPub;



  /*import React from 'react'
import { useEffect, useState } from 'react';
import useGetBackendQueries from '../../Hooks/useGetBackendQueries';
import axios from "axios"

const WhoSharedPub = ({ publicationId, close}) => {
  const [peopleWhoShared, setPeopleWhoShared] = useState([]);
  const [showThePublication, setShowThePublication] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

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
      axios.get(`https://app-citizens.onrender.com/getSharedNumber/${publicationId}`)
        .then((res) => {
          setPeopleWhoShared(res.data);
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }, [publicationId]);

    useEffect(() => { 
      console.log(selectedPost)
    }, [selectedPost])

    const selectedPostToShow = (p) => { 
      setSelectedPost(p)
      setTimeout(() => { 
         setShowThePublication(true)
      }, 500)
    }
  

  




     return (
      <div>
        <small className='text-xs text-gray-500 ml-2 cursor-pointer underline' onClick={() => openModalFive()} > View Who Shared </small>
  
        <dialog id="my_modal_5" className="modal">
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={close}>✕</button> 
 
            {peopleWhoShared.length !== 0 ? (
  <div>
    {peopleWhoShared.map((p) => (

      <div key={p._id} className='flex mt-2'>
                <img src={p.sharerProfileImage} className='h-8 w-8 rounded-2xl'></img>
                <small className='text-sm font-bold ml-2'>{p.sharer}</small>
                <small className='text-sm text-gray-500 ml-6 underline cursor-pointer' onClick={() => selectedPostToShow(p)}>View the shared post</small>
                {showThePublication && selectedPost && selectedPost._id === p._id ? (
                          <div>
                            <p>Sharer: {selectedPost.sharer}</p>
                            <img src={selectedPost.sharerProfileImage} />
                          </div>
                    ) : null}
                  </div>
            ))}
          </div>
        ) : (
          <p>Yet, the Publications didn't Have Shared</p>
        )}

          </form>
        </dialog>
      </div>
    );
  };
  
  export default WhoSharedPub;



*/



