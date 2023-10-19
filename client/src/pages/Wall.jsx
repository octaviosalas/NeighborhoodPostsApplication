import React from 'react'
import WallFilters from '../components/WallFilters'
import New from '../components/New'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import PublicationsCard from '../components/Cards/PublicationsCard'
import LoadingPublications from '../Hooks/LoadingPublications'
import useGetBackendQueries from '../Hooks/useGetBackendQueries';
import FiltersModal from '../components/Modals/FiltersModal'
import { useContext } from 'react'
import { UserContext } from '../store/usercontext'
import Solucionadios from '../components/Solucionadios'

const Wall = () => {

  const [load, setLoad] = useState(true)
  const { data, loading } = useGetBackendQueries(`getOtherUsersPublications`); 
  const userCtx = useContext(UserContext)

  useEffect(() => { 
     setTimeout(() => { 
         setLoad(false)
     }, 1500)
  }, [])

  useEffect(() => { 
    console.log(userCtx.userNotifications)
    console.log(userCtx.userQuantityNotifications)
  }, [])

  return (
    <div>
       <div className='flex flex-col justify-center mb-2'>
          { load ? 
              <LoadingPublications text={"Publications"}/>
                      :
                  <div className='flex flex-wrap gap-4 items-center place-content-around'>

                      <div className='flex flex-col fixed 2xl:left-72 xl:left-20 lg:left-6 invisible lg:visible '> 
                         <WallFilters/>
                      </div>

                       <div>
                              <div className='flex items-center justify-center visible lg:invisible mt-12'>
                                  <FiltersModal/>
                              </div>   
                              
                              <div className='mt-6 ml-auto flex'>  
                                  <div className=' ustify-center items-center h-screen'>
                                        {data.map((p) => <PublicationsCard pub={p}/>)}
                                  </div>
                                 {/* <div className='fixed flex flex-col 2xl:right-52 xl:right-12 lg:right-6 invisible  lg:visible'>
                                       <Solucionadios/>
                                    </div> */}
                              </div>    
                       </div>
                 </div>
                 
             }
        </div>
    </div>
  )
}

export default Wall

