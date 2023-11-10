import { useState, useEffect } from 'react'
import React from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import axios from 'axios'
import useGetBackendQueries from '../Hooks/useGetBackendQueries';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { UserContext } from '../store/usercontext';
import { useContext } from 'react';
import {toast, ToastContainer} from "react-toastify"

  
  
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function PublicationDetail() {

  const params = useParams()
  const userContx = useContext(UserContext)
  const [publicationSelected, setPublicationSelected] = useState([])
  const [quantityComments, setQuantityComments] = useState(0)
  const [quantityLikes, setQuantityLikes] = useState(0)
  const [firstImage, setrFirstImage] = useState("")
  const [secondImage, setSecondImage] = useState("")
  const [description, setDescription] = useState("")
  const [showComments, setShowComments] = useState(true)
  const [showLikes, setShowLikes] = useState(false)
  const [showSendComment, setShowSendComment] = useState(false)
  const [newCommentary, setNewCommentary] = useState("")
  const [pubData, setPubData] = useState({
    creatorName: '',
    creatorId: "",
    publicationDate: '',
    typeOfPublication: '',
    creatorLocation: '',
    address: '',
    resolved: "",
    publicationId: "",
    publicationTitle: "",
  });

   const { data } = useGetBackendQueries(`getOnePublication/${params.publicationId}`);  
   const { data: commentData } = useGetBackendQueries(`viewPublicationComments/${params.publicationId}`);  
   const { data: likesData } = useGetBackendQueries(`getPublicationsLikes/${params.publicationId}`);  

   const getActualDate = () => {
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const day = String(fechaActual.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const notificationCommentSendCorrectly = () =>{ 
    toast.success("Your comment has been send", {
      position: toast.POSITION.TOP_RIGHT_CENTER,
      style: {
        color: "#082E58", 
      },
    });
  }

  const notificationLikeSendCorrectly = () =>{ 
    toast.success("Your Like has been send", {
      position: toast.POSITION.TOP_RIGHT_CENTER,
      style: {
        color: "#082E58", 
      },
    });
  }

  const actualDate = getActualDate();

  useEffect(() => { 
     setPublicationSelected(data)  
     setQuantityComments(commentData.length)
     setQuantityLikes(likesData.length)
     console.log("Likes", likesData)
     console.log("Comentarios", commentData)
  }, [data, commentData, likesData])

  useEffect(() => { 
    publicationSelected.forEach((p) => { 
      setDescription(p.publicationDescription)
      setrFirstImage(p.publicationImages[0])
      setSecondImage(p.publicationImages[1])
      setPubData((prevData) => ({
        ...prevData,
        publicationId: p._id,
        publicationTitle: p.publicationTitle,
        creatorName: p.creatorName,
        creatorId: p.creatorId,
        creatorProfileImage: p.creatorProfileImage,
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

  const sendNewComment = () => { 
    if(showSendComment === false) { 
      setShowSendComment(true)
    } else if (showSendComment === true){ 
      const newComment = ( { 
        senderName: userContx.userName,
        senderId: userContx.userId,
        senderProfileImage: userContx.userProfileImage,
        publicationId: pubData.publicationId,
        addresseeName: pubData.creatorName,
        addresseeId: pubData.creatorId,
        commentDate: actualDate,
        comment: newCommentary
      })
      axios.post("https://app-citizens.onrender.com/saveComment", newComment)
           .then((res) => { 
            console.log(res.data)
            notificationCommentSendCorrectly()
            setTimeout(() => { 
              window.location.reload()
            }, 2500)
           })
           .catch((err) => { 
            console.log(err)
           })
    }
  }

  const sendNewLike = () => { 
     const newLikeToBeSend = {
      publicationId: pubData.publicationId,
      userId: userContx.userId,
      publicationAddress: pubData.address,
      publicationCreatorName: pubData.creatorName,
      publicationImages: [firstImage, secondImage],
      publicationTitle: pubData.publicationTitle,
      publicationDescription: description,
      typeOfPublication: pubData.typeOfPublication,
      creatorLocation: pubData.creatorLocation,
      creatorProfileImage: pubData.creatorProfileImage,
      creatorName: pubData.creatorName,
      likedBy: userContx.userName,
      likedByPhoto: userContx.userProfileImage,
     }
     axios.post("https://app-citizens.onrender.com/markAsFavorite", newLikeToBeSend)
          .then((res) => {
            console.log(res.data);
            notificationLikeSendCorrectly();
            setTimeout(() => { 
               window.location.reload()
            }, 2500)
          })
          .catch((err) => {
            console.log(err);
          })
  }

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

  

  return (
    <div className="bg-white mt-12">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 ">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block ">
            <img  src={firstImage} className=":h-full w-full object-cover object-center" />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img  src={firstImage} className="h-full w-full object-cover object-center" />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img src={secondImage} className="h-full w-full object-cover object-center"/>
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img src={secondImage}  className="h-full w-full object-cover object-center"/>
          </div>
        </div>

  
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {publicationSelected.map((p) => <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{p.publicationTitle}</h1> )}  
            </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
                <div className='flex items-center justify-center gap-12'>
                    <small className={`text-md font-bold cursor-pointer ${showComments ? "underline" : ""}`} onClick={() => onlyShowComments()}>View Comments</small>
                    <small  className={`text-md font-bold cursor-pointer ${showLikes ? "underline" : ""}`} onClick={() => onlyShowLikes()}>View Likes</small>
                </div>

            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon  key={rating} className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200', 'h-5 w-5 flex-shrink-0' )} aria-hidden="true"/>
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
                    <StarIcon key={rating} className={classNames( reviews.average > rating ? 'text-gray-900' : 'text-gray-200','h-5 w-5 flex-shrink-0' )} aria-hidden="true" />
                  ))}
                </div>
                
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {quantityLikes} Likes
                </a>
              </div>
            </div>

            <div className="mt-10">
              {showComments ? 
                <div>
                  {quantityComments === 0 ? ( 
                    <div>
                        <small className='font-bold text-black'>Publication no have Comment</small>
                    </div>
                      ) : ( 
                      <div> 
                           <ul role="list" className="divide-y divide-gray-100">
                              {commentData.map((c) => (
                                <li key={c._id} className="flex justify-between gap-x-6 py-5">
                                  <div className="flex min-w-0 gap-x-4">
                                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={c.senderProfileImage} alt="" />
                                    <div className="min-w-0 flex-auto text-start justify-start">
                                      <p className="text-sm font-semibold leading-6 text-gray-900">{c.senderName}</p>
                                      <p className="mt-1 truncate text-sm leading-5 text-gray-500">{c.comment}</p>
                                    </div>
                                  </div>
                                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <p className="text-xs leading-6 text-gray-900">{c.commentDate}</p>
                                  
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                        )}
                </div>
              : null }

                 {showLikes ? 
                    <div className=''>
                      {quantityLikes === 0 ? (
                        <div className=''>
                          <small className='font-bold text-black'>Publication no have Likes</small>
                        </div>
                      ) : (
                        <div>
                         <ul role="list" className="divide-y divide-gray-100">
                              {likesData.map((c) => (
                                <li key={c._id} className="flex justify-between gap-x-6 py-5">
                                  <div className="flex min-w-0 gap-x-4 text-center">
                                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={c.likedByPhoto} alt="" />
                                      <p className="text-sm font-semibold leading-6 text-gray-900">{c.likedBy}</p>
                                   
                                  </div>
                                
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                   : null}

                 {showSendComment ?
                   <div className='mt-12'>
                     <input type="text" className='w-full rounded-lg' placeholder='shosi' onChange={(e) => setNewCommentary(e.target.value)}/>
                   </div> : null}

                  {showComments ? <button  type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-950 px-8 py-3 text-base font-medium text-white hover:text-black
                       hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={() => sendNewComment()} >
                    Add a Comment
                    </button> : <button  type="submit"
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-blue-950 px-8 py-3 text-base font-medium text-white hover:text-black
                       hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={() => sendNewLike()}>
                    Put my Like
                    </button>}
            </div>
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
      <ToastContainer/>
    </div>
  )
}