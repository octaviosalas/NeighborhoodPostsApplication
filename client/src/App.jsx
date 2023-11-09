import React, { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {Routes, Route} from "react-router-dom"
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Main from './pages/Main'
import Wall from './pages/Wall'
import MyPublications from './pages/MyPublications'
import { UserProvider } from './store/usercontext'
import UserSearch from './pages/UserSearch'
import MyProfile from './pages/MyProfile'
import PublicationDetail from './components/PublicationDetail'
import SearchWithMultipleFilters from './pages/SearchWithMultipleFilters'
import Prueba from './components/Prueba'
import UserManualSearch from './pages/UserManualSearch'
import ProfileDos from './components/MyProfile/ProfileDos'
import PublicationDetailDos from './components/PublicationDetail/PublicationDetailDos'
import Footer from './components/Footer'
import SuccesStories from './pages/SuccesStories'
import Survey from './pages/Survey'
import { useState } from 'react'
import UsersProfile from './pages/UsersProfile'
import PruebaDeDetalle from './pages/PruebaDeDetalle'

function App() {
  
  return (
    <div >
             <UserProvider>
                  <Navbar />
                    <Routes>
                      <Route path="/" element={<Main/>}></Route> 
                      <Route path="/register" element={<Register/>}></Route> 
                      <Route path="/login" element={<SignIn/>}></Route> 
                      <Route path="/wall" element={<Wall/>}></Route> 
                      <Route path="/myPublications/:id" element={<MyPublications/>}></Route> 
                      <Route path="/publicationsSearched/:searchParam" element={<UserSearch/>}></Route> 
                      <Route path="/myProfile/:userId" element={<MyProfile/>}></Route> 
                      <Route path="/publication/:publicationId" element={<PublicationDetailDos/>}></Route> 
                      <Route path="/searchWithFilters" element={<SearchWithMultipleFilters/>}></Route> 
                      <Route path="/userManualSearch/:category" element={<UserManualSearch/>}></Route> 
                      <Route path="/prueba" element={<ProfileDos/>}></Route> 
                      <Route path="/succesStories" element={<SuccesStories/>}></Route> 
                      <Route path="/survey" element={<Survey/>}></Route> 
                      <Route path="/userProfile/:userId" element={<UsersProfile/>}></Route> 
                      <Route path="/pruebaDetalle/:publicationId" element={<PruebaDeDetalle/>}></Route> 

                    </Routes>
             </UserProvider>     
    </div>
  )
}

export default App

