import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-600 py-4 text-center text-sm sm:text-base w-full">
            <div className="flex flex-col md:flex-row items-center md:justify-around justify-center space-y-3 md:space-y-0 md:space-x-6">
                
                {/* Logos */}
                <div className="flex space-x-4">
                    <a href="https://dogpay.info" target="_blank" rel="noopener noreferrer">
                        <img src="/dogpay_logo.png" className="h-[24px] md:h-[28px]" alt="DogPay Logo" />
                    </a>
                    <a href="https://valswappa.com/" target="_blank" rel="noopener noreferrer">
                        <img src="/valswappa_logo_2.png" className="h-[24px] md:h-[28px]" alt="Valswappa Logo" />
                    </a>
                </div>

                {/* Copyright & Contact Info */}
                <p className="text-center md:text-left">
                    &copy; 2025 Ugly Quotes. <br className="md:hidden" />
                    <span className="block md:inline">
                        <a 
                            href="mailto:contact_us@uglyquotes.com"
                            className="text-yellow-400 hover:text-yellow-500 transition"
                        >
                            contact_us@uglyquotes.com
                        </a>
                    </span>
                </p>
            </div>
        </footer>
    )
}

export default Footer;
