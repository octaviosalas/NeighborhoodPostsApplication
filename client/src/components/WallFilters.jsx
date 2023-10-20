import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"
import { Link } from 'react-router-dom';


const WallFilters = () => {

        const [searchParam, setSearchParam] = useState("")
        const [showMessageWithOutFilters, setShowMessageWithOutFilters] = useState("")
        const [searchResults, setSearchResults] = useState([])
        const [paramOne, setParamOne] = useState(null)
        const [paramTwo, setParamTwo] = useState(null)
        const [paramThree, setParamThree] = useState(null)
        const [paramFour, setParamFour] = useState(null)
        const [paramFive, setParamFive] = useState(null)
        const navigate = useNavigate()
  


        const notificacionDeToast = () =>{ 
          toast.error("Its not possible to do a personal search with out filters aplicated", {
            position: toast.POSITION.TOP_RIGHT_CENTER,
            style: {
              color: "#082E58", 
            },
          });
        }

        const searchParamPublication = () => { 
          if(searchParam === "") { 
            notificacionDeToast()
          } else { 
                 navigate(`/userManualSearch/${searchParam}`)
                  }
        } 

        const [filterState, setFilterState] = useState({
          Sidewalks: false,
          Lightning: false,
          Cleaning: false,
          Streets: false,
          Transit: false
        });

        const handleCheckboxChange = (event) => {
          const { name, checked } = event.target;
          setFilterState({
            ...filterState,
            [name]: checked,
          });
        };

        useEffect(() => {
          sessionStorage.setItem('filterState', JSON.stringify(filterState));
          console.log(sessionStorage.filterState)
        }, [filterState]);

    

      const goSearchFiltered = () => { 
       navigate("/searchWithFilters") 
       setTimeout(() => { 
          window.location.reload()
       }, 500)
      }



  return (
        <div className='bg-gray-200 rounded-lg'>
              <div className="mr-4">
                      <div className='flex'>
                          <input type="text" placeholder='Search..' className=' border border-gray-200 rounded-lg text-center mt-2' onChange={(e) => setSearchParam(e.target.value)}/>
                          <div onClick={() => searchParamPublication()} className='mt-4'>
                             <SearchIcon style={{cursor: "pointer", marginLeft:"3px"}}/>
                          </div>                       
                        </div>

                <div className="mt-6 ml-2">
                      <div className="flex mt-4">
                          <input type="checkbox" className="checkbox checkbox-sm border-slate-700" name="Sidewalks" checked={filterState.Sidewalks} onChange={handleCheckboxChange}/>
                          <p className="ml-2 text-black">Sidewalks</p>
                      </div>

                      <div className="flex mt-4">
                          <input className="checkbox checkbox-sm border-slate-700" type="checkbox"  name="Lightning" checked={filterState.Lightning} onChange={handleCheckboxChange}/>
                          <p className="ml-2 text-black">Lightning</p>
                      </div>

                      <div className="flex mt-4">
                          <input  type="checkbox"  className="checkbox checkbox-sm border-slate-700" name="Cleaning" checked={filterState.Cleaning} onChange={handleCheckboxChange}/>
                          <p className="ml-2 text-black">Cleaning</p>
                      </div>

                      <div className="flex mt-4">
                          <input type="checkbox" className="checkbox checkbox-sm border-slate-700" name="Streets" checked={filterState.Streets} onChange={handleCheckboxChange}/>
                          <p className="ml-2 text-black">Streets and Squares</p>
                      </div>

                      <div className="flex mt-4">
                          <input type="checkbox" className="checkbox checkbox-sm border-slate-700" name="Transit" checked={filterState.Transit} onChange={handleCheckboxChange}/>
                          <p className="ml-2 text-black">Transit</p>
                      </div>

                      <div className="flex mt-4">
                          <input  type="checkbox" className="checkbox checkbox-sm border-slate-700" />
                          <p className="ml-2 text-black">Todo</p>
                      </div>

                      <div className=" mt-4  text-left">
                        {filterState && Object.values(filterState).some((value) => value === true)  ?
                         (
                          
                                <button className="text-black font-bold bg-gray-400 text-xs h-[32px] w-16 hover:bg-white hover:text-black border border-none hover:border-none" onClick={() => goSearchFiltered()}>
                                    APPLY
                                </button>
                   
                          ) : null}
                          
                          <br/>
                          <small className="text-black font-bold underline cursor-pointer">Delete All Filters</small>
                      </div>
                </div>
              </div>
              <ToastContainer/>
            </div>
  );
};

export default WallFilters
