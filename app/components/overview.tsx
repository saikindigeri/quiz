import React from 'react';

interface OverviewProps {
  questions: { id: string; question: string }[];
  flags: { [key: string]: boolean };
  answers: { [key: string]: string };
  handleDirectNavigation: (index: number) => void;
  currentIndex: number; // New prop to track the active question
}

const Overview: React.FC<OverviewProps> = ({ questions, flags, answers, handleDirectNavigation, currentIndex }) => {
  return (
    <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl p-6 bg-white shadow-xl rounded-xl border border-gray-300 mx-auto  my-6">
      {/* Heading */}
      <h2 className="text-lg sm:text-xl font-semibold text-left text-gray-800 mb-4">Overview</h2>
      <div className="border-b border-gray-300 mb-4"></div>
      
      {/* Question Buttons - Responsive Layout */}
      <div className="flex flex-wrap justify-start gap-2 sm:gap-3 md:gap-4 mb-4">
        {questions.map((q, index) => (
          <span
            key={q.id}
            className={`text-xs sm:text-sm px-2 py-1 rounded-full cursor-pointer transition-all duration-300
              ${flags[q.id] ? 'bg-orange-500 text-white' : answers[q.id] ? 'bg-green-500 text-white' : 'bg-gray-300'}
              hover:scale-105 transform 
              ${currentIndex === index ? 'border-2 border-orange-500 text-white bg-orange-500' : ''}`}
            onClick={() => handleDirectNavigation(index)}
            title={`Question ${index + 1}: ${flags[q.id] ? 'Flagged' : answers[q.id] ? 'Answered' : 'Not answered'}`}
          >
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Overview;
