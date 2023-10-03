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


const Wall = () => {

  const [load, setLoad] = useState(true)
  const { data, loading } = useGetBackendQueries(`getOtherUsersPublications`); 

  useEffect(() => { 
     setTimeout(() => { 
         setLoad(false)
     }, 1500)
  }, [])

  return (
    <div>
       <div className='aling justify-center mb-2'>
          { load ? 
              <LoadingPublications text={"Publications"}/>
                      :
                  <div className='flex flex-wrap gap-4 items-center place-content-around'>
                      <div className='flex fixed 2xl:left-72 xl:left-20 lg:left-6 invisible  lg:visible '> 
                         <WallFilters/>
                      </div>
                  <div >
                        
                 
                  <div className='flex items-center justify-center visible lg:invisible mt-12'>
                         <FiltersModal/>
                   </div>   
                      
                  <div className='mt-6 ml-auto flex'>  
                        <div className=' justify-center items-center h-screen'>
                              {data.map((p) => <PublicationsCard pub={p}/>)}
                        </div>
                    </div>       

                   
                </div>
             </div>
             }
        </div>
    </div>
  )
}

export default Wall

