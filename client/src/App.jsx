import { Route, Routes } from 'react-router-dom'
import './App.css'

import LoginPage from './pages/LoginPage/LoginPage.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx'
import MainPage from './pages/MainPage/MainPage.jsx'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMe } from './features/users/usersSlice.js'

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe()); 
  }, [dispatch]);

  return (
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/main" element={<MainPage />} />

  </Routes>
  )
}

export default App
