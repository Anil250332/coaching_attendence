import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  Award,
  CheckCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { useAppSelector } from '../../store/hooks';
import EmptyState from '../../components/EmptyState';

const performanceData = [
  { month: 'Jan', score: 72 },
  { month: 'Feb', score: 78 },
  { month: 'Mar', score: 82 },
  { month: 'Apr', score: 85 },
  { month: 'May', score: 88 },
  { month: 'Jun', score: 92 },
];

const subjectData = [
  { subject: 'Physics', score: 90, fullMark: 100 },
  { subject: 'Chemistry', score: 85, fullMark: 100 },
  { subject: 'Mathematics', score: 95, fullMark: 100 },
  { subject: 'Problem Solving', score: 88, fullMark: 100 },
  { subject: 'Speed', score: 80, fullMark: 100 },
];

const StudentProfile: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const students = useAppSelector(state => state.students.list);
  
  const student = students.find(s => s.id === Number(id));

  if (!student) {
    return (
      <div className="max-w-7xl mx-auto pb-10 space-y-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors mb-4 inline-flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <EmptyState title="Student Not Found" message="The student profile you are looking for does not exist." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-10 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div>
          <h1 className="text-[28px] font-bold text-[#111827]">Student Profile</h1>
          <p className="text-[15px] text-gray-500 font-medium">Detailed information and performance analytics</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-50 mb-4">
              <img 
                src={student.avatar} 
                alt={student.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-[22px] font-bold text-gray-900">{student.name}</h2>
            <p className="text-[15px] text-gray-500 font-medium mb-6">{student.studentId}</p>

            <div className="w-full space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg text-blue-500 shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[15px] text-gray-500 font-medium">Email</p>
                  <p className="text-[15px] font-semibold text-gray-900">{student.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg text-emerald-500 shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[15px] text-gray-500 font-medium">Phone</p>
                  <p className="text-[15px] font-semibold text-gray-900">+91 98765 43211</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg text-purple-500 shadow-sm">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[15px] text-gray-500 font-medium">Batch</p>
                  <p className="text-[15px] font-semibold text-gray-900">{student.batch}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg text-pink-500 shadow-sm">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[15px] text-gray-500 font-medium">Course</p>
                  <p className="text-[15px] font-semibold text-gray-900">{student.course}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Analytics */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#2563eb] text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <CheckCircle2 className="w-6 h-6 text-white/80" />
                <span className="text-[15px] font-bold bg-white/20 px-2 py-1 rounded-full">Active</span>
              </div>
              <h3 className="text-[32px] font-bold mb-1">{student.attendance}</h3>
              <p className="text-[15px] text-white/80 font-medium">Attendance Rate</p>
            </div>
            
            <div className="bg-[#8b5cf6] text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <TrendingUp className="w-6 h-6 text-white/80" />
                <Award className="w-5 h-5 text-white/40 absolute top-4 right-4" />
              </div>
              <h3 className="text-[32px] font-bold mb-1">{student.lastTest}</h3>
              <p className="text-[15px] text-white/80 font-medium">Last Test Score</p>
            </div>

            <div className="bg-[#f59e0b] text-white rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <Award className="w-6 h-6 text-white/80" />
                <span className="text-[15px] font-bold bg-white/20 px-2 py-1 rounded-full">Top 20</span>
              </div>
              <h3 className="text-[32px] font-bold mb-1">{student.rank}</h3>
              <p className="text-[15px] text-white/80 font-medium">Overall Rank</p>
            </div>
          </div>

          {/* Performance Trend Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-[18px] font-bold text-gray-900 mb-6">Performance Trend</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 12 }} 
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    dot={{ r: 5, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} 
                    activeDot={{ r: 7 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Middle Row: Radar Chart & Recent Scores */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Subject Performance Radar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-[18px] font-bold text-gray-900 mb-2">Subject Performance</h3>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={subjectData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                    <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Test Scores */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-[18px] font-bold text-gray-900 mb-6">Recent Test Scores</h3>
              <div className="space-y-3.5">
                {[
                  { name: 'Physics Mock Test 5', date: 'May 28', score: 92, max: 100 },
                  { name: 'Chemistry Chapter Test', date: 'May 25', score: 88, max: 100 },
                  { name: 'Mathematics Weekly', date: 'May 22', score: 95, max: 100 },
                  { name: 'Full Syllabus Mock', date: 'May 18', score: 347, max: 360 },
                ].map((test, idx) => (
                  <div key={idx} className="bg-[#f9fafb] p-4 rounded-xl">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                      <p className="text-[15px] font-semibold text-gray-900">{test.name}</p>
                      <p className="text-[15px] text-gray-500 font-medium mt-1 sm:mt-0">{test.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-[#10b981] h-1.5 rounded-full" 
                          style={{ width: `${(test.score / test.max) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-[15px] font-bold text-gray-900 shrink-0 w-12 text-right">{test.score}/{test.max}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Row: AI Plan & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AI-Recommended Study Plan (Spans 2 columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-[18px] font-bold text-gray-900 mb-6">AI-Recommended Study Plan</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border-l-4 border-blue-500 bg-linear-to-r from-blue-50/50 to-white shadow-sm">
              <h4 className="text-[15px] font-semibold text-gray-900 mb-1">Focus on Physics (Mechanics)</h4>
              <p className="text-[14px] text-gray-600">Spend 2 hours daily on problem-solving to improve speed.</p>
            </div>
            <div className="p-4 rounded-xl border-l-4 border-amber-500 bg-linear-to-r from-amber-50/50 to-white shadow-sm">
              <h4 className="text-[15px] font-semibold text-gray-900 mb-1">Weekly Mock Tests</h4>
              <p className="text-[14px] text-gray-600">Take a full syllabus mock test every Sunday to build stamina.</p>
            </div>
            <div className="p-4 rounded-xl border-l-4 border-emerald-500 bg-linear-to-r from-emerald-50/50 to-white shadow-sm">
              <h4 className="text-[15px] font-semibold text-gray-900 mb-1">Chemistry Revision</h4>
              <p className="text-[14px] text-gray-600">Revise organic chemistry reaction mechanisms daily for 30 mins.</p>
            </div>
          </div>
        </div>

        {/* Timeline (Spans 1 column) */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-[18px] font-bold text-gray-900 mb-6">Timeline</h3>
          <div className="space-y-6">
            {[
              { title: 'Admission', date: 'Jan 15, 2024', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { title: 'Q1 Fee Payment', date: 'Jan 20, 2024', icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-50' },
              { title: 'First Mock Test - 85%', date: 'Feb 10, 2024', icon: Award, color: 'text-orange-500', bg: 'bg-orange-50' },
              { title: 'Q2 Fee Payment', date: 'Apr 15, 2024', icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-50' },
              { title: 'Mid-Term Excellence', date: 'May 5, 2024', icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { title: 'Rank 12 Overall', date: 'Jun 1, 2024', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start sm:items-center gap-4">
                  <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center shrink-0 mt-1 sm:mt-0`}>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-gray-900">{item.title}</p>
                    <p className="text-[15px] text-gray-400 mt-0.5">{item.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentProfile;
