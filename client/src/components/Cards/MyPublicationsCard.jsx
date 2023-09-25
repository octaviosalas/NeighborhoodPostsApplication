import React from 'react'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from "axios"
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../../store/usercontext";
import { useNavigate } from 'react-router-dom';


const MyPublicationsCard = ({pub, comments}) => {
    
   const userContx = useContext(UserContext)
   const navigate = useNavigate()
   const [showComments, setShowComments] = useState(false)
   console.log(pub)



   const deleteMyPublication = (pub) => { 
     axios.delete(`http://localhost:4000/deleteMyPublication/${pub._id}`) 
          .then((res) => { 
            console.log(res.data)
          })
          .catch((err) => { 
            console.log(err)
          })
   }
 
   const goToPublicationDetail = (pub) => { 
      navigate(`/publication/${pub._id}`)
   }
   

  return (
    <div>
        <div className="card w-[460px] bg-base-100 shadow-2xl shadow-side-left mt-6 ">
                                <div className="card-body">

                                    <div className='flex justify-end'>
                                        <div className="dropdown ">
                                               <label tabIndex={0} className="btn m-1 font-bold text-xl">...</label>
                                              <ul tabIndex={0} className="dropdown-content text-blue-950 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li ><a className=" text-blue-950 hover:text-yellow-400">Edit</a></li>
                                                <li ><a className=" text-blue-950 hover:text-yellow-400" onClick={() => deleteMyPublication(pub)}>Delete</a></li>
                                              </ul>
                                        </div>
                                     </div>                               

                                        <div className='flex mt-2'>
                                              <div className="avatar">
                                                  <div className="w-8 rounded-full">
                                                      <img src={pub.creatorProfileImage} />
                                                  </div>
                                              </div>

                                              <div className=''>
                                                <p className="text-black text-sm ml-2"> {pub.creatorName}</p>
                                              </div>

                                          
                                            <div className='flex flex-grow justify-end '>
                                              <Link to={`/publicationsSearched/${pub.typeOfPublication}`}>
                                                  <p className=' ml-8 whitespace-no-wrap text-sm  h-6  cursor-pointer hover:font-bold w-[70px]'>
                                                      {pub.typeOfPublication}
                                                  </p>
                                            </Link>  
                                            </div>
                                           
                                        </div>
                                        
                                        <div className=' ml-4'>
                                            <p className='font-bold text-sm color-black'>{pub.publicationTitle}</p>
                                            <p className='justify-center  text-xs mr-4'>{pub.publicationDescription}</p>

                                            <div className='mt-2 '>
                                              <p className=' text-xs mr-4'>{pub.address}</p>
                                              <p className=' text-xs mr-4 underline cursor-pointer'>Ver en Mapa</p>
                                            </div>
                                        </div>

                                        <div className='flex justify-center items-center'>
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

                                        <div className='flex justify-between'>
                                                                      
                                            <div className='flex'>
                                              <button className="btn" onClick={() => setShowComments(true)}>1 <MarkUnreadChatAltIcon titleAccess='View Comments'/></button>
                                            </div>
                                            <button className="btn">1 <ShareIcon/></button>
                                        </div>

                                        <div className='flex justify-between'>
                                                <div>
                                                  <p className='whitespace-no-wrap text-xs '>Was your claim resolved?</p> 
                                                </div>

                                                <div className='justify-end'>
                                                  <p className='font-bold text-xs underline cursor-pointer'>Shared the news</p> 
                                                </div>
                                        </div> 

                                      
                                        {showComments ? 
                                          <> 
                                           {comments.map((c) => { 
                                                  console.log(comments)
                                                  
                                                  if(c.publicationId === pub._id) { 
                                                
                                                    return ( 
                                                      <div className='flex flex-grow justify-start'>
                                                        <div className=''>
                                                          <form method="dialog" className=" border modal-box w-auto ">
                                                            <button className="btn btn-sm btn-circle btn-ghost absolute  right-2 top-2" onClick={() => setShowComments(false)}>✕</button>
                                                            <div className='flex items-center space-x-2'>
                                                              <div className="avatar">                                                     
                                                                <div className="w-8 rounded-full">
                                                                  <img src={c.senderProfileImage}/>                                        
                                                                </div>
                                                                <p className='ml-2 text-gray-500 text-sm'><b className='mr-4'>{c.senderName}</b>   {c.commentDate}</p>
                                                              </div>
                                                            </div>
                                                            <div className='text-sm   rounded-lg mt-4'>
                                                              <p>{c.comment}</p>
                                                            </div>
                                                         
                                                               <div className='flex justify-between mt-2'>
                                                                          
                                                                              <FavoriteBorderIcon style={{marginTop:"12px", cursor: "pointer"}}/>
                                                                              <DeleteIcon style={{marginTop:"13px", marginLeft: "5px", cursor: "pointer"}}/>
                                                                        

                                                                          <div>
                                                                              <button className='bg-blue-950 justify-end border-none mt-2 h-9 w-18 text-sm text-white hover:text-black hover:bg-yellow-400' onClick={() => goToPublicationDetail(pub)}>
                                                                                   Answer
                                                                              </button>
                                                                          </div>   
                                                               </div>  
                                                               
                                                              
                                                                         
                                                          </form>
                                                         
                                                        </div>
                                                      </div>
                                                    );
                                                  }
                                                })}

                                             {comments.every((c) => c.publicationId !== pub._id) && (                                                 
                                                     <small className='font-bold mt-4'>No comments yet</small>                                                                                                
                                                )}          
                                             </>
                                          :
                                          null
                                         }


                                   </div>
        </div>
    </div>
  )
}

export default MyPublicationsCard

