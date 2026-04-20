import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer"; // Ensure this path is correct

// Loader Component
const Loader = () => (
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh" // Full viewport height
  }}>
    <div className="loader" style={{
      border: "8px solid #f3f3f3", 
      borderTop: "8px solid hotpink", 
      borderRadius: "50%", 
      width: "50px", 
      height: "50px", 
      animation: "spin 1s linear infinite"
    }}></div>
    <p style={{ fontSize: "20px", color: "hotpink", marginTop: "20px" }}>Loading...</p>
  </div>
);

// TrackExpenses Component
const TrackExpenses = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay, like fetching data or loading resources
    setTimeout(() => {
      setIsLoading(false); // Turn off loading after 3 seconds (can be adjusted)
    }, 3000); // Adjust this time as needed (currently set to 3 seconds)
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' // Make sure the div takes up the full height of the viewport
    }}>
      <div
        style={{
          textAlign: "center",
          fontSize: "32px",
          color: "hotpink",
          fontWeight: "bolder",
          flexGrow: 1, // This makes the content take up all the remaining space
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Center the content
        }}
        className="TrackExpenses"
      >
        {isLoading ? (
          <Loader />
        ) : (
          "Track Expenses Page Coming Soon ....."
        )}
      </div>

      {/* Footer positioned at the bottom */}
      <Footer />
    </div>
  );
};

export default TrackExpenses;
