import React from 'react'
import WallFilters from '../components/WallFilters'
import New from '../components/New'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import PublicationsCard from '../components/PublicationsCard'
import LoadingPublications from '../Hooks/LoadingPublications'
import useGetBackendQueries from '../Hooks/useGetBackendQueries';



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
       <div className='aling justify-center'>
           { load ? 

              <LoadingPublications text={"Publications"}/>

                      :

           <div className='flex'>
                  <div className='flex items-center justify-center h-screen mr-6'> 
                    <WallFilters/>
                  </div>
                 <div >
                        

                          <div className=''>                         
                                  <div className=' p-6 '>
                                  {data.map((p) => <PublicationsCard pub={p}/>)}
                                  </div>
                          </div>           
                 </div>
             </div>}
        </div>
    </div>
  )
}

export default Wall

