import React from 'react';
import './styles/Feedback.css'; // Import the CSS file for styling

function Feedback() {
  return (
    <div className="feedback-container">
      <h1 className="feedback-title">Feedback</h1>
      <p className="feedback-description">
        We value your input. Please leave your feedback below:
      </p>
      <form>
        <div className="form-group">
          <label htmlFor="feedback" className="form-label">
            Your Feedback:
          </label>
          <textarea
            id="feedback"
            name="feedback"
            rows="4"
            cols="50"
            className="form-textarea"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Feedback;
