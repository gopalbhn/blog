import SideBar from "@/components/author/SideBar";
import Button from "@/components/ui/button";
import { Menu, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPost = () => {
  const [open, setOpen] = useState(true);
  const [image, setImage] = useState(null);
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [blogImage, setBlogImage] = useState("");


  const { id } = useParams();
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/post/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const data = await res.json();
      const post = data.post;

      if (data.success) {
        setBlog(post);
        setTitle(post.title || "");
        setDescription(post.description || "");
        setCategory(post.category || "");
        setBlogImage(post.image);
      }
    };
    fetchPost();
  }, []);

  function imagePreview() {
    if (image) {
      return URL.createObjectURL(image);
    }
    if (blogImage) {
      return blogImage;
    }

    return null;
  }

  async function handlePublish() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (image) {
      formData.append("image", image)
    } else {
      formData.append('image', blogImage)
    }
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URI}/api/post/update/${id}`,
      {
        method: "PUT",
        body: formData,
        credentials: "include",
      },
    );
    const data = await res.json();
    if (data.success) {
      toast.success("Post Updated Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    }
  }

  return (
    <div className="h-full w-full relative">
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
            <h1 className="text-title font-bold">Create Post</h1>
          </div>
        </div>
        <div className="h-full w-full  my-10 bg-background-light  rounded-xl p-4  transition-shadow duration-200">
          <div className="h-full w-full space-y-2 ">
            <h3 className="font-bold text-title font-heading">Enter Title</h3>
            <input
              type="text"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-15 w-full px-4 text-xl rounded-xl shadow-sm focus:outline-none focus:shadow-md border-none"
              placeholder="Enter Title For Your Post"
            />
          </div>
          <div className="h-full w-full mt-5 space-y-2 ">
            <h3 className="font-bold text-title font-heading">
              Enter Description
            </h3>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="h-full w-full rounded-xl p-4 text-body  shadow-sm focus:outline-none focus:shadow-md placeholder:text-xl "
              placeholder="Enter Your Content"
              value={description}
              rows={15}
              cols={40}
            />
          </div>
          <div className="h-100 w-full relative mt-5 space-y-2 ">
            <h3 className="font-bold text-title font-heading">
              Choose Your Image
            </h3>
            <label className="relative flex h-90 w-full cursor-pointer flex-col items-center justify-center rounded-xl shadow-sm focus-within:shadow-md">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
              {imagePreview() ? (
                <img
                  src={imagePreview()}
                  className="h-full w-full object-cover rounded-xl"
                />
              ) : (
                <>
                  <Upload size={40} className="text-gray-500" />

                  <p className="mt-3 text-sm font-medium text-gray-600">
                    Choose your file
                  </p>
                </>
              )}
            </label>
          </div>
          <div className="h-full w-full mt-5">
            <h3 className="font-bold text-title font-heading">
              Select Your Category
            </h3>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="h-12 w-full bg-background-light outline-none  rounded-xl p-2 shadow-sm focus:shadow-md transition-shadow duration-200"
            >
              {["Technology", "Science", "Business", "Health", "Travel"].map(item => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="h-full w-full mt-10 flex items-center justify-center">
            <Button
              className="rounded-xl "
              variant="gradient"
              onClick={handlePublish}
              height={50}
              width={120}
            >
              Publish
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditPost;
