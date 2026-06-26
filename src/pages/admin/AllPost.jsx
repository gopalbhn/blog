import AdminSideBar from '@/components/admin/AdminSideBar'
import UnifiedTable from '@/components/table';
import Button from '@/components/ui/button';
import { postStore } from '@/store/postStore';

import { Eye, Menu, MoreVertical, Pen, Plus, Trash, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllPost = () => {
  const [open, setOpen] = useState(true);
  const [blogOpenMenu, setBlogOpenMenu] = useState(true)
  const [blogs,setBlogs] = useState([])
  const navigate = useNavigate()


  function giveSuggestion(id) {
    navigate(`/admin/suggestion/`)
  }

    useEffect(() => {
      async function fetchAllPost() {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/all-post`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        })
        const data = await res.json();
        if (data.success) {
          setBlogs(data.post)
        }
      }
      fetchAllPost()
    }, [])
  

  async function handlePostRemove(id) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/delete-post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
      toast.success(data.message)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
    else {
      toast.error(data.message)
    }
  }
  async function handlePublish(id) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/publish-post/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data = await res.json();
    if (data.success) {
      toast.success(data.message)
      setTimeout(() => {
        window.location.reload();
      }, 500)
    }
  }
  
  return (
    <div className='h-full w-full relative'>
      <AdminSideBar open={open} />
      <section
        className={`h-full    transition-all duration-300 ${open ? "ml-64 px-4 pt-4" : "ml-0 px-10 pt-4"}`}
      >
        <div className="w-full flex justify-between ">
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setOpen(!open)}
            >
              <Menu />
            </button>
            <h1 className="text-title font-bold">All Posts</h1>
          </div>

        </div>
        <UnifiedTable
          type="post"
          variant="admin"
          data={blogs}
        />
      </section>
    </div>
  )
}

export default AllPost