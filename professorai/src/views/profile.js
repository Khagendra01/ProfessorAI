import React, { useContext, useState } from 'react';
import '../styles/profile.css';
import Navbar from '../components/navbar';
import { AuthContext } from '../App';




function Profile() {
  const { user } = useContext(AuthContext);
  const userProfile = {
    username: user.lastName ,
    points: 500,
    level: 5,
  };

  const [subjects, setSubjects] = useState(['Math', 'Science', 'History']);

  
  const [newSubject, setNewSubject] = useState('');

  
  const addSubject = () => {
    if (newSubject.trim() !== '') {
      setSubjects([...subjects, newSubject]);
      setNewSubject('');
    }
  };

  
  const removeSubject = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
  };

  return (
    <>
    <div className='profile-main'>
      <Navbar/>
    <div className="profile-container">       
      <div className="profile-header">
        <h1>Welcome, {userProfile.username}</h1>
      </div>
    </div>
      <div>
      <h2>Student Profile</h2>
      
      {/* Display list of subjects */}
      <div>
        <h3>Subjects Taken:</h3>
        <ul>
          {subjects.map((subject, index) => (
            <li key={index}>
              {subject}
              <button onClick={() => removeSubject(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add a new subject */}
      <div>
        <h3>Add a Subject:</h3>
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button onClick={addSubject}>Add Subject</button>
      </div>

      {/* Other features can be added here based on your requirements */}
    </div>

    </div>
    
    </>
  );
}

export default Profile;
