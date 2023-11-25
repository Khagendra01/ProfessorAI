import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignInPrompt from '../components/login';
import MainPage from '../views/mainPage';
import ChatApp from '../views/chatPlace';
//import Quiz from '../views/quiz';
import QuizMenu from '../views/quizMenu';
import Feedback from '../views/feedback';
import Profile from '../views/profile';
import { AuthContext } from '../App';
import RegisterPrompt from '../components/Register';
import NoteMenu from '../views/noteMenu';
import ExamPrep from '../views/examPrep';

import LearnNew from '../views/learnNew';
import NoteEditor from '../components/Notes/NoteEditor';

const RouteConfig= () => {
    const { user } = useContext(AuthContext);
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <MainPage />: <SignInPrompt />} />
          <Route path="/mainPage" element={user ? <MainPage /> : <Navigate to='/'/> } />
          <Route path="/chatPlace" element={user ? <ChatApp /> : <Navigate to='/' />} />
          <Route path="/quizMenu" element={user ? <QuizMenu /> : <Navigate to='/' />} />
          <Route path="/feedback" element={user ? <Feedback /> : <Navigate to='/' />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to='/' />} />
          <Route path="/register" element={!user ? <RegisterPrompt /> : <Navigate to='/' />} />
          <Route path="/login" element={!user ? <SignInPrompt /> : <Navigate to='/' />} />
          <Route path="/noteMenu" element={user ? <NoteMenu /> : <Navigate to='/' />} />
          <Route path="/examPrep" element={user ? <ExamPrep /> : <Navigate to='/' />} />
          <Route path="/learnNew" element={<LearnNew /> } />
          <Route path ="/:courseId/notes/:id" element = {user ? <NoteEditor /> : <Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    );
}

export default RouteConfig;