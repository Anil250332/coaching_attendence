import React from 'react';
import { X, ChevronDown, Plus, Trash2 } from 'lucide-react';

interface Question {
  id: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  marks: string;
}

interface AddQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (questions: Question[]) => void;
}

const AddQuestionsModal: React.FC<AddQuestionsModalProps> = ({ isOpen, onClose, onSave }) => {
  const [questions, setQuestions] = React.useState<Question[]>([
    {
      id: Math.random().toString(),
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 'Option A',
      marks: '1',
    },
  ]);

  if (!isOpen) return null;

  const handleUpdateQuestion = (index: number, fields: Partial<Question>) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, ...fields } : q))
    );
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        questionText: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correctAnswer: 'Option A',
        marks: '1',
      },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(questions);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl relative z-10 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add Test Questions</h2>
            <p className="text-[13px] text-gray-500 font-medium mt-0.5">Define questions, options, correct answers, and marks</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1">
          <div className="space-y-8">
            {questions.map((question, index) => (
              <div 
                key={question.id} 
                className={`space-y-6 ${index > 0 ? 'pt-8 border-t border-gray-100' : ''}`}
              >
                {/* Question Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-bold text-gray-900">
                    Question {index + 1}
                  </span>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(index)}
                      className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 text-[13px] font-semibold"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  )}
                </div>

                {/* Question Text */}
                <div>
                  <textarea 
                    value={question.questionText}
                    onChange={(e) => handleUpdateQuestion(index, { questionText: e.target.value })}
                    placeholder="Enter your question here..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400 resize-y"
                  />
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Option A */}
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                      Option A <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      value={question.optionA}
                      onChange={(e) => handleUpdateQuestion(index, { optionA: e.target.value })}
                      placeholder="Option A"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Option B */}
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                      Option B <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      value={question.optionB}
                      onChange={(e) => handleUpdateQuestion(index, { optionB: e.target.value })}
                      placeholder="Option B"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Option C */}
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                      Option C <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      value={question.optionC}
                      onChange={(e) => handleUpdateQuestion(index, { optionC: e.target.value })}
                      placeholder="Option C"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Option D */}
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                      Option D <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      value={question.optionD}
                      onChange={(e) => handleUpdateQuestion(index, { optionD: e.target.value })}
                      placeholder="Option D"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Correct Answer & Marks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Correct Answer */}
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                      Correct Answer <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select 
                        value={question.correctAnswer}
                        onChange={(e) => handleUpdateQuestion(index, { correctAnswer: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white cursor-pointer appearance-none"
                      >
                        <option value="Option A">Option A</option>
                        <option value="Option B">Option B</option>
                        <option value="Option C">Option C</option>
                        <option value="Option D">Option D</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Marks */}
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                      Marks <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="number"
                      value={question.marks}
                      onChange={(e) => handleUpdateQuestion(index, { marks: e.target.value })}
                      placeholder="1"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add Another Question Button */}
            <button
              type="button"
              onClick={handleAddQuestion}
              className="w-full border-2 border-dashed border-gray-200 hover:border-blue-500 rounded-xl py-4 flex items-center justify-center gap-2 text-gray-500 hover:text-blue-600 cursor-pointer transition-all bg-gray-50/30 hover:bg-blue-50/20 group"
            >
              <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              <span className="text-[14px] font-semibold">Add Another Question</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-t border-gray-100 shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm flex-1 sm:flex-none text-center"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-8 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm flex-1 sm:flex-none text-center ml-4 sm:ml-0"
          >
            Save Questions ({questions.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionsModal;
