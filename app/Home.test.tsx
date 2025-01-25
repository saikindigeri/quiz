import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home'; // Adjust the import based on your folder structure
import { getQuestions } from './services/questionService';

// Mock the API call for getQuestions
jest.mock('./services/questionService', () => ({
  getQuestions: jest.fn(),
}));

// Sample question data
const mockQuestions = [
  { id: '1', question: 'What is React?', options: [{ id: 'a', option: 'Library' }, { id: 'b', option: 'Framework' }] },
  { id: '2', question: 'What is JavaScript?', options: [{ id: 'a', option: 'Programming Language' }, { id: 'b', option: 'Markup Language' }] },
];

describe('Home Component', () => {
  beforeEach(() => {
    // Mock the response of getQuestions
    (getQuestions as jest.Mock).mockResolvedValue(mockQuestions);
  });

  it('should render the header, overview, and question card correctly', async () => {
    render(<Home />);

    // Wait for the questions to be loaded
    await waitFor(() => expect(getQuestions).toHaveBeenCalledTimes(1));

    // Check if the question content is rendered
    expect(screen.getByText('What is React?')).toBeInTheDocument();
    expect(screen.getByText('What is JavaScript?')).toBeInTheDocument();

    // Check if Overview component is rendered with the correct questions
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    // Check if the question options are displayed
    expect(screen.getByText('Library')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Programming Language')).toBeInTheDocument();
    expect(screen.getByText('Markup Language')).toBeInTheDocument();
  });

  it('should navigate to the next question when clicking "Next" button', async () => {
    render(<Home />);

    await waitFor(() => expect(getQuestions).toHaveBeenCalledTimes(1));

    // Initially on the first question
    expect(screen.getByText('What is React?')).toBeInTheDocument();

    // Click on the next button (assuming the button is labeled "Next")
    fireEvent.click(screen.getByText('Next'));

    // After clicking next, the second question should be displayed
    expect(screen.getByText('What is JavaScript?')).toBeInTheDocument();
  });

  it('should show and close the modal when there are unanswered questions', async () => {
    render(<Home />);

    await waitFor(() => expect(getQuestions).toHaveBeenCalledTimes(1));

    // Simulate submitting the quiz with unanswered questions
    fireEvent.click(screen.getByText('Submit'));

    // Wait for the modal to appear
    await waitFor(() => screen.getByText('There are unanswered questions!'));

    // Check if the modal is visible
    expect(screen.getByText('There are unanswered questions!')).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByText('Close'));

    // Check if the modal is closed
    expect(screen.queryByText('There are unanswered questions!')).not.toBeInTheDocument();
  });

  it('should switch between tabs correctly', () => {
    render(<Home />);

    // Check the default active tab (exam)
    expect(screen.getByText('Exam')).toHaveClass('text-orange-600');

    // Click on the "Lorem 1" tab
    fireEvent.click(screen.getByText('Lorem 1'));

    // Check if "Lorem 1" tab is now active
    expect(screen.getByText('Lorem 1')).toHaveClass('text-gray-500');
    expect(screen.getByText('Exam')).toHaveClass('text-gray-400');
  });

  it('should navigate correctly when clicking on question numbers in Overview', async () => {
    render(<Home />);

    await waitFor(() => expect(getQuestions).toHaveBeenCalledTimes(1));

    // Initially on the first question
    expect(screen.getByText('What is React?')).toBeInTheDocument();

    // Click on question number 2 in the Overview component
    fireEvent.click(screen.getByText('2'));

    // After clicking, the second question should be displayed
    expect(screen.getByText('What is JavaScript?')).toBeInTheDocument();
  });
});
