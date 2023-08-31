import React from "react";
import { Link } from "react-router-dom";
import puzzle from "../img/puzzle.png";
import logi from "../img/logi.png";
import New from "../components/New"
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../store/usercontext";



export default function Landing() {

    const userContx = useContext(UserContext)
    const [showButtons, setShowButtons] = useState(true)

      useEffect(() => { 
        if(userContx.userId !== null) { 
          setShowButtons(false)
        }
      })

      useEffect(() => { 
               console.log(userContx.userId, userContx.userName, userContx.userProfileImage)
      }, [userContx.userId, userContx.userName, userContx.userProfileImage])

  return (
    <main className="px-20 py-2">
      <div
        id="hero-section"
        className="h-screen flex flex-col items-center gap-4 justify-center"
      >
        <div className="flex justify-center items-center gap-4">
          <div id="hero-section__img">
            <img
              width="500"
              height="500"
              src={puzzle}
              alt="Personas sobre un rompecabezas"
            />
          </div>
          <div
            id="hero-section__content"
            className="flex flex-col justify-center items-center gap-4"
          >
            <img className="w-96" src={logi} alt="Logo de la página" />
            <p className="w-[30ch] text-center text-title-lg">
            Your contribution as a citizen helps to make visible problems in
                 goods for public use
            </p>
            <div className="flex gap-2">
             {showButtons ?
             <>
                <Link to="/register"   className="font-bold border bg-terciary-100 p-2 rounded-2xl hover:bg-terciary-50 transition-colors"  >  Registrarme  </Link>
                <Link to="/login"    className="border-terciary-100 font-bold text-terciary-100 border p-2 rounded-2xl hover:border-2 hover:border-terciary-50 transition-colors" > Iniciar sesión </Link>
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

      <section className="flex flex-col items-center gap-8 py-10">
        
        <Link className="border border-terciary-100 text-terciary-100 font-bold p-4 rounded-2xl">
          Ir a reportar
        </Link>
      </section>
    </main>
  );
}