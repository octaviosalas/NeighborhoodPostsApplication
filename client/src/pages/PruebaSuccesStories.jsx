import React from 'react'
import { useState, useEffect} from 'react'
import axios from "axios"
import LoadingPublications from '../Hooks/LoadingPublications'
import ImagesModal from '../components/Modals/ImagesModal'
import PhotosResolved from '../components/Modals/PhotosResolved'
import {Link} from "react-router-dom"
import VisibilityIcon from '@mui/icons-material/Visibility';
import ViewResolvedComplai from '../components/Modals/ViewResolvedComplai'


const PruebaSuccesStories = () => {

    const [pubsResolved, setPubsResolved] = useState([])
    const [loading, setLoading] = useState(false)
    const [showSuccesDetail, setShowSuccesDetail] = useState(false)
    const [publicationSelected, setPublicationSelected] = useState("")

   useEffect(() => { 
     axios.get("https://app-citizens.onrender.com/getOtherUsersPublications")
          .then((res) => { 
            const data = res.data
            const resolvedComplains = data.filter(publications => publications.resolved === true)
            setPubsResolved(resolvedComplains)
          })
          .catch((err) => console.log(err))
   }, [])

   const showId = (post) => { 
    console.log(post._id, post.publicationTitle)
    setPublicationSelected(post._id)
   }

   const resetSelect = () => { 
    setPublicationSelected("")
   }

   useEffect(() => { 
      console.log(publicationSelected)
   }, [publicationSelected])

    return (
        <div className="bg-white py-24 sm:py-32 ">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Claims that have been resolved</h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
              You can see the testimonies and images of the arrangement by clicking on the title of the publication
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {pubsResolved.map((post) => (
                <article key={post._id} className="flex max-w-xl flex-col items-start justify-between" onClick={() => showId(post)}>
                  <div className="flex items-center gap-x-8 text-xs">
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <img src={post.creatorProfileImage} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                    <div className="text-sm leading-6">
                      <p className="font-semi-bold text-gray-900 font-bold">                      
                          {post.creatorName}    
                      </p>
                      <p className="text-gray-600">{post.creatorLocation}</p>
                    </div>
                  </div>
                     <Link to={`/userManualSearch/${post.typeOfPublication}`}> 
                      <small className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-bold text-sm cursor-pointer text-blue-700 hover:bg-gray-100" >
                          {post.typeOfPublication}
                        </small>
                      </Link>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <small className='font-bold text-black'>
                        {post.publicationTitle}
                      </small>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.publicationDescription}</p>
                    <div className="flex gap-2 items-center justify-center">
                         <img className='h-24 w-24 rounded-lg' src={post.publicationImages[0]}/>
                         <img className='h-24 w-24 rounded-lg' src={post.publicationImages[1]}/>
                    </div>
                    <div className='mt-4'>
                      <ViewResolvedComplai reset={resetSelect} publicationId={publicationSelected} />
                    </div>
                  </div>
             
                </article>
              ))}
            </div>
          </div>
        </div>
      )
}

export default PruebaSuccesStories



