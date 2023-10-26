import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPrompt from './login';
import MainPage from './mainPage';
import ChatApp from './chatPlace';
import Quiz from './quiz';
import Feedback from './feedback';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPrompt />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/chatPlace" element={<ChatApp />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
