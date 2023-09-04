import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { UserContext } from '../store/usercontext';
import MyPublicationsCard from '../components/MyPublicationsCard';
import { Link } from 'react-router-dom';

const MyPublications = () => {
    
    const userContx = useContext(UserContext)
    const [allMyPubs, setAllMyPubs] = useState([])
    const [publicationsComments, setPublicationsComments] = useState([])
    
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

    useEffect(() =>{ 
       axios.get(`http://localhost:4000/getMyPublications/${userContx.userId}`)
            .then((res) => { 
                console.log(res.data)
                setAllMyPubs(res.data)
            })
            .catch((err) => { 
                console.log(err)
            })
    }, [])

  return (
    <div>  
          <div className='mt-12'>
              <span className='text-md'> <b>{userContx.userName}</b> these are your Publications at the moment.</span>
          </div> 
          
          <div>
              {allMyPubs.map((p) => <MyPublicationsCard pub={p} comments={publicationsComments}/>)}
          </div>

          <div className='mt-12'>
           <Link to={`/`}> <span className='text-blue-950 cursor-pointer'>Create One</span></Link> 
          </div>
         
    </div>
  )
}

export default MyPublications
