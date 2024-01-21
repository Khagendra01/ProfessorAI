import React, { useContext, useState, useEffect } from "react";
import "./styles/profile.css";
import Navbar from "../components/navbar";
import { AuthContext } from "../App";
import { SubjectContext } from "../wrapper/addSubject";

function Profile() {
  const { user } = useContext(AuthContext);

  const {
    subjects,
    getData,
    newSubject,
    setNewSubject,
    handleRemoveSubject,
    addSubject,
    addAI
  } = useContext(SubjectContext);

  const userProfile = {
    username: user.lastName,
    points: 500,
    level: 5,
  };

  useEffect(()=>{
    if(user!== undefined)
    getData()
  },[user]);

  useEffect(()=>{
    addAI();
  },[]);


  return (
    <>
      <div className="profile-main">
        <Navbar />
        <div className="profile-header">
          <h1>Welcome, {userProfile.username}</h1>
        </div>
        <div className="profile-container">
          <div>
            <h3>Subjects Taken:</h3>
            <ul className="subjects-list">
              {subjects.map((subject) => (
                <li
                  key={subject.id}
                  className="subjects-list-item"
                  style={{ textTransform: "capitalize" }}
                >
                  {subject.name}
                  <button onClick={() => handleRemoveSubject(subject.id)}>
                    Remove
                  </button>
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
