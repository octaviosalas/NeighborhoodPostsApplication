import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { UserContext } from '../store/usercontext';
import MyPublicationsCard from '../components/MyPublicationsCard';

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
         {allMyPubs.map((p) => <MyPublicationsCard pub={p} comments={publicationsComments}/>)}
    </div>
  )
}

export default MyPublications
