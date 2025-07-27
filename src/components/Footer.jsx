import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-950 text-gray-300 border-t border-gray-700 px-6 py-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Navigation Links */}
        <div className="flex flex-row items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/TanmayKalra09"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.instagram.com/tanmaykalraa/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaInstagram size={20} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-center sm:text-right mt-4 sm:mt-0">
          © 2025 TanmayKalra09. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
