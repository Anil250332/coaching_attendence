import React, { useState } from 'react';
import { 
  Search, 
  Eye, 
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Student {
  id: number;
  name: string;
  initials: string;
  batch: string;
  attendance: string;
  lastScore: string;
  weakTopic: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

const TeacherStudents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedBatchFilter, setSelectedBatchFilter] = useState('');

  const students: Student[] = [
    { id: 1, name: "Rahul Sharma", initials: "RS", batch: "JEE A-1", attendance: "95%", lastScore: "88%", weakTopic: "Physics", riskLevel: "Low" },
    { id: 2, name: "Priya Patel", initials: "PP", batch: "NEET B-15", attendance: "92%", lastScore: "91%", weakTopic: "Chemistry", riskLevel: "Low" },
    { id: 3, name: "Amit Kumar", initials: "AK", batch: "JEE A-2", attendance: "78%", lastScore: "62%", weakTopic: "Physics", riskLevel: "High" },
    { id: 4, name: "Sneha Reddy", initials: "SR", batch: "NEET B-12", attendance: "88%", lastScore: "85%", weakTopic: "Biology", riskLevel: "Medium" },
    { id: 5, name: "Vijay Singh", initials: "VS", batch: "JEE A-1", attendance: "90%", lastScore: "79%", weakTopic: "Maths", riskLevel: "Low" },
    { id: 6, name: "Ananya Das", initials: "AD", batch: "NEET B-15", attendance: "85%", lastScore: "83%", weakTopic: "Chemistry", riskLevel: "Medium" },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.weakTopic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = selectedBatchFilter ? student.batch === selectedBatchFilter : true;
    return matchesSearch && matchesBatch;
  });

  const getRiskBadgeColor = (risk: 'Low' | 'Medium' | 'High') => {
    switch (risk) {
      case 'Low':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      case 'Medium':
        return 'bg-amber-50 text-amber-600 border border-amber-100';
      case 'High':
        return 'bg-red-50 text-red-600 border border-red-100';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Students</h1>
        <p className="text-gray-500 text-[15px] mt-1.5 font-medium">Monitor student performance and progress</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 flex-col sm:flex-row gap-4 w-full">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-800 text-sm placeholder-gray-400 shadow-sm"
            />
          </div>
          
          {/* Batch Filter Dropdown */}
          <div className="w-full sm:w-48">
            <select
              value={selectedBatchFilter}
              onChange={(e) => setSelectedBatchFilter(e.target.value)}
              className="block w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold shadow-sm cursor-pointer"
            >
              <option value="">All Batches</option>
              <option value="JEE A-1">JEE A-1</option>
              <option value="JEE A-2">JEE A-2</option>
              <option value="NEET B-12">NEET B-12</option>
              <option value="NEET B-15">NEET B-15</option>
            </select>
          </div>
        </div>

        
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 pl-6 pr-4 text-[12px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap w-12">S.No.</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Student Name</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Batch</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-center">Attendance</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-center">Last Test Score</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Weak Subject</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Risk Score</th>
                <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-50/40 transition-colors">
                    {/* S.No */}
                    <td className="py-4 pl-6 pr-4 text-[13px] text-gray-500 font-semibold whitespace-nowrap">
                      {index + 1}
                    </td>
                    {/* Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-sm shadow-xs">
                          {student.initials}
                        </div>
                        <span className="font-bold text-gray-800 text-[14px]">{student.name}</span>
                      </div>
                    </td>

                    {/* Batch */}
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 font-semibold text-xs rounded-full border border-blue-100/30">
                        {student.batch}
                      </span>
                    </td>

                    {/* Attendance */}
                    <td className="py-4 px-6 text-center">
                      <span className="font-bold text-gray-700 text-[14px]">{student.attendance}</span>
                    </td>

                    {/* Score */}
                    <td className="py-4 px-6 text-center">
                      <span className="font-bold text-gray-700 text-[14px]">{student.lastScore}</span>
                    </td>

                    {/* Weak Topic */}
                    <td className="py-4 px-6">
                      <span className="text-gray-500 font-semibold text-[14px]">{student.weakTopic}</span>
                    </td>

                    {/* Risk */}
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskBadgeColor(student.riskLevel)}`}>
                        {student.riskLevel}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-center">
                      <button 
                        onClick={() => setSelectedStudent(student)}
                        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold text-xs bg-blue-50/50 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100/30 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400 font-medium text-sm">
                    No students found matching search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h3 className="text-xl font-extrabold text-gray-800">Student Details</h3>
              <button 
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Profile Card Header */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-xl shadow-md">
                  {selectedStudent.initials}
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-gray-800">{selectedStudent.name}</h4>
                  <p className="text-sm text-gray-400 font-bold mt-0.5">{selectedStudent.batch}</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50/50 p-4 rounded-xl text-center space-y-1.5 border border-green-100/30">
                  <span className="text-[11px] font-bold text-green-700/60 uppercase tracking-wider">Attendance</span>
                  <p className="text-2xl font-extrabold text-green-600">{selectedStudent.attendance}</p>
                </div>
                <div className="bg-blue-50/50 p-4 rounded-xl text-center space-y-1.5 border border-blue-100/30">
                  <span className="text-[11px] font-bold text-blue-700/60 uppercase tracking-wider">Last Score</span>
                  <p className="text-2xl font-extrabold text-blue-600">{selectedStudent.lastScore}</p>
                </div>
                <div className={`p-4 rounded-xl text-center space-y-1.5 border ${
                  selectedStudent.riskLevel === 'Low'
                    ? 'bg-emerald-50/50 border-emerald-100/30 text-emerald-700/60'
                    : selectedStudent.riskLevel === 'Medium'
                    ? 'bg-amber-50/50 border-amber-100/30 text-amber-700/60'
                    : 'bg-red-50/50 border-red-100/30 text-red-700/60'
                }`}>
                  <span className="text-[11px] font-bold uppercase tracking-wider">Risk Level</span>
                  <p className={`text-2xl font-extrabold ${
                    selectedStudent.riskLevel === 'Low'
                      ? 'text-emerald-600'
                      : selectedStudent.riskLevel === 'Medium'
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}>{selectedStudent.riskLevel}</p>
                </div>
              </div>

              {/* Weak Topics Section */}
              <div className="space-y-2.5">
                <h5 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Weak Subjects</h5>
                <p className="text-gray-800 font-bold text-[15px]">{selectedStudent.weakTopic}</p>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-5 border-t border-gray-100 flex gap-4 bg-gray-50/50">
              
              <button 
                onClick={() => {
                  setSelectedStudent(null);
                  toast.success(`Academic alert alert sent for ${selectedStudent.name}!`);
                }}
                className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold text-sm py-3 px-4 rounded-xl transition-colors text-center"
              >
                Send Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherStudents;
