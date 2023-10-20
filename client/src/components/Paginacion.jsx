import React from 'react'
import { useState } from 'react';
import izquierda from "../img/izquierda.png"
import derecha from "../img/derecha.png"


const Paginacion = ({actualizar}) => {


  const [showOneToFive, setShowOneToFive] = useState(true)
  const [showSixToTen, setShowSixToTen] = useState(false)
  const [showEleventToThirteen, setShowElevenToThirteen] = useState(false)

  const actualizandoPagina = (numero) => {
    actualizar(numero);
  }; 

  const seisAlDiez = () => { 
    setShowSixToTen(true)
    setShowOneToFive(false)
    if(showSixToTen) { 
      setShowSixToTen(false)
      setShowOneToFive(false)
      setShowElevenToThirteen(true)
    }
  }

  const onceAlDoce = () => { 
    if(showEleventToThirteen) { 
      setShowElevenToThirteen(false)
      setShowSixToTen(true)
      setShowOneToFive(false)
    } else if(showSixToTen) { 
      setShowSixToTen(false)
      setShowElevenToThirteen(false)
      setShowOneToFive(true)
    }
    
  }



  return (
    <div className="join ">
      <img src={izquierda} className='h-8 w-8 mt-2 cursor pointer hover:bg-gray-300' onClick={() => onceAlDoce()}></img>

       {showOneToFive ? <> <button className="join-item btn 2xl:text-sm xxs:text-xs xxs:w-[20px]  hover:bg-gray-400"  onClick={() => actualizandoPagina(1)}>1</button>
        <button className="join-item btn 2xl:text-sm xxs:text-xs xxs:w-[20px]  hover:bg-gray-400"  onClick={() => actualizandoPagina(2)}>2</button>
        <button className="join-item btn 2xl:text-sm xxs:text-xs xxs:w-[20px]  hover:bg-gray-400"  onClick={() => actualizandoPagina(3)}>3</button>
        <button className="join-item btn 2xl:text-sm xxs:text-xs xxs:w-[20px]  hover:bg-gray-400"  onClick={() => actualizandoPagina(4)}>4</button>
        <button className="join-item btn 2xl:text-sm xxs:text-xs xxs:w-[20px]  hover:bg-gray-400"  onClick={() => actualizandoPagina(5)}>5</button> </> : null}

      {showSixToTen ? <>  <button className="join-item btn 2xl:text-sm xxs:text-xs xxs:w-[20px]"  onClick={() => actualizandoPagina(6)}>6</button>
        <button className="join-item btn 2xl:text-sm xxs:text-xs xxs:w-[20px]  hover:bg-gray-400"  onClick={() => actualizandoPagina(7)}>7</button>
        <button className="join-item btn 2xl:text-sm xxs:text-xs xxs:w-[20px]  hover:bg-gray-400"  onClick={() => actualizandoPagina(8)}>8</button>
        <button className="join-item btn 2xl:text-sm xxs:text-xs xxs:w-[20px]  hover:bg-gray-400"  onClick={() => actualizandoPagina(9)}>9</button>
        <button className="join-item btn 2xl:text-sm xxs:text-xs xxs:w-[20px]  hover:bg-gray-400"  onClick={() => actualizandoPagina(10)}>10</button>  </> : null}

      {showEleventToThirteen ?  <> <button className="join-item btn 2xl:text-sm xxs:text-xs xxs:w-[20px]  hover:bg-gray-400"  onClick={() => actualizandoPagina(11)}>11</button>
        <button className="join-item btn 2xl:text-sm xxs:text-xs xxs:w-[20px]  hover:bg-gray-400"  onClick={() => actualizandoPagina(12)}>12</button>
        <button className="join-item btn 2xl:text-sm xxs:text-xs xxs:w-[20px]  hover:bg-gray-400"  onClick={() => actualizandoPagina(13)}>13</button>  </>: null }

       <img src={derecha} className='h-8 w-8 mt-2 cursor pointer  hover:bg-gray-300' onClick={() => seisAlDiez()}></img>
</div>
  )
}

export default Paginacion