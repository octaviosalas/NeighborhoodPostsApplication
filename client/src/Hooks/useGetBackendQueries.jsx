import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios"

const useGetBackendQueries = (route) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noPublications, setNoPublications] = useState(false)

  useEffect(() => { 
     axios.get(`http://localhost:4000/${route}`)
          .then((res) => { 
            if(res.data.length !== 0) { 
              setData(res.data)
              setTimeout(() => { 
                  setLoading(false) 
              }, 1500)          
            } else { 
              setNoPublications(true)
            }
           
          })
          .catch((err) => { 
            if(err)  { 
              console.log(err)      
            }
           
          })
  }, [route])

    
  return {data, loading, noPublications}
}

export default useGetBackendQueries;