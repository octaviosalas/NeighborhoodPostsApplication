import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';


const ProfileFavorites = ({favs}) => {
  return (
    <div>
    <div className=' m-2 '>
         <hr style={{ height: '10px', width:"80%", marginLeft:"45px", border: 'none', borderTop: '1.3px solid #000' }}/>
                      <div className='flex mt-2 '>
                              <div className="avatar">
                                      <div className="w-8 rounded-full">
                                          <img src={favs.creatorProfileImage} />
                                      </div>
                              </div>

                              <div className=''>
                                  <p className="text-black text-sm ml-2"> {favs.creatorName}</p>
                              </div>

                              <div className="ml-auto mr-12"> {/* Utiliza ml-auto para moverlo a la derecha */}
                                <p className='flex whitespace-no-wrap text-sm text-blue-950 h-6 cursor-pointer rounded-full justify-end whitespace-no-wrap  underline  hover:font-bold'> 
                                   {favs.typeOfPublication} 
                                </p>
                            </div>
                      </div>
              
              <div className=' ml-4'>
                  <p className='font-bold text-sm color-black'>{favs.publicationTitle}</p>
                  <p className='justify-center  text-xs mr-4'>{favs.publicationDescription}</p>

                  <div className='mt-2 '>
                    <p className=' text-xs mr-4'>{favs.address}</p>
                    
                  </div>
              </div>

              <div className='flex justify-center items-center m-4'>
                  <div className="avatar">
                      <div className="w-24 rounded">
                          <img src={favs.publicationImages[0]} />
                      </div>
                  </div>

                  <div className="avatar">
                      <div className="w-24 rounded ml-4">
                      <img src={favs.publicationImages[1]} />
                      </div>
                  </div>
              </div> 

              <div>
                  <FavoriteIcon style={{color: "red"}}/>
              </div>
              </div>
            
</div>
  )
}

export default ProfileFavorites
