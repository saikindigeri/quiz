'use client'

import { useState } from "react";
import Timer from "./Timer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";

interface QuestionCardProps {
  question: {
    id: string;
    question: string;
    options: Array<{ id: string; option: string }>;
   
    
  
  };
  answer?: string;
  currentIndex: number;
  totalQuestions: number;
  handleNavigation: (direction: 'prev' | 'next') => void;
  handleFlag: (questionId: string) => void;
  flags: { [key: string]: boolean };
  questionId: string;
  handleSubmit: () => void;
  handleAnswer: (questionId: string, optionId: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  handleAnswer,
  currentIndex,
  totalQuestions,
  handleNavigation,
  handleFlag,
  flags,
  questionId,
  handleSubmit,
}) => {
  const [timeUp, setTimeUp] = useState(false);

  return (
    <div className="w-full md:w-[70%] min-h-[90vh] mx-auto bg-white border p-6 rounded-1xl mt-3 shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <p className="text-gray-500 text-xl flex items-center font-italic">
          MCQ-<span className="text-red-500 ml-1">{question.id.toUpperCase()}</span>
        </p>
        <Timer onTimeUp={() => setTimeUp(true)} />
      </div>

      {/* Time Up Alert */}
      {timeUp && <div className="text-red-600 text-lg font-bold mt-4">Time is up!</div>}

      {/* Question */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 font-bodoni">{question.question}</h2>

      {/* Options */}
      <div className="space-y-4 flex flex-col mb-6">
        {question.options.map((opt, index) => {
          const optionLabel = String.fromCharCode(65 + index); // Convert index to A, B, C, D, etc.

          return (
            <button
              key={opt.id}
              onClick={() => handleAnswer(question.id, opt.id)}
              className={`flex items-center w-full text-black hover:bg-orange-500 hover:text-white rounded-xl px-4 py-2 transition-all duration-300 ease-in-out border border-gray-100 shadow-sm ${answer === opt.id ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}
            >
              <span className="mr-3 font-italic">{optionLabel}</span>
              <span className="font-italic">{opt.option}</span>
            </button>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-auto space-y-4 sm:space-y-0 sm:space-x-4">
        {/* End and Submit Button */}
        <Button variant="secondary" className="text-white bg-black rounded-2xl w-full sm:w-auto hover:bg-gray-400" onClick={() => handleSubmit()}>
          End and Submit
        </Button>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <Button
            onClick={() => handleNavigation('prev')}
            disabled={currentIndex === 0}
            className="flex items-center justify-center px-4 py-2 bg-gray-400 text-black rounded-2xl w-full sm:w-auto"
          >
            <ChevronLeft className="mr-2" />
            Previous
          </Button>

          <Button
  onClick={() => handleFlag(questionId)}
  className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-2xl w-full sm:w-auto hover:bg-orange-600"
>
  {flags[questionId] ? 'Unflag' : 'Flag'}
  <Flag className="ml-2 bg-orange-700 p-1 rounded-full fill text-white" />
</Button>


          <Button
            onClick={() => handleNavigation('next')}
            disabled={currentIndex === totalQuestions - 1}
            className="flex items-center justify-center px-4 py-2 bg-gray-400 hover:bg-gray-200 text-black rounded-2xl w-full sm:w-auto"
          >
            Next <ChevronRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;