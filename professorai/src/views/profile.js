import React, { useContext, useState } from 'react';
import './styles/profile.css';
import Navbar from '../components/navbar';
import { AuthContext } from '../App';
import { addSubjectToProfile, getAllSubjects, removeSubject } from '../api/subjectApi';




function Profile() {
  const { user } = useContext(AuthContext);
  const userProfile = {
    username: user.lastName ,
    points: 500,
    level: 5,
  };

  const [subjects, setSubjects] = useState([]);

  
  const [newSubject, setNewSubject] = useState('');

  React.useEffect(()=>{
    getData();
  },[])

  const getData = async () => {
    getAllSubjects(user.id).then((response)=>{
      setSubjects(response)
    })
    .then(()=>{
      setNewSubject("")
    })
    .catch((error)=>{
      alert("Something went wrong")
    })
  }
  const addSubject = () => {
    if (newSubject.trim() !== '') {      
      addSubjectToProfile({userId :`${user.id}`, subjectValue: `${newSubject}` }).then(()=>{
        getData();
      }
      ).catch((error)=>{
        alert(error.message)
      })
    }
  };

  
  const handleRemoveSubject = (subjectId) => {
    if (window.confirm('Are you sure you want to remove this subject?')) {
      removeSubject({userId :`${user.id}`, subjectId: `${subjectId}` }).then(()=>{
        getData();
      }
      ).catch((error)=>{
        alert(error.message)
      })
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
          {subjects.map((subject) => (
            <li key={subject.id} className="subjects-list-item" style={{textTransform: 'capitalize'}}>
              {subject.name}
              <button onClick={() => handleRemoveSubject(subject.id)}>Remove</button>
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
