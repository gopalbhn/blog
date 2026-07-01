import SideBar from "@/components/author/SideBar";
import DeleteConfirmModal from "@/components/DeleteConfirm";
import Button from "@/components/ui/button";
import { Menu, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Comment = () => {
  const [open, setOpen] = useState(true);
  const [comments, setComments] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleteDetail, setDeleteDetail] = useState(null)

  function handleDelete() {
    if (!deleteDetail) {
      return
    } else {
      // make api call to delete comment
      handleCommentDelete(deleteDetail.id)

    }
  }

  async function handleCommentDelete(id) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/post/delete-comment/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    })

    const data = await res.json();
    if (data.success) {
      toast.success("Comment deleted successfully")
      setTimeout(() => {
        window.location.reload()
      }, 500)

    } else {
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    async function fetchAllComments() {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/post/get-all-comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      })

      const data = await res.json();
      if (data.success) {
        setComments(data.comments);
      } else {
        setComments([]);
      }
    }
    fetchAllComments()
  }, [])

  return (
    <div className="h-full w-full relative ">
      <DeleteConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onDelete={() => handleDelete()}
        itemName={deleteDetail ? deleteDetail.name : ""}
      />
      <SideBar open={open} />
      <section
        className={`h-full  mb-10  transition-all duration-300 ${open ? "ml-64 px-4 pt-4" : "ml-0 px-10 pt-4"}`}
      >
        <div className="w-full flex justify-between ">
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => setOpen(!open)}
            >
              <Menu />
            </button>
            <h1 className="text-title font-bold">Comments</h1>
          </div>
        </div>

        {
          comments.map((comment) => (
            <div key={comment._id} className="bg-background-light  border-secondary rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 group mt-2" >
              <div className="flex justify-between gap-4">
                <div className="flex-1">
                  <p className="font-bold text-body">
                    {comment.content}
                  </p>

                  <div className="mt-3 text-small text-secondary/70">
                    On{" "}
                    <span className=" font-medium">
                      {comment.post.title}
                    </span>
                  </div>

                  <div className="text-small text-secondary/70">
                    {comment.author.name} • {comment.createdAt}
                  </div>
                </div>

                <div className="h-10 w-10 flex items-center justify-center ">
                  <button className="h-8 w-8 p-2 group-hover:bg-red-100 rounded-full" onClick={() => {
                    setShowConfirm(true)
                    setDeleteDetail({ name: "this comment", id: comment._id, onDelete: handleDelete })
                  }}>
                    <Trash className="text-gray-900 h-full w-full group-hover:text-red-500 hover:cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
          ))
        }

        {/* <div className="bg-background-light  border-secondary rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 group" >
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <p className="font-bold text-body">
                This blog is really nice and informative.
              </p>

              <div className="mt-3 text-small text-secondary/70">
                On{" "}
                <span className=" font-medium">
                  The Future of Artificial Intelligence
                </span>
              </div>

              <div className="text-small text-secondary/70">
                Gopal Bhandari • 21 Jun 2025
              </div>
            </div>

            <div className="h-10 w-10 flex items-center justify-center ">
              <button className="h-8 w-8 p-2 group-hover:bg-red-100 rounded-full">
                <Trash className="text-gray-900 h-full w-full group-hover:text-red-500 hover:cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-background-light  border-secondary rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 group" >
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <p className="font-bold text-body">
                This blog is very helpful
              </p>

              <div className="mt-3 text-small text-secondary/70">
                On{" "}
                <span className=" font-medium">
                  The Rise of Smart Cities and Connected Living
                </span>
              </div>

              <div className="text-small text-secondary/70">
                Gopal Bhandari • 21 Jun 2025
              </div>
            </div>

            <div className="h-10 w-10 flex items-center justify-center ">
              <button className="h-8 w-8 p-2 group-hover:bg-red-100 rounded-full">
                <Trash className="text-gray-900 h-full w-full group-hover:text-red-500 hover:cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-background-light  border-secondary rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 group" >
          <div className="flex justify-between gap-4">
            <div className="flex-1">
              <p className="font-bold text-body">
                Post more blog like this
              </p>

              <div className="mt-3 text-small text-secondary/70">
                On{" "}
                <span className=" font-medium">
                  AI Agents and the Future of Automation
                </span>
              </div>

              <div className="text-small text-secondary/70">
                Gopal Bhandari • 21 Jun 2025
              </div>
            </div>

            <div className="h-10 w-10 flex items-center justify-center ">
              <button className="h-8 w-8 p-2 group-hover:bg-red-100 rounded-full">
                <Trash className="text-gray-900 h-full w-full group-hover:text-red-500 hover:cursor-pointer" />
              </button>
            </div>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default Comment;
