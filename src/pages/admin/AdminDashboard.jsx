import AdminSideBar from "@/components/admin/AdminSideBar";
import MetricCard from "@/components/MetricCard";
import UnifiedTable from "@/components/table";
import Button from "@/components/ui/button";
import { Ellipse, EllipsisVerticalIcon, Eye, FileText, Menu, MoreVertical, MoveVertical, Pen, Plus, Trash, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const [recentUser, setRecentUser] = useState([])
  const [recentPost, setRecentPost] = useState([])
  const [featuredPost, setFeaturedPost] = useState([])
  const [stats,setStats] = useState(null);



  useEffect(() => {
    async function fetchRecentUsers() {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/recent-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json();
      if (data.success) {
        console.log("recent users", data.user)
        setRecentUser(data.user)
      }
    }

    async function fetchRecentPost() {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/recent-post`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json();
      if (data.success) {
        console.log("recent post", data.post)
        setRecentPost(data.post)
      }
    }

    async function fetchFeaturedPost() {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/post/featured`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json();
      if (data.success) {
        console.log("featured post", data.featuredPost)
        setFeaturedPost(data.featuredPost)
      }
    }

    async function fetchDashboardStats(){
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/dashboard-stats`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
      const data = await res.json();

      if(data.success){
        console.log("dashboard stats",data.stats)
        setStats(data.stats)
      }else{
        setStats(null)
      }
    }
    fetchRecentUsers();
    fetchRecentPost();
    fetchFeaturedPost();
    fetchDashboardStats();
  }, [])
  return (
    <div className="h-full w-full relative">
      <AdminSideBar open={open} />
      <section
        className={`h-full    transition-all duration-300 ${open ? "ml-64 px-4 pt-4" : "ml-0 px-10 pt-4"}`}
      >
        {console.log('featured', featuredPost)}
        <div className="w-full flex justify-between ">
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setOpen(!open)}
            >
              <Menu />
            </button>
            <h1 className="text-title font-bold">Admin Dashboard</h1>
          </div>

        </div>

        <div className="h-full w-full grid grid-cols-3 mt-10 gap-5">
          <MetricCard icon={User} title={"Total User"} number={stats?.totalUsers}  />
          <MetricCard
            icon={FileText}
            title={"Pending Posts"}
            number={stats?.totalPosts}
            className="bg-accent/50"
          />
            <MetricCard icon={FileText} title={"Total Posts"} number={stats?.totalPosts}  />


        </div>
        <div className="h-full w-full mt-10">
          <h1 className="text-title font-bold">Recent Users</h1>
          
          <UnifiedTable
            type="user"
            variant="admin"
            data={recentUser}
          />
        </div>
        <div className="h-full w-full my-10">
          <h1 className="text-title font-bold">Recent Posts</h1>

          <UnifiedTable
            type="post"
            variant="admin"
            data={recentPost}
          />
        </div>
        <div className="h-full w-full my-10">
          <h1 className="text-title font-bold">Featured Post</h1>
          <UnifiedTable
            type="post"
            variant="admin"
            data={featuredPost}
          />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
