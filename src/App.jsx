
import './App.css'
import NavBar from './components/navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashbaord'
import CheckEmail from './pages/CheckEmail'
import { ToastContainer } from 'react-toastify'
import VerifyEmail from './pages/VerifyEmail'
import AboutPage from './pages/About'
import Blog from './pages/Blog'



function App() {


  return (
    <>
      <NavBar />
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
