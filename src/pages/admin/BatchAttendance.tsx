import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Search
} from 'lucide-react';

const dummyStudents = [
  { rollNo: '001', name: 'Aarav Sharma', status: 'Present', time: '09:05 AM', overall: '94.5%', overallColor: 'text-emerald-500', present: 85, absent: 5, total: 90, avatar: 'https://i.pravatar.cc/150?u=1' },
  { rollNo: '002', name: 'Rohan Mehta', status: 'Present', time: '09:03 AM', overall: '87.5%', overallColor: 'text-amber-500', present: 79, absent: 11, total: 90, avatar: 'https://i.pravatar.cc/150?u=2' },
  { rollNo: '003', name: 'Vivek Kumar', status: 'Present', time: '09:07 AM', overall: '91.2%', overallColor: 'text-emerald-500', present: 82, absent: 8, total: 90, avatar: 'https://i.pravatar.cc/150?u=3' },
  { rollNo: '004', name: 'Arjun Singh', status: 'Present', time: '09:02 AM', overall: '96.7%', overallColor: 'text-emerald-500', present: 87, absent: 3, total: 90, avatar: 'https://i.pravatar.cc/150?u=4' },
  { rollNo: '005', name: 'Karan Patel', status: 'Absent', time: '-', overall: '88.9%', overallColor: 'text-amber-500', present: 80, absent: 10, total: 90, avatar: 'https://i.pravatar.cc/150?u=5' }
];

const BatchAttendance: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Format ID for display (e.g. IIT-JEE-A-12 -> IIT-JEE A-12)
  const displayTitle = id?.replace(/-/g, ' ').replace('JEE A', 'JEE A-').replace('B 15', 'B-15').replace('C 08', 'C-08') || 'IIT-JEE A-12';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-4 mb-2">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
        </button>
        <div>
          <h1 className="text-[22px] sm:text-[28px] font-bold text-[#111827] flex items-center gap-2 leading-tight">
            {displayTitle} - Attendance
          </h1>
          <p className="text-[13px] sm:text-[15px] text-gray-500 font-medium">Detailed attendance records for all students</p>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="bg-[#2563eb] rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between h-[140px]">
          <Users className="w-7 h-7 text-blue-200" />
          <div>
            <h2 className="text-4xl font-bold mb-1">5</h2>
            <p className="text-blue-200 font-medium text-[14px]">Total Students</p>
          </div>
        </div>

        {/* Present Today */}
        <div className="bg-[#10b981] rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between h-[140px]">
          <CheckCircle2 className="w-7 h-7 text-emerald-100" />
          <div>
            <h2 className="text-4xl font-bold mb-1">4</h2>
            <p className="text-emerald-100 font-medium text-[14px]">Present Today</p>
          </div>
        </div>

        {/* Absent Today */}
        <div className="bg-[#ef4444] rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between h-[140px]">
          <XCircle className="w-7 h-7 text-red-200" />
          <div>
            <h2 className="text-4xl font-bold mb-1">1</h2>
            <p className="text-red-200 font-medium text-[14px]">Absent Today</p>
          </div>
        </div>

        {/* Avg Attendance */}
        <div className="bg-[#f59e0b] rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between h-[140px]">
          <TrendingUp className="w-7 h-7 text-amber-100" />
          <div>
            <h2 className="text-4xl font-bold mb-1">91.8%</h2>
            <p className="text-amber-100 font-medium text-[14px]">Avg Attendance</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[20px] p-4 sm:p-6 border border-gray-100 shadow-sm mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-[18px] font-bold text-[#111827]">Student Attendance Records</h3>

          <div className="relative w-full sm:w-[300px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 stroke-[1.5]" />
            </div>
            <input
              type="text"
              placeholder="Search by name or roll no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pr-3 py-[9px] border border-gray-200 rounded-lg text-[13px] bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              style={{ paddingLeft: '36px' }}
            />
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-4 text-[13px] font-semibold text-gray-500">Roll No.</th>
                <th className="py-4 px-4 text-[13px] font-semibold text-gray-500">Student</th>
                <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 text-center">Today's Status</th>
                <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 text-center">Time</th>
                <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 text-center">Overall %</th>
                <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 text-center">Days Present</th>
                <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 text-center">Days Absent</th>
                <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 text-center">Total Days</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {dummyStudents.map((student, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-gray-900 text-[14px]">{student.rollNo}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full bg-gray-200" />
                      <span className="font-bold text-gray-900 text-[14px]">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {student.status === 'Present' ? (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[13px] font-bold border border-emerald-100">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Present
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1 rounded-full text-[13px] font-bold border border-red-100">
                        <XCircle className="w-3.5 h-3.5" /> Absent
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center text-gray-500 text-[13px] font-medium">{student.time}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`text-[14px] font-bold ${student.overallColor}`}>
                      {student.overall}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-emerald-600 font-bold text-[14px]">{student.present}</td>
                  <td className="py-4 px-4 text-center text-red-600 font-bold text-[14px]">{student.absent}</td>
                  <td className="py-4 px-4 text-center text-gray-500 font-medium text-[14px]">{student.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BatchAttendance;
