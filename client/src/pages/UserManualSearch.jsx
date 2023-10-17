import React from 'react'
import WallFilters from '../components/WallFilters'
import New from '../components/New'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import PublicationsCard from '../components/Cards/PublicationsCard'
import LoadingPublications from '../Hooks/LoadingPublications'
import { useParams } from 'react-router-dom'

const UserManualSearch = () => {

    const [load, setLoad] = useState(true)
    const [results, setResults] = useState([])
     const params = useParams()
     console.log(params)

    useEffect(() => {
        axios.get(`https://app-citizens.onrender.com/getPublicationsWithParams/${params.searchParam}`)
             .then((res) => { 
             console.log(res.data)
             setResults(res.data)
          })
        .catch((err) => { 
          console.log(err)
        }) 
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
                        
                  <div className='mt-24 ml-auto flex'>                        
                  <div className=' justify-center items-center h-screen'>
                        {results.map((p) => <PublicationsCard pub={p}/>)}
                      </div>
                  </div>       

                   
                </div>
             </div>
             }
        </div>
    </div>
  )
}

export default UserManualSearch
