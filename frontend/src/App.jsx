import React from 'react';
import Login from './pages/login/Login';
import Singup from './pages/signup/Signup';
import Home from './pages/home/Home'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import Landing from './pages/Landing';
import Profile from './pages/Profile';

const App = () => {

  const { authUser, setAuthUser } = useAuthContext();
  return (
    <div className="app">
      {/* <Login />
      <Singup /> */}
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Landing />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Singup />} />
        <Route path="/home" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App