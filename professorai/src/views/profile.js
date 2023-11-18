import React, { useContext, useState } from 'react';
import './styles/profile.css';
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
    if (window.confirm('Are you sure you want to remove this subject?')) {
      const updatedSubjects = [...subjects];
      updatedSubjects.splice(index, 1);
      setSubjects(updatedSubjects);
    }
  };

  return (
    <>
    <div className='profile-main'>
      <Navbar/>
      <div className="profile-header">
        <h1>Welcome, {userProfile.username}</h1>
      </div>
      <div className="profile-container">
      <div>
        <h3>Subjects Taken:</h3>
        <ul className="subjects-list">
          {subjects.map((subject, index) => (
            <li key={index} className="subjects-list-item">
              {subject}
              <button onClick={() => removeSubject(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="add-subject">
        <h3>Add a Subject:</h3>
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button onClick={addSubject}>Add Subject</button>
      </div>
    </div>

    </div>
    
    </>
  );
}

export default Profile;
