import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { UserContext } from '../store/usercontext';
import MyPublicationsCard from '../components/Cards/MyPublicationsCard';
import { Link } from 'react-router-dom';
import New from '../components/New';
import puzzle from "../img/puzzle.png";
import fon from "../img/imageFon.png"
import useGetBackendQueries from "../Hooks/useGetBackendQueries"
import LoadingPublications from "../Hooks/LoadingPublications"
import SharedPublicationsCard from '../components/Cards/SharedPublicationsCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const MyPublications = () => {
    
    const userContx = useContext(UserContext)

    const [allMyPubs, setAllMyPubs] = useState([])
    const [publicationsComments, setPublicationsComments] = useState([])
    const { data: myData, loading: myLoading, noPublications: myNoPublications } = useGetBackendQueries(`getMyPublications/${userContx.userId}`);
    const { data: otherData, loading: otherLoading, noPublications: otherNoPublications } = useGetBackendQueries(`getMySharedPublications/${userContx.userId}`); 
    
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

    useEffect(() => { 
        console.log(otherData)
    }, [otherData])

   

  return (
    <div className=''>  
        {myNoPublications ? ( 
                     <>
                           <div>
                              <b>{userContx.userName}</b> 
                              <br />
                              <small>At the moment you dont have Publications</small>                                
                          </div>  
                     </>
          )  : myLoading ? ( 
                         <LoadingPublications text={"Publications"}/>
                         )
                       : ( 
                   <>
                        <div className='mt-24 xxs:mt-12 flex flex-col items-center justify-center'>
                            <span className='text-md'> 
                                <b>{userContx.userName}</b>
                                <br />
                                these are your Publications at the moment.
                           </span>
                        </div> 

                        <div>
                            {myData.map((p) => <MyPublicationsCard pub={p} comments={publicationsComments}/>)}
                        </div>

                        <div className='flex flex-col justify-center items-center mt-24'> 

                           <div className='flex flex-col items-center justify-center'>
                              <h4 className='font-bold text-xxs'>Shared Publications</h4>
                              <KeyboardArrowDownIcon/>
                           </div> 

                           <div className='mt-4'>
                             {otherData.map((p) => <SharedPublicationsCard pub={p} />)}
                           </div>

                   
                        </div>
                   </> 
                    )}
    </div>
  )
}

export default MyPublications
