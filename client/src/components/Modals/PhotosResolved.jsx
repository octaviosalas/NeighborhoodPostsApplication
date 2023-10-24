import React from 'react'

const PhotosResolved = ({firstImage, secondImage, close}) => { 
  console.log(firstImage, secondImage)
  return (
    <div className=''> 
          <small className="text-gray-500 text-xs underline cursor-pointer"  onClick={()=>document.getElementById('my_modal_7').showModal()}>View Photos</small>      
            <dialog id="my_modal_7" className="modal">
                <div className="modal-box">
                        <form method="dialog">
                          <small className="text-sm text-gray-500 cursor-pointer absolute right-2 top-2"onClick={()=>document.getElementById('my_modal_7').close()}>✕</small>
                        </form>
                        <div className='flex items-center justify-center'>
                            <small className='font-bold text-black text-sm'>Images of the resolved claim</small>
                        </div>
                        <div className="carousel w-full mt-2">
                              <div id="slide1" className="carousel-item relative w-full">
                                <img src={firstImage} className="w-full" />
                                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                  <a href="#slide4" className="btn btn-circle">❮</a> 
                                  <a href="#slide2" className="btn btn-circle">❯</a>
                                </div>
                              </div> 
                              <div id="slide2" className="carousel-item relative w-full mt-2">
                                <img src={secondImage} className="w-full" />
                                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                  <a href="#slide1" className="btn btn-circle">❮</a> 
                                  <a href="#slide3" className="btn btn-circle">❯</a>
                                </div>
                              </div>          
                         </div>
                </div>
            </dialog>
    </div>
  )
}

export default PhotosResolved
