import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface ConvertStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: any;
}

const ConvertStudentModal: React.FC<ConvertStudentModalProps> = ({ isOpen, onClose, lead }) => {
  const [paymentStatus, setPaymentStatus] = useState('Pending');

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl relative z-10 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Convert Lead to Student</h2>
            <p className="text-sm text-blue-600 mt-1 font-medium">Student ID: STU-2026-2658</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Student Name */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Student Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue={lead.name}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                defaultValue={lead.email}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                defaultValue={lead.phone}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900"
              />
            </div>

            {/* Parent Phone */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Parent Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43211"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter address"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Course */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Course <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  defaultValue={lead.interest}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white cursor-pointer appearance-none"
                >
                  <option value="IIT-JEE">IIT-JEE</option>
                  <option value="NEET">NEET</option>
                  <option value="SSC">SSC</option>
                  <option value="Banking">Banking</option>
                  <option value="UPSC">UPSC</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Batch */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Batch <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  defaultValue=""
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white cursor-pointer appearance-none"
                >
                  <option value="" disabled>Select Batch</option>
                  <option value="Morning">Morning Batch</option>
                  <option value="Evening">Evening Batch</option>
                  <option value="Weekend">Weekend Batch</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Admission Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white"
              />
            </div>

            {/* Fee Amount */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Fee Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter fee amount"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Payment Status */}
            <div>
              <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Payment Status <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white cursor-pointer appearance-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="Partial">Partial</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {paymentStatus === 'Partial' && (
              <div>
                <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                  Amount Paid <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter amount paid"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                />
              </div>
            )}

            {/* Admission Date */}

          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            Convert to Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConvertStudentModal;
