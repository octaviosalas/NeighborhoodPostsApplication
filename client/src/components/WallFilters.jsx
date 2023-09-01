import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

const WallFilters = () => {
  return (
    <div>
        <div className='mr-4'>
                        <div className='flex'>
                          <input type="text" placeholder='Buscar' className='bg-gray-100 border border-gray-200 rounded-lg text-center '/>
                           < SearchIcon style={{cursor: "pointer"}}/>
                        </div>
                 
                       <div className='mt-6'>
                            <div className='flex mt-4'>
                              <input type="checkbox" className="checkbox checkbox-sm" /> 
                              <p className='ml-2'>Aceras</p>
                            </div>

                            <div className='flex mt-4'>
                              <input type="checkbox" className="checkbox checkbox-sm" /> 
                              <p className='ml-2'>Limpieza</p>
                             </div>

                            <div className='flex mt-4'>
                              <input type="checkbox" className="checkbox checkbox-sm" /> 
                              <p className='ml-2'>Luminaria</p>
                            </div>

                            <div className='flex mt-4'>
                               <input type="checkbox" className="checkbox checkbox-sm" /> 
                               <p className='ml-2'>Parques y Plazas</p>
                            </div> 

                            <div className='flex mt-4'>
                               <input type="checkbox" className="checkbox checkbox-sm" /> 
                               <p className='ml-2'>Transito</p>
                            </div> 

                            <div className='flex mt-4'>
                               <input type="checkbox" className="checkbox checkbox-sm" /> 
                               <p className='ml-2'>Todo</p>
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
