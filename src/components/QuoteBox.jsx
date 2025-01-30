// import React, { useMemo } from "react";
// import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
// import { motion } from "framer-motion";

// const textColors = [
//   "bg-red-400",
//   "bg-blue-400",
//   "bg-green-400",
//   "bg-yellow-400",
//   "bg-purple-400",
//   "bg-pink-400",
//   "bg-teal-400",
//   "bg-indigo-400",
//   "bg-orange-400",
// ];

// const fontSizes = [
//   { size: "sm", width: "w-48" },
//   { size: "base", width: "w-56" },
//   { size: "lg", width: "w-64" },
//   { size: "xl", width: "w-72" },
//   { size: "2xl", width: "w-80" },
//   { size: "3xl", width: "w-96" },
// ];

// const fonts = ["font-serif", "font-sans", "font-mono", "italic", "Comic Sans MS", "Chalkboard SE", "cursive"];
// const fontWeights = ["font-thin", "font-light", "font-normal", "font-bold"];
// const rotateAngles = ["-6deg", "-4deg", "0deg", "4deg", "6deg"];

// const QuoteBox = ({ quote }) => {
//   const styles = useMemo(() => {
//     return {
//       textColor: textColors[Math.floor(Math.random() * textColors.length)],
//       fontSize: fontSizes[Math.floor(Math.random() * fontSizes.length)],
//       font: fonts[Math.floor(Math.random() * fonts.length)],
//       fontWeight: fontWeights[Math.floor(Math.random() * fontWeights.length)],
//       rotate: rotateAngles[Math.floor(Math.random() * rotateAngles.length)],
//     };
//   }, [quote]);

//   return (
//     <motion.div
//       className={`text-white shadow-lg rounded-lg p-4 border border-gray-300 ${styles.textColor} ${styles.fontSize.width} ${styles.font} ${styles.fontWeight}`}
//       //whileHover={{ scale: 1.1, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)" }}
//       whileHover={{ 
//         scale: 1.1, 
//         boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
//         rotate: styles.rotate // Preserve original rotation
//       }}
//       transition={{ type: "spring", stiffness: 300 }}
//       style={{ transform: `rotate(${styles.rotate})`, minWidth: "200px", maxWidth: "280px" }}
//     >
//       <div className="flex items-center justify-start">
//         <FaQuoteLeft className="text-sm" />
//       </div>
//       <p className="mt-2 text-center">{quote}</p>
//       <div className="flex items-center justify-end">
//         <FaQuoteRight className="text-sm" />
//       </div>
//     </motion.div>
//   );
// };

// export default QuoteBox;


import React, { useMemo } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";

const textColors = [
  "text-red-500",
  "text-blue-500",
  "text-green-500",
  "text-yellow-500",
  "text-purple-500",
  "text-pink-500",
  "text-teal-500",
  "text-indigo-500",
];

const bgColors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-teal-400",
  "bg-indigo-400",
];

const fontSizes = [
  { size: "text-sm", width: "w-full md:w-48" },
  { size: "text-base", width: "w-full md:w-56" },
  { size: "text-lg", width: "w-full md:w-64" },
  { size: "text-xl", width: "w-full md:w-72" },
  { size: "text-2xl", width: "w-full md:w-80" },
  { size: "text-3xl", width: "w-full md:w-96" },
  { size: "text-4xl", width: "w-full md:w-[28rem]" },
  { size: "text-5xl", width: "w-full md:w-[32rem]" },
];

const fonts = [
  "font-serif",
  "font-sans",
  "font-mono",
  "italic",
  "font-extrabold",
];

const fontWeights = [
  "font-thin",
  "font-light",
  "font-normal",
  "font-medium",
  "font-semibold",
  "font-bold",
  "font-extrabold",
];

const rotateAngles = [
  "-6deg",
  "-4deg",
  "-2deg",
  "0deg",
  "2deg",
  "4deg",
  "6deg",
];

const QuoteBox = ({ quote }) => {
  const hasBgColor = Math.random() > 0.5; // 50% chance to have bg & border
  const styles = useMemo(() => {
    return {
      textColor: hasBgColor ? "text-white" : textColors[Math.floor(Math.random() * textColors.length)],
      bgColor: hasBgColor ? bgColors[Math.floor(Math.random() * bgColors.length)] : "",
      border: hasBgColor ? "border border-gray-300" : "",
      fontSize: fontSizes[Math.floor(Math.random() * fontSizes.length)],
      font: fonts[Math.floor(Math.random() * fonts.length)],
      fontWeight: fontWeights[Math.floor(Math.random() * fontWeights.length)],
      rotate: rotateAngles[Math.floor(Math.random() * rotateAngles.length)],
    };
  }, [quote]);

  return (
    <motion.div
      className={`${hasBgColor ? "shadow-lg": null} rounded-lg p-4 md:p-6 mx-auto mb-4 ${styles.bgColor} ${styles.border} ${styles.fontSize.width} ${styles.font} ${styles.fontWeight} ${styles.textColor} max-w-full`}
      initial={{ rotate: styles.rotate }} 
      whileHover={{ 
        scale: 1.1, 
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
        rotate: styles.rotate 
      }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{ transform: `rotate(${styles.rotate})` }}
    >
      <div className="flex items-center justify-start">
        <FaQuoteLeft className="text-sm" />
      </div>
      <p className={`mt-2 text-center ${styles.fontSize.size} leading-snug md:leading-normal`}>
        {quote}
      </p>
      <div className="flex items-center justify-end">
        <FaQuoteRight className="text-sm" />
      </div>
    </motion.div>
  );
};

export default QuoteBox;

