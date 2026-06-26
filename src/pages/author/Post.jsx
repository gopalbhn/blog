import SideBar from "@/components/author/SideBar";
import BlogCard from "@/components/BlogCard";
import UnifiedTable from "@/components/table";
import Button from "@/components/ui/button";
import { Menu, Pen, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Post = () => {
  const [open, setOpen] = useState(true);
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const name = "Sarah Johnson".toLowerCase().trim();
  useEffect(() => {
    const getMyPost = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/post/user-posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setPost(data.post);
      }
      else {
        setPost([])
      }
    };
    getMyPost();
  }, []);

  function handleEdit(id) {
    navigate(`/author/edit-post/${id}`)
  }

  async function handleDelete(id) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/post/${id}`, {
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

  return (
    <div className="h-full w-full relative ">
      <SideBar open={open} />
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
            <h1 className="text-title font-bold">Posts</h1>
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
        {post.length == 0 ? (
          <p className="text-center text-lg">No posts found</p>
        ) : (
          // <div className={` h-full w-full flex flex-col my-10 `}>
          //   <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] items-center gap-x-6 ">
          //     <p className="text-body font-bold text-center">Title</p>
          //     <p className="text-body font-bold text-center">Category</p>
          //     <p className="text-body font-bold text-center">Status</p>
          //     <p className="text-body font-bold text-center">Date</p>

          //     <p className="text-body font-bold text-center">Action</p>

          //   </div>
          //   {post.map((item) => (
          //     <div
          //       key={item._id}
          //       className="w-full rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200
          //    grid grid-cols-[3fr_1fr_1fr_1fr_1fr] items-center gap-x-6
          //     py-5 mt-6 group"
          //     >
          //       <p className="text-small">{item.title}</p>
          //       <p className="text-center">{item.category}</p>
          //       <p className="text-center">{item.status}</p>
          //       <p className="text-center">
          //         {new Date(item.createdAt).toLocaleDateString()}
          //       </p>
          //       <div className="h-full w-full flex items-center justify-center gap-4">
          //         <button className="h-8 w-8 p-2  group-hover:bg-[#f3e4e1] rounded-full hover:cursor-pointer" onClick={() => handleEdit(item._id)}>
          //           <Pen className="text-gray-900 h-full w-full group-hover:text-primary" />
          //         </button>
          //         <button className="h-8 w-8 p-2 group-hover:bg-red-100 rounded-full" onClick={() => handleDelete(item._id)}>
          //           <Trash className="text-gray-900 h-full w-full group-hover:text-red-500 hover:cursor-pointer" />
          //         </button>
          //       </div>
          //     </div>
          //   ))}
          // </div>
          <UnifiedTable
            type={"post"}
            variant={"Author"}
            data={post}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </section>
    </div>
  );
};

export default Post;
