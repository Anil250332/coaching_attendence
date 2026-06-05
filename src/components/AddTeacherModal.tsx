import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (teacher: any) => void;
}

const availableSubjects = [
  'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Reasoning', 'Banking', 'Economics'
];

const AddTeacherModal: React.FC<AddTeacherModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [qualification, setQualification] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [joiningDate, setJoiningDate] = useState('');

  if (!isOpen) return null;

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    onAdd({
      fullName,
      email,
      phone,
      experience,
      qualification,
      subjects: selectedSubjects,
      address,
      joiningDate
    });
    
    // Reset state
    setFullName('');
    setEmail('');
    setPhone('');
    setExperience('');
    setQualification('');
    setSelectedSubjects([]);
    setAddress('');
    setJoiningDate('');
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
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold text-gray-900">Add New Teacher</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Dr. John Doe"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400 bg-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teacher@coachmaster.com"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Phone */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                Phone <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400 bg-white"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
                Experience (years) <span className="text-red-500">*</span>
              </label>
              <input 
                type="number" 
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="10"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400 bg-white"
              />
            </div>
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
              Qualification <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              placeholder="Ph.D. in Physics"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400 bg-white"
            />
          </div>

          {/* Subjects selection tags */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-2">
              Subjects <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {availableSubjects.map((sub) => {
                const isSelected = selectedSubjects.includes(sub);
                return (
                  <button
                    type="button"
                    key={sub}
                    onClick={() => toggleSubject(sub)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-100'
                        : 'bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400 bg-white"
            />
          </div>

          {/* Joining Date */}
          <div>
            <label className="block text-[13px] font-semibold text-gray-800 mb-1.5">
              Joining Date <span className="text-red-500">*</span>
            </label>
            <input 
              type="date" 
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm text-gray-900 bg-white"
            />
          </div>

          {/* Footer inside scroll area for overflow styling consistency */}
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
              Add Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacherModal;
