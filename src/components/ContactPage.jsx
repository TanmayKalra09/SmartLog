import React, { useState, useEffect } from 'react';
// Import specific icons from lucide-react. This is the correct way to import them.
import { Send, User, Mail, MessageSquare, BookOpen, CheckCircle, XCircle, MapPin, Phone, Linkedin, Twitter, Github, Sun, Moon } from 'lucide-react';

// Footer Component: Displays copyright information.
const Footer = () => {
    return (
        <footer className="bg-transparent text-center py-4 text-gray-500 relative z-10">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </footer>
    );
};

// App Component: Main entry point, manages dark mode and renders ContactPage.
export default function App() {
    // State to manage the dark mode toggle
    const [darkMode, setDarkMode] = useState(false);
    
    // Placeholder function for navigation. Can be expanded with React Router if needed.
    const navigateTo = (path) => {
        console.log(`Navigating to ${path}`);
    };

    return (
        // Render the ContactPage, passing dark mode state and setter, and navigate function
        <ContactPage 
            darkMode={darkMode} 
            navigateTo={navigateTo} 
            setDarkMode={setDarkMode} 
        />
    );
}

// ContactPage Component: Handles the contact form, UI, and email sending logic.
const ContactPage = ({ darkMode, navigateTo, setDarkMode }) => {
    // State for animating the main content card visibility
    const [isVisible, setIsVisible] = useState(false);
    // State to store form input data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    // State to store form validation errors
    const [errors, setErrors] = useState({});
    // State to track if the form is currently being submitted
    const [isSubmitting, setIsSubmitting] = useState(false);
    // State to store the result of the form submission (success or error)
    const [submissionStatus, setSubmissionStatus] = useState(null);
    // State to control the visibility of the toast notification
    const [showToast, setShowToast] = useState(false);

    // Effect to trigger the initial fade-in animation for the content card
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    // Effect to dynamically load the emailjs library as a global script.
    // This resolves "Dynamic require" errors often seen in certain environments.
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.async = true; // Load script asynchronously to not block parsing
        
        script.onload = () => {
            console.log('emailjs script loaded successfully.');
            // EmailJS library initializes itself when loaded, no explicit init needed here
            // if you're passing the public key directly in the send method.
        };
        
        script.onerror = (error) => {
            console.error('Failed to load emailjs script:', error);
        };
        
        document.body.appendChild(script); // Append the script to the document body

        // Cleanup function: remove the script from the DOM when the component unmounts
        return () => {
            // Check if the script exists before trying to remove it
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Effect to manage the auto-hiding of the toast notification
    useEffect(() => {
        if (showToast) {
            const toastTimer = setTimeout(() => {
                setShowToast(false);
                setSubmissionStatus(null); // Reset submission status after toast hides
            }, 5000); // Toast will be visible for 5 seconds
            return () => clearTimeout(toastTimer); // Cleanup timer on unmount or when toast hides
        }
    }, [showToast]); // Re-run this effect whenever showToast changes

    // Handles changes in form input fields (for controlled components)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Update the specific field
        }));
        
        // Clear any previous validation error for the current field as the user types
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: null,
        }));
    };

    // Validates the form fields before submission
    const validateForm = () => {
        let newErrors = {};
        // Check if name is empty
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        // Check if email is empty or invalid format
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        // Check if message is empty
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        
        setErrors(newErrors); // Update the errors state
        // Return true if there are no errors, false otherwise
        return Object.keys(newErrors).length === 0;
    };

    // Handles the form submission event
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default browser form submission behavior (page reload)
        setSubmissionStatus(null); // Clear previous submission status
        setShowToast(false); // Hide any currently visible toast

        // Run form validation
        if (!validateForm()) {
            return; // If validation fails, stop the submission process
        }

        setIsSubmitting(true); // Set submitting state to true to show loading indicator

        // EmailJS service credentials (replace with your actual credentials if different)
        const serviceID = 'service_sc9xokh';
        const templateID = 'template_22c3a2a';
        const publicKey = 'bcz_108RDETTP_XP4'; // Your EmailJS Public Key

        // Check if window.emailjs is available (meaning the script has loaded)
        if (window.emailjs) {
            // Send the email using EmailJS
            window.emailjs.send(serviceID, templateID, formData, publicKey)
                .then((response) => {
                    console.log('Email sent successfully!', response.status, response.text);
                    setSubmissionStatus('success'); // Set success status
                    setFormData({ name: '', email: '', subject: '', message: '' }); // Clear the form fields
                })
                .catch((err) => {
                    console.error('Failed to send email:', err);
                    setSubmissionStatus('error'); // Set error status
                })
                .finally(() => {
                    setIsSubmitting(false); // Reset submitting state regardless of success/failure
                    setShowToast(true); // Show the toast notification
                });
        } else {
            // Handle case where EmailJS library hasn't loaded (e.g., network issue)
            console.error('EmailJS library is not loaded. Cannot send email.');
            setSubmissionStatus('error');
            setIsSubmitting(false);
            setShowToast(true);
        }
    };

    return (
        // Main container div with dynamic background color and font based on dark mode
        <div className={`relative min-h-screen flex flex-col transition-colors duration-300 font-inter overflow-hidden ${
            darkMode 
                ? "bg-gray-900 text-gray-100" // Dark mode styles
                : "bg-slate-50 text-gray-900" // Light mode styles
        }`}>
            {/* Background gradient overlay, transitions with isVisible for a soft entrance */}
            <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`w-full h-full ${
                    darkMode
                        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' // Dark mode gradient
                        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50' // Light mode gradient
                }`}></div>
            </div>
            
            {/* Dark Mode Toggle button: Positioned at the top right */}
            <div className="absolute top-4 right-4 z-20">
                <button 
                    onClick={() => setDarkMode(!darkMode)} // Toggles the darkMode state
                    className={`p-2 rounded-full transition-colors duration-300 ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />} {/* Sun icon for light, moon for dark mode */}
                </button>
            </div>

            {/* Main Content Area: Centered horizontally and vertically */}
            <main className="flex-1 w-full p-4 sm:p-6 flex items-center justify-center z-10">
                <div className="max-w-5xl w-full mx-auto">
                    {/* Main Content Card: Animated with shadow, border, and blur effect */}
                    <div 
                        className={`flex flex-col md:flex-row rounded-3xl shadow-2xl border backdrop-blur-sm transition-all duration-1000 transform hover:shadow-3xl overflow-hidden ${
                            darkMode
                                ? 'border-gray-700 bg-black/30' // Dark mode card styles
                                : 'border-gray-200 bg-white/30' // Light mode card styles
                        } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} // Fade-in and slide-up animation
                    >
                        {/* Left Section: Contact Information */}
                        <div className={`w-full md:w-1/3 p-8 md:p-12 text-white flex flex-col justify-between 
                            ${darkMode ? 'bg-gray-900/80' : 'bg-blue-900/80'} rounded-l-3xl`}> {/* Dynamic background for left panel */}
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                                <p className="text-gray-300 mb-8">Feel free to reach out to us through any of these channels.</p>
                                
                                <div className="space-y-6">
                                    {/* Location Info */}
                                    <div className="flex items-center gap-4">
                                        <MapPin size={24} className="text-blue-300" />
                                        <p className="text-lg">123 Main Street, Anytown, USA</p>
                                    </div>
                                    {/* Email Info */}
                                    <div className="flex items-center gap-4">
                                        <Mail size={24} className="text-blue-300" />
                                        <p className="text-lg">info@smartlog.com</p>
                                    </div>
                                    {/* Phone Info */}
                                    <div className="flex items-center gap-4">
                                        <Phone size={24} className="text-blue-300" />
                                        <p className="text-lg">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Icons */}
                            <div className="mt-10 flex space-x-6 justify-center md:justify-start">
                                <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-200" aria-label="LinkedIn"><Linkedin size={24} /></a>
                                <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-200" aria-label="Twitter"><Twitter size={24} /></a>
                                <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-200" aria-label="GitHub"><Github size={24} /></a>
                            </div>
                        </div>

                        {/* Right Section: Get In Touch Form */}
                        <div className={`w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center 
                            ${darkMode ? 'bg-gray-800/60 text-gray-100' : 'bg-white/80 text-gray-900'} rounded-r-3xl`}> {/* Dynamic background for right panel */}
                            <h1 
                                className={`text-4xl text-center font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 transition-all duration-1000 ${
                                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                                }`}
                                style={{ transitionDelay: '200ms' }} // Delayed animation for heading
                            >
                                Get In Touch
                            </h1>
                            
                            <p 
                                className={`text-lg text-center mb-10 transition-all duration-1000 ${
                                    darkMode ? 'text-gray-300' : 'text-gray-600'
                                } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                                style={{ transitionDelay: '400ms' }} // Delayed animation for subheading
                            >
                                Have a question or feedback? We'd love to hear from you.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-7">
                                {/* Form fields with animated entry */}
                                {/* Name Input */}
                                <div className={`relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '600ms' }}>
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={20} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    </div>
                                    <input
                                        type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:ring-4 focus:ring-blue-400/50 focus:border-blue-500 outline-none transition-all duration-300 
                                            ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:bg-gray-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white'}
                                            ${errors.name ? 'border-red-500' : ''}`} // Red border if there's a validation error
                                        aria-label="Your Name"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500 font-medium">{errors.name}</p>}
                                </div>

                                {/* Email Input */}
                                <div className={`relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '700ms' }}>
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={20} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    </div>
                                    <input
                                        type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:ring-4 focus:ring-blue-400/50 focus:border-blue-500 outline-none transition-all duration-300
                                            ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:bg-gray-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white'}
                                            ${errors.email ? 'border-red-500' : ''}`}
                                        aria-label="Your Email"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-500 font-medium">{errors.email}</p>}
                                </div>

                                {/* Subject Input */}
                                <div className={`relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '800ms' }}>
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <BookOpen size={20} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    </div>
                                    <input
                                        type="text" name="subject" placeholder="Subject (Optional)" value={formData.subject} onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:ring-4 focus:ring-blue-400/50 focus:border-blue-500 outline-none transition-all duration-300
                                            ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:bg-gray-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white'}`}
                                        aria-label="Subject"
                                    />
                                </div>

                                {/* Message Textarea */}
                                <div className={`relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '900ms' }}>
                                    <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                                        <MessageSquare size={20} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                    </div>
                                    <textarea
                                        name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 focus:ring-4 focus:ring-blue-400/50 focus:border-blue-500 outline-none transition-all duration-300 resize-y
                                            ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:bg-gray-600' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white'}
                                            ${errors.message ? 'border-red-500' : ''}`}
                                        aria-label="Your Message"
                                    ></textarea>
                                    {errors.message && <p className="mt-1 text-sm text-red-500 font-medium">{errors.message}</p>}
                                </div>

                                {/* Submit Button with loading spinner */}
                                <div className={`text-center transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: '1000ms' }}>
                                    <button
                                        type="submit" disabled={isSubmitting} // Disable button while submitting
                                        className={`inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                                            ${darkMode
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                                            }
                                            ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
                                    >
                                        {isSubmitting ? ( // Show spinner and "Sending..." text if submitting
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </>
                                        ) : ( // Show icon and "Send Message" text otherwise
                                            <>
                                                <Send size={20} />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>

                            {/* Project Maintainer Info */}
                            <div 
                                className={`text-center mt-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: '1300ms' }}
                            >
                                <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    This project is maintained by:
                                </p>
                                <div className={`inline-flex items-center gap-3 text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                    <User size={20} className="text-purple-400" />
                                    <span>Tanmay Kalra</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            {/* Confirmation Toast Notification: Appears at the bottom right */}
            {showToast && (
                <div 
                    className={`fixed bottom-6 right-6 p-4 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-500 transform 
                        ${submissionStatus === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}
                        ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`} // Slide-in/out animation
                >
                    {submissionStatus === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                    {submissionStatus === 'success' ? 'Message sent successfully!' : 'Failed to send message.'}
                </div>
            )}

            {/* Render the Footer component */}
            <Footer />
        </div>
    );
};
