import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div>
        <>

        <div className=' mt-12 justify-center'>

           <main className='flex justify-end items-center  gap-10 sm:gap-0 my-6 mx-2 sm:mx-5 md:mx-10'>
            
                <div className="basis-1/2 w-[50vh] flex flex-1 flex-col sm:gap-0 justify-center p-6 py-8 sm:py-6 lg:px-8 rounded-lg bg-gray-white bg-opacity-60 shadow-md">
                <h2 className="text-center font-bold text-2xl font-PoppinsBold leading-9 tracking-tight text-pallete-black"> Create Account </h2>

                <form className='w-full' action="#">
                    <div className="flex flex-col gap-6 sm:gap-4 mt-9 sm:mx-auto sm:w-full sm:max-w-sm">

                        <div>
                            <div className="mt-2">
                                <input  id="user" name="user" placeholder="Nombre" type="text" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                                 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                        <div className="mt-2">
                                <input  id="user" name="user" placeholder="Apellido" type="text" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                                ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                <input   id="residence" name="residence" placeholder="Lugar de Nacimiento" type="text" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                                ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                <input  id="location"  name="location" placeholder="Localidad de Residencia" type="text"  autoComplete="location" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                                ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                    <div>
                        <div className="mt-2">
                            <input  id="date"  name="date" placeholder="Fecha de nacimiento" type="text" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                                ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className='mt-12'>
                        <div className="mt-2">
                            <input  id="email" name="email" placeholder="Email" type="Email" required  className="input input-sm block w-full border border-black font-PoppinsRegular 
                                ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div className="">
                        <div className="">
                        <input  id="password"  name="password"  placeholder="Contraseña" type="password" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                                ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                           <p className="mt-2 text-sm text-gray-500">Password must contain</p>
                           <ul>
                                <li className=" text-xs">. One Lowercasse</li>
                                <li className=" text-xs">. One Number</li>
                                <li className=" text-xs">. Eigth Characeteres</li>
                            </ul>
                        </div>
                     
                    </div>


                    <div className=' justify-center text-center mt-6 bg-blue-950 border rounded-xl'>                        
                        <button className='border-none bg-blue-950  text-white' >Register</button>
                    </div>

                    <div className='flex flex-col gap-3 mt-5 mx-auto items-center justify-center'>              
                        <p className=" text-center text-xs sm:text-sm font-PoppinsSemibold text-pallete-grey">
                        ¿Are you Registered?
                        <Link Link to="/" className="px-2 font-PoppinsSemibold leading-6 text-yellow-500">SignIn</Link>
                        </p>
                    </div>
                    </div>
                </form>
                </div>
                </main>

        </div>

     
    </>
    </div>
  )
}

export default Register
