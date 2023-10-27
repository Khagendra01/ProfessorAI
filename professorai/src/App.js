import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPrompt from './components/login';
import MainPage from './components/mainPage';
import ChatApp from './components/chatPlace';
import Quiz from './components/quiz';
import Feedback from './components/feedback';

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
