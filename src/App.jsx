import React, { useState, useEffect } from "react";
import QuoteBox from "./components/QuoteBox";
import Footer from "./components/Footer"
import LanguageSelector from "./components/LanguageSelector";
import { motion } from "framer-motion";
import { generateImage } from "./utils/generateImage";
import axios from "axios";

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [language, setLanguage] = useState("english");
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [editedQuote, setEditedQuote] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [selectedFont, setSelectedFont] = useState("Arial, sans-serif")
  const [selectedFontColor, setSelectedFontColor] = useState("#1f2937")
  const [selectedBgColor, setSelectedBgColor] = useState("#f3f4f6")

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

  // Handle selecting a quote
  const handleQuoteClick = (quote) => {
    setSelectedQuote(quote);
    setEditedQuote(quote); // Pre-fill the editable text box
  };

  // Handle returning to the main view
  const handleBack = () => {
    setSelectedQuote(null);
  };

  
  const downloadQuote = () => {
    // Trigger image download
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "uglyquote.png";
    link.click();
  }

  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-900">

      {!selectedQuote ? (
        <>
          {/* LARGE SCREEN: Three sections layout */}
          <div className="hidden flex-1 md:grid grid-cols-3 gap-4 w-full max-w-8xl">
            {/* Left Section (Quotes) */}
            <div className="flex justify-center flex-col items-end p-6 space-y-8">
              {quotes.slice(0, 3).map((quote, index) => (
                <QuoteBox
                  key={index}
                  quote={quote}
                  align={index % 2 === 0 ? "right" : "left"}
                  onClick={() => handleQuoteClick(quote)}
                />
              ))}
            </div>

            {/* Center Section (Title, Input, Button) */}
            <div className="flex flex-col items-center justify-center space-y-4 space-x-4 text-center">
          
              <img src="/uglysize1.png" />

              <form className="flex flex-col space-y-3 w-full" onSubmit={handleSubmit}>
                <div className="flex items-center space-x-2">
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
                  className="!bg-yellow-500 hover:!bg-yellow-600 text-gray-900 px-6 py-2 rounded-lg font-bold"
                  whileHover={{ scale: 1.1, rotate: [0, -2, 2, -2, 0] }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Generate
                </motion.button>
              </form>
            </div>

            {/* Right Section (Quotes) */}
            <div className="flex flex-col justify-center items-start p-6 space-y-8">
              {quotes.slice(3, 6).map((quote, index) => (
                <QuoteBox
                  key={index}
                  quote={quote}
                  align={index % 2 === 0 ? "left" : "right"}
                  onClick={() => handleQuoteClick(quote)}
                />
              ))}
            </div>
          </div>

          {/* SMALL SCREEN: Stacked Layout */}
          <div className="md:hidden flex flex-col items-center space-y-6 w-full">
            {/* Title, Input, and Button */}
            <div className="flex flex-col items-center text-center">
              <img src="/uglysize1.png" />

              <form className="flex flex-col space-y-3 w-full px-4" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center space-y-2">
                  <input
                    type="text"
                    placeholder="Enter a keyword..."
                    className="w-full px-4 py-2 rounded-lg text-gray-800 border border-gray-200"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <LanguageSelector setLanguage={setLanguage} />
                </div>
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2 rounded-lg font-bold"
                >
                  Generate
                </button>
              </form>
            </div>

            {/* Quotes (Stacked) */}
            <div className="flex flex-col items-center space-y-4">
              {quotes.map((quote, index) => (
                <QuoteBox key={index} quote={quote} onClick={() => setSelectedQuote(quote)} />
              ))}
            </div>
          </div>
        </>
      ) : (
        
        <div className="flex flex-col items-center justify-center flex-1 p-0 md:p-6 w-full">
          {/* Back Button */}
          <motion.button
            type="submit"
            className="!bg-yellow-500 hover:!bg-yellow-600 text-gray-900 px-6 py-2 rounded-lg font-bold"
            whileHover={{ scale: 1.1, rotate: [0, -2, 2, -2, 0] }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => {
              setSelectedQuote(null);
              setImageURL(null);
              setSelectedFont("Arial, sans-serif");
              setSelectedFontColor("#1f2937");
              setSelectedBgColor("#f3f4f6");
            }}
          >
            Back to Quotes
          </motion.button>

          {/* Main Content Container */}
          <div className="flex flex-col md:flex-row items-center justify-center flex-1 w-full max-w-5xl gap-8 md:gap-12">
            {/* LEFT SECTION: Quote Editing */}
            <div className="flex flex-col flex-1 p-6 md:p-8 w-full max-w-lg min-h-[480px]">
              <h4 className="text-lg font-semibold text-gray-700">Edit Your Quote & Share</h4>

              {/* Editable Textarea */}
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 text-center text-lg resize-none"
                rows="4"
                value={editedQuote}
                onChange={(e) => setEditedQuote(e.target.value)}
              ></textarea>

              {/* Font & Color Selection */}
              <div className="mt-6 space-y-4">
                {/* Font Selection */}
                <div className="flex flex-col">
                  <label className="text-gray-700">Choose Font</label>
                  <select
                    className="border px-3 py-2 rounded-lg w-full text-gray-800 text-lg"
                    value={selectedFont}
                    onChange={(e) => setSelectedFont(e.target.value)}
                  >
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="'Comic Sans MS', cursive">Comic Sans</option>
                    <option value="'Courier New', monospace">Courier New</option>
                    <option value="'Georgia', serif">Georgia</option>
                    <option value="'Times New Roman', serif">Times New Roman</option>
                  </select>
                </div>

                {/* Font Color Selection */}
                <div className="flex items-center space-x-4">
                  <label className="text-gray-700">Font Color</label>
                  <div
                    className="w-8 h-8 rounded-full border border-gray-400 cursor-pointer"
                    style={{ backgroundColor: selectedFontColor }}
                    onClick={() => document.getElementById("fontColorPicker").click()}
                  ></div>
                  <input
                    type="color"
                    id="fontColorPicker"
                    className="hidden"
                    value={selectedFontColor}
                    onChange={(e) => setSelectedFontColor(e.target.value)}
                  />
                </div>

                {/* Background Color Selection */}
                <div className="flex items-center space-x-4">
                  <label className="text-gray-700">Background Color</label>
                  <div
                    className="w-8 h-8 rounded-full border border-gray-400 cursor-pointer"
                    style={{ backgroundColor: selectedBgColor }}
                    onClick={() => document.getElementById("bgColorPicker").click()}
                  ></div>
                  <input
                    type="color"
                    id="bgColorPicker"
                    className="hidden"
                    value={selectedBgColor}
                    onChange={(e) => setSelectedBgColor(e.target.value)}
                  />
                </div>
              </div>

              {/* Generate Image Button */}
              <button
                onClick={() => generateImage(editedQuote, setImageURL, selectedFont, selectedFontColor, selectedBgColor)}
                className="mt-6 !bg-blue-500 hover:!bg-blue-600 text-white px-6 py-2 rounded-lg text-lg shadow-md transition"
              >
                Convert to Image
              </button>
            </div>

            {/* RIGHT SECTION: Image Preview */}
            <div className="flex flex-col flex-1 p-6 md:p-8 w-full max-w-lg min-h-[480px]">
              <h4 className="text-lg font-semibold text-gray-700">Preview</h4>

              {/* Display Generated Image */}
              {imageURL ? (
                <div className="mt-4 flex flex-col items-center space-y-4">
                  <img src={imageURL} alt="Generated Quote" className="w-full max-w-sm rounded-lg shadow-md" />
                  <button
                    onClick={downloadQuote}
                    className="!bg-green-500 hover:!bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow-md transition"
                  >
                    Download Quote
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <p className="text-gray-500 text-lg">No image generated yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>


      
      ) 
    }

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
