import React from 'react'
import useGetBackendQueries from "../Hooks/useGetBackendQueries"
import { useState, useEffect } from 'react'
import axios from 'axios'
import LoadingPublications from "../Hooks/LoadingPublications"
import PublicationsSearched from '../components/PublicationsSearched'
import WallFilters from '../components/WallFilters'
import PublicationsCard from '../components/Cards/PublicationsCard'



const SearchWithMultipleFilters = () => { 
    
    const [noPublicationsWithType, setNoPublicationsWithType] = useState(false) 
    const [pubsFiltered, setPubsFiltered] = useState([])
    const [showLoadingComponent, setShowLoadingComponent] = useState(true)
    const filterState = JSON.parse(sessionStorage.getItem('filterState'));

  useEffect(() => { 
    axios.get("https://app-citizens.onrender.com/getOtherUsersPublications")
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
                          <div className='flex flex-wrap gap-4 items-center place-content-around'>

                          <div className='flex fixed 2xl:left-72 xl:left-20 lg:left-6 invisible  lg:visible '> 
                             <WallFilters/>
                          </div>
                 
                                <div>
                                  <div className='mt-24 ml-auto flex'>
                                      <div className=' justify-center items-center h-screen'>
                                              {pubsFiltered.map((p) => <PublicationsCard pub={p}/>)}
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
