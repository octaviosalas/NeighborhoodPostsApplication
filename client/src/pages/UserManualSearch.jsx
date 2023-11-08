import React from 'react'
import WallFilters from '../components/WallFilters'
import New from '../components/New'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import PublicationsCard from '../components/Cards/PublicationsCard'
import LoadingPublications from '../Hooks/LoadingPublications'
import { useParams } from 'react-router-dom'
import ResolvedComplainsWall from '../components/Wall/ResolvedComplainsWall'
import LeaveYourOpinionWall from '../components/Wall/LeaveYourOpinionWall'


const UserManualSearch = () => {

    const [load, setLoad] = useState(true)
    const [results, setResults] = useState([])
     const params = useParams()
     console.log(params)

    useEffect(() => {
        axios.get(`https://app-citizens.onrender.com/getPublicationsWithParams/${params.category}`)
             .then((res) => { 
             console.log(res.data)
             setResults(res.data)
          })
        .catch((err) => { 
          console.log(err)
        }) 
        setTimeout(() => { 
            setLoad(false)
        }, 1500)
     }, [])

  return (
    <div className="">
      <div className="flex flex-col justify-center mb-2">
        {load ? (
          <LoadingPublications text={"Publications"} />
        ) : (
          <div className="flex flex-wrap gap-4 items-center place-content-around">
            <div className="flex flex-col fixed 3xl:left-80 2xl:left-48 xl:left-20 lg:left-6 invisible lg:visible ">
              <WallFilters />
            </div>

            <div>

              <div className="mt-6 lg:mt-20 ml-auto flex justify-center">
                <div className=" justify-center items-center h-screen">
                  <p className='font-bold mt-12 lg:mt-0'> You applied the filter <b className='underline'>{params.category}</b></p>
                  {results.map((p) => <PublicationsCard pub={p}/>)}
                </div>

                <div className="fixed flex flex-col 3xl:right-52 2xl:right-44 xl:right-12 lg:right-7 invisible lg:visible overflow-y-auto overflow-x-hidden max-h-[500px] 2xl:overflow-hidden 2xl:max-h-[none]">
                  <ResolvedComplainsWall />
                  <div className="mt-6">
                    <LeaveYourOpinionWall style={{ marginTop: "10px" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserManualSearch

/*  <div>
       <div className='aling justify-center mb-2'>
          { load ? 
              <LoadingPublications text={"Publications"}/>
                      :
                  <div className='flex flex-wrap gap-4 items-center place-content-around'>
                      <div className='flex fixed 2xl:left-72 xl:left-20 lg:left-6 invisible  lg:visible '> 
                         <WallFilters/>
                      </div>
                  <div >
                        
                  <div className='mt-24 ml-auto flex'>                        
                  <div className=' justify-center items-center h-screen'>
                        {results.map((p) => <PublicationsCard pub={p}/>)}
                      </div>
                  </div>       

                   
                </div>
             </div>
             }
        </div>
    </div>*/



/* <div className="">
      <div className="flex flex-col justify-center mb-2">
        {load ? (
          <LoadingPublications text={"Publications"} />
        ) : (
          <div className="flex flex-wrap gap-4 items-center place-content-around">
            <div className="flex flex-col fixed 3xl:left-80 2xl:left-48 xl:left-20 lg:left-6 invisible lg:visible ">
              <WallFilters />
            </div>

            <div>
              <div className="flex flex-col items-center justify-center visible lg:hidden  mt-12">
                <OpinionsAndResolveMobile />
                <FiltersModal />
              </div>

              <div className="mt-6 lg:mt-20 ml-auto flex justify-center">
                <div className=" justify-center items-center h-screen">
                  {firstFivePublications
                    ? firstFive.map((p) => <PublicationsCard pub={p} />)
                    : null}
                  {secondFivePublications
                    ? secondFive.map((p) => <PublicationsCard pub={p} />)
                    : null}
                     {thirdFivePublications
                    ? thirdFive.map((p) => <PublicationsCard pub={p} />)
                    : null}
                  <div className="mb-6">
                    <Paginacion
                      showFirst={showFirstFivePublications}
                      showSecond={showSecondFivePublications}
                      showThird={showThirdFivePublications}
                    />
                  </div>
                </div>

                <div className="fixed flex flex-col 3xl:right-52 2xl:right-44 xl:right-12 lg:right-7 invisible lg:visible overflow-y-auto overflow-x-hidden max-h-[500px] 2xl:overflow-hidden 2xl:max-h-[none]">
                  <ResolvedComplainsWall />
                  <div className="mt-6">
                    <LeaveYourOpinionWall style={{ marginTop: "10px" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>*/