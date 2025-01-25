// components/Modal.tsx
import { Button } from '@/components/ui/button';
import { TriangleAlert } from 'lucide-react';
import React from 'react';

interface ModalProps {
  showModal: boolean;
  onClose: () => void;
  onSubmit: () => void;
  unansweredCount: number;
}

const Modal: React.FC<ModalProps> = ({ showModal, onClose, onSubmit, unansweredCount }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
        {/* Icon Section */}
        <div className="flex justify-center mb-4">
          <h2 className="flex items-center justify-center w-16 h-16 bg-red-200 rounded-full text-xl font-semibold text-red-500">
            <TriangleAlert />
          </h2>
        </div>

        {/* Modal Message Section */}
        <p className="text-center text-lg font-medium mb-4">
          You have <span className="text-red-500">({unansweredCount})</span> unanswered question(s).<br />
          Do you want to submit?
        </p>

        {/* Divider */}
        <div className="border-t border-gray-300 my-4" />

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <Button
            className="w-full py-2 rounded-2xl text-white hover:bg-blue-600 focus:outline-none"
            onClick={onSubmit}
          >
            Submit
          </Button>
          <Button
            className="w-full py-2 rounded-2xl bg-gray-200 text-black hover:bg-gray-300 focus:outline-none"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
