import React from 'react'

const ProfilePublications = ({pub}) => {
  return (
    <div>
          <div className=' m-2 '>
               <hr style={{ height: '10px', width:"80%", marginLeft:"45px", border: 'none', borderTop: '1.3px solid #000' }}/>
                            <div className='flex mt-2 '>
                                    <div className="avatar">
                                            <div className="w-8 rounded-full">
                                                <img src={pub.creatorProfileImage} />
                                            </div>
                                    </div>
                                    <div className=''>
                                        <p className="text-black text-sm ml-2"> {pub.creatorName}</p>
                                    </div>
                                    <p className='justify-end ml-8 whitespace-no-wrap text-sm border h-6 border-black cursor-pointer rounded-full bg-blue-950 text-white hover:bg-yellow-400 hover:text-black hover:font-bold'> {pub.typeOfPublication} </p>
                                 
                            </div>
                    
                    <div className=' ml-4'>
                        <p className='font-bold text-sm color-black'>{pub.publicationTitle}</p>
                        <p className='justify-center  text-xs mr-4'>{pub.publicationDescription}</p>

                        <div className='mt-2 '>
                          <p className=' text-xs mr-4'>{pub.address}</p>
                          
                        </div>
                    </div>

                    <div className='flex justify-center items-center m-4'>
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
                    </div>
                  
    </div>
  )
}

export default ProfilePublications
