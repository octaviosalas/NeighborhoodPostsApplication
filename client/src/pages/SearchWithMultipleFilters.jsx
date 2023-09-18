import React from 'react'
import useGetBackendQueries from "../Hooks/useGetBackendQueries"
import { useState, useEffect } from 'react'
import axios from 'axios'
import LoadingPublications from "../Hooks/LoadingPublications"
import PublicationsSearched from '../components/PublicationsSearched'
import WallFilters from '../components/WallFilters'



const SearchWithMultipleFilters = () => { 
    
    const [noPublicationsWithType, setNoPublicationsWithType] = useState(false) 
    const [pubsFiltered, setPubsFiltered] = useState([])
    const [showLoadingComponent, setShowLoadingComponent] = useState(true)
    const filterState = JSON.parse(sessionStorage.getItem('filterState'));

  useEffect(() => { 
    axios.get("http://localhost:4000/getOtherUsersPublications")
         .then((res) => { 
                const allPubs = res.data
                const publicacionesFiltradas = allPubs.filter((publicacion) => {
                     return filterState[publicacion.typeOfPublication] === true;
                });
                if(publicacionesFiltradas.length === 0) { 
                    setNoPublicationsWithType(true)
                } else { 
                    setPubsFiltered(publicacionesFiltradas)
                }              
                console.log(publicacionesFiltradas);              
               })
                .catch((err) => { 
                    console.log(err)
                })
  }, [])

  useEffect(() => { 
    setTimeout(() => { 
        setShowLoadingComponent(false)
    }, 2000)
  }, [])

   
 
  return (
    <div>

              {showLoadingComponent ?
                 ( 
                <LoadingPublications/>
                )  : (

                    noPublicationsWithType ? 

                        <div>
                           <small><b>No Publicatios searched</b></small>
                        </div>
                        : 

                        <> 
                          <div className='flex'>

                                    <div className='flex items-center justify-center h-screen mr-6'> 
                                        <WallFilters/>
                                    </div>
                 
                                <div>
                                    <div className="dropdown">
                                            <label tabIndex={0} className="btn m-1">Ordenar Por</label>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li><a>Mas Recientes</a></li>
                                                    <li><a>Mas Antiguos</a></li>
                                                </ul>
                                    </div>
        
                                   <div className='mt-12'>
                                            <div className=' p-6 '>
                                                <PublicationsSearched pubs={pubsFiltered}/>
                                            </div>
                                    </div>           
                               </div>
                   
                           </div>
                        </>
                        
                    
              ) }
             

              
    </div>
  )
}

export default SearchWithMultipleFilters
