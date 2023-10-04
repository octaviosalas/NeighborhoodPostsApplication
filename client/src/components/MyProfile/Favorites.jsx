import React, { useState } from 'react'
import axios from 'axios'
import {UseState, useEffect} from 'react'
import { useContext } from 'react'
import { UserContext } from '../../store/usercontext'
import LoadingPublications from '../../Hooks/LoadingPublications'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";


const Favorites = () => {

    const userContx = useContext(UserContext)
    const [allMyFavs, setAllMyFavs] = useState([])
    const [loading, setLoading] = useState(false)
 

    useEffect(() => { 
      console.log("aa")
    }, [])

    useEffect(() => { 
       
        axios.get(`http://localhost:4000/getMyFavs/${userContx.userId}`)
            .then((res) => { 
            console.log(res.data)
            setAllMyFavs(res.data)
            setTimeout(() => { 
                 setLoading(true)
            }, 2000)
            })
            .catch((err) => { 
            console.log(err)
            })
    }, [])

    

  return (
      <>
    
      <div className='border grid grid-cols-3'>
            {loading ? (
                allMyFavs.map((p) => (
                    <div key={p.id} className='border grid col-span-1 m-2'> 

                    <div className='flex  max-w-fit-contain'>

                        <div className="flex justify-start items-center" style={{ flex: 1 }}>
                            <img src={p.creatorProfileImage} className='h-12 w-12 rounded-full' />
                            <small className='text-black text-xs ml-2'>{p.creatorName}</small>
                        </div>
                        <div className="flex justify-end items-center mr-2 " style={{ flex: 1 }}>
                          <FavoriteBorderIcon/>
                        </div>

                    </div>
                            <div className=' max-w-fit-contain'>
                            <div className="grid col-span-1 max-w-fit-contain ml-4">
                                        <p className="font-bold text-sm text-black"> {p.publicationTitle}</p>
                                        <p className="justify-center text-xs mr-4">{p.publicationDescription} </p>
                                    <div className="mt-4 whitespace-no-wrap">
                                        <p className="text-xs mr-4  whitespace-no-wrap">  {p.creatorLocation}, {p.address} </p>
                                        <p className="text-xs mr-4 underline cursor-pointer">Ver en Mapa</p>
                                    </div>
                                    <div className='flex items-center justify-center gap-2 mt-2'>
                                         <img src={p.publicationImages[0]} className='h-16 w-16'/>
                                         <img src={p.publicationImages[0]} className='h-16 w-16'/>
                                    </div>
                                    <div>
                                        <small className='underline text-xs font-bold text-gray-400'>Delete</small>
                                    </div>
                            </div>
                            </div>
                    </div>
                ))
            ) : (
                <div className='flex items-center justify-center h-full'>
                    <LoadingPublications text={"Favorites"} />
                </div>
                )}
      </div>    
    </>
     
  )
}


export default Favorites
