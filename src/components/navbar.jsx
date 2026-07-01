import { useLocation, useNavigate } from "react-router-dom";
import GradientButton from "./ui/button-1";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "./ui/button";
import useUserStore from "@/store/userStore";
import { toast } from "react-toastify";
import { Menu, User, UserRound, UserRoundIcon, X } from "lucide-react";
import { FlowButton } from "./ui/flow-button";

export default function NavBar() {
    const [color, setColor] = useState()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const email = useUserStore((state) => state.user?.email)
    const [mobileMenu, setMobileMenu] = useState(false)
    console.log(email)
    function changeColor() {
        if (window.scrollY > 20) {
            setColor("bg-white/50 backdrop-blur-md")
        } else {
            setColor("bg-transparent")
        }
    }

    window.addEventListener("scroll", changeColor)
    const path = useLocation();

    async function handleLogout() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/user/logout`, {
                method: "POST",
                credentials: "include"
            })
            const data = await res.json()
            if (data.success) {

                toast.success(data.message)
                setTimeout(() => {
                    window.location.reload();
                }, 500)
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            console.log(err)
            toast.error("Something went wrong")
        }
    }

    return (
        <div className={`h-15 px-4  md:px-10 flex items-center justify-between sticky top-0 left-0 z-100  ${color}`}>
            <div className="text-xl font-bold text-gray-900">
                Logo
            </div>
            <div className="hidden md:flex items-center gap-5">
                {['Home', 'Blog', 'About'].map((item) => (
                    <Link to={`/${item == "Home" ? "" : item.toLowerCase()}`} key={item} className="text-sm font-medium text-secondary cursor-pointer hover:text-primary hover:underline transition-colors duration-300">
                        {item}
                    </Link>
                ))}
            </div>
            <div className=" flex justify-center gap-3 ">
                {
                    email ? (
                        <div className="h-10 w-10 bg-primary rounded-full cursor-poiter relative flex items-center justify-center" onClick={() => setOpen(!open)}>
                            <UserRoundIcon className="text-white" />
                            {open && (
                                <div className="absolute top-12 -right-5 bg-white shadow-lg rounded-lg w-28 flex flex-col items-center justify-center overflow-hidden">
                                    <button className="text-secondary hover:text-primary w-full  p-2 hover:bg-primary/30 cursor-pointer" onClick={() => navigate("/profile")}>Profile</button>
                                    <button className="text-secondary hover:text-primary w-full p-2 cursor-pointer hover:bg-primary/30" onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div>
                    )
                        :
                        (
                            <FlowButton
                                onClick={() => navigate("/login")}

                                variant="default"
                                className='rounded-xl  flex'
                                text="Login"
                            >

                            </FlowButton>

                        )

                }
                <button
                    className="md:hidden"
                    onClick={() => setMobileMenu(!mobileMenu)}
                >
                    {mobileMenu ? <X /> : <Menu />}
                </button>

            </div>
            {mobileMenu && (
                <div
                    className="
                    absolute top-16 left-0
                    w-full mx-auto bg-background-light backdrop-blur-md shadow-md
                    flex flex-col items-center gap-4 py-5
                    md:hidden
                    "
                >

                    <Link to="/" className={`text-small font-medium ${path.pathname == "/" ? "text-primary underline" : "text-secondary"} hover:text-primary hover:underline transition-colors duration-300`}>Home</Link>
                    <Link to="/blog" className={`text-small font-medium ${path.pathname == "/blog" ? "text-primary underline" : "text-secondary"} hover:text-primary hover:underline transition-colors duration-300`}>Blog</Link>
                    <Link to="/about" className={`text-small font-medium ${path.pathname == "/about" ? "text-primary underline" : "text-secondary"} hover:text-primary hover:underline transition-colors duration-300`}>About</Link>
                </div>
            )}

        </div>
    )
}