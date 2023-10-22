import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    navigate('/mainPage'); // Navigate to the '/dashboard' route
  };

  return (
    <div className="sign-in-prompt">
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={handleUsernameChange}
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default SignInPrompt;
