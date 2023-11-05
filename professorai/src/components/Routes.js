import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignInPrompt from './login';
import MainPage from './mainPage';
import ChatApp from './chatPlace';
import Quiz from './quiz';
import Feedback from './feedback';
import Profile from './profile';
import { AuthContext } from '../App';
import RegisterPrompt from './Register';

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