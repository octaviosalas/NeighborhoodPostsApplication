import React from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import axios from "axios"

const New = () => {


    const [imagenes, setImagenes] = useState([]);
    const [title, setTitle] = useState(false);
    const [ubication, setUbication] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")

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
              const imagenesActuales = [...imagenes];
              imagenesActuales.push(fileURL);
              setImagenes(imagenesActuales)
       
            });
        });
      };


  return (
    <div>
       <button className="btn" onClick={()=>window.my_modal_3.showModal()}>Nuevo Reporte</button>
                    <dialog id="my_modal_3" className="modal">
                    <form method="dialog" className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                        <div className='inline-block flex-row'>
                        <form className='w-full' action="#">
                <div className="flex flex-col gap-6 sm:gap-4 mt-9 sm:mx-auto sm:w-full sm:max-w-sm">

                    <div>
                        <h3 className='font-bold'>Create Report</h3>
                    </div>

                    <div>
                        <div className="mt-2 w-full">
                            <input  id="Email" name="user" placeholder="Title.." type="text" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                            ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                    </div>

                    <div className='w-[360px]'>
                        <div className="mt-2">
                            <input  id="Contraseña" name="Contraseña" placeholder="Categoria.." type="text" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                            ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"  onChange={(e) => setCategory(e.target.value)}/>           
                        </div>
                    </div>

                    <div>
                        <div className="mt-2">
                            <textarea  id="Contraseña" name="Contraseña" placeholder="Description.." type="text" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                            ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 h-[100px]"  onChange={(e) => setDescription(e.target.value)}/>           
                        </div>
                    </div>

                    <div>
                        <div className="mt-2">
                            <input  id="Contraseña" name="Contraseña" placeholder="Ubication.." type="text" required className="input input-sm block w-full border border-black font-PoppinsRegular 
                            ring-pallete-grey focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 "  onChange={(e) => setUbication(e.target.value)}/>           
                        </div>

                        <div className='mt-4'> 
                              <span><small className='text-gray-400 text-sm'>Upload Picture or Video</small></span>
                        </div>

                        <div className='flex justify-center gap-4'>
                              <Dropzone onDrop={handleDropImage}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                       <div className="mt-4 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10" style={{ backgroundImage: `url(${imagenes[0]})`, backgroundSize: 'cover' }}>
                                             <div className="text-center">
                                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                        <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                        >
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                        </label>
                                                    </div>
                                              </div>
                                        </div>
                                  </div> )}
                               </Dropzone>

                               <Dropzone onDrop={handleDropImage}>
                                        {({ getRootProps, getInputProps }) => (
                                            <div {...getRootProps({ className: 'dropzone' })}>
                                            <input {...getInputProps()} />
                                            <div className="mt-4 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10" style={{ backgroundImage: `url(${imagenes[1]})`, backgroundSize: 'cover' }}>
                                                    <div className="text-center">
                                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                                <label
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                                >
                                                            <span>Upload a file</span>
                                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                            </label>
                                                    </div>
                                                    </div>
                                                </div>
                                           </div> )}
                              </Dropzone>
                        </div>
                        </div>
                            <div className='mt-2'>
                                <div className='flex'>
                                    <p className='text-xs font-bold text-black'>Do you want that your post be Anonymus?</p>
                                    <input type="checkbox" className="checkbox ml-4 h-6" />
                                </div>

                                <div className='flex'>
                                <p className='text-xs font-bold text-black'>I Aceppt terminal and Conditions</p>
                                <input type="checkbox"  className="checkbox ml-4 h-6" />
                                </div>
                            </div>

                                <div className='justify-center text-center mt-6 bg-blue-950 border rounded-xl'>
                                    <button className=' bg-blue-950 border-none  text-white' onClick={() => sendMyReview()}>Public Report</button>
                                </div>
                       </div>
            </form>
                                
                              
                        </div>
                        
                    </form>
                    </dialog>
    </div>
  )
}

export default New
