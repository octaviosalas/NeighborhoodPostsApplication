import React from 'react'
import AnnouncementIcon from '@mui/icons-material/Announcement';

const OpinionsAndResolveMobile = () => {

  const goTop = () => { 
    window.scrollTo({
        top: 0,
        behavior: "smooth", // Para un desplazamiento suave
      });
  }

  return (
    <div className='flex max-w-fit-contain h-40 border rounded-lg border-slate-300 shadow-xl'>
      <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">

                    <div className='flex flex-col items-center justify-center w-full'>
                          <div className='flex items-center justify-center'>
                            <small className='font-bold text-sm'>Resolved Complains</small>
                          </div>
                          <div className='flex items-center justify-center'>
                             <div className='flex  mt-4'>
                                    <div className='ml-2'>
                                        <img src="https://modaellos.com/wp-content/uploads/2017/11/cortes-tipo-rostro-ovalado-istock.jpg" className='h-8 w-8 rounded-full'/>
                                    </div>
                                    <div className='flex flex-col items-start justify-center mt-2 ml-4'>
                                        <small className='text-md font-bold'>Darwin Roxel Publication's</small>
                                        <small className='font-bold text-sm  mt-2'>Streets in bad state</small>
                                        <small className='text-sm text-gray-500 underline cursor-pointer'>View Publication</small>
                                    </div>
                              </div>
                          </div>
                    </div>
                    
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide4" className="btn w-4 h-2 btn-circle" onClick={() => goTop()}>❮</a> 
                            <a href="#slide2" className="btn w-4 h-2 btn-circle" onClick={() => goTop()}>❯</a>
                        </div>
                </div> 

                <div id="slide2" className="carousel-item relative w-full">
                        <div className='flex flex-col items-center justify-center w-full'>
                                <div className='flex items-center justify-center'>
                                    <small className='font-bold text-sm'>Resolved Complains</small>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <div className='flex  mt-4'>
                                            <div className='ml-2'>
                                                <img src="https://modaellos.com/wp-content/uploads/2017/11/cortes-tipo-rostro-ovalado-istock.jpg" className='h-8 w-8 rounded-full'/>
                                            </div>
                                            <div className='flex flex-col items-start justify-center mt-2 ml-4'>
                                                <small className='text-md font-bold'>Darwin Roxel Publication's</small>
                                                <small className='font-bold text-sm  mt-2'>Streets in bad state</small>
                                                <small className='text-sm text-gray-500 underline cursor-pointer'>View Publication</small>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href="#slide1" className="btn w-4 h-2 btn-circle" onClick={() => goTop()}>❮</a> 
                            <a href="#slide3" className="btn w-4 h-2 btn-circle" onClick={() => goTop()}>❯</a>
                        </div>
                </div>     
      </div>
    </div>
  )
}

export default OpinionsAndResolveMobile

