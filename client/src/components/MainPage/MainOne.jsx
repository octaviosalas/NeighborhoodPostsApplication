import React from 'react'
import SignIn from '../../pages/SignIn'

const MainOne = () => {
  return (
      <>
              <div className='w-full h-full  mt-16'>
                  <img src={"https://d19rpgkrjeba2z.cloudfront.net/static/gen/14e7ea357e69d82474e7.jpg"} alt="Imagen de fondo"></img>
              </div>

              <div className='flex justify-center items-center mt-2'>
                <div className='bg-white h-auto w-72 border border-gray-500 rounded-xl'>
                    <div className='flex flex-col'>
                      <small className='flex justify-start font-bold text-xl'>Descubre tu barrio</small>
                      <button className='mt-4 text-white bg-yellow-400 w-60%'>Crear una cuenta</button>
                    </div>
                    <div className='border border-black m-2'></div>
                    <div className='flex flex-col justify-start'>
                         <input type="text" placeholder='Email..' className='text-sm rounded-lg mt-4'></input>
                         <input type="text" placeholder='Email..' className='text-sm rounded-lg mt-2'></input>
                    </div>
                </div>
              </div>

            
      </>   
  )
}

export default MainOne

