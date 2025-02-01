import React from "react";

const LanguageSelector = ({setLanguage}) => {
  return (
    <div>
      <select
        className="bg-[#1b6c9b] text-white px-4 py-2 rounded-lg"
        onChange={(e) => {
          console.log(`Language changed to: ${e.target.value}`)
          setLanguage(e.target.value)
        }}
      >
        <option value="english">English</option>
        <option value="spanish">Spanish</option>
        <option value="french">French</option>
        <option value="chinese">Chinese</option>
        <option value="russian">Russian</option>
        <option value="filipino">Filipino</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
