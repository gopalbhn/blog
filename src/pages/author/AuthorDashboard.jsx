import SideBar from "@/components/author/SideBar";
import BlogCard from "@/components/BlogCard";
import MetricCard from "@/components/MetricCard";
import Button from "@/components/ui/button";
import { Clock, File, FileText, Menu, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthorDashboard = () => {
  const [open, setOpen] = useState(true);
  const [post, setPost] = useState([]);
  const navigate = useNavigate();

  const name = "Sarah Johnson".toLowerCase().trim();
  useEffect(() => {
    const getMyPost = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/post/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setPost(data.post);
    };
    getMyPost();
  }, []);
  const filteredPost = post.filter(
    (item) => item.author.name.toLowerCase().trim() === name,
  );

  console.log(filteredPost);
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

        <div className="h-full w-full grid grid-cols-3 mt-10 gap-5">
          <MetricCard icon={FileText} title={"Total Post"} number={5} />
          <MetricCard icon={Clock} title={"Total Post"} number={5} className='bg-yellow-500/50' />
          <MetricCard icon={FileText} title={"Total Post"} number={5} className='bg-green-500/50' />
        </div>

        <div
          className={` ${open ? "grid grid-cols-3 items-center mt-10 gap-5" : "grid grid-cols-4 items-center mt-10 gap-5"}`}
        >
          {post
            .filter((item) => item.author.name.toLowerCase().trim() === name)
            .map((blog) => (
              <BlogCard
                key={blog._id}
                title={blog.title}
                image={blog.image}
                category={blog.category}
                author={blog.author}
                excerpt={blog.description}
                publishedAt={blog.createdAt}
                id={blog._id}
              />
            ))}
        </div>
      </section>
      <section
        className={`h-full  mb-10  transition-all duration-300 ${open ? "ml-64 px-4 pt-4" : "ml-0 px-10 pt-4"}`}
      >
        <h1 className="text-title font-bold">Review And Suggestion</h1>
        <div className="w-full h-40 ">
           <div className="bg-background-light  border-secondary rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 group" >
              <div className="flex-1">
              <p className="font-bold text-body">
                Climate Change Innovations Offering Hope
              </p>

              <div className="mt-3 text-small text-secondary/70">
                
                <span className=" font-medium">
                Your Topic is Not Good
                </span>
              </div>

              <div className="text-small text-secondary/70 mt-3">
                <button className="px-5 py-1.5 rounded-xl bg-primary text-background-light" onClick={()=>navigate(`/author/edit-post/${id}`)}>Edit</button>
              </div>
            </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default AuthorDashboard;
