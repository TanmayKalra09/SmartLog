import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-gray-200 px-6 py-8 mt-16 border-t border-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Section 2: Navigation */}
        <div className="flex  gap-4 space-y-2">
          <Link
            to="/"
            className="hover:text-white transition-transform duration-300 hover:scale-105"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-white transition-transform duration-300 hover:scale-105"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-white transition-transform duration-300 hover:scale-105"
          >
            Contact
          </Link>
        </div>

        {/* Section 1: Logo + Name */}
        <div>
          <h1 className="text-xl font-bold animate-pulse">SmartLog</h1>
          <p className="text-sm mt-2">Track your expenses and take control of your finances.</p>
        </div>

        {/* Section 3: Social Icons */}
        <div className="flex flex-col items-start space-y-3">
          <div className="flex gap-4">
            <a
              target="_blank"
              href="https://github.com/TanmayKalra09"
              className="hover:text-white transition-transform duration-300 hover:scale-125 hover:-translate-y-1"
            >
              <FaGithub size={20} />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/tanmaykalraa/"
              className="hover:text-white transition-transform duration-300 hover:scale-125 hover:-translate-y-1"
            >
              <FaInstagram size={20} />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/tanmay-kalra-09oct/"
              className="hover:text-white transition-transform duration-300 hover:scale-125 hover:-translate-y-1"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              target="_blank"
              href="#"
              className="hover:text-white transition-transform duration-300 hover:scale-125 hover:-translate-y-1"
            >
              <FaTwitter size={20} />
            </a>
          </div>
          <p className="text-xs">© 2025 TanmayKalra09. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
