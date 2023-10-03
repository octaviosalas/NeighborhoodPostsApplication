import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const FiltersModal = () => {
  return (
    <div className="dropdown dropdown-hover">
        <label tabIndex={0} className="btn m-1">Apply Filters</label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
           <div className='flex'>
              <input type="text" placeholder='Search..' className='bg-gray-200 border border-gray-200 rounded-lg text-center mt-2 h-6 w-auto' />
                <div className='mt-4'>
                    <SearchIcon style={{cursor: "pointer", marginLeft:"3px"}}/>
                </div>                       
           </div>
           <div className='flex'>
              <input type='checkbox' className="checkbox checkbox-sm border-slate-700"></input>
              <p className="ml-2 text-black">Sidewalks</p>
           </div>
           <div className='flex'>
              <input type='checkbox' className="checkbox checkbox-sm border-slate-700"></input>
              <p className="ml-2 text-black">Lightning</p>
           </div>
           <div className='flex'>
              <input type='checkbox' className="checkbox checkbox-sm border-slate-700"></input>
              <p className="ml-2 text-black">Cleaning</p>
           </div>
           <div className='flex'>
              <input type='checkbox' className="checkbox checkbox-sm border-slate-700"></input>
              <p className="ml-2 text-black">Streets and Squares</p>
           </div>
           <div className='flex'>
              <input type='checkbox' className="checkbox checkbox-sm border-slate-700"></input>
              <p className="ml-2 text-black">Transit</p>
           </div>
           <div className='flex items-center justify-center'>
             <button className='rounded-lg bg-blue-600 text-white hover:bg-blue-700'>Apply</button>
           </div>
         </ul>
  </div>
  )
}

export default FiltersModal
