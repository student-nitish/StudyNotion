import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

const Error = () => {
    const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  return (
   <div className=' items-center'>
     <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: "50px",
        fontFamily: "sans-serif",
        alignItems: "center", // centers horizontally
        justifyContent: "center", // centers vertically
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#ff6b6b" }}>404 - Page Not Found</h1>
      <p style={{ fontSize: "1.2rem", color: "#666" }}>
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="404 Not Found"
        style={{ maxWidth: "800px", width: "100%", marginTop: "30px" }}
      />

      <div className=' text-orange-500 bg-white w-fit flex mx-auto p-3 hover:bg-orange-100 mt-5 '>
        <button onClick={handleGoHome} className=' flex gap-1 items-center text-xl'>
          Go Back Home
         <FaArrowRight/>
        </button>
      </div>
    </div>
   </div>
  );
}

export default Error
