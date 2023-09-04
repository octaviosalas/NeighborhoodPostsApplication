import React, { useEffect, useState } from 'react'
import { UserContext } from '../store/usercontext'
import { useContext } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from "axios"
import ProfilePublications from './ProfilePublications';
import ProfileComments from './ProfileComments';
import ProfileFavorites from './ProfileFavorites';



const UserStats = () => {


    const userContx = useContext(UserContext)
    const [allMyPubs, setAllMyPubs] = useState([])
    const [commentsSent, setCommentsSent] = useState([])
    const [allMyFavs, setAllMyFavs] = useState([])
    const [showAllMyPubs, setShowAllMyPubs] = useState(true)
    const [showCommentsSent, setShowCommentsSent] = useState(false)
    const [showFavorites, setShowFavorites] = useState(false)
    const [load, setLoad] = useState(true)

    useEffect(() =>{ 
        axios.get(`http://localhost:4000/getMyPublications/${userContx.userId}`)
             .then((res) => { 
                 console.log(res.data)
                 setAllMyPubs(res.data)
             })
             .catch((err) => { 
                 console.log(err)
             })
     }, [])

     useEffect(() => { 
        axios.get(`http://localhost:4000/getMyCommentsSent/${userContx.userId}`)
             .then((res) => { 
                console.log(res.data)
                setCommentsSent(res.data)
             })
             .catch((err) => { 
                console.log(err)
             })
     }, [])

     useEffect(() => { 
        axios.get(`http://localhost:4000/getMyFavs/${userContx.userId}`)
             .then((res) => { 
                console.log(res.data)
                setAllMyFavs(res.data)
             })
             .catch((err) => { 
                console.log(err)
             })
     }, [])

     useEffect(() => { 
        setTimeout(() => { 
            setLoad(false)
        }, 1500) 
     }, [])
  
    return (
    <div>
        <div className='border border-black rounded-2xl h-auto w-[600px]'>
            <div className='justify-start flex'>
                 <div className="avatar"> 
                            <div className="w-14 h-12 mt-4 ml-4 gap-6 rounded-full"> 
                               <img src={userContx.userProfileImage} />
                            </div>
                            <div className='mt-4 ml-2'>
                                <div className='flex'>
                                   <span className='font-bold'>{userContx.userName}</span> 
                                    <SettingsIcon style={{marginLeft: "6px"}}/>
                                </div>
                                <div className='mt-2'>
                                     <span>Personal Description</span>
                                </div>
                            </div>
                            
                    </div>
            </div>

            <div className='flex justify-center gap-8 mb-12'>
              {showAllMyPubs ?
                 <span className='text-black font-bold cursor-pointer' onClick={() => setShowAllMyPubs(true)}>Publications</span> 
                : 
                <span className='text-gray-500 font-bold cursor-pointer' onClick={() => setShowAllMyPubs(true)}>Publications</span>
                }

                {showCommentsSent ? 
                <span className='text-black font-bold cursor-pointer' onClick={() => setShowCommentsSent(true)}>Comments</span> 
                :   
                <span className='text-gray-500 font-bold cursor-pointer' onClick={() => setShowCommentsSent(true)}>Comments</span>
                }

                 {showFavorites ?
                  <span className='text-black   font-bold cursor-pointer' onClick={() => setShowFavorites(true)}>Favorites</span>
                  :
                  <span className=' text-gray-500 font-bold cursor-pointer' onClick={() => setShowFavorites(true)}>Favorites</span>
                }

                 <span className='text-gray-500 font-bold cursor-pointer'>Recivied Comments</span>
            </div>
            
            {showAllMyPubs ? 
              <div>
                    <p className='text-sm text-black cursor-pointer jusitfy-end' onClick={() => setShowAllMyPubs(false)}>Close</p>
                    {allMyPubs.map((pub) => <ProfilePublications pub={pub}/>)}
              </div>
              :
              null
              }

            {showCommentsSent ? 
              <div>
                    <p className='text-sm text-black cursor-pointer jusitfy-end' onClick={() => setShowCommentsSent(false)}>Close</p>
                    {commentsSent.map((com) => <ProfileComments comments={com}/>)}
              </div>
              :
              null
              }

             {showFavorites ? 
              <div>
                    <p className='text-sm text-black cursor-pointer jusitfy-end' onClick={() => setShowFavorites(false)}>Close</p>
                    {allMyFavs.map((favs) => <ProfileFavorites favs={favs}/>)}
              </div>
              :
              null
              } 

        </div>
    </div>
  )
}

export default UserStats
