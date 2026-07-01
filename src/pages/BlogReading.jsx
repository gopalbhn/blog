import Footer from "@/components/Footer";
import Button from "@/components/ui/button";
import useUserStore from "@/store/userStore";
import { CalendarDays, MessageCircle, Tag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


const BlogReading = () => {
    const [commentsText, setCommentText] = useState("")
    const [blog, setBlog] = useState([])
    let commentsEnabled = true;
    const handleCommentEdit = async (commentId) => {
        if (blog.comments[commentId].author._id !== user.id) {
            toast.error("You cannot Edit this post")
        } else {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/post/edit-comments/${id}`, {

                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    comment: commentsText
                }),
                credentials: "include"
            })
            const data = await res.json();
            console.log(data);
            if (data.success) {
                setCommentText("")
            }
        }
    }
    const { id } = useParams();
    const handlePostComment = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/post/add-comments/${id}`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comment: commentsText
            }),
            credentials: "include"
        })
        const data = await res.json();
        console.log(data);
        if (data.success) {
            setCommentText("")
            toast.success("Comment Added")
            setTimeout(() => {
                window.location.reload()
            }, 500)
        } else {
            toast.error("Failed to add comment")
        }
    }


    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/post/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            console.log(data);

            if (data.success) {
                setBlog(data.post)
            }
        }
        fetchPost()
    }, [])
    console.log("Blog", blog)
    const user = useUserStore(state => state.user);
    const email = user?.email;
    console.log(email)
    let article = `Artificial Intelligence is rapidly transforming the way people live, work, and interact with technology. What was once considered a futuristic concept has become an essential part of modern life. From virtual assistants that help manage daily schedules to recommendation systems that personalize online experiences, AI is influencing countless aspects of everyday activities.Businesses are increasingly relying on AI-powered solutions to automate repetitive tasks, improve decision-making, and enhance customer experiences. Healthcare organizations use machine learning algorithms to assist with disease detection and treatment planning, while financial institutions employ AI systems to identify fraudulent transactions and assess risks more effectively. These advancements are helping organizations operate more efficiently while delivering better outcomes for customers and stakeholders.AI is also making a significant impact inside homes through smart devices and connected ecosystems. Intelligent thermostats, voice-controlled assistants, and automated security systems are creating more convenient living environments. \n\n As these technologies continue to evolve, users can expect even greater levels of personalization and automation.Despite the many benefits, the rise of Artificial Intelligence raises important questions about privacy, ethics, and employment. Concerns regarding data collection, algorithmic bias, and workforce displacement remain central topics of discussion. Addressing these challenges responsibly will play a critical role in shaping the future of AI adoption. \n\nLooking ahead, experts believe AI will continue to influence nearly every industry. Understanding its opportunities and challenges will help individuals and organizations adapt successfully to a rapidly changing digital landscape.`
    const paragraph = article.split("\n\n")
    console.log('para', paragraph)
    return (
        <div className='w-full h-full  px-10'>
            <div>
                <h1 className="font-heading font-bold  text-header mt-10">{blog.title}</h1>
                <div className="flex flex-wrap gap-6 mt-2 text-small text-secondary/80">

                    <div className="flex items-center gap-2">
                        <User size={18} />
                        <span>{blog.author?.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <CalendarDays size={18} />
                        <span>
                            {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Tag size={18} />
                        <span>{blog.category}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MessageCircle size={18} />
                        <span>{blog.comments?.length || 0} Comments</span>
                    </div>

                </div>
            </div>
            {/* <div className="h-150 w-  mt-10 rounded-xl overflow-hidden">
                <img src={blog.image} alt="" className="h-full w-full object-cover" />
            </div>
            <div className='w-full  mt-10 '>
                <p className='text-body'>`Artificial Intelligence is rapidly transforming the way people live, work, and interact with technology. What was once considered a futuristic concept has become an essential part of modern life. From virtual assistants that help manage daily schedules to recommendation systems that personalize online experiences, AI is influencing countless aspects of everyday activities.

                    Businesses are increasingly relying on AI-powered solutions to automate repetitive tasks, improve decision-making, and enhance customer experiences. Healthcare organizations use machine learning algorithms to assist with disease detection and treatment planning, while financial institutions employ AI systems to identify fraudulent transactions and assess risks more effectively. These advancements are helping organizations operate more efficiently while delivering better outcomes for customers and stakeholders.

                    AI is also making a significant impact inside homes through smart devices and connected ecosystems. Intelligent thermostats, voice-controlled assistants, and automated security systems are creating more convenient living environments. As these technologies continue to evolve, users can expect even greater levels of personalization and automation.

                    Despite the many benefits, the rise of Artificial Intelligence raises important questions about privacy, ethics, and employment. Concerns regarding data collection, algorithmic bias, and workforce displacement remain central topics of discussion. Addressing these challenges responsibly will play a critical role in shaping the future of AI adoption.

                    Looking ahead, experts believe AI will continue to influence nearly every industry. Understanding its opportunities and challenges will help individuals and organizations adapt successfully to a rapidly changing digital landscape.`</p>
               
            </div> */}
            {paragraph.map((p, index) => (
                <div key={index} className="flex flex-col gap-2 mt-5">
                    <p>{p}</p>
                    {index == 0 && (
                        <img
                            src={blog.image}
                            alt="Blog"
                        />
                    )}

                </div>
            ))}
            <div className='mt-10 mb-10'>
                <h2 className="font-heading font-bold  text-title mt-10 pl-10">Comments</h2>
                {blog.commentsEnabled ? (
                    <div className="h-full overflow-y-scroll no-scrollbar w-full px-10 " >
                        {blog.comments.map(comment => (
                            <div className="shadow-sm p-4   w-[80%] mt-5 rounded-lg flex gap-5 ">
                                <div className="h-10 w-10 rounded-full bg-accent-light flex items-center justify-center text-accent">
                                    <User />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-heading font-semibold text-sm">{comment.author.name}</p>
                                    <p className="text-small">{comment.content}</p>
                                    {/* <div className='w-full flex  items-center mt-2 gap-2'>
                                        <button className="text-small text-gray-500 hover:text-gray-400" onClick={() => handleCommentEdit(comment._id)}>Edit</button>
                                        <button className="text-small text-gray-500 hover:text-red-500">Delete</button>
                                    </div> */}
                                    <p className="text-xs text-gray-500 mt-1">{new Date(comment.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                                </div>


                            </div>
                        ))}
                        {
                            email ? (

                                <div className='mb-4 flex flex-col items-start gap-2 mt-10'>
                                    <textarea placeholder="Comments"
                                        className="w-1/2 h-20 border border-gray-300 rounded-lg p-2 shadow-sm"
                                        value={commentsText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                    ></textarea>
                                    {commentsText.length > 0 ? (

                                        <Button className={'rounded-xl'} onClick={handlePostComment}> Post</Button>
                                    ) : (
                                        <Button className={'rounded-xl  bg-primary/50 hover:bg-primary-50  cursor-not-allowed'} disabled> Post</Button>
                                    )}
                                </div>
                            ) : (
                                <div className="mt-5">Not Logged In to comment</div>
                            )}
                    </div>
                ) :
                    (
                        <div className="mb-10">
                            <div className='mb-4 flex flex-col items-start gap-2'>
                                <textarea placeholder="Comments" disabled
                                    className="w-1/2 h-20 border border-gray-300 rounded-lg p-2 shadow-sm"
                                ></textarea>
                                <Button className={'rounded-xl'} disabled> Post</Button>
                            </div>
                            <h1 className="text-body text-gray-500">Comments are disabled</h1>
                        </div>
                    )
                }
            </div>
            <Footer />
        </div>
    )
}

export default BlogReading