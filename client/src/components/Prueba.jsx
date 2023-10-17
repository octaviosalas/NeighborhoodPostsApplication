import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'



const Prueba = () => {

    const [publicationData, setPublicationData] = useState([])

    useEffect(() => { 
       axios.get("https://app-citizens.onrender.com/getOnePublication/64ef3f94a73bd05a4aab33a5") 
            .then((res) => { 
                console.log(res.data)
                setPublicationData(res.data)
            })
            .catch((err) => { 
                console.log(err)
            })
    }, [])
    
  return (

      <div className='grid grid-cols-2 border border-green-400 h-[200px] w-[200px]'>
    
              <div className='bg-red-400 text-white  items-center h-auto w-auto grid col-start-1 fixed left-4'>Filtros</div>
              <div className='bg-yellow-400 text-white grid col-start-2  items-center h-auto w-auto '>Filtros</div>
 
      </div>
  )
}

export default Prueba;