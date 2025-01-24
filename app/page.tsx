'use client'

import { useState, useEffect } from 'react';

import Timer from './components/Timer';
import QuestionCard from './components/QuestionCard';
import NavigationButtons from './components/NavigationButtons';
import { getQuestions } from './services/questionService';

interface Question {
  id: string;
  question: string;
  options: Array<{ id: string; option: string }>;
}

const Home = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [flags, setFlags] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    getQuestions().then(setQuestions);
  }, []);

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleFlag = (questionId: string) => {
    setFlags({ ...flags, [questionId]: !flags[questionId] });
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'next' && currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = () => {
    const unanswered = questions.filter(q => !answers[q.id]);
    if (unanswered.length > 0) {
      if (!confirm(`You have unanswered questions: ${unanswered.map(q => q.id).join(', ')}. Do you want to submit?`)) {
        return;
      }
    }
    alert('Quiz submitted successfully!');
  };

  return (
    <div className="container mx-auto p-4">
      <Timer />
      {questions.length > 0 && (
        <>
          <QuestionCard 
            question={questions[currentIndex]} 
            answer={answers[questions[currentIndex].id]} 
            handleAnswer={handleAnswer} 
          />
          <NavigationButtons
            currentIndex={currentIndex} 
            totalQuestions={questions.length} 
            handleNavigation={handleNavigation} 
            handleFlag={handleFlag} 
            flags={flags}
            questionId={questions[currentIndex].id}
          />
          <div className="flex space-x-2 mb-4">
            {questions.map((q, index) => (
              <span key={q.id} className={`px-3 py-1 rounded-full text-white ${flags[q.id] ? 'bg-orange-500' : answers[q.id] ? 'bg-green-500' : 'bg-gray-300'}`}>
                {index + 1}
              </span>
            ))}
          </div>
          <button className="bg-red-600 text-white px-6 py-2 rounded" onClick={handleSubmit}>End and Submit</button>
        </>
      )}
    </div>
  );
};

export default Home;
