import React from 'react'
import {Link} from "react-router-dom"

const ProfileComments = ({comments}) => {
    console.log(comments)
  return (
    <div>
          <hr style={{ height: '10px', width:"80%", marginLeft:"45px", border: 'none', borderTop: '1.3px solid #000' }}/> 
                      <div className='flex mt-2  ml-12'>
                                    <div className="avatar">
                                            <div className="w-8 rounded-full">
                                                <img src={comments.senderProfileImage} />
                                            </div>
                                    </div>
                                    <div className='flex justify-start'>
                                        <p className="text-black text-sm ml-2"> {comments.senderName}</p>
                                    </div>
                                    <div className='flex justify-end'>
                                       <p className='ml-2  whitespace-no-wrap text-xs '> {comments.commentDate} </p>
                                    </div>
                                    
                            </div>

                            <div>
                                <p className='text-sm'> <b>@{comments.addresseeName} </b> You left a comment on his <Link to={`/publication/${comments.publicationId}`}>post</Link>  </p>
                            </div>
    </div> 
  )
}

export default ProfileComments
