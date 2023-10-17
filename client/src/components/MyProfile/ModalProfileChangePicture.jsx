import React from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import axios from "axios"
import { useContext } from 'react';
import { UserContext } from '../../store/usercontext';
import { useNavigate } from 'react-router-dom';


const ModalProfileChangePicture = ({photo}) => { 

     const [newImage, setNewImage] = useState(photo)
     const [showConfirm, setShowConfirm] = useState(false)
     const userCtx = useContext(UserContext)
     const navigate = useNavigate()

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
                console.log(fileURL)
                setNewImage(fileURL)
                setTimeout(() => { 
                    setShowConfirm(true)
                }, 1500)
              });
          });
        };

        const changePicture = () => { 
          const newPicture = ({ 
               newPicture: newImage
          })
          axios.put(`https://app-citizens.onrender.com/changeUserPhoto/${userCtx.userId}`, newPicture)
               .then((res) => { 
                    console.log(res.data)
                    setTimeout(() => { 
                         userCtx.updateUser(null)
                         userCtx.updateUserProfileImage(null)
                         userCtx.updateUserName(null)
                         userCtx.updateUserQuantityNotifications(null)
                         userCtx.updateUserNotifications(null)
                    }, 2000)
                    setTimeout(() => { 
                         navigate("/login")
                    }, 3000)
               })
               .catch((err) => { 
                    console.log(err)
               })
        }

  return (
    <div>
       <img src={photo} className="rounded-full m-2 h-24 w-24 xxs:h-32 xxs:w-32 lg:w-44 lg:h-44 cursor-pointer" onClick={()=>document.getElementById('my_modal_6').showModal()} title="Leave a Comment"/>
           <dialog id="my_modal_6" className="modal">
                <form method="dialog" className="modal-box flex flex-col items-center justify-center">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</button>
                    <div className='flex items-center space-x-2'>
                         <img src={newImage} className='mt-6 w-44 h-full rounded-xl'/>
                    </div>
                    <Dropzone onDrop={handleDropImage}>
                                        {({ getRootProps, getInputProps }) => (
                                            <div {...getRootProps({ className: 'dropzone' })}>
                                            <input {...getInputProps()} />
                                          
                                                    <div className="text-center">
                                                           
                                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                                <label
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                                >
                                                                 {showConfirm ? 
                                                                    null
                                                                      : 
                                                                      <span>Upload a file</span>
                                                                 }
                                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                                </label>
                                                            </div>
                                                    </div>
                                              
                                        </div> )}
                                    </Dropzone>
                                    {showConfirm ? <button className='bg-blue-700 text-white font-bold' onClick={() => changePicture()}>Save</button> : null}
                </form>
            </dialog> 
          
    </div>
  )
}

export default ModalProfileChangePicture
