interface QuestionCardProps {
    question: {
      id: string;
      question: string;
      options: Array<{ id: string; option: string }>;
    };
    answer?: string;
    handleAnswer: (questionId: string, optionId: string) => void;
  }
  
  const QuestionCard: React.FC<QuestionCardProps> = ({ question, answer, handleAnswer }) => {
    return (
      <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">{question.question}</h2>
        <div className="space-y-2">
          {question.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleAnswer(question.id, opt.id)}
              className={`block w-full text-left p-2 rounded border ${
                answer === opt.id ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}
            >
              {opt.option}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default QuestionCard;
  