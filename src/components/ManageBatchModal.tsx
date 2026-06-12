import React, { useEffect, useState } from 'react';
import { X, ChevronDown, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ManageBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  batchData: any;
}

interface SubjectAssignment {
  id: string;
  subjectName: string;
  teacherName: string;
}

const ManageBatchModal: React.FC<ManageBatchModalProps> = ({ isOpen, onClose, batchData }) => {
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    status: '',
    schedule: '',
    teacher: ''
  });

  const [subjects, setSubjects] = useState<SubjectAssignment[]>([]);

  useEffect(() => {
    if (batchData) {
      setFormData({
        name: batchData.name,
        capacity: batchData.capacity.toString(),
        status: batchData.status === 'ACTIVE' ? 'Active' : 'Upcoming',
        schedule: batchData.schedule,
        teacher: batchData.teacher
      });

      // Initialize default subjects based on the batch course if not already present
      if (batchData.subjects) {
        setSubjects(batchData.subjects);
      } else {
        const defaultSubjects: SubjectAssignment[] = [];
        if (batchData.course === 'IIT-JEE') {
          defaultSubjects.push(
            { id: 'sub-1', subjectName: 'Physics', teacherName: batchData.teacher || 'Dr. Rajesh Kumar' },
            { id: 'sub-2', subjectName: 'Chemistry', teacherName: 'Prof. Meera Singh' },
            { id: 'sub-3', subjectName: 'Mathematics', teacherName: 'Mr. Amit Sharma' }
          );
        } else if (batchData.course === 'NEET') {
          defaultSubjects.push(
            { id: 'sub-1', subjectName: 'Physics', teacherName: 'Dr. Rajesh Kumar' },
            { id: 'sub-2', subjectName: 'Chemistry', teacherName: batchData.teacher || 'Prof. Meera Singh' },
            { id: 'sub-3', subjectName: 'Biology', teacherName: 'Ms. Priya Verma' }
          );
        } else {
          defaultSubjects.push(
            { id: 'sub-1', subjectName: 'General Studies', teacherName: batchData.teacher || 'Mr. Amit Sharma' },
            { id: 'sub-2', subjectName: 'English', teacherName: 'Ms. Priya Verma' }
          );
        }
        setSubjects(defaultSubjects);
      }
    }
  }, [batchData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubject = () => {
    const newSubject: SubjectAssignment = {
      id: Date.now().toString(),
      subjectName: '',
      teacherName: ''
    };
    setSubjects(prev => [...prev, newSubject]);
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects(prev => prev.filter(sub => sub.id !== id));
  };

  const handleSubjectChange = (id: string, key: 'subjectName' | 'teacherName', value: string) => {
    setSubjects(prev => prev.map(sub => sub.id === id ? { ...sub, [key]: value } : sub));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Batch & subject assignments updated successfully!');
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
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold text-gray-900">Manage Batch</h2>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
          
          {/* Batch Name */}
          <div>
            <label className="block text-[14px] font-semibold text-gray-800 mb-2">
              Batch Name <span className="text-red-500">*</span>
            </label>
            <input 
              name="name"
              required
              type="text" 
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] font-medium text-gray-900 bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Capacity */}
            <div>
              <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                Capacity <span className="text-red-500">*</span>
              </label>
              <input 
                name="capacity"
                required
                type="number" 
                value={formData.capacity}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] font-medium text-gray-900 bg-white"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-[14px] font-semibold text-gray-800 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select 
                  name="status" 
                  required 
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] font-medium text-gray-900 bg-white cursor-pointer appearance-none"
                >
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-[14px] font-semibold text-gray-800 mb-2">
              Schedule <span className="text-red-500">*</span>
            </label>
            <input 
              name="schedule"
              required
              type="text" 
              value={formData.schedule}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] font-medium text-gray-900 bg-white"
            />
          </div>

          {/* Teacher (Primary) */}
          <div>
            <label className="block text-[14px] font-semibold text-gray-800 mb-2">
              Primary Coordinator / Teacher <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select 
                name="teacher" 
                required 
                value={formData.teacher}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 hover:border-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[15px] font-medium text-gray-900 bg-white cursor-pointer appearance-none"
              >
                <option value="" disabled>Select teacher</option>
                <option value="Dr. Rajesh Kumar">Dr. Rajesh Kumar</option>
                <option value="Prof. Meera Singh">Prof. Meera Singh</option>
                <option value="Mr. Amit Sharma">Mr. Amit Sharma</option>
                <option value="Ms. Priya Verma">Ms. Priya Verma</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Subjects & Teachers Assignment Section */}
          <div className="border-t border-gray-100 pt-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-[16px] font-bold text-gray-900">Subjects & Assigned Teachers</h3>
                <p className="text-[12px] text-gray-500 font-medium">Assign specific teachers to individual subjects in this batch</p>
              </div>
              <button
                type="button"
                onClick={handleAddSubject}
                className="flex items-center gap-1.5 text-[13px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3.5 py-2 rounded-lg transition-colors border border-blue-100 hover:border-blue-200"
              >
                <Plus className="w-4 h-4" /> Add Subject
              </button>
            </div>

            {subjects.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                <p className="text-[14px] text-gray-400 font-medium">No subjects added to this batch yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {subjects.map((sub) => (
                  <div key={sub.id} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-gray-50/70 p-3.5 rounded-xl border border-gray-100">
                    {/* Subject Name Input */}
                    <div className="flex-1">
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Subject Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Physics, Mathematics"
                        value={sub.subjectName}
                        onChange={(e) => handleSubjectChange(sub.id, 'subjectName', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-100 outline-none transition-all text-[14px] font-semibold text-gray-800 bg-white"
                      />
                    </div>

                    {/* Teacher Select */}
                    <div className="flex-1">
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Assign Teacher</label>
                      <div className="relative">
                        <select
                          required
                          value={sub.teacherName}
                          onChange={(e) => handleSubjectChange(sub.id, 'teacherName', e.target.value)}
                          className="w-full px-3.5 py-2 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-100 outline-none transition-all text-[14px] font-semibold text-gray-800 bg-white cursor-pointer appearance-none"
                        >
                          <option value="" disabled>Select teacher</option>
                          <option value="Dr. Rajesh Kumar">Dr. Rajesh Kumar</option>
                          <option value="Prof. Meera Singh">Prof. Meera Singh</option>
                          <option value="Mr. Amit Sharma">Mr. Amit Sharma</option>
                          <option value="Ms. Priya Verma">Ms. Priya Verma</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-gray-500">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Delete Action */}
                    <div className="flex items-end justify-end sm:pt-5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(sub.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2.5 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        title="Remove Subject"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-6 border-t border-gray-100 bg-white rounded-b-2xl shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="w-full sm:w-[48%] py-3 rounded-lg text-[15px] font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="w-full sm:w-[48%] py-3 rounded-lg text-[15px] font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageBatchModal;
