import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useEffect, useM } from 'react';
import { UserContext } from '../../store/usercontext';
import { useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify"
import useGetBackendQueries from '../../Hooks/useGetBackendQueries';
import CommentModal from '../Modals/CommentModal';
import ShareModal from '../Modals/ShareModal';
import CommentsPublications from '../CommentsPublications';
import LoadingPublications from '../../Hooks/LoadingPublications';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ShareIcon from '@mui/icons-material/Share';


const SharedPublicationsCard = ({pub}) => {

            const userContx = useContext(UserContext)
            const [showComments, setShowComments] = useState(false)
            const [loadComments, setLoadComments] = useState(false)
         
  return (
    <div className='card w-[460px] bg-base-100 shadow-2xl shadow-side-left mt-4'> 
        <div>
            <div className='flex flex-grow'>

                    <div className='flex justify-start mt-2'>
                        <img className="rounded-2xl h-8 w-8" src={pub.sharerProfileImage}/>
                        <small className="ml-2 mt-2 whitespace-nowrap">{pub.sharer} </small>
                    </div>
      
                   <div className='flex justify-end ml-60'>
                         <div className="dropdown ">
                             <label tabIndex={0} className="btn m-1 font-bold text-xl">...</label>
                             <ul tabIndex={0} className="dropdown-content text-blue-950 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li ><a className=" text-blue-950 hover:text-yellow-400">Edit</a></li>
                                <li ><a className=" text-blue-950 hover:text-yellow-400">Delete</a></li>
                             </ul>
                         </div>
                   </div> 

            </div>

                <div className='justify-center mt-4'>
                    <h2 className='text-lg font-bold justify-center'>{pub.comment}</h2>
                </div>
              
            </div>
         <div className="rounded-lg bg-base-100 shadow-[0_35px_60px_-15px_rgba(0.2,0.2,0.2,0.3)] ring-1 ring-gray-300 mt-4">
                                <div className="card-body" key={pub._id}>
                                        <div className='flex'>
                                               <div className="avatar">
                                                    <div className="w-8 rounded-full">
                                                        <img src={pub.publicationCreatorProfileImage}  />
                                                    </div>
                                                </div>

                                                <div className='flex'>

                                                      <div className='flex flex-grow justify-start'>
                                                        <p className="text-black text-sm ml-2 mt-[6px]">{pub.publicationCreatorName}</p>
                                                      </div>

                                                      <div className='flex flew-grow justify-end ml-24'>
                                                        <Link to={`/publicationsSearched/${pub.categoryPub}`}> <p className='ml-8 whitespace-no-wrap text-sm  h-6  cursor-pointer hover:font-bold w-[70px]'>
                                                          {pub.categoryPub}
                                                        </p></Link>
                                                    </div>
                                                    
                                                </div>

                                                

                                                
                                         </div>


                                         <div className=' ml-4'>
                                                  <Link to={`/publication/${pub._id}`}> <p className='font-bold text-sm text-black'>{pub.publicationTitle}</p></Link> 
                                                  <p className='justify-center  text-xs mr-4'>{pub.publicationDescription}</p>

                                                  <div className='mt-4 whitespace-no-wrap'>
                                                      <p className=' text-xs mr-4  whitespace-no-wrap'>{pub.publicationUbication}, {pub.publicationAddress}</p>
                                                      <p className=' text-xs mr-4 underline cursor-pointer'>Ver en Mapa</p>
                                                  </div>
                                         </div>


                                       <div className='flex justify-center mt-2'>
                                               <div className="avatar">
                                                    <div className="w-24 rounded">
                                                        <img src={pub.publicationImages[0]} />
                                                    </div>
                                              </div>

                                               <div className="avatar">
                                                    <div className="w-24 rounded ml-4">
                                                        <img src={pub.publicationImages[1]} />
                                                    </div>
                                               </div>
                                         </div> 


                                          <div className="h-6 bg-gray-100">
                                                <div className='flex flex-grow justify-end'>
                                                    <small className='text-xs text-gray-500 cursor-pointer underline' > Comments  </small>
                                                    <small className='text-xs text-gray-500 ml-2 cursor-pointer underline'>1 Shared</small>
                                                </div>
                                          </div>

                                             <div className='flex justify-between '>
                                                        <button className="btn border-none">
                                                          <FavoriteBorderIcon />
                                                        </button>  

                                                         <div>
                                                              <CommentModal  />
                                                         </div> 

                                                         <div>                   
                                                              <ShareModal  />   
                                                         </div> 
                                                    
                                             </div>                                                     
                                </div>

                                           {loadComments ? (
                                              <div>
                                                <LoadingPublications text={"comments"}/>
                                              </div>
                                            ) : showComments ? (
                                              <div>
                                                <CommentsPublications />
                                              </div>
                                            ) : null}
                        </div>
      

      <ToastContainer/>
        
    </div>
  )
}

export default SharedPublicationsCard
