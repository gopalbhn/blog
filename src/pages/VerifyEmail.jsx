import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const VerifyEmail = () => {
    const { token } = useParams();

    console.log("Got this token in frontend", token);
    const navigate = useNavigate();

    async function verifyUser() {
        const res = await fetch(`http://localhost:3000/api/user/verify/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json();
        if (data.success) {
            toast("your email verified successfully")

            setTimeout(() => {
                navigate('/')
            }, 1500)

        }
        else {
            toast("Invalid Token")
        }
    }

    useEffect(() => {
        verifyUser();
    }, [token])

    return (
        <div>VerifyEmail</div>
    )
}

export default VerifyEmail;