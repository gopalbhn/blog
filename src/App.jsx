
import './App.css'
import NavBar from './components/navbar'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
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
import { useEffect } from 'react'
import { postStore } from './store/postStore'
import useUserStore from './store/userStore'
import Profile from './pages/Profile'



function App() {

  return <Init />
}

const Init = () => {
  const location = useLocation()
  const setUser = useUserStore(state => state.setUser)
  const setPost = postStore(state => state.setPost)
  const user = useUserStore(state => state.user);
  const userRole = user?.role;
  const userEmail = user?.email
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/user/me`,
          {
            method: "GET",
            credentials: 'include'
          }
        )
        const data = await res.json()


        if (data.user) {

          setUser(data.user)
        } else {
          setUser(null)
        }

      } catch (err) {
        setUser(null)
      }
    }

    fetchUser();
  }, [])

  useEffect(() => {
    async function getAllPost() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/post`)
        const data = await res.json()
        if (data.success) {
          setPost(data.post)
        } else {
          setPost([])
        }

      } catch (err) {
        setPost([])

      }
    }
    getAllPost();
  }, [])



  return (
    <>
      {
        userRole !== "Author" && userRole !== "Admin" && <NavBar />
      }
      <Routes>

        <Route path="/" element={
          userRole == "Author" ? <AuthorDashboard /> :
            userRole == "Admin" ? <AdminDashboard /> :
              <Dashboard />
        } />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogReading />} />
        <Route path="/profile" element={<Profile />} />

        {userRole == "Author" && (
          <>
            <Route path='/author/post' element={<Post />} />
            <Route path='/author/comments' element={<Comment />} />
            <Route path="/author/create-post" element={<CreatePost />} />
            <Route path="/author/edit-post/:id" element={<EditPost />} />
          </>
        )}

        {userRole == "Admin" && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/post" element={<AllPost />} />
            <Route path="/admin/users" element={<AllUser />} />
          </>
        )}
      </Routes>

      <ToastContainer />
    </>
  )

}



export default App
