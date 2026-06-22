import SideBar from "@/components/author/SideBar";
import Button from "@/components/ui/button";
import { Menu, Plus, Trash } from "lucide-react";
import { useState } from "react";

const Comment = () => {
  const [open, setOpen] = useState(true);
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
            <h1 className="text-title font-bold">Comments</h1>
          </div>
        </div>
        <div className="bg-background-light  border-secondary rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 group" >
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
        </div>
      </section>
    </div>
  );
};

export default Comment;
