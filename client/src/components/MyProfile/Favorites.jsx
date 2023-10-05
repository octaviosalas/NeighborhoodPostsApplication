import React, { useState } from 'react'
import axios from 'axios'
import {UseState, useEffect} from 'react'
import { useContext } from 'react'
import { UserContext } from '../../store/usercontext'
import LoadingPublications from '../../Hooks/LoadingPublications'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from 'react-router-dom'


const Favorites = () => {

    const userContx = useContext(UserContext)
    const [allMyFavs, setAllMyFavs] = useState([])
    const [noFavs, setNoFavs] = useState(false)
    const [loading, setLoading] = useState(false)
 

    useEffect(() => { 
      console.log("aa")
    }, [])

    useEffect(() => { 
       
        axios.get(`http://localhost:4000/getMyFavs/${userContx.userId}`)
            .then((res) => { 
            console.log(res.data)
            if(res.data.length === 0) { 
                setNoFavs(true)
            }
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
    
      <div className='border grid grid-cols-3 bg-gray-100 overflow-auto max-h-[350px]'> 
    
            {loading ? (
                noFavs ? (
                    <div className="flex items-center justify-center w-screen">
                        <div className='flex flex-col mt-4'>
                            <small>At the moment, you dont have Publications saved in your Favs.</small>
                            <Link to={"/wall"}><small className='text-gray-500 font-bold underline cursor-pointer mt-2'>Go to the Wall</small></Link>
                        </div>
                    </div>             
                ) : (
                allMyFavs.map((p) => (
           <div key={p.id} className='border rounded-lg grid col-span-1 m-2 bg-white'>
                    <div className='flex max-w-fit-contain'>
                            <div className="flex justify-start items-center" style={{ flex: 1 }}>
                                <img src={p.creatorProfileImage} className='h-12 w-12 m-2 rounded-full' />
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
                                        <small className='underline text-xs font-bold text-gray-500 cursor-pointer hover:text-black'>Remove of Favs</small>
                                    </div>
                            </div>
                            </div>
                    </div>
                ))
    )
            ) : (
                <div className='flex items-center justify-center w-screen'>
                    <LoadingPublications text={"Favorites"} />
                </div>
                )}
      </div>    
    </>
     
  )
}


export default Favorites
