import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  X, 
  Clock, 
  MapPin, 
  BookOpen, 
  User 
} from 'lucide-react';

interface Batch {
  id: number;
  name: string;
  students: number;
  attendance: string;
  avgScore: string;
  subject: string;
  faculty: string;
  schedule: string;
  room: string;
}

const TeacherBatches: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const navigate = useNavigate();

  const batches: Batch[] = [
    { id: 1, name: "JEE A-1", students: 45, attendance: "92%", avgScore: "78%", subject: "Physics", faculty: "Dr. Rajesh Kumar", schedule: "Mon, Wed, Fri - 9:00 AM", room: "Lab 201" },
    { id: 2, name: "NEET B-15", students: 52, attendance: "88%", avgScore: "81%", subject: "Physics", faculty: "Dr. Rajesh Kumar", schedule: "Tue, Thu, Sat - 10:30 AM", room: "Lab 202" },
    { id: 3, name: "JEE A-2", students: 48, attendance: "85%", avgScore: "74%", subject: "Physics", faculty: "Dr. Rajesh Kumar", schedule: "Mon, Wed, Fri - 11:30 AM", room: "Lab 201" },
    { id: 4, name: "NEET B-12", students: 50, attendance: "90%", avgScore: "83%", subject: "Physics", faculty: "Dr. Rajesh Kumar", schedule: "Tue, Thu, Sat - 1:30 PM", room: "Lab 203" },
    { id: 5, name: "JEE A-3", students: 42, attendance: "94%", avgScore: "80%", subject: "Physics", faculty: "Dr. Rajesh Kumar", schedule: "Mon, Wed, Fri - 2:00 PM", room: "Lab 202" },
    { id: 6, name: "NEET B-18", students: 43, attendance: "87%", avgScore: "76%", subject: "Physics", faculty: "Dr. Rajesh Kumar", schedule: "Tue, Thu, Sat - 4:00 PM", room: "Lab 203" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">My Batches</h1>
        <p className="text-gray-500 text-[15px] mt-1.5 font-medium">Manage and monitor all your assigned batches</p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((batch) => (
          <div 
            key={batch.id} 
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-6">{batch.name}</h2>
              
              {/* Stats Rows */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5 text-gray-400 font-semibold">
                    <Users className="w-4.5 h-4.5" />
                    <span>Students</span>
                  </div>
                  <span className="font-extrabold text-gray-800">{batch.students}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5 text-gray-400 font-semibold">
                    <Calendar className="w-4.5 h-4.5" />
                    <span>Attendance</span>
                  </div>
                  <span className="font-extrabold text-green-600">{batch.attendance}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5 text-gray-400 font-semibold">
                    <TrendingUp className="w-4.5 h-4.5" />
                    <span>Avg Score</span>
                  </div>
                  <span className="font-extrabold text-blue-600">{batch.avgScore}</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <button 
              onClick={() => setSelectedBatch(batch)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors shadow-sm active:scale-[0.98]"
            >
              View Batch
            </button>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedBatch && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h3 className="text-xl font-extrabold text-gray-800">{selectedBatch.name}</h3>
              <button 
                onClick={() => setSelectedBatch(null)}
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Cards row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-100 p-4 rounded-xl text-center space-y-1.5 border border-gray-100">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Students</span>
                  <p className="text-2xl font-extrabold text-gray-800">{selectedBatch.students}</p>
                </div>
                <div className="bg-green-50/50 p-4 rounded-xl text-center space-y-1.5 border border-green-200">
                  <span className="text-[11px] font-bold text-green-700/60 uppercase tracking-wider">Attendance</span>
                  <p className="text-2xl font-extrabold text-green-600">{selectedBatch.attendance}</p>
                </div>
                <div className="bg-blue-50/50 p-4 rounded-xl text-center space-y-1.5 border border-blue-200">
                  <span className="text-[11px] font-bold text-blue-700/60 uppercase tracking-wider">Average Score</span>
                  <p className="text-2xl font-extrabold text-blue-600">{selectedBatch.avgScore}</p>
                </div>
              </div>

              {/* Batch Details Section */}
              <div className="space-y-4">
                <h4 className="text-base font-extrabold text-gray-800">Batch Details</h4>
                <div className="space-y-3 bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3 text-sm">
                    <BookOpen className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-gray-400 font-semibold min-w-[70px]">Subject:</span>
                    <span className="text-gray-800 font-bold">{selectedBatch.subject}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <User className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-gray-400 font-semibold min-w-[70px]">Faculty:</span>
                    <span className="text-gray-800 font-bold">{selectedBatch.faculty}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-gray-400 font-semibold min-w-[70px]">Schedule:</span>
                    <span className="text-gray-800 font-bold">{selectedBatch.schedule}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-gray-400 font-semibold min-w-[70px]">Room:</span>
                    <span className="text-gray-800 font-bold">{selectedBatch.room}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-5 border-t border-gray-100 flex gap-4 bg-gray-50/50">
              <button 
                onClick={() => {
                  setSelectedBatch(null);
                  navigate('/teacher/students');
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors shadow-sm text-center"
              >
                View Students
              </button>
              <button 
                onClick={() => {
                  setSelectedBatch(null);
                  navigate('/teacher/attendance');
                }}
                className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold text-sm py-3 px-4 rounded-xl transition-colors text-center"
              >
                Mark Attendance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherBatches;
