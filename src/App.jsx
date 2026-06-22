
import './App.css'
import NavBar from './components/navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashbaord'
import CheckEmail from './pages/CheckEmail'
import { ToastContainer } from 'react-toastify'
import VerifyEmail from './pages/VerifyEmail'
import AboutPage from './pages/About'
import Blog from './pages/Blog'
import BlogReading from './pages/BlogReading'
import AuthorDashboard from './pages/author/AuthorDashboard'
import Post from './pages/author/Post'
import Comment from './pages/author/Comments'
import CreatePost from './pages/author/CreatePost'
import EditPost from './pages/author/EditPost'
import AdminDashboard from './pages/admin/AdminDashboard'
import AllPost from './pages/admin/AllPost'
import AllUser from './pages/admin/AllUsers'



function App() {
  const location = useLocation()
  const authorPath = location.pathname.startsWith("/author")
  const adminPath = location.pathname.startsWith('/admin')
  return (
    <>
      {!authorPath  && !adminPath  && <NavBar />}
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogReading />} />
        <Route path='/author' element={<AuthorDashboard />} />
        <Route path='/author/post' element={<Post />} />
        <Route path='/author/comments' element={<Comment />} />
        <Route path="/author/create-post" element={<CreatePost />} />
        <Route path="/author/edit-post/:id" element={<EditPost />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/post" element={<AllPost />} />
        <Route path="/admin/users" element={<AllUser />} />

      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
