import React, { useEffect, useState } from "react";
import Image from "../assets/hero.png";
import { ArrowRight, ChevronDown, ChevronRight, } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FeatureCard from "@/components/FeatureCard";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Button from "@/components/ui/button";
import { faq, features } from "../lib/data.js"
import { blogs } from "@/lib/data";
import BlogCard from "@/components/BlogCard";
import { toast } from "react-toastify";

import { FlowButton } from "@/components/ui/flow-button";

const Dashboard = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(null)
  const [searchParams] = useSearchParams()
  const [post, setPost] = useState([])
  useEffect(() => {
    if (searchParams.get("login") == "success") {
      toast.success("Logged In successfully")

      setTimeout(() => {
        navigate('')
      }, 1000)

    }

    getFeaturedPost();

  }, [])

  const getFeaturedPost = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URI}/api/post/featured`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      }
    )

    const data = await res.json();
    console.log("this is featured data", data.featuredPost)
    if (data.success) {
      setPost(data.featuredPost)

      console.log(post)
    } else {
      toast.error("Unable to fetch Post")
    }

  }
  console.log(post)
  return (
    <div className="min-h-screen  px-4 sm:px-6 md:px-8 lg:px-10 overflow-x-hidden ">
      <section className="h-full w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mt-10  bg-[radial-gradeint(circle at top left,#DBEAFE,transparent 40%),#f0f)] ">
        <div>
          <p className="text-md font-semibold text-accent mb-2 flex items-center gap-2 ">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span> Trusted by 5,000+ Bloggers Worldwide
          </p>
          <h1 className="text-header  md:text-hero font-extrabold font-heading tracking-tight uppercase text-secondary mb-2 ">
            Manage, Publish & Grow Your <span className="text-primary"> Blog </span>
          </h1>
          <p className="text-body text-gray-600 font-normal font-sans leading-relaxed">
            Write, schedule, publish, and track your blog performance from a
            single dashboard designed for creators and teams.
          </p>
          <p className="text-body text-gray-600 font-normal font-sans leading-relaxed flex gap-2 items-center mt-2">
            <span className="h-2 w-2 rounded-full bg-gray-900 mr-2"></span>

            Schedule and manage multi-platform content campaigns
          </p>
          <p className="text-body text-gray-600 font-normal leading-relaxed flex gap-2 items-center mt-2">
            <span className="h-2 w-2 rounded-full bg-gray-900 mr-2"></span>

            All features available from a single centralized dashboard
          </p>
          <p className="text-body text-gray-600 font-normal leading-relaxed flex gap-2 items-center mt-2">
            <span className="h-2 w-2 rounded-full bg-gray-900 mr-2"></span>

            Automate content distribution across channels
          </p>
          <p className="text-body text-gray-600 font-normal leading-relaxed flex gap-2 items-center mt-2">
            <span className="h-2 w-2 rounded-full bg-gray-900 mr-2"></span>

            Keep your content organized and up to date
          </p>
          <div className="mt-5 flex items-center gap-5">
            <FlowButton
              variant={"filled"}
              onClick={() => navigate("/blog")}
              text={"Get Started"}

            >

            </FlowButton>
            <FlowButton
              onClick={() => navigate("/blog")}
              variant="outline"
              text={"Explore Features"}
            >

            </FlowButton>
          </div>
        </div>
        <div className="h-64 sm:h-80 md:h-96 lg:h-[440px]   bg-gray-200 rounded-xl shadow-md flex items-center justify-center overflow-hidden">
          <img
            src={Image}
            alt="Dashboard Image"
            className="h-full w-full object-cover"
          />
        </div>
      </section>
      <section className="h-full w-full mt-24">
        <h1 className="text-header font-heading font-bold text-secondary ">
          {" "}
          Our Features
        </h1>
        <motion.div
          initial="stacked"
          whileInView={"spread"}
          viewport={{ once: true }}
          transition={{
            delayChildren: 0.05,
            staggerChildren: 0.08
          }}
          className=" hidden lg:flex relative w-full  min-h-75  items-center justify-center mt-3 ">

          {features.map((feature, index) => {
            const initialRotate = (index - 1) * 5;
            const stackedY = index * -6;
            const spreadX = (index - (features.length - 1) / 2) * 300;

            const cardVariants = {
              stacked: {
                x: 0,
                y: stackedY,
                scale: 0.95 + index * 0.02,
                rotate: initialRotate,
                zIndex: index,
              },
              spread: {
                x: spreadX,
                y: 0,
                scale: 1,
                rotate: 0,
                zIndex: 10,
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 16,
                }
              }
            }

            return (

              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                cardVariants={cardVariants}
              />
            )
          }
          )}
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5  lg:hidden mt-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      <section className="h-full w-full mt-24 mb-2">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-header font-heading font-bold text-secondary ">Featured Blogs</h1>
          <Link to={"/blog"} className="text-sm text-accent font-bold flex items-center  group hover:animate-pulse">
            View all article
            <ArrowRight size={16} className="text-sm  transform transition-all  group-hover:translate-x-2 duration-1000 " />
          </Link>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-5 mt-5">
          {post.map((blog, index) => (
            <BlogCard
              key={index}
              image={blog.image}
              title={blog.title}
              excerpt={blog.description}
              author={blog.author}
              category={blog.category}
              id={blog._id}
              publishedAt={blog.createdAt}

            />
          ))}
        </div>
      </section>

      <section className="h-full w-full  mt-24 ">
        <h1 className="text-header font-heading font-bold text-secondary">
          Frequently Asked Questions
        </h1>
        <div className="flex justify-center items-center mt-5 w-[100%] mx-auto mb-2 ">

          <div className="flex flex-col gap-5">
            {faq.map((item, index) => (
              <div
                key={index}
                className="w-full mx-auto rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex items-start gap-4 px-5 py-4 cursor-pointer"
                onClick={() => setShow(show == index ? null : index)}
              >

                {/* Text section */}
                <div className="flex-1">
                  <h2 className="text-base md:text-lg font-semibold text-gray-800 leading-snug">
                    {item.question}
                  </h2>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${show === index ? "max-h-40 mt-2 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed ">
                      {item.answer}
                    </p>
                  </div>
                </div>

                {/* Icon */}
                <div className="text-gray-500 mt-1 flex-shrink-0">
                  {show == index ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </div>

              </div>
            ))}


          </div>
        </div>
      </section>
      <Footer />

    </div>
  );
};

export default Dashboard;
