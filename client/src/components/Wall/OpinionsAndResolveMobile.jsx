import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../store/usercontext';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import axios from "axios"
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const OpinionsAndResolveMobile = () => {

  const userCtx = useContext(UserContext)

  const [resolvedClaims, setResolvedClaims] = useState([])

  useEffect(() => { 
    axios.get("https://app-citizens.onrender.com/getOtherUsersPublications")
         .then((res) => { 
          const data = res.data
          const onlyResolved = data.filter(pubs => pubs.resolved === true)
          setResolvedClaims(onlyResolved)
         })
         .catch((err) => { 
          console.log(err)
         })
  }, [])

  const goTop = () => { 
    window.scrollTo({
        top: 0,
        behavior: "smooth", // Para un desplazamiento suave
      });
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  return (
    <div className='flex max-w-fit-contain h-40 border rounded-lg border-slate-300 shadow-xl overflow-auto max-h-[200px]'>
      <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-80 sm:w-[400px] md:w-[550px]">
                    <div className='flex flex-col items-center justify-center w-full'>
                          <div className='flex items-center justify-center'>
                            <small className='font-bold text-sm'>Resolved Complains</small>
                          </div>

                         {resolvedClaims.map((r) => ( 
                            <div className='flex items-center justify-center'>
                                <div className='flex  mt-4'>
                                    <div className='ml-2'>
                                         <img src={r.creatorProfileImage} className='h-8 w-8 sm:h-12 sm:w-12 rounded-full'/>
                                    </div>
                                    <div className='flex flex-col items-start justify-center mt-2 ml-4'>
                                            <small className='text-md font-bold'>{r.creatorName} 's Claim</small>
                                            <small className='font-bold text-sm  mt-2'>{r.publicationTitle}</small>
                                            <small className='text-sm text-gray-500 underline cursor-pointer'>View Publication</small>
                                    </div>
                                </div>
                          </div>
                         ))}
                    </div>
                    
                </div> 

                  
      </div>
    </div>
  )
}

export default OpinionsAndResolveMobile

