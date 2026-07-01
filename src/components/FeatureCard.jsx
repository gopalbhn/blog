import { motion } from "framer-motion";
import React from "react";

const FeatureCard = ({ icon, title, description, cardVariants }) => {
  const Icon = icon
  return (
    <motion.div
      key={title}
      whileHover={{ y: -10, scale: 1.05 }}
      className=" lg:absolute  hover:border bg-surface border-stone-300 rounded-xl h-70 w-65  shadow-sm hover:shadow-lg px-3  mx-auto lg:mx-0 "
      variants={cardVariants}
    >



      <div className="mb-2 mt-3 flex h-15 w-15  items-center justify-center rounded-full bg-accent-light text-accent">
        <Icon />
      </div>

      <h3 className="mb-4 text-title font-bold text-secondary  ">
        {title}
      </h3>

      <p className=" text-small leading-relaxed ">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;