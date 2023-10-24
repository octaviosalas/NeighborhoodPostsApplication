import React, { useEffect } from 'react'
import { useState } from 'react'
import Dropzone from 'react-dropzone';
import axios from "axios"
import { PhotoIcon } from '@heroicons/react/24/solid'
import ReactConfetti from "react-confetti"
import {useNavigate} from "react-router-dom"


const ResolvedComplaiModal = ({photo, name, title, description, imageOne, imageTwo, close, publicationId}) => {
    
   const [havePhotos, setHavePhotos] = useState(false)
   const [imagenes, setImagenes] = useState([]);
   const [comment, setComment] = useState([])
   const [isConfettiActive, setIsConfettiActive] = useState(false);

  const navigate = useNavigate()

   useEffect(() => { 
    console.log(publicationId)
   }, [])

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

  const markPublicationAsResolved = () => { 
    const data = ({ 
      comment: comment,
      images: imagenes
    })
    axios.post(`https://app-citizens.onrender.com/markPublicationAsResolved/${publicationId}`, data)
         .then((res) => { 
            console.log(res.data)
            setIsConfettiActive(true);
            setTimeout(() => {   
                 navigate("/wall")
            }, 6000)
         })
         .catch((err) => { 
            console.log(err)
         })
  }


 


  return (
    <div>
        <small className="font-bold underline cursor-pointer text-xs" onClick={()=>document.getElementById('my_modal_13').showModal()}>Shared the News</small>
            <dialog id="my_modal_13" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => close()}>✕</button>
                    </form>
                        <div className='flex flex-col items-center justify-center'>

                          
                                    <div>
                                        <textarea type="text" className='rounded-lg w-72 h-auto text-sm text-center border-blue-700' 
                                        placeholder='write a comment..' onChange={(e) => setComment(e.target.value)}/>
                                    </div>
                                <div className='bg-gray-200 mt-4 rounded-2xl'> 
                                    <div className='flex flex-col justify-center items-center m-2'>
                                        <img src={photo} className='h-16 w-16 rounded-full mt-2'/>
                                        <small className='text-xsm font-bold mt-2'>{name}</small>
                                    </div>
                                    <div className='flex flex-col items-center justify-center m-2'>
                                        <small className='font-bold text-black text-sm'>{title}</small>
                                        <small className='text-sm'>{description}</small>
                                    </div> 
                                    <div className='flex items-center justify-center gap-4 m-2'>
                                        <img src={imageOne} className='h-20 w-20 rounded-xl'/>
                                        <img src={imageTwo} className='h-20 w-20 rounded-xl'/>
                                    </div> 
                                </div>  
                                

                                <div className='flex flex-col items-center jusitfy-center mt-4'>
                                   <small className='text-md font-bold underline cursor-pointer' onClick={() => setHavePhotos(true)}>If you have photos that show the arrangement, click here!</small>    
                                </div>           

                               {havePhotos ? <div className='flex items-center justify-center gap-2'>
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
                                </div> : null}   

                                <div className='mt-4'>
                                      <button className='text-black bg-yellow-400 hover:text-white text-center hover:bg-blue-700 w-18 xl:w-36 h-10 text-md' onClick={(() => markPublicationAsResolved())}>Post</button>
                                    
                                      {isConfettiActive ?  <ReactConfetti /> : null}
                                </div>              
                        </div>
                </div>
            </dialog>
    </div>
  )
}

export default ResolvedComplaiModal

/*import React, { useEffect } from 'react'
import { useState } from 'react'
import Dropzone from 'react-dropzone';
import axios from "axios"
import { PhotoIcon } from '@heroicons/react/24/solid'
import ReactConfetti from "react-confetti"

const ResolvedComplaiModal = ({photo, name, title, description, imageOne, imageTwo, close, publicationId}) => {
    
   const [havePhotos, setHavePhotos] = useState(false)
   const [imagenes, setImagenes] = useState([]);
   const [comment, setComment] = useState([])
   const [isConfettiActive, setIsConfettiActive] = useState(false);

   useEffect(() => {
    if (isConfettiActive) {
        const confetti = ReactConfetti.create({
            shape: "square",
            size: 20,
            color: "red",
            direction: "bottom",
            speed: 10,
            count: 100,
            duration: 5,
          });
      confetti.start();
    }
  }, [isConfettiActive]);

   useEffect(() => { 
    console.log(publicationId)
   }, [])

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

  const markPublicationAsResolved = () => { 
    const data = ({ 
      comment: comment,
      images: imagenes
    })
    axios.post(`http://localhost:4000/markPublicationAsResolved/${publicationId}`, data)
         .then((res) => { 
            console.log(res.data)
         })
         .catch((err) => { 
            console.log(err)
         })
  }

  const ejecutandoConfetti = () => { 
    setIsConfettiActive(true);
  }


  return (
    <div>
        <small className="font-bold underline cursor-pointer text-xs" onClick={()=>document.getElementById('my_modal_13').showModal()}>Shared the News</small>
            <dialog id="my_modal_13" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => close()}>✕</button>
                    </form>
                        <div className='flex flex-col items-center justify-center'>

                          
                                    <div>
                                        <textarea type="text" className='rounded-lg w-72 h-auto text-sm text-center border-blue-700' 
                                        placeholder='write a comment..' onChange={(e) => setComment(e.target.value)}/>
                                    </div>
                                <div className='bg-gray-200 mt-4 rounded-2xl'> 
                                    <div className='flex flex-col justify-center items-center m-2'>
                                        <img src={photo} className='h-16 w-16 rounded-full mt-2'/>
                                        <small className='text-xsm font-bold mt-2'>{name}</small>
                                    </div>
                                    <div className='flex flex-col items-center justify-center m-2'>
                                        <small className='font-bold text-black text-sm'>{title}</small>
                                        <small className='text-sm'>{description}</small>
                                    </div> 
                                    <div className='flex items-center justify-center gap-4 m-2'>
                                        <img src={imageOne} className='h-20 w-20 rounded-xl'/>
                                        <img src={imageTwo} className='h-20 w-20 rounded-xl'/>
                                    </div> 
                                </div>  
                                

                                <div className='flex flex-col items-center jusitfy-center mt-4'>
                                   <small className='text-md font-bold underline cursor-pointer' onClick={() => setHavePhotos(true)}>If you have photos that show the arrangement, click here!</small>    
                                </div>           

                                                      

                                <div className='mt-4'>
                                      <button className='text-black bg-yellow-400 hover:text-white text-center hover:bg-blue-700 w-18 h-10 text-md' onClick={(() => markPublicationAsResolved())}>Post</button>
                                      <button onClick={() => ejecutandoConfetti()}>JJ</button>
                                      {isConfettiActive && <ReactConfetti />}
                                </div>              
                        </div>
                </div>
           
            </dialog>
    </div>
  )
}

export default ResolvedComplaiModal
*/