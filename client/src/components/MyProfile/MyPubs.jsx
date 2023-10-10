import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'
import { useContext } from 'react';
import { UserContext } from '../../store/usercontext';
import LoadingPublications from '../../Hooks/LoadingPublications';

const MyPubs = () => {

    const userContx = useContext(UserContext)
    const [noPublications, setNoPublications] = useState(false)
    const [myPublications, setMyPublications] = useState([])
    const [number, setNumber] = useState(0)
    const [loading, setLoading] = useState(false)

 
        useEffect(() => { 
            axios.get(`http://localhost:4000/getMyPublications/${userContx.userId}`)
                  .then((res) => { 
                        console.log(res.data)
                        setNumber(res.data.length)
                        if(res.data.length === 0) { 
                            setNoPublications(true)
                        } else { 
                            setMyPublications(res.data)
                        }
                        setTimeout(() => { 
                            setLoading(true)
                        }, 1500)
                    })
                    .catch((err) => { 
                        console.log(err)
                    })
          }, [])
   

  return (
    <>
  <div className={`border flex flex-col md:grid ${number === 1 ? 'md:grid-cols-1' : number === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} bg-gray-100 overflow-auto max-h-[350px]`}>
    {loading ? (
        noPublications ? (
            <div className="flex items-center justify-center w-screen">
                <div className='flex flex-col mt-4'>
                    <small>At the moment, you dont have Publications posted.</small>
                    <Link to={"/wall"}><small className='text-gray-500 font-bold underline cursor-pointer mt-2'>Go to create First</small></Link>
                </div>
            </div>             
        ) : (
           
            myPublications.map((p, index) => (
                <div key={p.id} className='border grid col-span-1 m-2 items-center bg-white'>
                    
                    <div className='flex max-w-fit-contain'>
                        <div className="flex justify-start items-center" style={{ flex: 1 }}>
                            <img src={p.creatorProfileImage} className='h-12 w-12 rounded-full' />
                            <small className='text-black text-xs ml-2'>{p.creatorName}</small>
                        </div>

                        <div className="flex justify-end items-center mr-2 " style={{ flex: 1 }}>
                            <div className="dropdown dropdown-end">
                            <small tabIndex={0} className="text-lg cursor-pointer">...</small>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a className='text-black'>Edit</a></li>
                                    <li><a className='text-black'>Delete</a></li>
                                </ul>
                            </div>
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
)

    ) : (
        <div className='flex items-center justify-center w-screen'>
            <LoadingPublications text={"Your Publications"} />
        </div>
        )}
</div>    
</>
  )
}

export default MyPubs
