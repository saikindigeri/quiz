'use client'


import { useState, useEffect } from 'react';
import QuestionCard from './components/QuestionCard';
import { getQuestions } from './services/questionService';
import Overview from './components/Overview';
import { User, Bell, SunMoon } from 'lucide-react';
import Results from './components/Results';
import Modal from './components/Modal';

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
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('exam');
  const [unansweredCount, setUnansweredCount] = useState(0);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

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
      setShowModal(true);
      setUnansweredCount(unanswered.length);
    } else {
      alert('Quiz submitted successfully!');
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = () => {
    setShowModal(false);
  };

  const toggleShowAllQuestions = () => {
    setShowAllQuestions(!showAllQuestions);
  };

  return (
    <div className={`w-full p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white bg-opacity-90">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold text-left">Heading</h1>
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
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded-md ${activeTab === 'exam' ? 'text-orange-600 underline' : 'text-gray-400'}`}
            onClick={() => setActiveTab('exam')}
          >
            Exam
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full gap-6 bg-gray-200">
        {questions.length > 0 && (
          <div className="w-full md:w-1/3">
            <Overview
              questions={questions}
              flags={flags}
              answers={answers}
              handleDirectNavigation={handleDirectNavigation}
              currentIndex={currentIndex}
              showAllQuestions={showAllQuestions}
              toggleShowAllQuestions={toggleShowAllQuestions}
            />
          </div>
        )}

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
      <Modal
        showModal={showModal}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        unansweredCount={unansweredCount}
      />
    </div>
  );
};

export default Home;
