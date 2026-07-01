import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const BlogCard = ({
  image,
  category,
  title,
  excerpt,
  author,
  publishedAt,
  id,
}) => {

  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      className="
    w-70
    h-full
    mx-auto
    overflow-hidden
    rounded-xl
    border
    border-stone-300
    bg-background-light
    shadow-sm
    hover:shadow-lg
    flex flex-col
    relative
    group
  "

    >
      <div className="h-34 w-full  relative  ">

        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover shrink-0 group-hover:scale-105 transition-all duration-300 ease-in-out "
        />
        <div className="absolute inset-0 group-hover:bg-black/10  " />
      </div>

      <div className="flex flex-col flex-1 p-3">
        <span
          className=" absolute top-5 left-3 inline-block w-fit rounded-xl bg-accent-light text-accent px-2 py-1 text-[8px] font-semibold uppercase tracking-wide "
        >
          {category}
        </span>

        <h3 className="mt-2 text-sm font-bold text-secondary line-clamp-2">
          {title}
        </h3>

        <p className="mt-1 text-xs  line-clamp-2 flex-1">
          {excerpt}
        </p>

        <div className="mt-2 flex items-center justify-between mb-3">


          <div className="min-w-0 " >
            <p className="text-xs font-semibold text-secondary truncate">
              {author.name}
            </p>

            <div className="flex items-center gap-1 text-[10px] text-stone-500 ">
              <Clock size={10} />
              <span>{new Date(publishedAt).toDateString()}</span>
            </div>
          </div>
          <Link to={`/blog/${id}`} className="text-xs text-accent flex items-center gap-1 group hover:animate-pulse">
            Read more
            <ArrowRight size={16} className="text-xs  transform transition-all  group-hover:translate-x-2 duration-1000 " />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;