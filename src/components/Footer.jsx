// import React from "react";
// import { Link } from "react-router-dom";
// import { FaGithub, FaInstagram } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="w-full bg-slate-950 text-gray-300 border-t border-gray-700 px-6 py-6 mt-12">
//       <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
//         {/* Navigation Links */}
//         <div className="flex flex-row items-center gap-6 text-sm font-medium">
//           <Link to="/" className="hover:underline">
//             Home
//           </Link>
//           <Link to="/about" className="hover:underline">
//             About
//           </Link>
//           <Link to="/contact" className="hover:underline">
//             Contact
//           </Link>
//         </div>

//         {/* Social Media Icons */}
//         <div className="flex items-center gap-4">
//           <a
//             href=""
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:text-white"
//           >
//             <FaGithub size={20} />
//           </a>
//           <a
//             href=""
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:text-white"
//           >
//             <FaInstagram size={20} />
//           </a>
//         </div>

//         {/* Copyright */}
//         <p className="text-xs text-center sm:text-right mt-4 sm:mt-0">
//           © 2025 TanmayKalra09. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;






// import React from "react";
// import { Link } from "react-router-dom";
// import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="w-full bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-gray-200 px-6 py-8 mt-16 border-t border-gray-700">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        
//          {/* Section 2: Navigation */}
//         <div className="flex gap-4 space-y-2">
//           <Link to="/" className="hover:text-white transition">Home</Link>
//           <Link to="/about" className="hover:text-white transition">About</Link>
//           <Link to="/contact" className="hover:text-white transition">Contact</Link>
//         </div>
        
//         {/* Section 1: Logo + Name */}
//         <div>
//           <h1 className="text-xl font-bold">SmartLog</h1>
//           <p className="text-sm mt-2">Empowering Developers through Open Source.</p>
//         </div>

       

//         {/* Section 3: Social Icons */}
//         <div className="flex flex-col items-start space-y-3">
//           <div className="flex gap-4">
//             <a href="#" className="hover:text-white"><FaGithub size={20} /></a>
//             <a href="#" className="hover:text-white"><FaInstagram size={20} /></a>
//             <a href="#" className="hover:text-white"><FaTwitter size={20} /></a>
//           </div>
//           <p className="text-xs">© 2025 TanmayKalra09. All rights reserved.</p>
//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;




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
