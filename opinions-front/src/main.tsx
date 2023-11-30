import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import App from './App.tsx'
import Home from './pages/Home.tsx'
import Search from './pages/Search.tsx'
import Movie from './pages/Movie.tsx';
import TvSerie from './pages/TvSerie.tsx';
import Login from './pages/Signin.tsx';
import Register from './pages/Signup.js';
import Profile from './pages/Profile.tsx';

import { AuthProvider } from './contexts/Auth/AuthProvider.tsx';
import { RequireAuth } from './contexts/Auth/RequireAuth.tsx';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<Home />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/movie/:id' element={<RequireAuth><Movie /></RequireAuth>} />
            <Route path='/profile' element={<RequireAuth><Profile/></RequireAuth>} />
            <Route path='/tv/:id' element={<TvSerie />} />
            <Route path='search' element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>  
    </AuthProvider>
  </React.StrictMode>,
)
