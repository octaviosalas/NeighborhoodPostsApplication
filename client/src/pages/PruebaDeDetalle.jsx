import { useState, useEffect } from 'react'
import React from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import axios from 'axios'
import useGetBackendQueries from '../Hooks/useGetBackendQueries';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


  
  
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function PruebaDeDetalle() {

  const params = useParams()
  const [publicationSelected, setPublicationSelected] = useState([])
  const [quantityComments, setQuantityComments] = useState(0)
  const [quantityLikes, setQuantityLikes] = useState(0)
  const [firstImage, setrFirstImage] = useState("")
  const [secondImage, setSecondImage] = useState("")
  const [description, setDescription] = useState("")
  const [showComments, setShowComments] = useState(true)
  const [showLikes, setShowLikes] = useState(false)
  const [pubData, setPubData] = useState({
    creatorName: '',
    publicationDate: '',
    typeOfPublication: '',
    creatorLocation: '',
    address: '',
    resolved: "",
  });

   const { data } = useGetBackendQueries(`getOnePublication/${params.publicationId}`);  
   const { data: commentData } = useGetBackendQueries(`viewPublicationComments/${params.publicationId}`);  
   const { data: likesData } = useGetBackendQueries(`getPublicationsLikes/${params.publicationId}`);  


  useEffect(() => { 
     setPublicationSelected(data)  
     setQuantityComments(commentData.length)
     setQuantityLikes(commentData.length)
     console.log(likesData)
  }, [data, commentData, likesData])

  useEffect(() => { 
    publicationSelected.forEach((p) => { 
      setDescription(p.publicationDescription)
      setrFirstImage(p.publicationImages[0])
      setSecondImage(p.publicationImages[1])
      setPubData((prevData) => ({
        ...prevData,
        creatorName: p.creatorName,
        publicationDate: p.publicationDate,
        typeOfPublication: p.typeOfPublication,
        creatorLocation: p.creatorLocation,
        address: p.address,
        resolved: p.resolved
      }));
    });
  }, [publicationSelected]);

 
  const onlyShowComments = () => { 
    setShowLikes(false)
    setShowComments(true)
  }

  const onlyShowLikes = () => { 
    setShowLikes(true)
    setShowComments(false)
  }




  return (
    <div className="bg-white mt-12">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 ">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block ">
            <img
             src={firstImage}            
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={firstImage}            
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={secondImage}             
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
             src={secondImage}             
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
           {publicationSelected.map((p) => <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{p.publicationTitle}</h1> )}  
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
              <div className='flex items-center justify-center gap-12'>
                   <small className='text-md font-bold cursor-pointer' onClick={() => onlyShowComments()}>View Comments</small>
                   <small  className='text-md font-bold cursor-pointer' onClick={() => onlyShowLikes()}>View Likes</small>
              </div>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {quantityComments} Comments
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Comments</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {quantityLikes} Likes
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
             {showComments ?
               <div className=''>
                {commentData.map((c) => ( 
                      <div className='flex gap-2 m-2 mt-4'>
                        <div className='h-full'>
                          <img src={c.senderProfileImage} className='h-12 w-12 rounded-full'/>
                        </div>
                        <div className='flex flex-col justify-start items-start mt-2'>
                          <small className='font-bold text-md'> {c.senderName} </small>
                          <small className='text-sm '> {c.comment} </small>
                        </div>
                 </div>
                ))}
              </div> : null}

             {showLikes ? <div className=''>
                {likesData.map((c) => ( 
                      <div className='flex gap-2 m-2 mt-4 text-center'>                   
                          <img src={c.likedByPhoto} className='h-12 w-12 rounded-full'/>
                          <small className='text-sm '> {c.likedBy} </small>                     
                      </div>
                ))}
              </div> : null}


           

             

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-950 px-8 py-3 text-base font-medium text-white hover:text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
              Add a Comment
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Publication Information</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  
                    <li  className="text-gray-400">
                      <span className="text-gray-600">{pubData.creatorName}</span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">{pubData.typeOfPublication}</span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">{pubData.creatorLocation}</span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">{pubData.address}</span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">{pubData.publicationDate}</span>
                    </li>
                   {pubData.resolved === true ? <li className="text-gray-400">
                      <span className="text-yellow-600 font-bold">This claim has been resolved</span>
                    </li> : null}
                 
                </ul>
              </div>
            </div>

            

            <div className="mt-10">
              <h2 className="text-sm  text-gray-900 font-bold">Remember</h2>

             <Link to={"/succesStories"}>
                <div className="mt-4 space-y-6 text-blue-950">
                    Many of the complaints published by our users have been resolved thanks to this community. You can check it out and see their testimonials, <b className='text-yellow-600'>click here</b>
                </div>
             </Link> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}