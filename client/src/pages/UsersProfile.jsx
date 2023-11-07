import React from 'react';
import { useContext } from "react";
import { UserContext } from "../store/usercontext";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useGetBackendQueries from '../Hooks/useGetBackendQueries';
import LoadingPublications from '../Hooks/LoadingPublications';

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBBreadcrumb, MDBBreadcrumbItem, MDBProgress, MDBProgressBar, MDBIcon,
 MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

export default function UsersProfile() {

  const userCtx = useContext(UserContext)

  const [publicationsNumber, setPublicationsNumber] = useState(0)
  const [favoritesNumber, setFavoritesNumber] = useState(0)
  const [noPublications, setNoPublications] = useState(false)
  const [noFavorites, setNoFavorites] = useState(false)
  const [userPublications, setUserPublications] = useState([])
  const [userFavorites, setUserFavorites] = useState([])
  const [userName, setUserName] = useState(null)
  const [userBirthdate, setUserBirthdate] = useState("")
  const [userLocation, setUserLocation] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [load, setLoad] = useState(false)


  const {userId} = useParams()

  const { data, loading } = useGetBackendQueries(`getUserPublication/${userId}`); 
  const { data: userData } = useGetBackendQueries(`getUserData/${userId}`); 
  const { data: userFavs } = useGetBackendQueries(`getMyFavs/${userId}`);

  useEffect(() => { 
    setPublicationsNumber(data.length)
    setFavoritesNumber(userFavs.length)
    setUserPublications(data)
    setUserFavorites(userFavs)
    setProfileImage(userData.map((u) => u.profileImage))
    setUserLocation(userData.map((u) => u.location))
    setUserName(userData.map((d) => d.name))
    setUserBirthdate(userData.map((d) => d.birthdate))
    setUserEmail(userData.map((d) => d.email))
    console.log(data)
    console.log(userFavs)
    console.log(userId)
    setTimeout(() => { 
      setLoad(true)
    }, 2000)
  }, [data])

  
  return (
    <section className='g-gray-200 mt-12'>
     {load ? <MDBContainer className="">
        <MDBRow>
          <MDBCol className=''>
       
     <div className='flex flex-col xl:flex-row'>
                        <div className='flex flex-col h-80 mt-8  bg-gray-200 rounded-xl m-2 items-center justify-center w-72 sm:w-80  md:w-[600px] xl:w-full'>
                          <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                              <div className='flex flex-col items-center justify-center'>
                                <MDBCardImage  src={profileImage}  alt="avatar"  className="rounded-full w-20 h-20 xl:w-36 xl:h-36 mt-6" fluid />
                                <p className="text-muted mb-1 font-bold mt-4 text-black">{userName}</p>
                                <p className="text-muted mb-4  text-black">{userLocation}</p>
                                <p className='text-sm underline cursor-pointer  text-black'> Opinions about {userLocation}</p>
                              </div>
                            </MDBCardBody>
                          </MDBCard>
                        </div>                          
          
           <div className="flex flex-col">
               <div>
                   <div className='bg-gray-200 rounded-xl m-2 mt-8 w-72 sm:w-80 md:w-[600px] xl:w-full'>
                              <MDBCard className="mb-4">
                                <MDBCardBody>
                                  <MDBRow className='flex flex-col md:flex-row gap-0  md:gap-28'>
                                    <MDBCol sm="3">
                                      <MDBCardText className='font-bold  text-black'>Full Name:</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                      <MDBCardText className="text-muted  text-black">{userName}</MDBCardText>
                                    </MDBCol>
                                  </MDBRow>
                                  <hr style={{borderColor: "white"}}/>
                                  <MDBRow className='flex flex-col md:flex-row gap-0  md:gap-28'>
                                    <MDBCol sm="3">
                                      <MDBCardText className='font-bold  text-black'>Email:</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                      <MDBCardText className="text-muted  text-black">{userEmail}</MDBCardText>
                                    </MDBCol>
                                  </MDBRow>
                                  <hr style={{borderColor: "white"}}/>
                                  <MDBRow className='flex flex-col md:flex-row gap-0  md:gap-28'>
                                    <MDBCol sm="3">
                                      <MDBCardText className='font-bold  text-black'>Phone:</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                      <MDBCardText className="text-muted  text-black">(097) 234-5678</MDBCardText>
                                    </MDBCol>
                                  </MDBRow>
                                  <hr style={{borderColor: "white"}}/>
                                  <MDBRow className='flex flex-col md:flex-row gap-0  md:gap-28'>
                                    <MDBCol sm="3">
                                      <MDBCardText className='font-bold  text-black'>BirthDate:</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                      <MDBCardText className="text-muted  text-black">{userBirthdate}</MDBCardText>
                                    </MDBCol>
                                  </MDBRow>
                                  <hr style={{borderColor: "white"}}/>
                                  <MDBRow className='flex flex-col md:flex-row gap-0  md:gap-28'>
                                    <MDBCol sm="3">
                                      <MDBCardText className='font-bold  text-black'>Address:</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                      <MDBCardText className="text-muted  text-black">{userLocation}</MDBCardText>
                                    </MDBCol>
                                  </MDBRow>
                                </MDBCardBody>
                              </MDBCard>
                          </div>
               </div>
               <div className="flex flex-col xl:flex-row">
                    <div className='rounded-xl bg-gray-200 m-2 w-72 sm:w-80 md:w-[600px] xl:w-full'>
                                  <MDBCol md="6">
                                          <MDBCard className="mb-4 mb-md-0">
                                            <MDBCardBody>
                                              <MDBCardText className="mb-4 text-md font-bold  text-black">{userCtx.userName} Publications ({publicationsNumber}) </MDBCardText>
                                                <div className='overflow-y-auto max-h-[400px] max-w-[400px]'>
                                                
                                            {publicationsNumber !== 0 ? (
                                                     <div>
                                                      {userPublications.map((p, index) => (
                                                        <div key={p.id} className='border grid col-span-1 m-2 items-center bg-white rounded-xl max-w-fit-contain w-72'>
                                                          <div className='flex max-w-fit-contain'>
                                                            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start" style={{ flex: 1 }}>
                                                              <img src={p.creatorProfileImage} className='h-12 w-12 rounded-full ml-2 mt-4' />
                                                              <small className='text-black text-xs ml-2 mt-0 md:mt-2'><b>{p.creatorName}</b></small>
                                                            </div>
                                                          </div>
                                                          <div className='mt-4 max-w-fit-contain'>
                                                            <div className="grid col-span-1 max-w-fit-contain ml-4">
                                                              <p className="font-bold text-sm text-black">{p.publicationTitle}</p>
                                                              <p className="justify-center text-xs mr-4 mt-2  text-black">{p.publicationDescription}</p>
                                                              <div className="mt-4 whitespace-no-wrap">
                                                                <p className="text-xs mr-4 whitespace-no-wrap  text-black">{p.creatorLocation}, {p.address}</p>
                                                              </div>
                                                              <div className='flex items-center justify-center gap-2 m-2'>
                                                                <img src={p.publicationImages[0]} className='h-16 w-16 rounded-lg'/>
                                                                <img src={p.publicationImages[0]} className='h-16 w-16 rounded-lg'/>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      ))}
                                                    </div>
                                                  ) : <p className=' text-black'>{userName} dosent have favorites</p>}
                                             
                                                </div>
                                            </MDBCardBody>
                                          </MDBCard>
                                        </MDBCol>
                                  </div>
                                   <div className='rounded-xl bg-gray-200 m-2 w-72 sm:w-80 md:w-[600px] xl:w-full'>
                                    <MDBCol md="6">
                                        <MDBCard className="mb-4 mb-md-0">
                                          <MDBCardBody>
                                            <MDBCardText className="mb-4 text-lg font-bold">Posts he liked. ({favoritesNumber})</MDBCardText>
                                            <div className='overflow-y-auto max-h-[400px] max-w-[400px]'>
                                            {favoritesNumber !== 0 ? (
                                                    <div>
                                                      {userFavorites.map((p, index) => (
                                                        <div key={p.id} className='border grid col-span-1 m-2 items-center bg-white rounded-xl max-w-fit-contain w-72'>
                                                          <div className='flex max-w-fit-contain'>
                                                            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start" style={{ flex: 1 }}>
                                                              <img src={p.creatorProfileImage} className='h-12 w-12 rounded-full ml-2 mt-4' />
                                                              <small className='text-black text-xs ml-2 mt-0 md:mt-2'><b>{p.creatorName}</b></small>
                                                            </div>
                                                          </div>
                                                          <div className='mt-4 max-w-fit-contain'>
                                                            <div className="grid col-span-1 max-w-fit-contain ml-4">
                                                              <p className="font-bold text-sm text-black">{p.publicationTitle}</p>
                                                              <p className="justify-center text-xs mr-4 mt-2 text-black">{p.publicationDescription}</p>
                                                              <div className="mt-4 whitespace-no-wrap">
                                                                <p className="text-xs mr-4 whitespace-no-wrap text-black">{p.creatorLocation}, {p.address}</p>
                                                              </div>
                                                              <div className='flex items-center justify-center gap-2 m-2'>
                                                                <img src={p.publicationImages[0]} className='h-16 w-16 rounded-lg'/>
                                                                <img src={p.publicationImages[0]} className='h-16 w-16 rounded-lg'/>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      ))}
                                                    </div>
                                                  ) : <p className='text-black'>{userName} dosent have favorites</p>}
                                                </div>
                                          </MDBCardBody>
                                        </MDBCard>
                                      </MDBCol>
                                 </div>  
               </div>
           </div>
    </div>                     
          </MDBCol>     
        </MDBRow>
      </MDBContainer> : <LoadingPublications text={"user data"}/>}
    </section>
  )}



     /*

     
  /*
  import React from 'react';
  import { useContext } from "react";
  import { UserContext } from "../store/usercontext";
  import axios from 'axios';
  import { useState, useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  import useGetBackendQueries from '../Hooks/useGetBackendQueries';
  import LoadingPublications from '../Hooks/LoadingPublications';
  
  import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBBreadcrumb, MDBBreadcrumbItem, MDBProgress, MDBProgressBar, MDBIcon,
   MDBListGroup,
    MDBListGroupItem
  } from 'mdb-react-ui-kit';
  
  export default function ProfilePage() {
  
    const userCtx = useContext(UserContext)
  
    const [publicationsNumber, setPublicationsNumber] = useState(0)
    const [favoritesNumber, setFavoritesNumber] = useState(0)
    const [noPublications, setNoPublications] = useState(false)
    const [noFavorites, setNoFavorites] = useState(false)
    const [userPublications, setUserPublications] = useState([])
    const [userFavorites, setUserFavorites] = useState([])
    const [userName, setUserName] = useState(null)
    const [userBirthdate, setUserBirthdate] = useState("")
    const [userLocation, setUserLocation] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [profileImage, setProfileImage] = useState("")
  
  
    const {userId} = useParams()
  
    const { data, loading } = useGetBackendQueries(`getUserPublication/${userId}`); 
    const { data: userData } = useGetBackendQueries(`getUserData/${userId}`); 
    const { data: userFavs } = useGetBackendQueries(`getMyFavs/${userId}`);
  
    useEffect(() => { 
      setPublicationsNumber(data.length)
      setFavoritesNumber(userFavs.length)
      setUserPublications(data)
      setUserFavorites(userFavs)
      setProfileImage(userData.map((u) => u.profileImage))
      setUserLocation(userData.map((u) => u.location))
      setUserName(userData.map((d) => d.name))
      setUserBirthdate(userData.map((d) => d.birthdate))
      setUserEmail(userData.map((d) => d.email))
      console.log(data)
      console.log(userFavs)
      console.log(userId)
    }, [data])
  
    
    return (
      <section className='bg-gray-200 mt-12'>
        <MDBContainer className="">
          <MDBRow>
            <MDBCol className=''>
            <div className="flex">
               <div className="">
                    <div className='flex'>
                          <div className='flex flex-col h-72 mt-8  bg-white rounded-xl m-2  items-center justify-center'>
                            <MDBCard className="mb-4">
                              <MDBCardBody className="text-center">
                                <div className='flex flex-col items-center justify-center'>
                                  <MDBCardImage  src={userCtx.userProfileImage}  alt="avatar"  className="rounded-full w-36 h-36 mt-6" fluid />
                                  <p className="text-muted mb-1 font-bold mt-4">{userCtx.userName}</p>
                                  <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                                
                                </div>
                            
                              </MDBCardBody>
                            </MDBCard>
                          </div>                          
                      </div>
          </div>
          <div className="flex flex-col">
                 <div>
                     <div className='bg-white rounded-xl m-2 mt-8'>
                                <MDBCard className="mb-4">
                                  <MDBCardBody>
                                    <MDBRow className='flex gap-28'>
                                      <MDBCol sm="3">
                                        <MDBCardText className='font-bold'>Full Name:</MDBCardText>
                                      </MDBCol>
                                      <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{userCtx.userName}</MDBCardText>
                                      </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow className='flex gap-28'>
                                      <MDBCol sm="3">
                                        <MDBCardText className='font-bold'>Email:</MDBCardText>
                                      </MDBCol>
                                      <MDBCol sm="9">
                                        <MDBCardText className="text-muted">example@example.com</MDBCardText>
                                      </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow className='flex gap-28'>
                                      <MDBCol sm="3">
                                        <MDBCardText className='font-bold'>Phone:</MDBCardText>
                                      </MDBCol>
                                      <MDBCol sm="9">
                                        <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                                      </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow className='flex gap-28'>
                                      <MDBCol sm="3">
                                        <MDBCardText className='font-bold'>Mobile:</MDBCardText>
                                      </MDBCol>
                                      <MDBCol sm="9">
                                        <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                                      </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow className='flex gap-28'>
                                      <MDBCol sm="3">
                                        <MDBCardText className='font-bold'>Address:</MDBCardText>
                                      </MDBCol>
                                      <MDBCol sm="9">
                                        <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                                      </MDBCol>
                                    </MDBRow>
                                  </MDBCardBody>
                                </MDBCard>
                            </div>
                 </div>
                 <div className="flex">
                      <div className='rounded-xl bg-white m-2'>
                                    <MDBCol md="6">
                                            <MDBCard className="mb-4 mb-md-0">
                                              <MDBCardBody>
                                                <MDBCardText className="mb-4 text-md font-bold">{userCtx.userName} Publications ({publicationsNumber}) </MDBCardText>
                                                  <div className='overflow-y-auto max-h-[400px] max-w-[300px]'>
                                                     {userPublications.map((p, index) => ( 
                                                       <div key={p.id} className='border grid col-span-1 m-2 items-center bg-white'>
                      
                                                       <div className='flex max-w-fit-contain'>
                                                           <div className="flex flex-col md:flex-row items-center justify-center  md:justify-start " style={{ flex: 1 }}>
                                                               <img src={p.creatorProfileImage} className='h-12 w-12 rounded-full ml-2 mt-4' />
                                                               <small className='text-black text-xs ml-2 mt-0 md:mt-2'><b>{p.creatorName}</b></small>
                                                           </div>
                                   
                                                    </div>
                                   
                                                       <div className='mt-4 max-w-fit-contain'>
                                                         <div className="grid col-span-1 max-w-fit-contain ml-4">
                                                                   <p className="font-bold text-sm text-black"> {p.publicationTitle}</p>
                                                                   <p className="justify-center text-xs mr-4 mt-2">{p.publicationDescription} </p>
                                                               <div className="mt-4 whitespace-no-wrap">
                                                                   <p className="text-xs mr-4  whitespace-no-wrap">  {p.creatorLocation}, {p.address} </p>
                                                               </div>
                                                               <div className='flex items-center justify-center gap-2 m-2'>
                                                                    <img src={p.publicationImages[0]} className='h-16 w-16 rounded-lg'/>
                                                                    <img src={p.publicationImages[0]} className='h-16 w-16 rounded-lg'/>
                                                               </div>                                                        
                                                         </div>
                                                       </div>
                                                   </div>
                                                     ))}
                                                  </div>
                                              </MDBCardBody>
                                            </MDBCard>
                                          </MDBCol>
                                    </div>
                                     <div className='rounded-xl bg-white m-2'>
                                      <MDBCol md="6">
                                          <MDBCard className="mb-4 mb-md-0">
                                            <MDBCardBody>
                                              <MDBCardText className="mb-4 text-lg font-bold">Posts he liked. ({favoritesNumber})</MDBCardText>
                                              <div className='overflow-y-auto max-h-[400px] max-w-[300px]'>
                                                     {userFavorites.map((p, index) => ( 
                                                       <div key={p.id} className='border grid col-span-1 m-2 items-center bg-white'>
                      
                                                       <div className='flex max-w-fit-contain'>
                                                           <div className="flex flex-col md:flex-row items-center justify-center  md:justify-start " style={{ flex: 1 }}>
                                                               <img src={p.creatorProfileImage} className='h-12 w-12 rounded-full ml-2 mt-4' />
                                                               <small className='text-black text-xs ml-2 mt-0 md:mt-2'><b>{p.creatorName}</b></small>
                                                           </div>
                                   
                                                    </div>
                                   
                                                       <div className='mt-4 max-w-fit-contain'>
                                                         <div className="grid col-span-1 max-w-fit-contain ml-4">
                                                                   <p className="font-bold text-sm text-black"> {p.publicationTitle}</p>
                                                                   <p className="justify-center text-xs mr-4 mt-2">{p.publicationDescription} </p>
                                                               <div className="mt-4 whitespace-no-wrap">
                                                                   <p className="text-xs mr-4  whitespace-no-wrap">  {p.creatorLocation}, {p.address} </p>
                                                               </div>
                                                               <div className='flex items-center justify-center gap-2 m-2'>
                                                                    <img src={p.publicationImages[0]} className='h-16 w-16 rounded-lg'/>
                                                                    <img src={p.publicationImages[0]} className='h-16 w-16 rounded-lg'/>
                                                               </div>                                                        
                                                         </div>
                                                       </div>
                                                   </div>
                                                     ))}
                                                  </div>
                                            </MDBCardBody>
                                          </MDBCard>
                                        </MDBCol>
                                   </div>  
                 </div>
          </div>
      </div>
  
               
             
  
             
            </MDBCol>
         
          </MDBRow>
        </MDBContainer>
      </section>
    )};
  

 */