import React from 'react'
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
import OtherUsersProfile from './pages/OtherUsersProfile'
import Prueba from './components/Prueba'

function App() {
  

  return (
    <>
     
             <UserProvider>
                  <Navbar/>
                    <Routes>
                      <Route path="/" element={<Main/>}></Route> 
                      <Route path="/register" element={<Register/>}></Route> 
                      <Route path="/login" element={<SignIn/>}></Route> 
                      <Route path="/wall" element={<Wall/>}></Route> 
                      <Route path="/myPublications/:id" element={<MyPublications/>}></Route> 
                      <Route path="/publicationsSearched/:searchParam" element={<UserSearch/>}></Route> 
                      <Route path="/myProfile/:userId" element={<MyProfile/>}></Route> 
                      <Route path="/publication/:publicationId" element={<PublicationDetail/>}></Route> 
                      <Route path="/searchWithFilters" element={<SearchWithMultipleFilters/>}></Route> 
                      <Route path="/userProfile/:userId" element={<OtherUsersProfile/>}></Route> 
                       <Route path="/prueba" element={<Prueba/>}></Route> 
                    </Routes>

             </UserProvider>
            
        
    </>
  )
}

export default App
