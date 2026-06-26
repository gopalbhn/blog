
// const SideBar = () => {
//     return (
//         <div className="w-64 ">
//             sidebar
//         </div>
//     )
// }

// export default SideBar

import useUserStore from "@/store/userStore";
import {

    LogOut,
    HomeIcon,

    MessageSquare,
    StickyNote,

    Menu,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate, } from "react-router-dom";
import { toast } from "react-toastify";

const SideBar = ({ open }) => {
    const user = useUserStore((state) => state.user);
    const name = user?.name;
    const SideBarItems = [
        {
            icon: HomeIcon,
            label: "Home",
            id: "home",
            link: "/",
        },
        { icon: StickyNote, label: "Posts", id: "posts", link: "/author/post" },
        { icon: MessageSquare, label: "Comments", id: "comments", link: "/author/comments" },

    ];

    const handleLogout = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/user/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
            toast.success("Logout Successfully")
            setTimeout(() => {
                window.location.href = "/";
            }, 1000)
        } else {
            toast.error(data.message)
        }
    }
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className={`w-64 h-screen bg-background-light border-r border-gray-400 flex flex-col fixed left-0 top-0 z-20 shadow-sm transition-all duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} `}>
            <div className="h-16 px-6 flex items-center border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-2.5">

                    <p
                        className="text-xl font-bold text-gray-900 tracking-tight"
                        style={{ fontFamily: "'Outfit',sans-serif" }}
                    >
                        Logo
                    </p>
                </div>
            </div>
            <div className="px-4 py-3 border-b border-gray-100 shrink-0 mb-2 relative ">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl shadow-sm">

                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                            {name}
                        </p>
                        <p className="text-xs text-gray-400">Author</p>
                    </div>
                </div>
            </div>

            {SideBarItems.map((item) => {

                const active = item.link === location.pathname;
                console.log(location.pathname)
                return (
                    <Link
                        key={item.id}
                        to={item.link}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm text-left transition-all ${active ? " text-primary font-semibold underline" : "text-gray-600 hover:bg-[#FAF4F2] hover:text-primary"} `}
                    >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {item.label}
                    </Link>
                );
            })}

            <div className="absolute bottom-0 w-full px-3 pb-4 pt-2 border-t border-gray-100 flex-shrink-0">
                <button
                    onClick={() => handleLogout()}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-[#FAF4F2] hover:text-primary transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default SideBar;