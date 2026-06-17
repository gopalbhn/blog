import { Clock } from "lucide-react";
import { motion } from "framer-motion";

const BlogCard = ({
  image,
  category,
  title,
  excerpt,
  author,
  avatar,
  publishedAt,
}) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      className="
    w-70
    h-70
    overflow-hidden
    rounded-xl
    border
    border-stone-300
    bg-background-light
    shadow-sm
    hover:shadow-lg
    flex flex-col
    relative
  "
    >
      <img
        src={image}
        alt={title}
        className="h-34 w-full object-cover shrink-0"
      />

      <div className="flex flex-col flex-1 p-3">
        <span
          className=" absolute top-5 left-3 inline-block w-fit rounded-xl bg-[#DBA59A] px-2 py-1 text-[8px] font-semibold uppercase tracking-wide text-white absolute"
        >
          {category}
        </span>

        <h3 className="mt-2 text-sm font-bold text-secondary line-clamp-2">
          {title}
        </h3>

        <p className="mt-1 text-xs text-stone-600 line-clamp-2 flex-1">
          {excerpt}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <img
            src={avatar}
            alt={author}
            className="h-7 w-7 rounded-full object-cover"
          />

          <div className="min-w-0">
            <p className="text-xs font-semibold text-secondary truncate">
              {author}
            </p>

            <div className="flex items-center gap-1 text-[10px] text-stone-500">
              <Clock size={10} />
              <span>{publishedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;