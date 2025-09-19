import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import subjectQuestions from '../questionsData';
import EmotionTest from './EmotionTest';
import Results from './Results';

const SubjectQuizWrapper = ({ emotion, webcamRef }) => {
  const { subject } = useParams();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answersWithEmotions, setAnswersWithEmotions] = useState([]);

  const questions = subjectQuestions[subject];

  if (!questions) {
    return <div>No questions available for this subject.</div>;
  }

  const handleNext = () => {
    setAnswersWithEmotions(prev => [
      ...prev,
      {
        question: questions[questionIndex].question,
        answer: selectedAnswer || "Not answered",
        emotion: emotion || "Not Detected",
      },
    ]);
    setSelectedAnswer('');
    setQuestionIndex(prev => prev + 1);
  };

  const restartQuiz = () => {
    setQuestionIndex(0);
    setAnswersWithEmotions([]);
    setSelectedAnswer('');
  };

  return questionIndex >= questions.length ? (
    <Results answers={answersWithEmotions} onRestart={restartQuiz} />
  ) : (
    <EmotionTest
      question={questions[questionIndex]}
      selectedAnswer={selectedAnswer}
      onAnswerSelect={setSelectedAnswer}
      emotion={emotion}
      webcamRef={webcamRef}
      onNext={handleNext}
    />
  );
};

export default SubjectQuizWrapper;
