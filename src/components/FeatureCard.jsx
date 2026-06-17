import { motion } from "framer-motion";
import React from "react";

const FeatureCard = ({ icon, title, description, cardVariants }) => {
  const Icon = icon
  return (
    <motion.div
      key={title}
      whileHover={{ y: -10, scale: 1.05 }}
      className=" absolute  border bg-background-light border-stone-300 rounded-xl h-70 w-70  shadow-sm hover:shadow-lg px-3 "
      variants={cardVariants}
    >
     

      {/* Icon */}
      <div className="mb-6 mt-3 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-[#DBA59A] text-accent">
        <Icon color="#fff" />
      </div>

      {/* Title */}
      <h3 className="mb-4 text-title font-bold text-primary text-center">
        {title}
      </h3>

      {/* Description */}
      <p className="text-center text-small  leading-relaxed ">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;