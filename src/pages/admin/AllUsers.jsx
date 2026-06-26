import AdminSideBar from '@/components/admin/AdminSideBar'
import UnifiedTable from '@/components/table';
import Button from '@/components/ui/button';
import { Menu, MoreVertical, Pen, Plus, Trash, User, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllUser = () => {
  const [open, setOpen] = useState(true);
  const [userOpenMenu, setUserOpenMenu] = useState(null)
  const navigate = useNavigate()
  const [allUser, setAllUser] = useState([]);
  const users = [
    { id: 1, name: "Gopal Bhandari", email: "gopal.bhandari@example.com", role: "Reader" },
    { id: 2, name: "Ramesh Adhikari", email: "ramesh.adhikari@example.com", role: "Reader" },
    { id: 3, name: "Suresh Khatri", email: "suresh.khatri@example.com", role: "Reader" },
    { id: 4, name: "Bikram Thapa", email: "bikram.thapa@example.com", role: "Reader" },
    { id: 5, name: "Anil Sharma", email: "anil.sharma@example.com", role: "Author" },
    { id: 6, name: "Prakash Yadav", email: "prakash.yadav@example.com", role: "Reader" },
    { id: 7, name: "Dipak Rai", email: "dipak.rai@example.com", role: "Reader" },
    { id: 8, name: "Nabin Koirala", email: "nabin.koirala@example.com", role: "Reader" },
    { id: 9, name: "Hari Bhattarai", email: "hari.bhattarai@example.com", role: "Reader" },
    { id: 10, name: "Sanjay Gurung", email: "sanjay.gurung@example.com", role: "Author" }
  ];
  useEffect(() => {
    async function fetchAllUser() {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/all-users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json();
      if (data.success) {
        setAllUser(data.users)
      }
    }
    fetchAllUser()
  }, [])

  async function handleRemove(id) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/delete-user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data = await res.json();
    if (data.success) {
      toast.success(data.message)
      setTimeout(() => {
        window.location.href = "/admin/users"
      }, 1000)
    } else {
      toast.error(data.message)
    }
  }

  async function promoteUser(id) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/promote-user/${id}`, {
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
        window.location.href = "/admin/users"
      }, 500)
    } else {
      toast.error(data.message)
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
            <h1 className="text-title font-bold">All users</h1>
          </div>

        </div>
       <UnifiedTable
          type="user"
          variant="admin"
          data={allUser}
        />
      </section>
    </div>
  )
}

export default AllUser