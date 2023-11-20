import React, { createContext, useContext, useState } from "react";

import { AuthContext } from "../App";

import {
  addSubjectToProfile,
  getAllSubjects,
  removeSubject,
} from "../api/subjectApi";

export const SubjectContext = createContext();

const SubjectWrapper = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [subjects, setSubjects] = useState([]);

  const [newSubject, setNewSubject] = useState("");


  const getData = async () => {
    getAllSubjects(user.id)
      .then((response) => {
        setSubjects(response);
      })
      .then(() => {
        setNewSubject("");
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };
  const addSubject = () => {
    if (newSubject.trim() !== "") {
      addSubjectToProfile({
        userId: `${user.id}`,
        subjectValue: `${newSubject}`,
      })
        .then(() => {
          getData();
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handleRemoveSubject = (subjectId) => {
    if (window.confirm("Are you sure you want to remove this subject?")) {
      removeSubject({ userId: `${user.id}`, subjectId: `${subjectId}` })
        .then(() => {
          getData();
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <SubjectContext.Provider value={{ subjects, setSubjects, newSubject, setNewSubject, handleRemoveSubject, addSubject, getData }}>{children}</SubjectContext.Provider>
  );
};

export default SubjectWrapper;
