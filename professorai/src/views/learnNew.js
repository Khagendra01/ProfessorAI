import React, { useState } from 'react';
import Navbar from '../components/navbar';

import "./styles/learnNew.css"; 

function LearnNew(props) {

    const [knowledge, setKnowledge] = useState({ title : "Valakushari" , content : "It is a nepali word to say that two people are talking ear to ear "})

    return (
        <div className="learn-main">
        <Navbar />
        <div className="learn-container">
          <h1 className="learn-title"> {knowledge.title} </h1>
          <p className="learn-description">
            { knowledge.content }
          </p>
            <button onClick={() => {} } className="submit-button">
              Generate New
            </button>
        </div>
      </div>
    );
}

export default LearnNew;