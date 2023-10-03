import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { useParams } from 'react-router-dom';
import PublicationsSearched from '../components/PublicationsSearched';
import WallFilters from '../components/WallFilters';
import useGetBackendQueries from '../Hooks/useGetBackendQueries';
import PublicationsCard from "../components/Cards/PublicationsCard"

const UserSearch = () => { 
     
    const param = useParams()
    console.log(param)
  
    const [searchResults, setSearchResults] = useState([])
    const {data, loading} = useGetBackendQueries(`getPublicationsWithParams/${param.searchParam}`)


  return (
    <div>
        <div>
       <div className='aling justify-center'>
        
             <div className='flex flex-wrap gap-4 items-center place-content-around'>
                <div className='flex fixed 2xl:left-72 xl:left-20 lg:left-6 invisible  lg:visible '> 
                  <WallFilters/>
                </div>
         
                 <div >
                    <div className='mt-24 ml-auto flex'>
                        <div className=' justify-center items-center h-screen'>
                            <h2 className='text-sm text-black '>You are seeing the results of your search <b >{param.searchParam}</b></h2>
                            {data.map((d) => <PublicationsCard pub={d}/>)}
                        </div>
                    </div>           
                 </div>
           
             </div>
        </div>
        
    </div> 
    </div>
  )
}

export default UserSearch
