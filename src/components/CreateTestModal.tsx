import React from 'react';
import { X, ChevronDown } from 'lucide-react';

interface CreateTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSuccess: () => void;
}

const CreateTestModal: React.FC<CreateTestModalProps> = ({ isOpen, onClose, onCreateSuccess }) => {
  if (!isOpen) return null;

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
          <h2 className="text-xl font-bold text-gray-900">Create New Test</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            
            {/* Test Name */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                Test Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Physics Full Mock Test"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Test Type */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                  Test Type <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white cursor-pointer appearance-none">
                    <option value="" disabled selected>Select type</option>
                    <option value="Mock Test">Mock Test</option>
                    <option value="Chapter Test">Chapter Test</option>
                    <option value="Weekly Test">Weekly Test</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Batch */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                  Batch <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white cursor-pointer appearance-none">
                    <option value="" disabled selected>Select batch</option>
                    <option value="All IIT-JEE Batches">All IIT-JEE Batches</option>
                    <option value="NEET B-15">NEET B-15</option>
                    <option value="IIT-JEE A-12">IIT-JEE A-12</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Subject */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                  Subject <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white cursor-pointer appearance-none">
                    <option value="" disabled selected>Select subject</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Biology">Biology</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                  Date <span className="text-red-500">*</span>
                </label>
                <input 
                  type="date" 
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Time */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                  Time <span className="text-red-500">*</span>
                </label>
                <input 
                  type="time" 
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                  Duration (hours) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  defaultValue={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Total Marks */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                  Total Marks <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  defaultValue={100}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white"
                />
              </div>

              {/* Passing Marks */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                  Passing Marks <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  defaultValue={40}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white"
                />
              </div>
            </div>
            
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-gray-100 shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm flex-1 sm:flex-none"
          >
            Cancel
          </button>
          <button 
            onClick={onCreateSuccess}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm flex-1 sm:flex-none"
          >
            Create Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTestModal;
