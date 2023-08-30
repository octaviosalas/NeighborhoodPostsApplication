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
          <div className='mb-6'>
                <h1 className='font-bold text-xl'>La convivencia ciudadana y cuidar los espacios comunes es una responsabilidad Colectiva</h1>
                    <div>
                        <h2>Tu reporte ayuda a manetener los espacios en optimas condiciones</h2>
                    </div>
          </div>

       <div className='flex'>

            <div className=''>
                    <div className='flex'>
                        <img className='w-96 m-2' src="https://media.istockphoto.com/id/1580010490/es/vector/locks-in-voices-in-activism-energized-woman-with-bullhorn-destroy-this-thought-rally-subject.jpg?s=612x612&w=0&k=20&c=zbVAcnX1d_CvJ3w1SHNG7vJV2xEqZkOp7HWhLYRWPKI=" alt="" />
                        <img className='w-96 m-2' src='https://media.istockphoto.com/id/1165545415/es/vector/grupo-de-amigos-sociales-para-el-concepto-de-comunicaci%C3%B3n.jpg?s=2048x2048&w=is&k=20&c=8tbBrLIFMCL9DU9LVIYGcQhyRAFxeCbRu1VmSBBVrG8='/>
                    </div>

                    <div className='flex'>
                        <img className='w-96 m-2' src="https://media.istockphoto.com/id/1308582227/es/vector/enhorabuena-%C3%A9xito-empresarial-y-concepto-de-celebraci%C3%B3n.jpg?s=612x612&w=0&k=20&c=maeDNtTI_dlmb-2uIEjpKZ45-ElswSwFe0EM9bI-Xro=" alt="" />
                        <img className='w-96 m-2' src="https://media.istockphoto.com/id/1308580483/es/vector/trabajo-en-equipo-%C3%A9xito-concepto-de-cooperaci%C3%B3n-empresarial.jpg?s=612x612&w=0&k=20&c=hLE9vuqEnBZfdcUXGnD5Lr1nTAUcXRTCm15hRulIUg8="/>
                    </div>            
                </div>

                <div className='flex  h-24 mt-12 ml-2'> 
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
