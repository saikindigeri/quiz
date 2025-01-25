'use client'

import { useState, useEffect } from 'react';
import QuestionCard from './components/QuestionCard';
import { getQuestions } from './services/questionService';
import Overview from './components/overview';
import { User, Bell, SunMoon } from 'lucide-react'; // Using lucide-react icons for profile and notifications
import Results from './components/results';

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('exam'); // State to manage active tab

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

  const handleDirectNavigation = (index: number) => {
    setCurrentIndex(index);
  };

  const handleSubmit = () => {
    const unanswered = questions.filter(q => !answers[q.id]);
    if (unanswered.length > 0) {
      if (!confirm(`You have unanswered questions: ${unanswered.length}. Do you want to submit?`)) {
        return;
      }
    }
    alert('Quiz submitted successfully!');
  };

  return (
    <div className={`w-full p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
  
    {/* Header and Tabs as a single sticky div */}
    <div className="sticky top-0 z-10 bg-white bg-opacity-90">
      {/* Header with Heading, Profile, and Notification */}
      <div className="flex justify-between items-center mb-4">
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-left">Heading</h1>
        
        {/* Profile and Notifications */}
        <div className="flex items-center space-x-4">
          <User className="w-6 h-6 cursor-pointer" />
          <Bell className="w-6 h-6 cursor-pointer" />
  
          <button
            className="px-4 py-2 rounded text-black"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <SunMoon />
          </button>
        </div>
      </div>
  
      {/* Tabs - aligned left */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'exam' ? 'text-orange-600 underline' : 'text-gray-400'}`}
          onClick={() => setActiveTab('exam')}
        >
          Exam
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'lorem1' ? 'text-gray-500 text-white' : 'text-gray-400'}`}
          onClick={() => setActiveTab('lorem1')}
        >
          Lorem 1
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'lorem2' ? 'text-gray-500 text-white' : 'text-gray-400'}`}
          onClick={() => setActiveTab('lorem2')}
        >
          Lorem 2
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'lorem3' ? 'bg-gray-500 text-white' : 'text-gray-400'}`}
          onClick={() => setActiveTab('lorem3')}
        >
          Lorem 3
        </button>
      </div>
    </div>
  
    {/* Overview and QuestionCard Components */}
    <div className="flex flex-col md:flex-row w-full gap-6 bg-gray-200">
      {/* Overview Component */}
      {questions.length > 0 && (
        <div className="w-full md:w-1/3">
          <Overview
            questions={questions}
            flags={flags}
            answers={answers}
            handleDirectNavigation={handleDirectNavigation}
            currentIndex={currentIndex}
          />
        </div>
      )}
  
      {/* QuestionCard Component */}
      {questions.length > 0 && (
        <div className="w-full md:w-2/3">
          <QuestionCard
            question={questions[currentIndex]}
            answer={answers[questions[currentIndex].id]}
            handleAnswer={handleAnswer}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            handleNavigation={handleNavigation}
            handleFlag={handleFlag}
            flags={flags}
            questionId={questions[currentIndex].id}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
    <Results />
  </div>
  
  
  );
};

export default Home;
