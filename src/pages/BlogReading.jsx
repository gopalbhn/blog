import Footer from "@/components/Footer";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const BlogReading = () => {
    const [commentsText, setCommentText] = useState("")
    const [blog, setBlog] = useState([])
    let commentsEnabled = true;
    const handlePostComment = () => {
        console.log(commentsText);
    }

    const { id } = useParams();
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

    return (
        <div className='w-full h-full  px-10'>
            <div>
                <h1 className="font-heading font-bold  text-header mt-10">{blog.title}</h1>
                <p className="text-small ">Published At {new Date(blog.createdAt).toLocaleDateString()}</p>
                <p className="text-small ">Author: {blog.author?.name}</p>
                <p className="text-small">Category:{blog?.category}</p>
            </div>
            <div className="h-150 w-  mt-10 rounded-xl overflow-hidden">
                <img src={blog.image} alt="" className="h-full w-full" />
            </div>
            <div className='w-[80%]  mt-10 '>
                <p className='text-body'>`Artificial Intelligence is rapidly transforming the way people live, work, and interact with technology. What was once considered a futuristic concept has become an essential part of modern life. From virtual assistants that help manage daily schedules to recommendation systems that personalize online experiences, AI is influencing countless aspects of everyday activities.

                    Businesses are increasingly relying on AI-powered solutions to automate repetitive tasks, improve decision-making, and enhance customer experiences. Healthcare organizations use machine learning algorithms to assist with disease detection and treatment planning, while financial institutions employ AI systems to identify fraudulent transactions and assess risks more effectively. These advancements are helping organizations operate more efficiently while delivering better outcomes for customers and stakeholders.

                    AI is also making a significant impact inside homes through smart devices and connected ecosystems. Intelligent thermostats, voice-controlled assistants, and automated security systems are creating more convenient living environments. As these technologies continue to evolve, users can expect even greater levels of personalization and automation.

                    Despite the many benefits, the rise of Artificial Intelligence raises important questions about privacy, ethics, and employment. Concerns regarding data collection, algorithmic bias, and workforce displacement remain central topics of discussion. Addressing these challenges responsibly will play a critical role in shaping the future of AI adoption.

                    Looking ahead, experts believe AI will continue to influence nearly every industry. Understanding its opportunities and challenges will help individuals and organizations adapt successfully to a rapidly changing digital landscape.`</p>
                {/* {blog.description} */}
            </div>
            <div className='mt-10 mb-10'>


                {blog.commentsEnabled ? (
                    <div className="h-full w-full px-10 " >
                        <div className='mb-4 flex flex-col items-start gap-2'>
                            <textarea placeholder="Comments"
                                className="w-1/2 h-20 border border-gray-300 rounded-lg p-2 shadow-sm"
                                value={commentsText}
                                onChange={(e) => setCommentText(e.target.value)}
                            ></textarea>
                            {commentsText.length > 0 ? (

                                <Button className={'rounded-xl'} onClick={handlePostComment}> Post</Button>
                            ) : (
                                <Button className={'rounded-xl'} disabled> Post</Button>
                            )}
                        </div>
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