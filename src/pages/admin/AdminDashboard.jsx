import AdminSideBar from '@/components/admin/AdminSideBar'
import MetricCard from '@/components/MetricCard';
import Button from '@/components/ui/button';
import { FileText, Menu, Plus, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate()
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
            <h1 className="text-title font-bold">My Blogs</h1>
          </div>
          <Button
            className={"rounded-xl flex items-center gap-2"}
            onClick={() => navigate("/author/create-post")}
          >
            {" "}
            Create
            <Plus />
          </Button>
        </div>

           <div className="h-full w-full flex items-center mt-10 gap-5">
          <MetricCard icon={User} title={"Total User"} number={5}  />
          <MetricCard icon={FileText} title={"Total Post"} number={5} className='bg-yellow-500/50' />
          
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard