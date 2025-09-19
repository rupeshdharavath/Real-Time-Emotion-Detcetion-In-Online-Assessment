import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import AuthForm from './components/AuthForm';
import EmotionTest from './components/EmotionTest';
import Results from './components/Results';
import Help from './components/Help';
import SubjectQuizWrapper from './components/SubjectQuizWrapper';

const questions = [
  {
    question: "How are you feeling today?",
    answers: ["Happy", "Sad", "Angry", "Excited"],
  },
  {
    question: "What do you think about online exams?",
    answers: ["Stressful", "Convenient", "Unfair", "Good"],
  },
  {
    question: "Do you find this topic interesting?",
    answers: ["Yes", "No", "Maybe", "A little"],
  },
];

const ProtectedRoute = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

const App = () => {
  const webcamRef = useRef(null);
  const [emotion, setEmotion] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answersWithEmotions, setAnswersWithEmotions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const [authState, setAuthState] = useState({
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    isRegistering: false,
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || null,
  });

  useEffect(() => {
    const storedAuth = {
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
      username: localStorage.getItem('username') || '',
      token: localStorage.getItem('token') || null
    };
    if (storedAuth.isLoggedIn) {
      setAuthState(prev => ({ ...prev, ...storedAuth }));
    }
  }, []);

  const captureEmotion = async () => {
    if (webcamRef.current && authState.isLoggedIn) {
      const screenshot = webcamRef.current.getScreenshot();
      if (screenshot) {
        try {
          const response = await axios.post('http://localhost:5000/detect', {
            image: screenshot,
          }, {
            headers: { Authorization: `Bearer ${authState.token}` }
          });
          setEmotion(response.data.emotion);
        } catch (error) {
          setEmotion('Not Detected');
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(captureEmotion, 3000);
    return () => clearInterval(interval);
  }, [authState.isLoggedIn, authState.token]);

  const handleNext = () => {
    const stressMap = {
      angry: 80,
      fear: 70,
      disgust: 60,
      sad: 50,
      neutral: 30,
      happy: 10,
      surprise: 20,
      'no face detected': 0,
      'not detected': 0
    };

    const normalizedEmotion = (emotion || 'not detected').toLowerCase();
    const currentStress = stressMap[normalizedEmotion] ?? 0;

    setAnswersWithEmotions(prev => [
      ...prev,
      {
        question: questions[questionIndex].question,
        answer: selectedAnswer || "Not answered",
        emotion: emotion || "Not Detected",
        stressLevel: currentStress,
      },
    ]);
    setSelectedAnswer('');
    setEmotion('');
    setQuestionIndex(prev => prev + 1);
  };

  const restartQuiz = () => {
    setQuestionIndex(0);
    setAnswersWithEmotions([]);
    setEmotion('');
    setSelectedAnswer('');
  };

  const handleAuth = async (e, authData) => {
    e.preventDefault();
    try {
      const endpoint = authState.isRegistering ? 'register' : 'login';
      const response = await axios.post(
        `http://localhost:5000/${endpoint}`,
        authData
      );

      if (!authState.isRegistering) {
        const { token, username } = response.data;
        setAuthState({
          isLoggedIn: true,
          isRegistering: false,
          username,
          token
        });
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
      } else {
        setAuthState(prev => ({ ...prev, isRegistering: false }));
        alert('Registration successful! Please login.');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Authentication failed');
    }
  };

  const handleLogout = () => {
    setAuthState({
      isLoggedIn: false,
      isRegistering: false,
      username: '',
      token: null
    });
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  const toggleAuthMode = () => {
    setAuthState(prev => ({
      ...prev,
      isRegistering: !prev.isRegistering
    }));
  };

  return (
    <Router>
      <Navbar 
        isLoggedIn={authState.isLoggedIn} 
        username={authState.username} 
        onLogout={handleLogout} 
      />
      <Routes>
        <Route 
          path="/login" 
          element={
            authState.isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <AuthForm 
                isRegistering={authState.isRegistering}
                toggleAuthMode={toggleAuthMode}
                handleAuth={handleAuth}
              />
            )
          } 
        />

        <Route element={<ProtectedRoute isLoggedIn={authState.isLoggedIn} />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path='/help' element={<Help/>}/>

          <Route 
            path="/quiz" 
            element={
              questionIndex >= questions.length ? (
                <Results 
                  answers={answersWithEmotions} 
                  onRestart={restartQuiz} 
                />
              ) : (
                <EmotionTest
                  question={questions[questionIndex]}
                  selectedAnswer={selectedAnswer}
                  onAnswerSelect={setSelectedAnswer}
                  emotion={emotion}
                  webcamRef={webcamRef}
                  onNext={handleNext}
                />
              )
            } 
          />

          <Route 
            path="/quiz/:subject" 
            element={
              <SubjectQuizWrapper 
                emotion={emotion} 
                webcamRef={webcamRef} 
              />
            } 
          />
        </Route>

        <Route 
          path="*" 
          element={
            <Navigate to={authState.isLoggedIn ? "/" : "/login"} replace />
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;