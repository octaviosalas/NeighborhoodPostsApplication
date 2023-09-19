import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { UserContext } from '../store/usercontext';
import MyPublicationsCard from '../components/MyPublicationsCard';
import { Link } from 'react-router-dom';
import New from '../components/New';
import puzzle from "../img/puzzle.png";
import fon from "../img/imageFon.png"
import useGetBackendQueries from "../Hooks/useGetBackendQueries"
import LoadingPublications from "../Hooks/LoadingPublications"


const MyPublications = () => {
    
    const userContx = useContext(UserContext)
    const [allMyPubs, setAllMyPubs] = useState([])
    const [publicationsComments, setPublicationsComments] = useState([])
    const {data, loading, noPublications} = useGetBackendQueries(`getMyPublications/${userContx.userId}`)
    
    useEffect(() => { 
      axios.get(`http://localhost:4000/getPublicationComments/${userContx.userId}`)
            .then((res) => { 
                  console.log(res.data)
                  setPublicationsComments(res.data)
              })
              .catch((err) => { 
                  console.log(err)
              })
    }, [])

   

  return (
    <div>  
        {noPublications ? ( 
                     <>
                           <div>
                                   <p><b>{userContx.userName}</b> , at the moment you dont have Publications </p> 
                                   <div className='mt-6'>
                                           <div className='flex'> 
                                                <div id="hero-section__img">
                                                    <img width="300" height="300" src={fon} alt="Personas sobre un rompecabezas" />
                                                </div> 
                                                <div className='flex flex-col items-center gap-4 justify-center  ml-6'>
                                                   <New/>      
                                                </div>
                                           </div>
                                   </div>
                          </div>  
                     </>
          )  : loading ? ( 
                         <LoadingPublications text={"Publications"}/>
                         )
                       : ( 
                   <>
                        <div className='mt-12'>
                            <span className='text-md'> <b>{userContx.userName}</b> these are your Publications at the moment.</span>
                        </div> 

                        <div>
                            {data.map((p) => <MyPublicationsCard pub={p} comments={publicationsComments}/>)}
                        </div>

                        <div className='mt-12'>
                            <Link to={`/`}> <span className='text-blue-950 cursor-pointer'>Create One</span></Link> 
                        </div>
                   </> 
                    )}
    </div>
  )
}

export default MyPublications
