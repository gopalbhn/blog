import SideBar from "@/components/author/SideBar";
import Button from "@/components/ui/button";
import { Menu, Upload } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [open, setOpen] = useState(true);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Select");
  const [comments, setComments] = useState(true)
  async function handlePublish() {

    const formData = new FormData()

    formData.append("title", title)
    formData.append("description", description)
    formData.append("category", category)
    formData.append("image", image)
    formData.append("commentsEnabled", comments)
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URI}/api/post/create`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    )

    const data = await res.json();
    if (data.success) {
      toast.success("Post Created Successfully")
      setTimeout(() => {
        window.location.href = "/"
      }, 500)
    }
    else {
      toast.error(data.message)
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
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
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
              <option value="Select" disabled selected>Select Your Category</option>
              {["Technology", "Science", "Business", "Health", "Travel"].map(item => (
                <option value={item} key={item} className="px-2 ">{item}</option>
              ))}
            </select>
          </div>
          <div className="h-full w-full mt-5 flex items-center gap-2">

            <h3 className="font-bold text-title font-heading">
              Enable Comments
            </h3>
            <div className="h-6 w-12 rounded-full border border-gray-400">
              <button
                onClick={() => setComments(!comments)}
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${comments ? "bg-primary" : "bg-gray-300"
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${comments ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
            </div>
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

export default CreatePost;
