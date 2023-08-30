import React from 'react'
import WallFilters from '../components/WallFilters'
import New from '../components/New'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import PublicationsCard from '../components/PublicationsCard'



const Wall = () => {


  const [allPublications, setAllPublications] = useState([])

   useEffect(() => { 
       axios.get("http://localhost:4000/getOtherUsersPublications")
            .then((res) => { 
              console.log(res.data)
              setAllPublications(res.data)
            })
            .catch((err) => { 
              console.log(err)
            })
   }, [])



  return (
    <div>
       <div className='aling justify-center'>
             <div className='flex'>
                <div className='flex items-center justify-center h-screen'> 
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

                    <div className='flex flex-wrap '>
                          {allPublications.map((p) => (
                            <div className='w-1/2 p-6 ' key={p.id}>
                              <PublicationsCard pub={p} />
                            </div>
                          ))}
                    </div>           
                 </div>
           
             </div>
        </div>
    </div>
  )
}

export default Wall
