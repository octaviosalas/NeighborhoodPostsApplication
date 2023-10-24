import React from 'react'
import { useState, useEffect} from 'react'
import axios from "axios"
import LoadingPublications from '../Hooks/LoadingPublications'



const SuccesStories = () => { 

    const [pubsResolved, setPubsResolved] = useState([])
    const [loading, setLoading] = useState(false)

   useEffect(() => { 
     axios.get("https://app-citizens.onrender.com/getOtherUsersPublications")
          .then((res) => { 
            const data = res.data
            const resolvedComplains = data.filter(publications => publications.resolved === true)
            setPubsResolved(resolvedComplains)
            console.log(resolvedComplains)
            setTimeout(() => { 
                setLoading(true)
            }, 1500)
          })
          .catch((err) => console.log(err))
   }, [])

  return (
    <div>
    {loading ? (
    <>
        <div className='flex justify-center mt-12 xl:mt-0 mb-4 xl:mb-12'>
            <h4 className='font-bold text-xs xl:text-lg'>
            According to the creators of these complaints, they have been resolved
            </h4>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-16 xl:mt-0 gap-2 2xl:gap-6 overflow-y-auto max-h-[600px] justify-center items-center'>
            {pubsResolved.map((p) => (
            <div className='flex flex-col items-center justify-center border border-slate-300 bg-gray-200 h-full w-72 2xl:w-80 rounded-lg'>
                <div className='flex items-center justify-start m-2'>
                    <img src={p.creatorProfileImage} className='h-12 w-12 rounded-full' />
                    <small className='text-md font-bold text-black ml-2'>{p.creatorName}</small>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <h5 className='text-md font-bold'>{p.publicationTitle}</h5>
                    <small className='text-sm mt-2 ml-4 mr-4'>{p.publicationDescription}</small>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <small className='text-xs mt-2'>{p.creatorLocation}, {p.address}</small>
                </div>
                <div className='flex items-center justify-center gap-2 mt-4'>
                    <img src={p.publicationImages[0]} className='h-28 w-28 rounded-xl' />
                    <img src={p.publicationImages[1]} className='h-28 w-28 rounded-xl' />
                </div>
                <div className='flex items-center justify-center m-4'>
                    <small
                        className='font-bold underline cursor-pointer text-xs'
                        onClick={() => console.log(p._id, p.creatorName)}
                    >
                        See settlement and testimony
                    </small>
                </div>
            </div>
            ))}
      </div>

      <div className='flex items-center justify-center mt-6'>
      <div className='flex flex-col items-center justify-center border border-slate-300 bg-gray-200 h-full w-72 2xl:w-80 rounded-lg'>
                <div className='flex items-center justify-start m-2'>
                    <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrtxVwcH3_sxtnC4cmT8cJ6BgugctNTiIdV3w_tfM1oSAdFPLg_hKjnOet0fEtry6CsTo&usqp=CAU"} className='h-12 w-12 rounded-full' />
                    <small className='text-md font-bold text-black ml-2'>Miriam Bregman</small>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <h5 className='text-md font-bold'>Calles Destrozadas</h5>
                    <small className='text-sm mt-2 ml-4 mr-4'>Las calles estan mal, deterioradas. Hagn algo manga de forros. Hijos de mil puta</small>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <small className='text-xs mt-2'>Argentina, Bs As, La Plata</small>
                </div>
                <div className='flex items-center justify-center gap-2 mt-4'>
                    <img  className='h-28 w-28 rounded-xl border' />
                    <img  className='h-28 w-28 rounded-xl border' />
                </div>
                <div className='flex items-center justify-center m-4'>
                    <small className='font-bold underline cursor-pointer text-xs'> See settlement and testimony </small>
                </div>
            </div>
      </div>
    </>
    ) : (
      <LoadingPublications text='Success Stories' />
    )}
  </div>
  )
}

export default SuccesStories
