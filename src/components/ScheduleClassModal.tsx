import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ScheduleClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
  teacherBatches: string[];
  teacherSubjects: string[];
  onSchedule: (scheduleData: any) => void;
}

const ScheduleClassModal: React.FC<ScheduleClassModalProps> = ({ 
  isOpen, 
  onClose, 
  teacherName, 
  teacherBatches, 
  teacherSubjects, 
  onSchedule 
}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !selectedBatch || !selectedSubject) return;

    onSchedule({
      date,
      time,
      batch: selectedBatch,
      subject: selectedSubject,
      notes
    });

    setDate('');
    setTime('');
    setSelectedBatch('');
    setSelectedSubject('');
    setNotes('');
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
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-xl relative z-10 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Schedule Class</h2>
            <p className="text-[13px] text-gray-500 font-semibold mt-0.5">Teacher: {teacherName}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          {/* Teacher Availability Info Box */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 space-y-2">
            <h4 className="text-[13px] font-bold text-blue-800">Teacher Availability</h4>
            <div className="text-[12px] font-semibold text-gray-600 space-y-1">
              <div>
                <span className="text-gray-400">Batches: </span>
                <span>{teacherBatches.join(', ')}</span>
              </div>
              <div>
                <span className="text-gray-400">Subjects: </span>
                <span>{teacherSubjects.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Date */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                Date <span className="text-red-500">*</span>
              </label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                Time <span className="text-red-500">*</span>
              </label>
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Batch */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                Batch <span className="text-red-500">*</span>
              </label>
              <select 
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white cursor-pointer"
              >
                <option value="" disabled>Select batch</option>
                {teacherBatches.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                Subject <span className="text-red-500">*</span>
              </label>
              <select 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white cursor-pointer"
              >
                <option value="" disabled>Select subject</option>
                {teacherSubjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
              Notes (Optional)
            </label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes or instructions..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400 bg-white resize-y"
            />
          </div>

          {/* Footer inside scroll area for overflow consistency */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 shrink-0">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm flex-1 sm:flex-none text-center"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-8 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm flex-1 sm:flex-none text-center ml-4 sm:ml-0"
            >
              Schedule Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleClassModal;
