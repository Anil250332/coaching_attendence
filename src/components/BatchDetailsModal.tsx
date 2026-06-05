import React from 'react';
import { X, Users, Clock, Calendar, User } from 'lucide-react';

interface BatchDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  batchData: any;
}

const dummyStudents = [
  { rollNo: 'STU-001', name: 'Aarav Sharma', attendance: 94, lastTestScore: '92%' },
  { rollNo: 'STU-002', name: 'Diya Patel', attendance: 88, lastTestScore: '85%' },
  { rollNo: 'STU-003', name: 'Vivek Kumar', attendance: 91, lastTestScore: '78%' },
  { rollNo: 'STU-004', name: 'Ananya Singh', attendance: 96, lastTestScore: '88%' },
  { rollNo: 'STU-005', name: 'Rohan Mehta', attendance: 87, lastTestScore: '82%' },
];

const BatchDetailsModal: React.FC<BatchDetailsModalProps> = ({ isOpen, onClose, batchData }) => {
  if (!isOpen || !batchData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-xl relative z-10 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header & Blue Banner */}
        <div className="p-4 sm:p-6 shrink-0 relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Batch Details</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="bg-blue-600 rounded-xl p-5 text-white shadow-sm">
            <h3 className="text-[22px] font-bold mb-1">{batchData.name}</h3>
            <p className="text-blue-100 text-[14px] font-medium">{batchData.course}</p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto px-4 sm:px-6 pb-6 space-y-6 custom-scrollbar">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Users className="w-4 h-4" />
                <span className="text-[13px] font-semibold text-gray-500">Students</span>
              </div>
              <p className="text-[20px] font-bold text-gray-900">{batchData.enrolled}/{batchData.capacity}</p>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-600 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-[13px] font-semibold text-gray-500">Schedule</span>
              </div>
              <p className="text-[14px] font-bold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">{batchData.schedule}</p>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-orange-500 mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-[13px] font-semibold text-gray-500">Start Date</span>
              </div>
              <p className="text-[14px] font-bold text-gray-900">{batchData.startedDate}</p>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <User className="w-4 h-4" />
                <span className="text-[13px] font-semibold text-gray-500">Teacher</span>
              </div>
              <p className="text-[14px] font-bold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">{batchData.teacher}</p>
            </div>
          </div>

          {/* Student List Table */}
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">Student List</h3>
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="py-3 px-5 text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Roll No</th>
                      <th className="py-3 px-5 text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Student Name</th>
                      <th className="py-3 px-5 text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Attendance</th>
                      <th className="py-3 px-5 text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Last Test Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {dummyStudents.map((student, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 px-5 text-[13px] text-gray-500 font-medium whitespace-nowrap">{student.rollNo}</td>
                        <td className="py-3 px-5 text-[14px] font-semibold text-gray-900 whitespace-nowrap">{student.name}</td>
                        <td className="py-3 px-5 whitespace-nowrap">
                          <span className={`text-[12px] font-bold px-2.5 py-1 rounded-full ${
                            student.attendance >= 90 ? 'bg-emerald-50 text-emerald-600' :
                            student.attendance >= 80 ? 'bg-yellow-50 text-yellow-600' :
                            'bg-red-50 text-red-600'
                          }`}>
                            {student.attendance}%
                          </span>
                        </td>
                        <td className="py-3 px-5 text-[14px] font-bold text-gray-900 whitespace-nowrap">{student.lastTestScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-white rounded-b-2xl shrink-0">
          <button 
            onClick={onClose}
            className="w-full py-3 rounded-lg text-[15px] font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BatchDetailsModal;
