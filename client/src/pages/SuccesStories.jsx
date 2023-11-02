import React from 'react'
import { useState, useEffect} from 'react'
import axios from "axios"
import LoadingPublications from '../Hooks/LoadingPublications'
import ImagesModal from '../components/Modals/ImagesModal'
import PhotosResolved from '../components/Modals/PhotosResolved'



const SuccesStories = () => { 

    const people = [
        {
          name: 'Leslie Alexander',
          email: 'leslie.alexander@example.com',
          role: 'Co-Founder / CEO',
          imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          lastSeen: '3h ago',
          lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
          name: 'Michael Foster',
          email: 'michael.foster@example.com',
          role: 'Co-Founder / CTO',
          imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          lastSeen: '3h ago',
          lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
          name: 'Dries Vincent',
          email: 'dries.vincent@example.com',
          role: 'Business Relations',
          imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          lastSeen: null,
        },
        {
          name: 'Lindsay Walton',
          email: 'lindsay.walton@example.com',
          role: 'Front-end Developer',
          imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          lastSeen: '3h ago',
          lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
          name: 'Courtney Henry',
          email: 'courtney.henry@example.com',
          role: 'Designer',
          imageUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          lastSeen: '3h ago',
          lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
          name: 'Tom Cook',
          email: 'tom.cook@example.com',
          role: 'Director of Product',
          imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          lastSeen: null,
        },
      ]

    const [pubsResolved, setPubsResolved] = useState([])
    const [loading, setLoading] = useState(false)
    const [showSuccesDetail, setShowSuccesDetail] = useState(false)
    const [publicationSelected, setPublicationSelected] = useState({})

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

   useEffect(() => { 
    console.log(publicationSelected)
   }, [publicationSelected])

   const choosePub = (p) => { 
     setPublicationSelected(p)
     setTimeout(() => { 
        setShowSuccesDetail(true)
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth", // Para un desplazamiento suave
          });
     }, 500)
   }

  return (
    <div >
    {loading ? (
    <>
        <div className='flex flex-col justify-center mt-12 xl:mt-12 mb-4 xl:mb-12'>
            <h4 className='font-bold text-xs sm:text-md xl:text-lg'> According to the creators of these complaints, they have been resolved </h4>
        </div>

     <div className='flex flex-col lg:flex-row'>
        <div className={`grid grid-cols-1 md:grid-cols-2 ${
                        pubsResolved.length === 4 || pubsResolved.length === 8 ? 'xl:grid-cols-4' :
                        pubsResolved.length === 3 || pubsResolved.length === 6 ? 'xl:grid-cols-3' :
                        'xl:grid-cols-2'} 
                         mt-16 xl:mt-0 gap-2 2xl:gap-6 overflow-y-auto max-h-[600px] xl:overflow-hidden xl:max-h-[2000px]  border-4 border-slate-300 lg:border-none rounded-lg`}>
            {pubsResolved.map((p) => (
                <div className='flex items-center justify-center m-2'>
                    <div className='flex flex-col  border border-slate-300 bg-gray-200 h-full w-72 2xl:w-80 rounded-lg'>
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
                                onClick={() => choosePub(p)}
                            >
                                See settlement and testimony
                            </small>
                        </div>
                    </div>
            </div>
            ))}
      </div>

        {showSuccesDetail ?    
          <div className='flex items-center justify-center mt-6 ml-0 lg:ml-4'>
            <div className='flex flex-col items-center jsutify-center mt-2 mb-2 border rounded-xl bg-gray-200'> 
                     <div className='flex flex-col items-center justify-start m-2'>
                        <img src={publicationSelected.creatorProfileImage} className='h-12 w-12 rounded-full' />
                         <small className='text-md font-bold text-black ml-2'>{publicationSelected.creatorName}</small>
                    </div>
                    <div className='flex flex-col items-center justify-center mt-2'>
                        <small className=' text-black text-xs font-bold ' style={{ maxWidth: '300px' }}>{publicationSelected.resolvedComment}</small>
                        <small className='text-xs text-gray-400 underline cursor-pointer mt-2'>
                            <PhotosResolved firstImage={publicationSelected.resolvedImages[0]} secondImage={publicationSelected.resolvedImages[1]}/>
                         </small>
                    </div>
                <div className='flex flex-col items-center justify-center border border-slate-300 bg-white h-full w-72 2xl:w-80 rounded-lg m-4'>
                    <div className='flex justify-end mr-2 w-full font-bold cursor-pointer' onClick={() => setShowSuccesDetail(false)}>X</div>
                    <div className='flex flex-col items-center justify-center'>
                        <h5 className='text-md font-bold'>{publicationSelected.publicationTitle}</h5>
                        <small className='text-sm mt-2 ml-4 mr-4'>{publicationSelected.publicationDescription}</small>
                    </div>
                        <div className='flex flex-col items-center justify-center'>
                            <small className='text-xs mt-2'>{publicationSelected.creatorLocation}, {publicationSelected.address}</small>
                        </div>
                    <div className='flex items-center justify-center gap-2 mt-4'>
                        <img src={publicationSelected.publicationImages[0]}  className='h-28 w-28 rounded-xl border' />
                        <img src={publicationSelected.publicationImages[1]}  className='h-28 w-28 rounded-xl border' />
                    </div>
                        <div className='flex items-center justify-center m-4'>
                            <small className='font-bold underline cursor-pointer text-xs'> See settlement and testimony </small>
                        </div>
                </div>
            </div>
         </div> 
        : null}
     </div> 
    </>
    ) : (
      <LoadingPublications text='Success Stories' />
    )}
  </div>
  )
}

export default SuccesStories
