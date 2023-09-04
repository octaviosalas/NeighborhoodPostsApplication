import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { useParams } from 'react-router-dom';
import PublicationsSearched from '../components/PublicationsSearched';
import WallFilters from '../components/WallFilters';


const UserSearch = () => { 
     
    const param = useParams()
    console.log(param)
  
    const [searchResults, setSearchResults] = useState([])
   

    useEffect(() => { 
        axios.get(`http://localhost:4000/getPublicationsWithParams/${param.searchParam}`)
        .then((res) => { 
          console.log(res.data)
          setSearchResults(res.data)
        })
        .catch((err) => { 
          console.log(err)
        })
    }, [])


  return (
    <div>
        <div>
       <div className='aling justify-center'>
             <div className='flex'>
                <div className='flex items-center justify-center h-screen mr-6'> 
                  <WallFilters/>
                </div>
         
                 <div >
                   <div className="dropdown">
                      <label tabIndex={0} className="btn m-1">Ordenar Por</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Mas Recientes</a></li>
                            <li><a>Mas Antiguos</a></li>
                        </ul>
                    </div>

                    <div className='mt-12'>
                        <div>
                            <h2 className='text-sm text-black '>You are seeing the results of your search <b >{param.searchParam}</b></h2>
                        </div>
                          
                            <div className=' p-6 '>
                              <PublicationsSearched pubs={searchResults}/>
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
