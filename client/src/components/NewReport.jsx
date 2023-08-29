import React from 'react'

const NewReport = () => {
  return (
    <div className='flex-direction-row '> 
            <button className="btn" onClick={()=>window.my_modal_3.showModal()}>Nuevo Reporte</button>
                    <dialog id="my_modal_3" className="modal">
                    <form method="dialog" className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                        <div className='inline-block flex-row'>
                        <form className='w-full' action="#">
                <div className="flex flex-col gap-6 sm:gap-4 mt-9 sm:mx-auto sm:w-full sm:max-w-sm">

                    <div>
                        <div className="mt-2">
                            <input  id="Email" name="user" placeholder="Email" type="text" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                            ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <div className="mt-2">
                            <input  id="Contraseña" name="Contraseña" placeholder="Contraseña" type="text" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                            ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                            />
                             <p className="mt-2 text-xs text-black underline ml-[250px] cursor-pointer">Olvide la contraseña</p>
                        </div>
                    </div>

                    <div className='justify-center text-center mt-6 bg-blue-950 border rounded-xl'>
                        <button className=' bg-blue-950 border-none  text-white'>Iniciar Sesion</button>
                    </div>

                    <div className='  justify-center mt-4 bg-white border rounded-xl'>
                       
                        <button className='border-none'>Iniciar Sesion con Google</button>
                    </div>
                 
                    <div className='justify-center bg-white border rounded-xl'>
                         
                         <button className='border-none'>Iniciar Sesion con Meta</button>
                    </div>



                <div className='flex flex-col gap-3 mt-5 mx-auto items-center justify-center'>              
                 <p className=" text-center text-xs sm:text-sm font-PoppinsSemibold text-pallete-grey">Registrarse con Email</p>
                </div>
                </div>
            </form>
                                
                              
                        </div>
                        
                    </form>
                    </dialog>
                 <button>Mis Reportes</button>
            </div>
  )
}

export default NewReport
