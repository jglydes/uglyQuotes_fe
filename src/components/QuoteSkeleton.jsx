import React from "react";
import ContentLoader from "react-content-loader";
import { motion } from "framer-motion";

const QuoteSkeleton = ({align}) => {
  return (
    <motion.div
      className={`text-gray-600 shadow-lg rounded-lg p-4 max-w-[300px] border border-gray-300 bg-gray-200 cursor-pointer ${
        align === "left" ? "self-start" : "self-end"
      }`}
      whileHover={{ scale: 1.1, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
        <ContentLoader 
            speed={2}
            width={240}
            height={120}
            viewBox="0 0 300 120"
            backgroundColor="#ebe6e7"
            foregroundColor="#909cac"
        >
            <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
            <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
            <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
        </ContentLoader>

    </motion.div>
    
  );
};

export default QuoteSkeleton;
