interface NavigationButtonsProps {
    currentIndex: number;
    totalQuestions: number;
    handleNavigation: (direction: 'prev' | 'next') => void;
    handleFlag: (questionId: string) => void;
    flags: { [key: string]: boolean };
    questionId: string;
    handleSubmit: () => void;
    
  }
  
  const NavigationButtons: React.FC<NavigationButtonsProps> = ({ 
    currentIndex, 
    totalQuestions, 
    handleNavigation, 
    handleFlag, 
    flags, 
    questionId ,
    handleSubmit,
  }) => {
    return (
      <div className="flex justify-between mt-4">

<button className="bg-red-600 text-white px-6 py-2 rounded" onClick={()=>(handleSubmit)}>End and Submit</button>
        <button 
          onClick={() => handleNavigation('prev')} 
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        
        <button 
          onClick={() => handleFlag(questionId)} 
          className={`px-4 py-2 rounded ${flags[questionId] ? 'bg-orange-500 text-white' : 'bg-gray-300'}`}
        >
          {flags[questionId] ? 'Unflag' : 'Flag'}
        </button>
  
        <button 
          onClick={() => handleNavigation('next')} 
          disabled={currentIndex === totalQuestions - 1}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    );
  };
  
  export default NavigationButtons;
  