import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';

import "./styles/learnNew.css"; 
import { sendExplore } from '../api/chatApi';

function LearnNew(props) {

  var knowledgeQuerry = [ {role: "user", content: "Generate a random fact for student with \"title: \" and \"content:\"" }]

    const [knowledge, setKnowledge] = useState({ title : "Valakushari" , content : "It is a nepali word to say that two people are talking ear to ear "})

    const [loading, setLoading] = useState(true);
    
    const fetchInfo = async() => {
        
      try
      {
      const response = await sendExplore(knowledgeQuerry);
      setKnowledge(response);
      setLoading(false);
      }catch(error) {
        console.error("Error", error);
      }
    }

    useEffect( () => {

      fetchInfo();

    },[])

    const handleClick = () => {
      setLoading(true);
      fetchInfo();
    }


    return (
        <div className="learn-main">
        <Navbar />
        <div className="learn-container">
          <h1 className="learn-title"> {loading ? "Loading..." : knowledge.title} </h1>
          <p className="learn-description">
            { loading ? "Please wait..." : knowledge.content }
          </p>
            <button onClick={ () => handleClick() } className="submit-button">
              Generate New
            </button>
        </div>
      </div>
    );
}

export default LearnNew;