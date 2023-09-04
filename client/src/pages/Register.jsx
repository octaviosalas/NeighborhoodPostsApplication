import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Dropzone from 'react-dropzone';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import axios from "axios"

const Register = () => {

    const [profileImage, setProfileImage] = useState("")
    const [showPhotoIcon, setShowPhotoIcon] = useState(true)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
 
   

    const handleDropImage = (files) => {
        const uploaders = files.map((file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('tags', `codeinfuse, medium, gist`);
          formData.append('upload_preset', 'App-Cars');
          formData.append('api_key', '687985773113572');
          formData.append('timestamp', Date.now() / 1000 / 0);
         
          return axios
            .post('https://api.cloudinary.com/v1_1/dgheotuij/image/upload', formData, {
              headers: { 'X-Requested-With': 'XMLHttpRequest' },
            })
            .then((res) => {
              const data = res.data;
              const fileURL = data.secure_url;
              console.log(fileURL);
              setProfileImage(fileURL)
              setTimeout(() => { 
                setShowPhotoIcon(false)
              }, 500)
       
            });
        });
      };
      
      const registerNewUser = () => { 
        const newUser = ( { 
          profileImage: profileImage,
          name: name,
          location: location,
          birthdate: birthdate,
          email: email,
          password: password
        })
        axios.post("http://localhost:4000/registerNewUser", newUser)
             .then((res) => { 
                console.log(res.data)
             })
             .catch((err) => { 
                console.log(err)
             })
      }


  return (
    <div>
        <>

        <div className=' mt-12 justify-center'>

           <main className='flex justify-end items-center  gap-10 sm:gap-0 my-6 mx-2 sm:mx-5 md:mx-10'>
            
                <div className="basis-1/2 w-[50vh] flex flex-1 flex-col sm:gap-0 justify-center p-6 py-8 sm:py-6 lg:px-8 rounded-lg bg-gray-white bg-opacity-60 shadow-md">
                <h2 className="text-center font-bold text-2xl font-PoppinsBold leading-9 tracking-tight text-pallete-black"> Create Account </h2>

                
                    <div className="flex flex-col gap-6 sm:gap-4 mt-9 sm:mx-auto sm:w-full sm:max-w-sm">

                        <div>
                            <div className="mt-2">
                                <input  id="user" name="user" placeholder="Complete Name.." type="text" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                                 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"  onChange={(e) => setName(e.target.value)}/>
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                <input  id="location"  name="location" placeholder="Residence Location" type="text"  autoComplete="location" required className="input input-sm block w-full border border-black font-PoppinsRegular ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" onChange={(e) => setLocation(e.target.value)}/>
                            </div>
                        </div>

                    <div>
                        <div className="mt-2">
                            <input  id="date"  name="date" placeholder="Birthdate" type="text" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                                ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"  onChange={(e) => setBirthdate(e.target.value)}/>
                        </div>
                    </div>

                    
                    <div>
                        <div className="mt-2">
                            <span><small className='text-gray-400 text-sm'>Select your Profile Image</small></span>
                        </div>
                        
                        <Dropzone onDrop={handleDropImage}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps({ className: 'dropzone' })} className=' flex justify-center'>
                                    <input {...getInputProps()} />
                                       <div className=" avatar mt-4 w-36 h-24  flex justify-center rounded-full border border-dashed border-gray-900/25 " style={{ backgroundImage: `url(${profileImage})`, backgroundSize: 'cover' }}>
                                             <div className="text-center">
                                                  {showPhotoIcon ?  <PhotoIcon className="mx-auto mt-6 h-12 w-12 text-gray-300" aria-hidden="true" /> : null}
                                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                        <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                        >
                                                        
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                        </label>
                                                    </div>
                                              </div>
                                        </div>
                                  </div> )}
                               </Dropzone>
                        
                    </div>

                    <div className='mt-2'>
                        <div className="mt-2">
                            <input  id="email" name="email" placeholder="Email" type="Email" required  className="input input-sm block w-full border border-black font-PoppinsRegular 
                                ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"  onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>

                    <div className="">
                        <div className="">
                        <input  id="password"  name="password"  placeholder="Password" type="password" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                                ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"  onChange={(e) => setPassword(e.target.value)} />
                           
                        </div>
                     
                    </div>


                    <div className=' justify-center text-center mt-6 bg-blue-950 border rounded-xl'>                        
                        <button className='border-none bg-blue-950  text-white'  onClick={() => registerNewUser()}>Register</button>
                    </div>

                    <div className='flex flex-col gap-3 mt-5 mx-auto items-center justify-center'>              
                        <p className=" text-center text-xs sm:text-sm font-PoppinsSemibold text-pallete-grey">
                        ¿Are you Registered?
                        <Link Link to="/" className="px-2 font-PoppinsSemibold leading-6 text-yellow-500">SignIn</Link>
                        </p>
                    </div>
                    </div>
              
                </div>
                </main>

        </div>

     
    </>
    </div>
  )
}

export default Register
