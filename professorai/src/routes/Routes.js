import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignInPrompt from '../components/login';
import MainPage from '../views/mainPage';
import ChatApp from '../views/chatPlace';
import Quiz from '../views/quiz';
import Feedback from '../views/feedback';
import Profile from '../views/profile';
import { AuthContext } from '../App';
import RegisterPrompt from '../components/Register';

const RouteConfig= () => {
    const { user } = useContext(AuthContext);
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <MainPage />: <SignInPrompt />} />
          <Route path="/mainPage" element={user ? <MainPage /> : <Navigate to='/'/> } />
          <Route path="/chatPlace" element={user ? <ChatApp /> : <Navigate to='/' />} />
          <Route path="/quiz" element={user ? <Quiz /> : <Navigate to='/' />} />
          <Route path="/feedback" element={user ? <Feedback /> : <Navigate to='/' />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to='/' />} />
          <Route path="/register" element={!user ? <RegisterPrompt /> : <Navigate to='/' />} />
          <Route path="/login" element={!user ? <SignInPrompt /> : <Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    );
}

export default RouteConfig;