import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import {toast, ToastContainer} from "react-toastify"


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
             axios.get(`http://localhost:4000/getPublicationsWithParams/${searchParam}`)
                  .then((res) => { 
                    console.log(res.data)
                    setSearchResults(res.data)
                    setTimeout(() => { 
                      navigate(`/publicationsSearched/${searchParam}`)
                    },200)
                    setTimeout(() => { 
                    window.location.reload()
                    }, 500)
                  })
                  .catch((err) => { 
                    console.log(err)
                  })
                 } 
        } 

        const searchWithSomeParams = () => { 
          axios.get(`http://localhost:4000/getPublicationsWithSomeParams/${paramOne}/${paramTwo}/${paramThree}/${paramFour}/${paramFive}`)
               .then((res) => { 
                console.log(res.data)
               })
               .catch((err) => { 
                console.log(err)
               })
        }



  return (
        <div>
              <div className="mr-4">
                      <div className='flex'>
                          <input type="text" placeholder='Search..' className='bg-gray-200 border border-gray-200 rounded-lg text-center mt-2' onChange={(e) => setSearchParam(e.target.value)}/>
                          <div onClick={() => searchParamPublication()} className='mt-4'>
                             <SearchIcon style={{cursor: "pointer", marginLeft:"3px"}}/>
                          </div>                       
                        </div>

                <div className="mt-6">
                      <div className="flex mt-4">
                          <input type="checkbox" className="checkbox checkbox-sm border-slate-700" 
                                    checked={paramOne !== null}
                                    onChange={() => {
                                      if (paramOne === null) {
                                        setParamOne("Sidewalks");
                                      } else {
                                        setParamOne(null);
                                      }}}/>

                          <p className="ml-2 text-black">Sidewalks</p>
                      </div>

                      <div className="flex mt-4">
                          <input  type="checkbox" className="checkbox checkbox-sm border-slate-700" 
                                    checked={paramTwo !== null}
                                    onChange={() => {
                                      if (paramTwo === null) {
                                        setParamTwo("Lightning");
                                      } else {
                                        setParamTwo(null);
                                      }}}/>
                          <p className="ml-2 text-black">Lightning</p>
                      </div>

                      <div className="flex mt-4">
                          <input  type="checkbox"  className="checkbox checkbox-sm border-slate-700" 
                                  checked={paramThree !== null}
                                    onChange={() => {
                                      if (paramThree === null) {
                                        setParamThree("Cleaning");
                                      } else {
                                        setParamThree(null);
                                      }}}/>
                          <p className="ml-2 text-black">Cleaning</p>
                      </div>

                      <div className="flex mt-4">
                          <input type="checkbox" className="checkbox checkbox-sm border-slate-700"
                                    checked={paramFour !== null}
                                    onChange={() => {
                                      if (paramFour === null) {
                                        setParamFour("Streets");
                                      } else {
                                        setParamFour(null);
                                      }}}/>
                          <p className="ml-2 text-black">Streets and Squares</p>
                      </div>

                      <div className="flex mt-4">
                          <input type="checkbox" className="checkbox checkbox-sm border-slate-700" 
                                checked={paramFive !== null}
                                    onChange={() => {
                                      if (paramFive === null) {
                                        setParamFive("Transit");
                                      } else {
                                        setParamFive(null);
                                      }}}/>
                          <p className="ml-2 text-black">Transit</p>
                      </div>

                      <div className="flex mt-4">
                          <input  type="checkbox" className="checkbox checkbox-sm border-slate-700" />
                          <p className="ml-2 text-black">Todo</p>
                      </div>

                      <div className=" mt-4  text-left">
                        {paramOne !== null || paramTwo !== null || paramThree !== null || paramFour !== null || paramFive !== null?
                        (
                            <button className="text-black font-bold bg-gray-400 text-xs h-[32px] w-16 hover:bg-white hover:text-black border border-none hover:border-none" onClick={() => searchWithSomeParams()}>
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
