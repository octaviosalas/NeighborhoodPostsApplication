import React from 'react'

const ImagesModalDetail = ({firstImage, secondImage, close}) => { 

  return (
    <div className=''> 
          <small className="cursor-pointer object-" onClick={()=>document.getElementById('my_modal_11').showModal()} >View Pictures</small>     
            <dialog id="my_modal_11" className="modal">
                <div className="modal-box">
                        <form method="dialog">
                        <button className="btn btn-sm border-none  absolute right-2 top-2">✕</button>
                        </form>
                        <div className="carousel w-full mt-6">
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

export default ImagesModalDetail
