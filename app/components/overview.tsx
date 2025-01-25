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
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl min-h-[90vh] my-6 p-6 bg-white shadow-xl rounded-1xl ml-20 border border-gray-300">
      {/* Heading aligned to the left and smaller text */}
      <h2 className="text-xl font-semibold text-left text-gray-800 mb-6">Overview</h2>
      <div className="border-b border-gray-300 mb-6"></div>
      <div className="flex flex-wrap gap-3 justify-center">
        {questions.map((q, index) => (
          <span
            key={q.id}
            className={`text-sm px-3 py-1 rounded-full cursor-pointer text-gray-900 transition-all duration-300
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
