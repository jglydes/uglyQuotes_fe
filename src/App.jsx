import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateImage } from "./utils/generateImage";
import axios from "axios";

import QuoteBox from "./components/QuoteBox";
import Footer from "./components/Footer"
import LanguageSelector from "./components/LanguageSelector";
import QuoteSkeleton from "./components/QuoteSkeleton";
import ColorPicker from "./components/ColorPicker";


const initialQuotes = [
  "Life is like a roll of toilet paper, sometimes it's just full of crap.",
  "If life gives you lemons, just squirt them back in life's eye and make a margarita.",
  "I'm not lazy, I'm just in energy-saving mode for the important stuff in life, like naps and snacks.",
  "Life is like a box of chocolates, half the time you don't know what you're gonna get, and the other half is filled with calories.",
  "I'm not arguing, I'm just explaining why I'm right about everything in life.",
  'Life is short, so smile while you still have teeth, and laugh until you snort.'
]


const App = () => {
  const numberOfQuotesToDisplay = 6
  const [quotes, setQuotes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [language, setLanguage] = useState("english");
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [editedQuote, setEditedQuote] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [selectedFont, setSelectedFont] = useState("Arial, sans-serif")
  const [selectedFontColor, setSelectedFontColor] = useState("#1f2937")
  const [selectedBgColor, setSelectedBgColor] = useState("#f3f4f6")

  const [allQuotes, setAllQuotes] = useState([]); // Store 100 fetched quotes
  const [displayedQuotes, setDisplayedQuotes] = useState([]); // Store 6 quotes at a time
  const [quoteIndex, setQuoteIndex] = useState(0); // Track which quotes are being displayed


  useEffect(() => {
    console.log("use effect")
    setAllQuotes(initialQuotes);
    setDisplayedQuotes(initialQuotes.slice(0, 6));
    setQuoteIndex(6);
  }, []);

  const fetchRandomQuotes = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/generate-quotes`,
        { keyword: "life", number: 6, language }
      );
      if (response.data?.parsedQuotes) {
        setAllQuotes(response.data.parsedQuotes); // Store 100 quotes
        setDisplayedQuotes(response.data.parsedQuotes.slice(0, 6)); // Show first 6
        setQuoteIndex(6); // Track the next batch
      }
    } catch (error) {
      console.error("Error fetching random quotes:", error);
    }
  };

  const fetchQuotes = async (newKeyword) => {
    console.log("fetching quotes")
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/generate-quotes`,
            { keyword: newKeyword, number: 30, language }
        );

        if (response.data?.parsedQuotes) {
            setAllQuotes(response.data.parsedQuotes); // Store 100 quotes
            setDisplayedQuotes(response.data.parsedQuotes.slice(0, 6)); // Show first 6
            setQuoteIndex(6); // Track the next batch
        }
    } catch (error) {
        console.error("Error fetching quotes:", error);
    }
  };

  const loadMoreQuotes = () => {
    if (quoteIndex < allQuotes.length) {
        console.log("more quotes available")
        // Load the next 6 quotes from stored quotes
        setDisplayedQuotes(allQuotes.slice(quoteIndex, quoteIndex + 6));
        setQuoteIndex(quoteIndex + 6);
    } else {
      console.log("fetching new quotes")
        // If all 100 quotes are used, fetch more quotes for the same keyword
        fetchQuotes(keyword);
    }
  };

  const handleSubmit = async (e) => {
    console.log("handle submit")
    e.preventDefault();

    if (keyword.trim()) {
        // Reset stored quotes & index before fetching new ones
        setAllQuotes([]);
        setDisplayedQuotes([]);
        setQuoteIndex(0);

        // Call fetchQuotes for the new keyword
        fetchQuotes(keyword);
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
              <AnimatePresence>
                {allQuotes.length === 0
                  ?
                    [...Array(3)].map((_, index) => <QuoteSkeleton key={index} align={index % 2 === 0 ? "right" : "left"}/>)
                  : 
                    displayedQuotes.slice(0, 3).map((quote, index) => (
                      <QuoteBox
                        key={index}
                        quote={quote}
                        align={index % 2 === 0 ? "right" : "left"}
                        onClick={() => handleQuoteClick(quote)}
                      />
                    ))
                }
              </AnimatePresence>
            </div>

            {/* Center Section (Title, Input, Button) */}
            <div className="flex flex-col items-center justify-center space-y-4 space-x-4 text-center">
          
              <img src="/uglysize2.png" />

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
                
                <div className="flex flex-col items-center space-y-4">

                    {/* Show "Load More" Button Only If Quotes Exist */}
                    {allQuotes.length > numberOfQuotesToDisplay && (
                        <motion.button
                            type="button"
                            onClick={loadMoreQuotes}
                            className="!bg-blue-500 hover:!bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
                            whileHover={{ scale: 1.1, rotate: [0, -2, 2, -2, 0] }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Load More
                        </motion.button>
                    )}
                    
                    {/* Generate Button */}
                    <motion.button
                        onClick={handleSubmit}
                        className="!bg-yellow-500 hover:!bg-yellow-600 text-gray-900 px-6 py-2 rounded-lg font-bold"
                        whileHover={{ scale: 1.1, rotate: [0, -2, 2, -2, 0] }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Generate Quotes
                    </motion.button>

                    
                </div>
              </form>
            </div>

            {/* Right Section (Quotes) */}
            <div className="flex flex-col justify-center items-start p-6 space-y-8">
              <AnimatePresence>
                {allQuotes.length === 0
                  ?
                    [...Array(3)].map((_, index) => <QuoteSkeleton key={index} align={index % 2 === 0 ? "left" : "right"}/>)
                  :
                    displayedQuotes.slice(3, 6).map((quote, index) => (
                      <QuoteBox
                        key={index}
                        quote={quote}
                        align={index % 2 === 0 ? "left" : "right"}
                        onClick={() => handleQuoteClick(quote)}
                      />
                    ))
                }
              </AnimatePresence>
            </div>

          </div>

          {/* SMALL SCREEN: Stacked Layout */}
          <div className="md:hidden flex flex-col items-center space-y-6 w-full">
            {/* Title, Input, and Button */}
            <div className="flex flex-col items-center text-center">
              <img src="/uglysize2.png" />

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
                
                <div className="flex flex-col items-center space-y-4">
                    {/* Generate Button */}
                    <motion.button
                        onClick={handleSubmit}
                        className="!bg-yellow-500 hover:!bg-yellow-600 text-gray-900 px-6 py-2 rounded-lg font-bold"
                        whileHover={{ scale: 1.1, rotate: [0, -2, 2, -2, 0] }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Generate Quotes
                    </motion.button>

                    {/* Show "Get More Quotes" Button Only If Quotes Exist */}
                    {allQuotes.length > numberOfQuotesToDisplay && (
                        <motion.button
                            onClick={loadMoreQuotes}
                            className="!bg-blue-500 hover:!bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
                            whileHover={{ scale: 1.1, rotate: [0, -2, 2, -2, 0] }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                          Load More
                        </motion.button>
                    )}
                </div>
              </form>
            </div>

            {/* Quotes (Stacked) */}
            <div className="flex flex-col items-center space-y-4">
              {allQuotes.map((quote, index) => (
                <QuoteBox key={index} quote={quote} onClick={() => handleQuoteClick(quote)} />
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

                
                <ColorPicker label="Font Color" selectedColor={selectedFontColor} setSelectedColor={setSelectedFontColor} />
                <ColorPicker label="Background Color" selectedColor={selectedBgColor} setSelectedColor={setSelectedBgColor} />
                
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
