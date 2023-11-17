

import "./styles/navbar.css"; // Import the CSS file for styling
import { AuthContext } from "../App";
import Logo from '../assets/logo.png';
import Modal from "./Modal";

import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(undefined);
  }

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleProfileClick = () => {
    setIsOpen(!isOpen); // Toggle the isOpen state
  }
  React.useEffect(() => {
    // Add a click event listener to the document body
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('click', handleOutsideClick);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="navbar">
      <img
        src={Logo}
        alt="logo"
        width='150px'
        onClick={() => handleNavigation("/")}
        style={{ marginLeft: '10%', cursor: 'pointer' }}
      />
      { user ?
      <>
      <div className="profile-icon" ref={dropdownRef}>
        {/* You can place your profile icon or avatar here */}
        <img
          src="/img/profile.jpg"
          alt="Profile"
          onClick={handleProfileClick}
        />
        {isOpen && (
          <div className="dropdown">
            <ul>
              <li style={{ color: "black", paddingBottom: '5px' }} onClick={() => handleNavigation("/profile")}>Profile</li>
              <hr style={{ margin: '0px' }} />
              <li style={{ color: "black" , paddingBottom: '5px' }} onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        )}
      </div>
      </> 
      :
        <button onClick={() => {}} className="nav-login">Log In</button>    
      }
    </div>
  );
}

export default Navbar;
