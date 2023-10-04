import React from 'react'

const Privacity = ({close}) => {
  return (
    <div className=' grid grid-cols-7 mt-2 max-w-fit-contain border border-gray-300'>
     <small className='grid col-start-8 cursor-pointer mr-2' onClick={close}>X</small>
       <div className='grid col-span-12 '>
           <div className='mt-2 col-span-2'>
               <div className='flex items-center ml-2'>
                   <small className='text-gray-500 flex justify-start text-sm'>Privacity </small>
               </div>
           </div>     
           <div className='grid col-span-3 ml-2 mt-2'>
               <div className='flex flex-col items-start justify-start lg:flex-row  lg:items-center lg:juistify-center'>
                   <div className='flex items-center mt-2'>
                       <small className='text-sm font-bold ml-2'>Name:</small>
                       <input type="text" placeholder='Nombre..' className="text-xs h-6 border border-gray-200 ml-2"/>
                   </div>
                   <div className='flex items-center mt-2 '>
                       <small className='text-sm font-bold ml-2'>Email:</small>
                       <input type="text" placeholder='Email..' className="text-xs h-6 border border-gray-200  ml-2"/>
                   </div>
                   <div className='flex items-center mt-2'>
                       <small className='text-sm font-bold ml-2'>Password:</small>
                       <input type="text" placeholder='Actual Password..' className="text-xs h-6 border border-gray-200 ml-2"/>
                   </div>
                   <div className='flex items-center mt-2 mb-2 '>
                       <small className='text-sm font-bold ml-2'>New Password:</small>
                       <input type="text" placeholder='New Password..' className="text-xs h-6 border border-gray-200  ml-2"/>
                   </div>
               </div>
               <div className='mt-4'>
                   <button className='btn w-36 h-4 mb-2 text-white bg-blue-600 hover:bg-blue-800 hover:text-yellow-500'>Save</button>
               </div>
           </div>
       </div>
   </div>    
  )
}

export default Privacity
