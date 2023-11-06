import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FiltersModal = () => {

   const [searchParam, setSearchParam] = useState("")
   const navigate = useNavigate()

    const searchParamPublication = () => { 
          if(searchParam === "") { 
            notificacionDeToast()
          } else { 
                 navigate(`/userManualSearch/${searchParam}`)
                  }
        } 


  return (
    <div className="dropdown dropdown-hover flex flex-col items-center mt-8">
        <label tabIndex={0} className="btn m-1 bg-gray-300 text-black dark:text-black dark:bg-gray-300">Apply Filters</label>
          <ul tabIndex={0} className="dropdown-content z-[1] mt-4 menu p-2 shadow bg-gray-200 rounded-box w-52 flex flex-col max-w-fit-contain">

           <div className='flex items-center justify-center'>
              <input type="text" placeholder='Search..' className='bg-white border border-gray-200 rounded-lg text-center mt-2 h-6 w-40' onChange={(e) => setSearchParam(e.target.value)} />
                <div className='mt-4' onClick={() => searchParamPublication()}>
                    <SearchIcon style={{cursor: "pointer", marginLeft:"3px"}}/>
                </div>                       
           </div>

           <div className='flex mt-4'>
              <input type='checkbox' className="checkbox checkbox-sm border-slate-700"></input>
              <p className="ml-2 text-black">Sidewalks</p>
           </div>

           <div className='flex mt-4'>
              <input type='checkbox' className="checkbox checkbox-sm border-slate-700"></input>
              <p className="ml-2 text-black">Lightning</p>
           </div>

           <div className='flex mt-4'>
              <input type='checkbox' className="checkbox checkbox-sm border-slate-700"></input>
              <p className="ml-2 text-black">Cleaning</p>
           </div>

           <div className='flex mt-4'>
              <input type='checkbox' className="checkbox checkbox-sm border-slate-700"></input>
              <p className="ml-2 text-black">Streets and Squares</p>
           </div>

           <div className='flex mt-4'>
              <input type='checkbox' className="checkbox checkbox-sm border-slate-700"></input>
              <p className="ml-2 text-black">Transit</p>
           </div>

           <div className='flex mt-4 items-center justify-center mt-2'>
             <button className='rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs sm:text-xxxs md:text-sm'>Apply</button>
           </div>

         </ul>
  </div>
  )
}

export default FiltersModal
