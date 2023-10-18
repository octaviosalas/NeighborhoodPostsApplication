import React from "react";
import { Link } from "react-router-dom";
import puzzle from "../img/puzzle.png";
import logi from "../img/logi.png";
import New from "../components/New"
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../store/usercontext";
import fon from "../img/imageFon.png"
import axios from "axios";



export default function Landing() {

    const userContx = useContext(UserContext)
    const [showButtons, setShowButtons] = useState(true)

      useEffect(() => { 
        if(userContx.userId !== null) { 
          setShowButtons(false)
        }
      })

      
  return (
    <main className="flex flex-col items-center justify-center">
      <div  id="hero-section"className="h-screen flex flex-col items-center gap-4 justify-center" >
        <div className="flex justify-center items-center gap-4 ">
            <div className="hidden xxs:block">
                <div id="hero-section__img flex items-center justify-center">
                    <img width="300px" height="300px" src={puzzle}  alt="Personas sobre un rompecabezas"/>
                </div>
                <div id="hero-section__img flex items-center justify-center">
                    <img width="300px" height="300px" src={puzzle}  alt="Personas sobre un rompecabezas"/>
                </div>
            </div>
        
            <div id="hero-section__content"  className="flex flex-col justify-center items-center gap-4 ml-0 sm:ml-6 ">
                  <img className="w-96" src={logi} alt="Logo de la página" />
                  <p className="w-[30ch] text-center text-title-lg font-bold"> Your contribution as a citizen helps to make visible problems in  goods for public use </p>
                    <div className="flex gap-2">
                    {showButtons ?
                    <>
                        <Link to="/register" className="font-bold border p-2 rounded-2xl hover:bg-terciary-50 transition-colors bg-blue-950 text-white hover:bg-white hover:text-blue-950">  Create an account  </Link>
                        <Link to="/login" className="border-terciary-100 bg-blue-950 text-white font-bold text-terciary-100 border p-2 rounded-2xl hover:border-2 hover:bg-white hover:text-blue-950 transition-colors"> Log In </Link>
                      </>
                      : 
                          <div>
                            <New/>
                          </div>
                    }
                    </div>
          </div>
        </div>
        <div>
         
        </div>
      </div>

     
    </main>
  );
}

