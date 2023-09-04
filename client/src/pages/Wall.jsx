import React from 'react'
import WallFilters from '../components/WallFilters'
import New from '../components/New'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import PublicationsCard from '../components/PublicationsCard'




const Wall = () => {

  return (
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

                    <div className='  '>
                          
                            <div className=' p-6 '>
                              <PublicationsCard/>
                            </div>
                        
                    </div>           
                 </div>
           
             </div>
        </div>
        
    </div>
  )
}

export default Wall

