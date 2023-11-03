import React, { useContext } from 'react';
import '../styles/profile.css';
import Navbar from './navbar';
import { AuthContext } from '../App';




function Profile() {
  const { user } = useContext(AuthContext);
  const userProfile = {
    username: user,
    points: 500,
    level: 5,
  };

  return (
    <>
    <Navbar />
    <div className="profile-container">       
      <div className="profile-header">
        <h1>Welcome, {userProfile.username}!</h1>
      </div>
      <div className="profile-dashboard">
        <div className="dashboard-item">
          <h2>Points</h2>
          <p>{userProfile.points}</p>
        </div>
        <div className="dashboard-item">
          <h2>Level</h2>
          <p>{userProfile.level}</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Profile;
