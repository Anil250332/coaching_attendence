import React from 'react';
import { X, ChevronDown } from 'lucide-react';

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStudent?: {
    id: string;
    name: string;
    amount: number;
  };
}

const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({ isOpen, onClose, defaultStudent }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl relative z-10 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold text-gray-900">Record Payment</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-5">
            {/* Student ID */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                Student ID <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                defaultValue={defaultStudent?.id || "STU-2024-1247"}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900"
              />
            </div>

            {/* Student Name */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                Student Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                defaultValue={defaultStudent?.name || ""}
                placeholder="Enter student name"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                Amount (₹) <span className="text-red-500">*</span>
              </label>
              <input 
                type="number" 
                defaultValue={defaultStudent?.amount || 45000}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                Payment Method
              </label>
              <div className="relative">
                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white cursor-pointer appearance-none">
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Transaction ID */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                Transaction ID
              </label>
              <input 
                type="text" 
                placeholder="TXN-2024-XXXX"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                Notes
              </label>
              <textarea 
                rows={3}
                placeholder="Additional notes..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400 resize-none"
              />
            </div>
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
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-[#10b981] hover:bg-[#059669] transition-colors shadow-sm"
          >
            Record Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordPaymentModal;
