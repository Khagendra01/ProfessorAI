import React, { useEffect, useState } from "react";
import "./styles/exam.css";
import Navbar from "../components/navbar";
import DisplayCourse from "../components/displayCourse";
import { useNavigate } from "react-router-dom";
import { sendExamPrep } from "../api/chatApi";

function ExamPrep() {
  const [display, setDisplay] = useState(true);
  const [topic, setTopic] = useState();
  const [loading, setLoading] = useState(false);

  const [resource, setResource] = useState([]);

  const navigate = useNavigate();

  const handleCourseClicked = (id, title) => {
    setDisplay(false);
    setTopic(title);
    fetchInfo(title);
  };
  const fetchInfo = async (title) => {
    setLoading(true);
    var examQuerry = [
      {
        role: "user",
        content: `Generate exam preparation guidelines on the topic of ${title} with 10 of the \"title: ....\n\" and \"content: .......\n\n\"`,
      },
    ];
    try {
      const response = await sendExamPrep(examQuerry);
      setResource(response);
      setLoading(false);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="exam-main">
      <Navbar />
      {display && (
        <>
          {" "}
          <DisplayCourse
            displayType={"Exam Preparation"}
            onCourseClicked={handleCourseClicked}
          />{" "}
        </>
      )}
      {loading && <p> Please wait...</p>}
      {!loading && (
        <div className="examprep-container">
          <h1 className="examprep-title">{topic}</h1>
          {resource.map((note, index) => (
            <div className="each-content" key={index}>
              <div className="form-group">
                <label htmlFor="examprep" className="form-label">
                  {note.title}
                </label>
              </div>
              <p className="examprep-description">{note.content}</p>
            </div>
          ))}
        </div>
      )}
      {
        !loading && !display &&
        <>
           <button
          onClick={() => fetchInfo(topic)}
          className="submit-button"
          style={{ marginTop: 10, backgroundColor: "#001f3f", color: "wheat" }}
        >
          Generate New
        </button>
        <button
          onClick={() => navigate("/quizMenu")}
          className="submit-button"
          style={{ marginTop: 10 }}
        >
          Ready to Practice? Click me
        </button>             
        </>
      }
    </div>
  );
}

export default ExamPrep;
