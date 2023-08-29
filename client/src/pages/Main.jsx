import React from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import axios from "axios"
import New from '../components/New';

const Main = () => {

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

      const sendMyReview = () => { 
        const review = ({ 
            title,
            ubication,
            category,
            description,
            imagenes
        })
        axios.post("http://localhost:4000/saveNewPublication", review)
             .then((res) => { 
                console.log(res.data)
             })
             .catch((err) => { 
                console.log(err)
             })
      }

  return (
    <div>
          <div className='mb-48'>
                <h1 className='font-bold text-xl'>La convivencia ciudadana y cuidar los espacios comunes es una responsabilidad Colectiva</h1>
                    <div>
                        <h2>Tu reporte ayuda a manetener los espacios en optimas condiciones</h2>
                    </div>
          </div>

          <div className='flex'>
            <div>
                <img className='w-96' src="https://static.vecteezy.com/system/resources/thumbnails/000/118/897/small/free-flat-city-landscape-vector-illustration.jpg" alt="" />
            </div>

            <div className='flex '> 
                    <div>
                        <New/>
                    </div>

                    <div>
                       <button>Mis Reportes</button>
                    </div>
           
            </div>

       
            
          </div>
    </div>
  )
}

export default Main
