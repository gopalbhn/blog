import React, { useState } from "react";
import Image from "../assets/hero.png";
import { ArrowBigRight, ChevronDown, ChevronRight, FileText, NotebookPen, SendHorizonal, Settings, ShieldPlus, StickyNote, User, UserKey, UserRoundPen, Users } from "lucide-react";
import GradientButton from "@/components/ui/button-1";
import { useNavigate } from "react-router-dom";
import ShinyButton from "@/components/ui/shiny-button";
import FeatureCard from "@/components/FeatureCard";
import { motion, transform } from "framer-motion";
import Footer from "@/components/Footer";
import Button from "@/components/ui/button";
import { faq, features } from "../lib/data.js"
import { blogs } from "@/lib/data";
import BlogCard from "@/components/BlogCard";
const Dashboard = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(null)

  return (
    <div className="h-full  px-10 space-y-10">
      <div className="h-full w-full grid grid-cols-2 gap-10 items-start mt-10 ">
        <div>
          <p className="text-md font-semibold text-primary mb-2 flex items-center gap-2 ">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span> Trusted by 5,000+ Bloggers Worldwide
          </p>
          <h1 className="text-hero font-extrabold font-heading tracking-tight uppercase text-primary mb-2 ">
            Manage, Publish & Grow Your Blog
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
          <div className="mt-5 flex items-center gap-5">
            <Button
              variant={"gradient"}
              onClick={() => navigate("/blog")}
              height={60}
              width={250}
            >
              Get Started
            </Button>
            <Button
              onClick={() => navigate("/blog")}
              height={60}
              width={250}
              className="rounded-xl "
            >
              Explore Features
            </Button>
          </div>
        </div>
        <div className="h-110  bg-gray-200 rounded-xl shadow-md flex items-center justify-center overflow-hidden">
          <img
            src={Image}
            alt="Dashboard Image"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="h-90 w-full ">
        <h1 className="text-header font-heading font-bold text-gray-900 text-center ">
          {" "}
          <span className="text-primary">Our</span> Features
        </h1>
        <motion.div
          initial="stacked"
          whileInView={"spread"}
          viewport={{ once: true }}
          transition={{
            delayChildren: 0.05,
            staggerChildren: 0.08
          }}
          className=" relative w-full  h-75 flex items-center justify-center mt-3 ">

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
            console.log(feature.icon)
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
      </div>
      <div className="h-95 w-full  ">
        <h1 className="text-header font-heading font-bold  text-center">Recent <span className="text-primary">Blogs</span></h1>
        <div className="w-full grid grid-cols-4 gap-5 mt-5">
          {blogs.slice(0, 4).map((blog, index) => (
            <BlogCard
              key={index}
              image={blog.image}
              title={blog.title}
              excerpt={blog.excerpt}
              author={blog.author}
              category={blog.category}
              avatar={blog.avatar}
              publishedAt={blog.publishedAt}
            />
          ))}
        </div>
      </div>

      <div className="h-full w-full   ">
        <h1 className="text-header font-heading font-bold text-gray-900 text-center mt-5">
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
      </div>
      <Footer />

    </div>
  );
};

export default Dashboard;
