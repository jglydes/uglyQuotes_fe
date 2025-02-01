import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";

const QuoteBox = ({ quote, align, onClick }) => {
  return (
    <motion.div
      className={`text-gray-600 shadow-lg rounded-lg p-4 max-w-[300px] border border-gray-300 bg-gray-200 cursor-pointer ${
        align === "left" ? "self-start" : "self-end"
      }`}
      whileHover={{ scale: 1.1, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)" }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
    >
      <div className="flex items-center justify-start">
        <FaQuoteLeft className="text-sm" />
      </div>
      <p className="mt-2 text-center text-lg">{quote}</p>
      <div className="flex items-center justify-end">
        <FaQuoteRight className="text-sm" />
      </div>
    </motion.div>
  );
};

export default QuoteBox;
