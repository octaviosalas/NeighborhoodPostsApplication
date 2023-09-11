import React, { useEffect, useState } from 'react'
import { UserContext } from '../store/usercontext'
import { useContext } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from "axios"
import ProfilePublications from './ProfilePublications';
import ProfileComments from './ProfileComments';
import ProfileFavorites from './ProfileFavorites';
import ConfigIcon from "../img/configuracion.svg"



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
           <div className="flex gap-8 items-center ">

               <div className="relative flex justify-center items-center">
                  <img  className="rounded-full"  width="80"  height="80"    src={userContx.userProfileImage}   alt="Foto de perfil"/>
               </div>

               <div className="flex flex-col gap-4">
                     <header>
                           <h3>
                           <strong>{userContx.userName}</strong>
                           </h3>
                           <p className="font-light">Descripción personal</p>
                     </header>
               </div>
                  <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>
                     <img src={ConfigIcon} alt="Icono de un engranaje para editar" />
                  </button>
            </div>


                        <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                           <div className="avatar">
                              <div className="w-24 rounded-full">
                                 <img src={userContx.userProfileImage} />
                              </div>
                           </div>
                           <div> 
                              <div className='mt-2'>
                                 <div>
                                    <label htmlFor="">Nombre</label>
                                 </div>
                                 <input type="text" placeholder='Name..' className='rounded-lg h-8'/>
                              </div>

                             <div className='mt-2'>
                                 <div>
                                    <label htmlFor="">Nombre</label>
                                 </div>
                                 <input type="text" placeholder='Name..' className='rounded-lg h-8'/>
                              </div>
                              
                              <div className='mt-2'>
                                 <div>
                                    <label htmlFor="">Nombre</label>
                                 </div>
                                 <input type="text" placeholder='Name..' className='rounded-lg h-8'/>
                              </div>
                              
                              <div className='mt-2'>
                                 <div>
                                    <label htmlFor="">Nombre</label>
                                 </div>
                                 <input type="text" placeholder='Name..' className='rounded-lg h-8'/>
                              </div>

                                    
                              <div className='mt-4 justify-center'>                             
                                 <button className='bg-blue-950 text-yellow-400'>Save Changes</button>
                              </div>
                              
                               
                             
                           </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                           <button>close</button>
                        </form>
                        </dialog>

            <div className='flex justify-center gap-8 mt-12'>
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


/*
<section className="py-12">
          <div className="w-[40em] mx-auto border border-slate-400 shadow-sm p-4 flex flex-col gap-8 font-normal rounded-2xl">
            <div className="flex gap-8 items-center ">
              <div className="relative flex justify-center items-center">
                <img  className="rounded-full"  width="80"  height="80"    src={userContx.userProfileImage}   alt="Foto de perfil"/>
              </div>
              <div className="flex flex-col gap-4">
                <header>
                  <h3>
                    <strong>{userContx.userName}</strong>
                  </h3>
                  <p className="font-light">Descripción personal</p>
                </header>
              </div>
              <button
              
              >
                
                <img src={ConfigIcon} alt="Icono de un engranaje para editar" />
              </button>
            </div>
            <nav>
              <ul className="flex gap-4 justify-between font-light">
                <li className="">
                  <button aria-selected="true" className="p-2 border-t-2">
                    Reportes
                  </button>
                </li>
                <li>
                  <button className="p-2">Comentarios</button>
                </li>
                <li>
                  <button className="p-2">Favoritos</button>
                </li>
                <li>
                  <button className="p-2">Comentarios Recibidos</button>
                </li>
              </ul>
            </nav>
            <section className="flex flex-col gap-10">
      
            </section>
          </div>
        </section>*/