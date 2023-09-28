import React from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import useGetBackendQueries from '../Hooks/useGetBackendQueries';
import PublicationsCard from '../components/Cards/PublicationsCard';
import LoadingPublications from '../Hooks/LoadingPublications';

const OtherUsersProfile = () => {  

    const [userPublications, setUserPublications] = useState([])
    const [userName, setUserName] = useState(null)
    const [load, setLoad] = useState(true)
    const {userId} = useParams()
    const { data, loading } = useGetBackendQueries(`getUserPublication/${userId}`); 

    useEffect(() => { 
        setUserPublications(data)
        console.log(data)
        data.map((d) => { 
            setUserName(d.creatorName)
        })
        setTimeout(() => { 
            setLoad(false)
        }, 2000)
    }, [data])



  return (
        <div>
               {load ? (
                <LoadingPublications text={`${userName} data..`}/>
                   ) : (
                userPublications.length !== 0 ? (
                userPublications.map((p) => <PublicationsCard pub={p} />)
                    ) : (
                    <small>{userName} has not Publications yet..`</small>
                    )
            )}
       </div>
  )
}

export default OtherUsersProfile
