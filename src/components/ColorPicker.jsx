import React, { useState, useEffect } from "react";

// Detect device type
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
const isAndroid = /Android/i.test(navigator.userAgent);

const ColorPicker = ({ label, selectedColor, setSelectedColor }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    // Toggle dropdown for iOS users
    const handleDropdown = () => {
        if (isIOS) {
            setShowDropdown(!showDropdown);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <label className="text-gray-700">{label}</label>
            {/* Clickable Color Box */}
            {isIOS && (
                <>
                    <div
                        className="w-8 h-8 rounded-full border border-gray-400 cursor-pointer"
                        style={{ backgroundColor: selectedColor }}
                        onClick={handleDropdown}
                    >
                    </div>


                    {showDropdown && (
                        <select
                            className="border px-3 py-2 rounded-lg"
                            value={selectedColor}
                            onChange={(e) => {
                            setSelectedColor(e.target.value);
                            setShowDropdown(false);
                            }}
                        >
                            <option value="#1f2937">Dark Gray</option>
                            <option value="#ff0000">Red</option>
                            <option value="#00ff00">Green</option>
                            <option value="#0000ff">Blue</option>
                            <option value="#ffff00">Yellow</option>
                            <option value="#ffffff">White</option>
                            <option value="#000000">Black</option>
                        </select>
                    )}
                </>
            )}

            {/* Native Color Picker for Android & Web */}
            {!isIOS && (
                <>
                    <div
                        className="w-8 h-8 rounded-full border border-gray-400 cursor-pointer"
                        style={{ backgroundColor: selectedColor }}
                        onClick={() => document.getElementById("colorPicker").click()}
                    ></div>
                    <input
                        type="color"
                        id="colorPicker"
                        className="absolute opacity-0 w-0 h-0"
                        defaultValue={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                    />
                </>
            )}
        </div>
    );
};

export default ColorPicker;
