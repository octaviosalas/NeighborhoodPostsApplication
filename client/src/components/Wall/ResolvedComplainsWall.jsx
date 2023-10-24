import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../store/usercontext';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import axios from "axios"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingPublications from "../../Hooks/LoadingPublications"
import ReactConfetti from 'react-confetti';


const ResolvedComplainsWall = () => {
 
    const userCtx = useContext(UserContext)

    const [firstThreeResolvedClaims, setFirstThreeResolvedClaims] = useState([])
    const [secondThreeResolvedClaims, setSecondThreeResolvedClaims] = useState([])
    const [loading, setLoading] = useState(true)
    const [isConfettiActive, setIsConfettiActive] = useState(false);

    useEffect(() => { 
      axios.get("https://app-citizens.onrender.com/getOtherUsersPublications")
           .then((res) => { 
            const data = res.data
            const onlyResolved = data.filter(pubs => pubs.resolved === true)
            const firstThreeResolved = onlyResolved.slice(0, 3)
            setFirstThreeResolvedClaims(firstThreeResolved)
            setTimeout(() => { 
              setLoading(false)
            }, 1500)
           })
           .catch((err) => { 
            console.log(err)
           })
    }, [])


    const handleMouseEnter = () => {
        setIsConfettiActive(true)
        setTimeout(() => { 
            setIsConfettiActive(false)
        }, 4200)
    };
    

  return (
    <div className='border border-slate-300 w-60 xl:w-80 bg-gray-200  rounded-lg' onMouseEnter={handleMouseEnter}>
        <div className='flex flex-col '>
            <div className='flex justify-between'>
                <p className='text-left ml-2 font-bold text-sm'>Resolved Complains</p>
                <div className="tooltip text-right mr-2" data-tip="Check real events that have been solved">
                <AnnouncementIcon style={{height:"20px", width:"20px"}}/>
                </div>
            </div>


            {loading ? (
                <div className='mt-6 flex items-center justify-center'>
                  <LoadingPublications text="Success Stories" />
                </div>
                ) : (
                    firstThreeResolvedClaims.map((r, index) => (
                    <div key={index} className='flex  mt-4'>
                    <div className='ml-2'>
                        <img src={r.creatorProfileImage} className='h-12 w-12 rounded-full' alt={r.creatorName} />
                    </div>
                    <div className='flex flex-col items-start justify-center mt-2 ml-4'>
                        <small className='text-md font-bold'>{r.creatorName}'s Publication</small>
                        <small className='font-bold text-sm mt-2'>{r.publicationTitle}</small>
                        <small className='text-sm text-gray-500 underline cursor-pointer'>View Publication</small>
                    </div>
                    </div>
                ))
                )}

            
            <div className='flex items-center justify-start mt-4 ml-2'>
               <Link to={"/succesStories"}><small className='text-gray-400 font-bold cursor-pointer underline hover:text-black'>See all success stories</small></Link>
            </div>
            {isConfettiActive ?  <ReactConfetti /> : null}
        </div>
    </div>
  )
}

export default ResolvedComplainsWall
