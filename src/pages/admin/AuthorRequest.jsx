import AdminSideBar from "@/components/admin/AdminSideBar";
import { FlowButton } from "@/components/ui/flow-button";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthorRequest = () => {
    const [open, setOpen] = useState(true)
    const [request, setRequest] = useState([]);
    useEffect(() => {
        async function fetchAllAuthorRequest() {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/all-requests`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
            if (data.success) {
                setRequest(data.authorRequests)
            }
            console.log(request)
        }
        fetchAllAuthorRequest()

    }, [])

    async function handleApprove(id) {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/approve-request/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        if (data.success) {
            toast.success(data.message)
        }
    }

    async function handleReject(id) {
        const res = fetch(`${import.meta.env.VITE_BACKEND_URI}/api/admin/reject-request/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
        const data = await res.json()
        if (data.success) {
            toast.success(data.message)
        }
    }
    return (
        <div className="h-full w-full relative">
            <AdminSideBar open={open} />
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
                        <h1 className="text-title font-bold">Author Request</h1>
                    </div>

                </div>
                <div className="w-full flex flex-col items-center justify-center ">
                    {request.length == 0 && (
                        <p className="text-title font-bold">No Request For Author Found</p>
                    )}

                    {request?.map((request) => {
                        return (
                            <div className="w-full flex items-center justify-between border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-2">
                                    <p>{request.userId.name}</p>
                                    <p>{request.userId.email}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FlowButton variant={"default"} text={"Approve"} onClick={() => handleApprove(request._id)}></FlowButton>
                                    <FlowButton variant={"outline"} text={"Reject"} className={'w-25 py-3'} onClick={() => handleReject(request._id)}></FlowButton>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </section>
        </div>
    );
};

export default AuthorRequest;