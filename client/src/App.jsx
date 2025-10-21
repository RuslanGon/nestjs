import { Route, Routes } from 'react-router-dom'
import './App.css'

import LoginPage from './pages/LoginPage/LoginPage.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'

function App() {

  return (
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
  )
}

export default App
