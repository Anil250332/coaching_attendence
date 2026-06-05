import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  TrendingUp, 
  Award, 
  Plus, 
  Search
} from 'lucide-react';
import AddStudentModal from '../components/AddStudentModal';
import { useAppSelector } from '../store/hooks';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';

const statsData = [
  { title: 'Total Students', value: '2,847', change: '+12.5%', isPositive: true, icon: Users, color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { title: 'Active Students', value: '2,715', change: '+8.2%', isPositive: true, icon: GraduationCap, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { title: 'Avg Attendance', value: '91.2%', change: '+2.3%', isPositive: true, icon: TrendingUp, color: 'text-orange-500', bgColor: 'bg-orange-50' },
  { title: 'Top Performers', value: '287', change: '+15%', isPositive: true, icon: Award, color: 'text-purple-500', bgColor: 'bg-purple-50' },
];

const ITEMS_PER_PAGE = 5;

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('All Courses');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const studentsData = useAppSelector((state) => state.students.list);

  // Filter Logic
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'All Courses' || student.course === courseFilter;
    return matchesSearch && matchesCourse;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, courseFilter]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827]">Students</h1>
          <p className="text-[14px] text-gray-500 mt-1 font-medium">Manage all enrolled students</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4 shrink-0" />
          Add New Student
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className={`text-[13px] font-bold ${stat.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <h3 className="text-[26px] font-bold text-gray-900 leading-none mb-2">{stat.value}</h3>
                <p className="text-[13px] text-gray-500 font-medium">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or student ID..."
              className="block w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Course Filter */}
          <div className="relative">
            <select 
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium text-[14px] cursor-pointer"
            >
              <option>All Courses</option>
              <option>IIT-JEE</option>
              <option>NEET</option>
              <option>SSC</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="py-4 pl-6 pr-4 text-[12px] font-semibold text-gray-500 whitespace-nowrap ">S.No.</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 whitespace-nowrap">Student</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 whitespace-nowrap">Student ID</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 whitespace-nowrap">Course</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 whitespace-nowrap">Batch</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 whitespace-nowrap">Attendance</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 whitespace-nowrap">Last Test</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 whitespace-nowrap">Rank</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 whitespace-nowrap">Fee Status</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedStudents.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0">
                  <td className="py-4 pl-6 pr-4 text-[13px] text-gray-500 font-medium whitespace-nowrap">
                    {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={student.avatar} 
                        alt={student.name} 
                        className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
                      />
                      <div>
                        <p className="text-[14px] font-semibold text-gray-900 whitespace-nowrap">{student.name}</p>
                        <p className="text-[12px] text-gray-500 mt-0.5 whitespace-nowrap">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[13px] text-gray-500 font-medium whitespace-nowrap">
                    {student.studentId}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="text-[11px] font-semibold px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full">
                      {student.course}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[13px] text-gray-600 font-medium whitespace-nowrap">
                    {student.batch}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="text-[12px] font-semibold text-emerald-600">
                      {student.attendance}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[13px] font-bold text-gray-900 whitespace-nowrap">
                    {student.lastTest}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="text-[11px] font-bold px-2.5 py-1 bg-purple-50 text-purple-600 rounded-md">
                      {student.rank}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                      student.feeStatus === 'Paid' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {student.feeStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <button 
                      onClick={() => navigate(`/students/${student.id}`)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-[12px] font-medium transition-colors shadow-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredStudents.length === 0 && (
            <div className="p-8">
              <EmptyState 
                title="No Students Found" 
                message={searchTerm ? `We couldn't find any students matching "${searchTerm}".` : "No students available for this course."} 
              />
            </div>
          )}
        </div>
        
        {/* Pagination component */}
        {filteredStudents.length > 0 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredStudents.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        )}
      </div>

      <AddStudentModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
};

export default Students;
