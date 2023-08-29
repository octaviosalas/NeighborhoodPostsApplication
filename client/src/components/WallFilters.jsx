import React from 'react'

const WallFilters = () => {
  return (
    <div>
        <div className='border border-black'>
                  <input type="text" placeholder='Buscar' />
                       <div className='mt-6'>
                            <div className='flex mt-4'>
                            <input type="checkbox" className="checkbox checkbox-sm" /> 
                            <input type="text" placeholder='categoria' className='ml-6' />
                            </div>

                            <div className='flex mt-4'>
                            <input type="checkbox" className="checkbox checkbox-sm" /> 
                            <input type="text" placeholder='categoria' className='ml-6' />
                            </div>

                            <div className='flex mt-4'>
                            <input type="checkbox" className="checkbox checkbox-sm" /> 
                            <input type="text" placeholder='categoria' className='ml-6'  />
                            </div>

                            <div className='flex mt-4'>
                            <input type="checkbox" className="checkbox checkbox-sm" /> 
                            <input type="text" placeholder='categoria' className='ml-6' />
                            </div> 
                       </div>
                 </div>
    </div>
  )
}

export default WallFilters
