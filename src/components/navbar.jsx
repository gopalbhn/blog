import { useNavigate } from "react-router-dom";
import GradientButton from "./ui/button-1";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "./ui/button";
export default function NavBar() {
    const [color, setColor] = useState()
    const navigate = useNavigate();

    function changeColor() {
        if (window.scrollY > 20) {
            setColor("bg-white/50 backdrop-blur-md")
        } else {
            setColor("bg-transparent")
        }
    }

    window.addEventListener("scroll", changeColor)
    return (
        <div className={`h-15  px-10 flex items-center justify-between sticky top-0 left-0 z-100  ${color}`}>
            <div className="text-xl font-bold text-gray-900">
                Logo
            </div>
            <div className="flex items-center gap-5">
                {['Home', 'Blog', 'About'].map((item) => (
                    <Link to={`/${item == "Home" ? "" : item.toLowerCase()}`} key={item} className="text-sm font-medium text-secondary cursor-pointer hover:text-primary hover:underline transition-colors duration-300">
                        {item}
                    </Link>
                ))}
            </div>
            <div>
                <Button
                    onClick={() => navigate("/login")}
                    height={40}
                    width={90}
                    variant="gradient"
                >
                    Login
                </Button>

            </div>
        </div>
    )
}