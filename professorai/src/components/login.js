import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignInPrompt.css'; // Import the CSS file for styling

function SignInPrompt() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSignIn = () => {
    alert(`Welcome, ${username}!`);
    // You can implement the actual sign-in logic here, e.g., send the username to a server.

    // Redirect to the dashboard page after signing in
    navigate('/mainPage'); // Navigate to the '/mainPage' route
  };

  return (
    <div className="sign-in-prompt-container">
      <h2 className="sign-in-title">Sign In</h2>
      <input
        type="text"
        className="username-input"
        placeholder="Enter your username"
        value={username}
        onChange={handleUsernameChange}
      />
      <button onClick={handleSignIn} className="sign-in-button">
        Sign In
      </button>
    </div>
  );
}

export default SignInPrompt;
