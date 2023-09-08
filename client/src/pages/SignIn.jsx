import React from 'react'
import { Link } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useContext } from 'react';
import { UserContext } from '../store/usercontext';
import { useState, useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';



const SignIn = () => {

    const userContx = useContext(UserContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [messageLogin, setMessageLogin] = useState("")

    const login = () => { 
      const userData = ( { 
        email, 
        password
      })
      axios.post("http://localhost:4000/login", userData)
           .then((res) => { 
            console.log(res.data)
            userContx.updateUser(res.data.id)
            userContx.updateUserName(res.data.name)
            userContx.updateUserProfileImage(res.data.profileImage)
            setMessageLogin("Session started successfully")
            setTimeout(() => { 
               navigate("/")
            }, 1200)
           })
           .catch((err) => { 
            console.log(err)
           })
    }

  



  return (
    <div className=' mt-12 justify-center'>

        
       <main className='flex justify-end  items-center  gap-10 sm:gap-0 my-6 mx-2 sm:mx-5 md:mx-10'>
        
            <div className="basis-1/2 w-[50vh] flex flex-1 flex-col sm:gap-0 justify-center p-6 py-8 sm:py-6 lg:px-8 rounded-lg bg-gray-200 bg-opacity-60 shadow-md">
            <h2 className="text-center text-2xl font-PoppinsBold leading-9 tracking-tight text-pallete-black">
               Sign In
            </h2>
                <div className="flex flex-col gap-6 sm:gap-4 mt-9 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div>
                        <div className="mt-2">
                            <input  id="Email" name="user" placeholder="Email" type="text" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                            ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>

                      <div>
                          <div className="mt-2">
                              <input  id="Contraseña" name="Contraseña" placeholder="Contraseña" type="password" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                              ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"  onChange={(e) => setPassword(e.target.value)}
                              />
                              <p className="mt-2 text-xs text-black underline ml-[250px] cursor-pointer">I miss my Password</p>
                          </div>
                      </div>

                      <div className='justify-center text-center mt-6 bg-blue-950 border rounded-xl'>
                          <button className=' bg-blue-950 w-full border-none  text-white' onClick={() => login()}>Iniciar Sesion</button>
                      </div>

                      <div className=' flex justify-center mt-4 bg-white border rounded-xl'>
                            <GoogleIcon className='mt-2'/>
                          <button className='border-none'>Iniciar Sesion con Google</button>
                      </div>
                  
                      <div className='justify-center bg-white border rounded-xl'>
                          <FacebookIcon className=''/>
                          <button className='border-none'>Iniciar Sesion con Meta</button>
                      </div>

                      <div className='flex flex-col gap-3 mt-5 mx-auto items-center justify-center'>              
                          <Link to={"/register"}><p className=" text-center text-xs sm:text-sm font-PoppinsSemibold text-pallete-grey">Register with Email</p></Link> 
                          <p className='text-blue-950'><b>{messageLogin}</b></p>
                      </div>
                </div>
            
            </div>
            </main>

    </div>


  )
}

export default SignIn
