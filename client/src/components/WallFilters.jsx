import React from 'react'

const WallFilters = () => {
  return (
    <div>
        <div className=''>
                  <input type="text" placeholder='Buscar' />
                       <div className='mt-6'>
                            <div className='flex mt-4'>
                              <input type="checkbox" className="checkbox checkbox-sm" /> 
                              <p>Aceras</p>
                            </div>

                            <div className='flex mt-4'>
                              <input type="checkbox" className="checkbox checkbox-sm" /> 
                              <p>Limpieza</p>
                             </div>

                            <div className='flex mt-4'>
                              <input type="checkbox" className="checkbox checkbox-sm" /> 
                              <p>Luminaria</p>
                            </div>

                            <div className='flex mt-4'>
                               <input type="checkbox" className="checkbox checkbox-sm" /> 
                               <p>Parques y Plazas</p>
                            </div> 

                            <div className='flex mt-4'>
                               <input type="checkbox" className="checkbox checkbox-sm" /> 
                               <p>Transito</p>
                            </div> 

                            <div className='flex mt-4'>
                               <input type="checkbox" className="checkbox checkbox-sm" /> 
                               <p>Todo</p>
                            </div> 

                            <div className='flex mt-4'>
                               <p>Eliminar todos</p>
                            </div> 
                       </div>
                 </div>
    </div>
  )
}

export default WallFilters
