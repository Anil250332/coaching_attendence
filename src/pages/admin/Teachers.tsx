import React, { useState } from 'react';
import { Plus, BookOpen, Users, Star, Mail, Phone } from 'lucide-react';
import AddTeacherModal from '../../components/AddTeacherModal';
import ScheduleClassModal from '../../components/ScheduleClassModal';

interface Teacher {
  id: string;
  name: string;
  avatar: string;
  subjects: string[];
  rating: number;
  experience: number;
  batchesCount: number;
  studentsCount: number;
  batches: string[];
  email: string;
  phone: string;
}

const initialTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    avatar: 'RK',
    subjects: ['Physics', 'Mathematics'],
    rating: 4.9,
    experience: 15,
    batchesCount: 2,
    studentsCount: 58,
    batches: ['IIT-JEE A-12', 'IIT-JEE A-14'],
    email: 'rajesh.kumar@coachmaster.com',
    phone: '+91 98765 11111'
  },
  {
    id: '2',
    name: 'Prof. Meera Singh',
    avatar: 'MS',
    subjects: ['Chemistry', 'Biology'],
    rating: 4.8,
    experience: 12,
    batchesCount: 2,
    studentsCount: 70,
    batches: ['NEET B-15', 'NEET B-17'],
    email: 'meera.singh@coachmaster.com',
    phone: '+91 98765 22222'
  },
  {
    id: '3',
    name: 'Mr. Amit Sharma',
    avatar: 'AS',
    subjects: ['Mathematics', 'Reasoning'],
    rating: 4.7,
    experience: 8,
    batchesCount: 1,
    studentsCount: 25,
    batches: ['IIT-JEE A-12'],
    email: 'amit.sharma@coachmaster.com',
    phone: '+91 98765 33333'
  },
  {
    id: '4',
    name: 'Ms. Priya Verma',
    avatar: 'PV',
    subjects: ['Banking', 'Economics'],
    rating: 4.6,
    experience: 6,
    batchesCount: 1,
    studentsCount: 20,
    batches: ['Banking B-01'],
    email: 'priya.verma@coachmaster.com',
    phone: '+91 98765 44444'
  }
];

const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTeacherForSchedule, setSelectedTeacherForSchedule] = useState<Teacher | null>(null);

  const handleAddTeacher = (newTeacherData: any) => {
    const newTeacher: Teacher = {
      id: (teachers.length + 1).toString(),
      name: newTeacherData.fullName,
      avatar: newTeacherData.fullName.split(' ').map((n: string) => n[0]).join(''),
      subjects: newTeacherData.subjects,
      rating: 5.0, // New teachers start with 5.0
      experience: parseInt(newTeacherData.experience || '0', 10),
      batchesCount: 0,
      studentsCount: 0,
      batches: [],
      email: newTeacherData.email,
      phone: newTeacherData.phone
    };

    setTeachers(prev => [...prev, newTeacher]);
  };

  const handleScheduleClass = (scheduleData: any) => {
    console.log('Scheduled class:', scheduleData, 'for teacher:', selectedTeacherForSchedule?.name);
    // You can handle success visual notification here if needed
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 sm:pt-0">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827]">Teachers</h1>
          <p className="text-[15px] text-gray-500 font-medium mt-1">Manage faculty and staff</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Teacher
        </button>
      </div>

      {/* Grid of Teacher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              {/* Teacher Info Row */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
                  {teacher.avatar}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug">{teacher.name}</h3>
                  <p className="text-[13px] font-semibold text-gray-400">{teacher.subjects.join(', ')}</p>
                  
                  {/* Rating & Experience */}
                  <div className="flex items-center gap-1 text-[12px] font-bold text-[#F59E0B]">
                    <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                    <span>{teacher.rating.toFixed(1)}</span>
                    <span className="text-gray-400 font-semibold">({teacher.experience} years exp.)</span>
                  </div>
                </div>
              </div>

              {/* Batches and Students metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-[#2563EB]">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-[11px] font-bold">Batches</span>
                  </div>
                  <span className="text-lg font-extrabold text-gray-900 mt-2">{teacher.batchesCount}</span>
                </div>
                
                <div className="bg-[#ECFDF5] border border-[#D1FAE5] rounded-xl p-3 flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-[#059669]">
                    <Users className="w-4 h-4" />
                    <span className="text-[11px] font-bold">Students</span>
                  </div>
                  <span className="text-lg font-extrabold text-gray-900 mt-2">{teacher.studentsCount}</span>
                </div>
              </div>

              {/* Details Lines */}
              <div className="space-y-1.5 pt-2 text-[13px] font-semibold text-gray-500">
                <div className="truncate">
                  <span className="text-gray-400 font-bold">Batches: </span>
                  <span className="text-gray-800">{teacher.batches.length > 0 ? teacher.batches.join(', ') : 'No batches assigned'}</span>
                </div>
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-800">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 truncate">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-800">{teacher.phone}</span>
                </div>
              </div>
            </div>

            {/* Footer buttons inside card */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              <button className="flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-xs font-bold transition-all text-center">
                View Profile
              </button>
              <button 
                onClick={() => setSelectedTeacherForSchedule(teacher)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all text-center shadow-xs"
              >
                Schedule
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Teacher Modal */}
      <AddTeacherModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTeacher}
      />

      {/* Schedule Class Modal */}
      {selectedTeacherForSchedule && (
        <ScheduleClassModal 
          isOpen={!!selectedTeacherForSchedule}
          onClose={() => setSelectedTeacherForSchedule(null)}
          teacherName={selectedTeacherForSchedule.name}
          teacherBatches={selectedTeacherForSchedule.batches.length > 0 ? selectedTeacherForSchedule.batches : ['IIT-JEE A-12', 'NEET B-15']}
          teacherSubjects={selectedTeacherForSchedule.subjects}
          onSchedule={handleScheduleClass}
        />
      )}
    </div>
  );
};

export default Teachers;
