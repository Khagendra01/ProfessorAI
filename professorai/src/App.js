import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInPrompt from './login';
import MainPage from './mainPage';
import ChatApp from './chatPlace';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPrompt />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/chatPlace" element={<ChatApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
