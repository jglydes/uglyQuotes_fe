import React, { useState, useEffect } from "react";
import QuoteBox from "./components/QuoteBox";
import LanguageSelector from "./components/LanguageSelector";
import { FaLaughBeam } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [language, setLanguage] = useState("english");

  useEffect(() => {
    fetchRandomQuotes();
  }, []);

  const fetchRandomQuotes = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/generate-quotes`,
        { keyword: "life" }
      );
      if (response.data?.parsedQuotes) {
        setQuotes(response.data.parsedQuotes);
      }
    } catch (error) {
      console.error("Error fetching random quotes:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/generate-quotes`,
          { keyword, language }
        );
        if (response.data?.parsedQuotes) {
          setQuotes(response.data.parsedQuotes);
        }
      } catch (error) {
        console.error("Error generating quotes:", error);
      }
    }
  };

  return (
    <div className="min-h-screen text-gray-900 flex flex-col justify-between">
      {/* Title & Input Section */}
      <div className="flex flex-col items-center px-4 pt-6">
        <div className="text-center mb-6">
          <FaLaughBeam className="text-yellow-500 text-5xl sm:text-6xl mx-auto" />
          <motion.h1
            className="text-3xl sm:text-4xl font-bold mt-2"
            animate={{ rotate: [0, -1, 1, -1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Ugly Quotes
          </motion.h1>
        </div>
        <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-lg gap-3">
            <input
              type="text"
              placeholder="Enter a keyword..."
              className="w-full px-4 py-2 rounded-lg text-gray-800 border border-gray-200"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <LanguageSelector setLanguage={setLanguage} />
          </div>

          <motion.button
            type="submit"
            className="mt-4 !bg-yellow-500 hover:!bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-bold"
            whileHover={{ scale: 1.1, rotate: [0, -2, 2, -2, 0] }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Generate
          </motion.button>
        </form>
        
      </div>

      {/* Quote Boxes (Stacked on Small Screens, Row on Large Screens) */}
      <div className="flex flex-col md:flex-row md:justify-center items-center w-full p-4 gap-4">
        <AnimatePresence>
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <QuoteBox quote={quote} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 text-center text-sm sm:text-base">
        <p>
          &copy; 2025 Ugly Quotes.{" "}
          <a href="#contact" className="underline text-yellow-400 hover:text-yellow-500">
            Contact Us
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
