import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

import { useDispatch } from 'react-redux';
import { addStudent } from '../store/slices/studentSlice';
import toast from 'react-hot-toast';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [paymentStatus, setPaymentStatus] = useState('Pending');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Dispatch to Redux
    dispatch(addStudent({
      id: Date.now(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
      studentId: `STU-2026-${Math.floor(Math.random() * 9000) + 1000}`,
      course: formData.get('course') as string,
      batch: formData.get('batch') as string,
      attendance: '100%',
      lastTest: 'N/A',
      rank: 'N/A',
      feeStatus: formData.get('paymentStatus') as string
    }));

    toast.success('Student added successfully!');
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
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl w-full max-w-2xl shadow-xl relative z-10 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add New Student</h2>
            <p className="text-[13px] text-blue-600 font-semibold mt-1">Student ID: STU-2026-7747</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Student Name */}
            <div>
              <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                Student Name <span className="text-red-500">*</span>
              </label>
              <input 
                name="name"
                required
                type="text" 
                placeholder="Enter student name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] font-medium text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input 
                name="email"
                required
                type="email" 
                placeholder="student@email.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] font-medium text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input 
                name="phone"
                required
                type="tel" 
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] font-medium text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Parent Phone */}
            <div>
              <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                Parent Phone <span className="text-red-500">*</span>
              </label>
              <input 
                name="parentPhone"
                required
                type="tel" 
                placeholder="+91 98765 43211"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] font-medium text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-[14px] font-semibold text-gray-800 mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <input 
              name="address"
              required
              type="text" 
              placeholder="Enter address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] font-medium text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Course */}
            <div>
              <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                Course <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select name="course" required defaultValue="" className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] font-medium text-gray-900 bg-gray-50 focus:bg-white cursor-pointer appearance-none">
                  <option value="" disabled>Select course</option>
                  <option value="IIT-JEE">IIT-JEE</option>
                  <option value="NEET">NEET</option>
                  <option value="SSC">SSC</option>
                  <option value="Banking">Banking</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Batch */}
            <div>
              <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                Batch <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select name="batch" required defaultValue="" className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] font-medium text-gray-900 bg-gray-50 focus:bg-white cursor-pointer appearance-none">
                  <option value="" disabled>Select batch</option>
                  <option value="A-12">A-12</option>
                  <option value="B-15">B-15</option>
                  <option value="A-14">A-14</option>
                  <option value="C-08">C-08</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
            {/* Admission Date */}
            <div>
              <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                Admission Date <span className="text-red-500">*</span>
              </label>
              <input 
                name="admissionDate"
                required
                type="date" 
                defaultValue="2026-06-04"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] font-medium text-gray-900 bg-gray-50 focus:bg-white"
              />
            </div>
            {/* Fee Amount */}
            <div>
              <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                Fee Amount <span className="text-red-500">*</span>
              </label>
              <input 
                name="feeAmount"
                required
                type="number" 
                placeholder="45000"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] font-medium text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:bg-white"
              />
            </div>

            {/* Payment Status */}
            <div>
              <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                Payment Status <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select 
                  name="paymentStatus" 
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  required 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] font-medium text-gray-900 bg-gray-50 focus:bg-white cursor-pointer appearance-none"
                >
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                  <option value="Pending">Pending</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {paymentStatus === 'Partial' && (
              <div>
                <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                  Amount Paid <span className="text-red-500">*</span>
                </label>
                <input 
                  name="amountPaid"
                  required
                  type="number" 
                  placeholder="Enter amount paid"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] font-medium text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:bg-white"
                />
              </div>
            )}
          </div>

         
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-4 sm:p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentModal;
