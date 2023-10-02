import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'



const Prueba = () => {

    const [publicationData, setPublicationData] = useState([])

    useEffect(() => { 
       axios.get("http://localhost:4000/getOnePublication/64ef3f94a73bd05a4aab33a5") 
            .then((res) => { 
                console.log(res.data)
                setPublicationData(res.data)
            })
            .catch((err) => { 
                console.log(err)
            })
    }, [])
  return (
    <>  
         {publicationData.map((p) => ( 
            <div className='mt-6 border grid grid-cols-2 gap-12'>
                <div className='bg-red-500 grid place-content-center text-white text-xl col-span-2'>
                        <div className='flex gap-12'>
                            <small className=' justify-start'>{p.creatorName}</small>
                            <small className=' justify-end'>{p.typeOfPublication}</small>
                        </div>
                </div>
                <div className='bg-red-500 grid place-content-center text-white text-xl col-span-2'>
                     <div className='flex flex-col justify-center items-center'>
                         <h2 className='text-xl font-bold'>{p.publiationTitle}</h2>
                         <small className='text-lg'>{p.publicationDescription}</small>
                         <small className='text-sm'>{p.creatorLocation}</small>
                     </div>
                </div>
                 <div className='bg-red-500 grid place-content-center text-white text-xl col-span-2'>
                    <div className='flex gap-4'>
                        <img src={p.publicationImages[0]} className='h-12 w-12'/>
                        <img src={p.publicationImages[1]} className='h12 w-12'/>
                    </div>
                </div>
                 <div className='bg-red-500 grid place-content-center text-white text-xl col-start-2'>
                       <div className='flex'>
                          <small className=' flex justify-end text-xs text-black underline cursor-pointer'>1 Comment</small>
                          <small className='flex justify-end text-xs text-black underline cursor-pointer'>1 Shared</small>
                       </div>
                 </div>
                  <div className='bg-red-500 grid place-content-center text-white text-xl col-span-2'>
                       <div className='flex flex-wrap gap-10'>
                         <img src="https://www.iconpacks.net/icons/2/free-favourite-icon-2765-thumb.png" className="h-12 w-12"/>
                         <img src="https://www.nicepng.com/png/detail/207-2078186_comment-free-icon-comment-free-download.png" className="h-12 w-12"/>
                         <img src="https://cdn-icons-png.flaticon.com/512/1358/1358023.png" className="h-12 w-12"/>
                       </div>
                  </div>
         </div>
         ))}
         
   
    </>
    
  )
}

export default Prueba
