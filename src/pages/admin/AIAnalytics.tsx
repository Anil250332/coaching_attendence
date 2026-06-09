import React, { useState } from 'react';
import { 
  BrainCircuit, 
  TrendingUp, 
  AlertTriangle, 
  Award, 
  Sparkles, 
  Search, 
  ArrowRight, 
  Bell, 
  MessageSquare, 
  Download,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

interface StudentRisk {
  id: number;
  name: string;
  avatar: string;
  batch: string;
  attendance: number;
  lastTestScore: number;
  riskScore: number;
  predictedRank: string;
  weakLessons: string;
  action: string;
  status: 'Critical' | 'Warning';
  parentName?: string;
  parentPhone?: string;
}

const studentsRiskData: StudentRisk[] = [
  {
    id: 1,
    name: 'Avinash Sharma',
    avatar: 'AS',
    batch: 'JEE A-1',
    attendance: 58,
    lastTestScore: 46,
    riskScore: 91,
    predictedRank: '22,000',
    weakLessons: 'Physics, Chemistry',
    action: 'Parent Call Required',
    status: 'Critical',
    parentName: 'Ramesh Sharma',
    parentPhone: '+91 98765 43210'
  },
  {
    id: 2,
    name: 'Priya Deshmukh',
    avatar: 'PD',
    batch: 'NEET B-15',
    attendance: 62,
    lastTestScore: 52,
    riskScore: 85,
    predictedRank: '18,500',
    weakLessons: 'Physics',
    action: 'Counseling Required',
    status: 'Critical',
    parentName: 'Suresh Deshmukh',
    parentPhone: '+91 98765 43211'
  },
  {
    id: 3,
    name: 'Rahul Verma',
    avatar: 'RV',
    batch: 'JEE A-2',
    attendance: 68,
    lastTestScore: 58,
    riskScore: 72,
    predictedRank: '15,000',
    weakLessons: 'Mathematics',
    action: 'Extra Classes',
    status: 'Warning',
    parentName: 'Anil Verma',
    parentPhone: '+91 98765 43212'
  },
  {
    id: 4,
    name: 'Amit Patel',
    avatar: 'AP',
    batch: 'NEET B-15',
    attendance: 74,
    lastTestScore: 64,
    riskScore: 61,
    predictedRank:'28,000',
    weakLessons: 'Chemistry',
    action: 'Study Plan Revision',
    status: 'Warning',
    parentName: 'Dinesh Patel',
    parentPhone: '+91 98765 43213'
  },
  {
    id: 5,
    name: 'Rohan Das',
    avatar: 'RD',
    batch: 'JEE A-1',
    attendance: 35,
    lastTestScore: 42,
    riskScore: 95,
    predictedRank: '35,000',
    weakLessons: 'Physics',
    action: 'Parent Call Required',
    status: 'Critical',
    parentName: 'Bimal Das',
    parentPhone: '+91 98765 43214'
  },
  {
    id: 6,
    name: 'Kirti Singhal',
    avatar: 'KS',
    batch: 'NEET B-15',
    attendance: 38,
    lastTestScore: 45,
    riskScore: 92,
    predictedRank: '29,000',
    weakLessons: 'Chemistry',
    action: 'Counseling Required',
    status: 'Critical',
    parentName: 'Mahendra Singhal',
    parentPhone: '+91 98765 43215'
  },
  {
    id: 7,
    name: 'Vikram Aditya',
    avatar: 'VA',
    batch: 'JEE A-2',
    attendance: 32,
    lastTestScore: 39,
    riskScore: 96,
    predictedRank: '40,000',
    weakLessons: 'Mathematics',
    action: 'Parent Call Required',
    status: 'Critical',
    parentName: 'Rajesh Aditya',
    parentPhone: '+91 98765 43216'
  }
];

const rankPredictions = [
  { name: 'Aarav Sharma', currentMarks: 285, jeeRank: '2,500', neetRank: '-', probability: 92 },
  { name: 'Diya Patel', currentMarks: 648, jeeRank: '-', neetRank: '1,200', probability: 95 },
  { name: 'Vivek Kumar', currentMarks: 258, jeeRank: '4,800', neetRank: '-', probability: 85 }
];

const batchPerformance = [
  { name: 'JEE A-1', healthScore: 85, avgScore: 70, attendance: 88, improvement: 12 },
  { name: 'NEET B-15', healthScore: 89, avgScore: 82, attendance: 92, improvement: 15 },
  { name: 'JEE A-2', healthScore: 72, avgScore: 60, attendance: 75, improvement: -5, actionRequired: true },
  { name: 'SSC C-8', healthScore: 80, avgScore: 74, attendance: 84, improvement: 8 }
];

const teacherInsights = [
  { name: 'Dr. Rajesh Kumar', students: 58, avgScore: 76, improvement: 12, weakLessons: ['Thermodynamics', 'Rotational Motion'] },
  { name: 'Prof. Meera Singh', students: 70, avgScore: 82, improvement: 15, weakLessons: ['Organic Chemistry'] }
];

const parentAlerts = [
  { name: 'Avinash Sharma', issue: 'Low Attendance', status: 'Critical' },
  { name: 'Rahul Verma', issue: 'Declining Scores', status: 'Warning' },
  { name: 'Priya Deshmukh', issue: 'Dropout Risk', status: 'Critical' },
  { name: 'Amit Patel', issue: 'Fee Pending', status: 'Warning' }
];

const aiActionItems = [
  {
    title: '32 students weak in Organic Chemistry',
    recommendation: 'Recommended Action: Schedule Revision Test this Saturday',
    type: 'critical'
  },
  {
    title: 'Batch JEE-A2 attendance below 70%',
    recommendation: 'Recommended Action: Parent Follow-up Campaign Required',
    type: 'warning'
  },
  {
    title: '8 students showing dropout indicators',
    recommendation: 'Recommended Action: Immediate Counseling Required',
    type: 'critical'
  },
  {
    title: 'Batch NEET-B15 showing excellent progress',
    recommendation: 'Recommended Action: Continue Current Teaching Methods',
    type: 'success'
  }
];

const barChartData = [
  { name: 'Physics', value: 34, color: 'bg-[#EF4444]' }, // red
  { name: 'Chemistry', value: 28, color: 'bg-[#F97316]', active: true }, // orange
  { name: 'Mathematics', value: 25, color: 'bg-[#F59E0B]' }, // yellow
  { name: 'Biology', value: 18, color: 'bg-[#10B981]' } // green
];

const AIAnalytics: React.FC = () => {
  const [filterRisk, setFilterRisk] = useState<'all' | 'critical' | 'warning'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState<string>('All');
  const [subjectFilter, setSubjectFilter] = useState<string>('All');
  
  // State for Take Action WhatsApp Modal
  const [selectedActionStudent, setSelectedActionStudent] = useState<StudentRisk | null>(null);
  const [actionMessageText, setActionMessageText] = useState<string>('');

  const handleOpenActionModal = (studentName: string, contextMessage?: string) => {
    const student = studentsRiskData.find(s => s.name === studentName);
    if (student) {
      setSelectedActionStudent(student);
      const preset = `Dear Parent, this is to inform you that ${student.name} of batch ${student.batch} has been identified as needing attention. ${contextMessage || `Current attendance is ${student.attendance}% and average test score is ${student.lastTestScore}%.`} Please contact coaching center admin.`;
      setActionMessageText(preset);
    } else {
      const tempStudent: StudentRisk = {
        id: 999,
        name: studentName,
        avatar: studentName.split(' ').map(n => n[0]).join(''),
        batch: 'General',
        attendance: 0,
        lastTestScore: 0,
        riskScore: 0,
        predictedRank: 'N/A',
        weakLessons: 'N/A',
        action: 'Contact Parent',
        status: 'Warning',
        parentPhone: '+91 98765 43210',
        parentName: 'Parent of ' + studentName
      };
      setSelectedActionStudent(tempStudent);
      setActionMessageText(`Dear Parent, this is regarding ${studentName}. Please contact the coaching center administration.`);
    }
  };

  const filteredStudents = studentsRiskData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.batch.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterRisk === 'all') return matchesSearch;
    return matchesSearch && student.status.toLowerCase() === filterRisk;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 sm:pt-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BrainCircuit className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-[26px] font-extrabold text-gray-900 leading-tight">AI Academic Intelligence Center</h1>
            <p className="text-[14px] text-gray-500 font-semibold mt-0.5">Real-time student performance insights powered by AI</p>
          </div>
        </div>
        <div className="bg-[#F5F3FF] text-[#7C3AED] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-[#EDE9FE] shadow-xs">
          <Sparkles className="w-4 h-4 fill-[#7C3AED] text-[#7C3AED]" />
          AI Powered
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
        {/* Students at Risk */}
        <div className="bg-[#FFF5F5] border border-[#FEE2E2] rounded-2xl p-5 relative flex flex-col justify-between hover:shadow-md transition-all">
          <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
          <div className="w-10 h-10 rounded-xl bg-white text-[#EF4444] border border-[#FEE2E2] flex items-center justify-center mb-4">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-[24px] font-extrabold text-gray-900">24</h3>
              <p className="text-[12px] font-bold text-gray-500 mt-0.5">Students at Risk</p>
            </div>
            <button className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white py-2 rounded-xl text-[11px] font-bold transition-colors shadow-xs">
              View Students
            </button>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-5 relative flex flex-col justify-between hover:shadow-md transition-all">
          <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
          <div className="w-10 h-10 rounded-xl bg-white text-[#10B981] border border-[#DCFCE7] flex items-center justify-center mb-4">
            <Award className="w-5 h-5" />
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-[24px] font-extrabold text-gray-900">38</h3>
              <p className="text-[12px] font-bold text-gray-500 mt-0.5">Top Performers</p>
            </div>
            <button className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-2 rounded-xl text-[11px] font-bold transition-colors shadow-xs">
              View Details
            </button>
          </div>
        </div>

        {/* Predicted IIT */}
        <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-2xl p-5 relative flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-white text-[#2563EB] border border-[#DBEAFE] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold bg-[#EFF6FF] text-[#2563EB] border border-[#DBEAFE] px-2 py-0.5 rounded-full">
              AI Prediction
            </span>
          </div>
          <div>
            <h3 className="text-[24px] font-extrabold text-gray-900">18</h3>
            <p className="text-[11px] font-bold text-gray-500 mt-0.5">Predicted IIT Selections</p>
          </div>
        </div>

        {/* Predicted NEET */}
        <div className="bg-[#ECFDF5] border border-[#D1FAE5] rounded-2xl p-5 relative flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-white text-[#059669] border border-[#D1FAE5] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold bg-[#ECFDF5] text-[#059669] border border-[#D1FAE5] px-2 py-0.5 rounded-full">
              AI Prediction
            </span>
          </div>
          <div>
            <h3 className="text-[24px] font-extrabold text-gray-900">25</h3>
            <p className="text-[11px] font-bold text-gray-500 mt-0.5">Predicted NEET Selections</p>
          </div>
        </div>

        {/* Avg Batch Health Score */}
        <div className="bg-[#F5F3FF] border border-[#EDE9FE] rounded-2xl p-5 relative flex flex-col justify-between hover:shadow-md transition-all">
          <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>
          <div className="w-10 h-10 rounded-xl bg-white text-[#8B5CF6] border border-[#EDE9FE] flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[24px] font-extrabold text-[#8B5CF6]">84%</h3>
            <p className="text-[11px] font-bold text-gray-500 mt-0.5">Avg Batch Health Score</p>
          </div>
        </div>

        {/* Parent Intervention */}
        <div className="bg-[#FFF7ED] border border-[#FFEDD5] rounded-2xl p-5 relative flex flex-col justify-between hover:shadow-md transition-all">
          <span className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-[#F97316]"></span>
          <div className="w-10 h-10 rounded-xl bg-white text-[#F97316] border border-[#FFEDD5] flex items-center justify-center mb-4">
            <Bell className="w-5 h-5" />
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-[24px] font-extrabold text-gray-900">12</h3>
              <p className="text-[12px] font-bold text-gray-500 mt-0.5">Parent Intervention</p>
            </div>
            <button 
              onClick={() => handleOpenActionModal(studentsRiskData[0].name, 'Parent Call/Intervention Required.')}
              className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-2 rounded-xl text-[11px] font-bold transition-colors shadow-xs"
            >
              Take Action
            </button>
          </div>
        </div>
      </div>

      {/* Main Table: AI Student Risk Analysis */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-[17px] font-extrabold text-gray-900">AI Student Risk Analysis</h3>
        </div>

        <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50 border-b border-gray-100">
          {/* Filters */}
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterRisk('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterRisk === 'all'
                  ? 'bg-blue-600 text-white shadow-xs shadow-blue-100'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              All ({studentsRiskData.length})
            </button>
            <button
              onClick={() => setFilterRisk('critical')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterRisk === 'critical'
                  ? 'bg-red-600 text-white shadow-xs shadow-red-100'
                  : 'bg-[#FFF5F5] text-[#EF4444] border border-[#FEE2E2] hover:bg-[#FEE2E2]'
              }`}
            >
              Critical ({studentsRiskData.filter(s => s.status === 'Critical').length})
            </button>
            <button
              onClick={() => setFilterRisk('warning')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterRisk === 'warning'
                  ? 'bg-amber-600 text-white shadow-xs shadow-amber-100'
                  : 'bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5] hover:bg-[#FFEDD5]'
              }`}
            >
              Warning ({studentsRiskData.filter(s => s.status === 'Warning').length})
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs text-gray-900 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Table Layout */}
        <div className="overflow-x-auto custom-scrollbar w-full">
          <table className="w-full min-w-[1000px] border-collapse text-left bg-white">
            <thead>
              <tr className="bg-white border-b border-gray-200 text-[12px] font-bold text-gray-500">
                <th className="px-6 py-4">STUDENT</th>
                <th className="px-6 py-4">BATCH</th>
                <th className="px-6 py-4 text-center">ATTENDANCE %</th>
                <th className="px-6 py-4 text-center">LAST TEST SCORE</th>
                <th className="px-6 py-4 text-center">RISK SCORE</th>
                <th className="px-6 py-4 text-center">PREDICTED RANK</th>
                <th className="px-6 py-4">WEAK LESSONS</th>
                <th className="px-6 py-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[13px] font-medium text-gray-900">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                        {student.avatar}
                      </div>
                      <span className="font-bold text-gray-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{student.batch}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${
                      student.attendance < 60 
                        ? 'bg-[#FFF5F5] text-[#EF4444] border border-[#FEE2E2]' 
                        : 'bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7]'
                    }`}>
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700">{student.lastTestScore}%</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                      student.riskScore > 80 
                        ? 'bg-[#FFF5F5] text-[#EF4444] border border-[#FEE2E2]' 
                        : 'bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7]'
                    }`}>
                      {student.riskScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-[#8B5CF6] font-bold">{student.predictedRank}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {student.weakLessons.split(', ').map((lesson, idx) => (
                        <span key={idx} className="bg-[#FFF5F5] text-[#EF4444] px-2 py-0.5 rounded text-[11px] font-bold border border-[#FEE2E2]">
                          {lesson}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleOpenActionModal(student.name, `AI Suggestion: ${student.action}.`)}
                      className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ml-auto"
                    >
                      {student.action}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Middle Row: Weak Lesson Analyzer & AI Rank Prediction Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Weak Subject Analyzer */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-[17px] font-extrabold text-gray-900 mb-6">Weak Subject Analyzer</h3>
            
            {/* Custom Bar Chart */}
            <div className="flex h-52 gap-6 relative pl-8">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-10 flex flex-col justify-between text-[11px] font-bold text-gray-400 w-6 text-right">
                <span>40</span>
                <span>30</span>
                <span>20</span>
                <span>10</span>
                <span>0</span>
              </div>
 
              {/* Grid Lines */}
              <div className="absolute left-8 right-0 top-0 bottom-10 flex flex-col justify-between pointer-events-none">
                <div className="border-t border-dashed border-gray-100 w-full h-0"></div>
                <div className="border-t border-dashed border-gray-100 w-full h-0"></div>
                <div className="border-t border-dashed border-gray-100 w-full h-0"></div>
                <div className="border-t border-dashed border-gray-100 w-full h-0"></div>
                <div className="border-b border-gray-200 w-full h-0"></div>
              </div>
 
              {/* Bars */}
              <div className="absolute left-8 right-0 top-0 bottom-10 flex justify-around items-end z-10">
                {barChartData.map((bar, idx) => {
                  const percentage = (bar.value / 40) * 100;
                  return (
                    <div key={idx} className="relative flex flex-col justify-end items-center h-full group cursor-pointer w-16">
                      {/* Hover background shadow */}
                      {bar.active && (
                        <div className="absolute -inset-x-2 bottom-0 top-0 bg-gray-100/50 rounded-t-lg -z-10 border border-transparent border-t-gray-200"></div>
                      )}
                      
                      {/* Tooltip */}
                      {bar.active && (
                        <div className="absolute -top-10 bg-white border border-gray-200 rounded-lg p-2 shadow-md z-30 w-32 text-center">
                          <p className="text-[10px] font-bold text-gray-950">{bar.name}</p>
                          <p className="text-[9px] text-gray-500 font-bold mt-0.5">students : {bar.value}</p>
                          <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-r border-b border-gray-200 rotate-45"></div>
                        </div>
                      )}
 
                      {/* Bar */}
                      <div 
                        style={{ height: `${percentage}%` }}
                        className={`w-8 rounded-t-md transition-all duration-300 ${bar.color} shadow-xs group-hover:opacity-90`}
                      ></div>
 
                      {/* Label rotated */}
                      <span className="absolute -bottom-7 text-[10px] font-bold text-gray-400 whitespace-nowrap rotate-[-15deg] origin-center">
                        {bar.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
 
            {/* Weak Subjects list below chart */}
            <div className="space-y-3 mt-10">
              {[
                { name: 'Physics', students: 34 },
                { name: 'Chemistry', students: 28 },
                { name: 'Mathematics', students: 25 }
              ].map((subject, idx) => (
                <div key={idx} className="bg-[#FFF5F5] p-4 rounded-xl flex items-center justify-between border border-[#FEE2E2]">
                  <div>
                    <h4 className="font-bold text-gray-900 text-[14px]">{subject.name}</h4>
                    <p className="text-[11px] text-gray-400 font-bold mt-0.5">{subject.students} students affected</p>
                  </div>
                  <button className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs">
                    Schedule Revision
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Rank Prediction Engine */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-6">
          <h3 className="text-[17px] font-extrabold text-gray-900">AI Rank Prediction Engine</h3>
          <div className="space-y-4">
            {rankPredictions.map((pred, idx) => (
              <div key={idx} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between bg-white shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-bold text-sm border border-gray-200">
                    {pred.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[14px]">{pred.name}</h4>
                    <p className="text-[11px] text-gray-500 font-semibold mt-0.5">Current Marks: {pred.currentMarks}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="bg-[#EFF6FF] rounded-lg px-3 py-1.5 border border-[#DBEAFE] text-center">
                      <div className="text-[9px] font-bold text-[#2563EB]">JEE Rank</div>
                      <div className="text-[12px] font-extrabold text-[#2563EB] mt-0.5">{pred.jeeRank}</div>
                    </div>
                    <div className="bg-[#ECFDF5] rounded-lg px-3 py-1.5 border border-[#D1FAE5] text-center">
                      <div className="text-[9px] font-bold text-[#059669]">NEET Rank</div>
                      <div className="text-[12px] font-extrabold text-[#059669] mt-0.5">{pred.neetRank}</div>
                    </div>
                  </div>
                  
                  {/* Circular probability dial styled */}
                  <div className="w-12 h-12 rounded-full border-2 border-[#10B981] bg-[#ECFDF5] flex items-center justify-center text-[12px] font-extrabold text-[#059669]">
                    {pred.probability}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Batch Performance & Teacher Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Batch Performance */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-[17px] font-extrabold text-gray-900">Batch Performance Analytics</h3>
            <div className="space-y-4">
              {batchPerformance.map((batch, idx) => (
                <div key={idx} className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white shadow-xs">
                  <div className="flex-1 w-full space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 text-[15px]">{batch.name}</span>
                      <span className="text-[13px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg">
                        {batch.healthScore}% Health
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[12px] font-semibold text-gray-500">
                      <div>
                        <span className="block text-gray-400 text-[10px]">Avg Score</span>
                        <span className="text-gray-900 font-bold">{batch.avgScore}%</span>
                      </div>
                      <div>
                        <span className="block text-gray-400 text-[10px]">Attendance</span>
                        <span className="text-gray-900 font-bold">{batch.attendance}%</span>
                      </div>
                      <div>
                        <span className="block text-gray-400 text-[10px]">Improvement</span>
                        <span className={`font-bold ${batch.improvement > 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                          {batch.improvement > 0 ? '+' : ''}{batch.improvement}%
                        </span>
                      </div>
                    </div>
                  </div>
                  {batch.actionRequired && (
                    <button 
                      onClick={() => handleOpenActionModal(studentsRiskData.find(s => s.batch === batch.name)?.name || studentsRiskData[0].name, `Batch ${batch.name} performance has dropped to ${batch.avgScore}%.`)}
                      className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors w-full sm:w-auto shadow-xs"
                    >
                      Take Action
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-purple-700">
              <Sparkles className="w-5 h-5 fill-purple-600" />
              <h3 className="text-[16px] font-extrabold text-gray-900">AI Suggestions</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[13px] font-semibold text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-1.5 shrink-0"></span>
                <span>Conduct Extra Doubt Session for JEE A-2 based on decline of 5% in scores.</span>
              </li>
              <li className="flex items-start gap-2 text-[13px] font-semibold text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-1.5 shrink-0"></span>
                <span>Schedule Lesson Revision Tests for mock prep classes.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Teacher Insights */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-[17px] font-extrabold text-gray-900">Teacher Insight Dashboard</h3>
            <div className="space-y-5">
              {teacherInsights.map((teacher, idx) => (
                <div key={idx} className="border border-gray-100 rounded-xl p-4 space-y-4 bg-white shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center font-bold text-sm border border-gray-200">
                      {teacher.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-[14px]">{teacher.name}</h4>
                      <p className="text-[11px] text-gray-500 font-semibold mt-0.5">{teacher.students} students assigned</p>
                    </div>
                    <span className="ml-auto text-emerald-500 text-[12px] font-bold flex items-center gap-0.5 bg-[#F5F3FF] text-[#7C3AED] border border-[#EDE9FE] px-2 py-0.5 rounded-lg">
                      <TrendingUp className="w-3.5 h-3.5 text-[#7C3AED]" />
                      +{teacher.improvement}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-[12px] font-semibold bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div>
                      <span className="block text-gray-400 text-[10px] mb-0.5">Average Student Score</span>
                      <span className="text-gray-900 font-bold text-[15px]">{teacher.avgScore}%</span>
                    </div>
                    <div>
                      <span className="block text-gray-400 text-[10px] mb-0.5">Performance Trend</span>
                      <span className="text-emerald-600 font-bold text-[14px]">Improving</span>
                    </div>
                  </div>

                  {/* Weak Lessons Detected list */}
                 
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-purple-700">
              <Sparkles className="w-5 h-5 fill-purple-600" />
              <h3 className="text-[16px] font-extrabold text-gray-900">AI Recommendations</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[13px] font-semibold text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-1.5 shrink-0"></span>
                <span>Re-teach lesson: Integration - Dr. Rajesh Kumar (JEE A-2).</span>
              </li>
              <li className="flex items-start gap-2 text-[13px] font-semibold text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-1.5 shrink-0"></span>
                <span>Conduct Weekly Quiz for lesson: Organic Chemistry - Prof. Meera Singh.</span>
              </li>
              <li className="flex items-start gap-2 text-[13px] font-semibold text-gray-600 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-1.5 shrink-0"></span>
                <span>Increase Doubt Clearing sessions by 20% in batches under average.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Section: Alerts & Action Center Table */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 text-purple-700">
            <Sparkles className="w-5 h-5 fill-purple-600 animate-pulse" />
            <h3 className="text-[17px] font-extrabold text-gray-900">AI Alerts & Action Center</h3>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            {/* Attendance Filter */}
            <div className="flex items-center gap-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-3 py-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase">Attendance:</span>
              <select 
                value={attendanceFilter} 
                onChange={(e) => {
                  setAttendanceFilter(e.target.value);
                  setSubjectFilter('All'); // Reset subject filter when using attendance
                }}
                className="bg-transparent text-xs font-bold text-gray-700 focus:outline-hidden cursor-pointer"
              >
                <option value="All">All Batches</option>
                <option value="JEE A-1">JEE A-1 </option>
                <option value="JEE A-2">JEE A-2 </option>
                <option value="NEET B-15">NEET B-15 </option>
              </select>
            </div>

            {/* Subject Filter */}
            <div className="flex items-center gap-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-3 py-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase">Subject:</span>
              <select 
                value={subjectFilter} 
                onChange={(e) => {
                  setSubjectFilter(e.target.value);
                  setAttendanceFilter('All'); // Reset attendance filter when using subject
                }}
                className="bg-transparent text-xs font-bold text-gray-700 focus:outline-hidden cursor-pointer"
              >
                <option value="All">All Subjects</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Biology">Biology</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar w-full">
          <table className="w-full min-w-[900px] border-collapse text-left bg-white">
            <thead>
              <tr className="bg-white border-b border-gray-200 text-[12px] font-bold text-gray-500">
                <th className="px-6 py-4">TYPE</th>
                <th className="px-6 py-4">DETAILS / PROBLEM</th>
                <th className="px-6 py-4">RECOMMENDATION / STATUS</th>
                <th className="px-6 py-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[13px] font-medium text-gray-900">
              {attendanceFilter !== 'All' ? (
                // Show students in the selected batch with less than 40% attendance
                studentsRiskData
                  .filter(s => s.batch === attendanceFilter && s.attendance < 40)
                  .map((student, idx) => (
                    <tr key={`attendance-${idx}`} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FEF2F2] text-[#EF4444] border border-[#FEE2E2]">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Low Attendance Alert
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{student.name}</div>
                        <div className="text-xs text-red-500 mt-0.5">Critical Attendance: {student.attendance}% (Below 40% Limit)</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100 block">
                          Attendance Alert: Call parent immediately to discuss low engagement in batch {student.batch}.
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex gap-2 justify-end">
                          <button 
                            onClick={() => handleOpenActionModal(student.name, `Attendance alert: Attendance is currently ${student.attendance}% which is below the 40% limit in batch ${student.batch}.`)}
                            className="bg-[#22C55E] hover:bg-[#16A34A] text-white py-1.5 px-3 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-xs"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Send WhatsApp
                          </button>
                          <button className="bg-[#374151] hover:bg-[#1F2937] text-white py-1.5 px-3 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5">
                            <Download className="w-3.5 h-3.5" />
                            Generate Report
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              ) : subjectFilter !== 'All' ? (
                // Show students weak in the selected subject
                studentsRiskData
                  .filter(s => s.weakLessons.toLowerCase().includes(subjectFilter.toLowerCase()))
                  .map((student, idx) => (
                    <tr key={`subject-${idx}`} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#F5F3FF] text-[#7C3AED] border border-[#EDE9FE]">
                          <Sparkles className="w-3.5 h-3.5 fill-[#7C3AED]" />
                          Weak in {subjectFilter}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{student.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">Batch: {student.batch} | Weak Topics: {student.weakLessons}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold text-[#8B5CF6] bg-purple-50/50 p-2 rounded-lg border border-purple-100 block">
                          AI Suggestion: {student.action} for {subjectFilter}.
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button 
                          onClick={() => handleOpenActionModal(student.name, `AI Suggestion: ${student.action} for ${subjectFilter}.`)}
                          className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white py-1.5 px-4 rounded-xl text-[11px] font-bold transition-colors shadow-xs"
                        >
                          Take Action
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                // Render Parent Alerts & AI Action Items combined list by default
                <>
                  {parentAlerts.map((alert, idx) => (
                    <tr key={`parent-${idx}`} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5]">
                          <Bell className="w-3.5 h-3.5" />
                          Parent Alert
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{alert.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">Issue: {alert.issue}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-bold ${
                          alert.status === 'Critical' 
                            ? 'bg-red-50 text-[#EF4444] border border-red-100' 
                            : 'bg-orange-50 text-[#EA580C] border border-orange-100'
                        }`}>
                          {alert.status} Risk Level
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex gap-2 justify-end">
                          <button 
                            onClick={() => handleOpenActionModal(alert.name, `Parent Alert: Student has been flagged for ${alert.issue} which is at a ${alert.status} level.`)}
                            className="bg-[#22C55E] hover:bg-[#16A34A] text-white py-1.5 px-3 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-xs"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Send WhatsApp
                          </button>
                          <button className="bg-[#374151] hover:bg-[#1F2937] text-white py-1.5 px-3 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5">
                            <Download className="w-3.5 h-3.5" />
                            Generate Report
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {aiActionItems.map((item, idx) => (
                    <tr key={`ai-${idx}`} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#F5F3FF] text-[#7C3AED] border border-[#EDE9FE]">
                          <Sparkles className="w-3.5 h-3.5 fill-[#7C3AED]" />
                          AI Recommendation
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-[12px] font-semibold">
                        {item.recommendation}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button 
                          onClick={() => {
                            // Find matching student or default to first student
                            const matchName = item.title.includes('JEE-A2') ? 'Rahul Verma' : (studentsRiskData[0]?.name || 'Avinash Sharma');
                            handleOpenActionModal(matchName, `AI Recommendation update: ${item.recommendation}`);
                          }}
                          className={`py-1.5 px-4 rounded-xl text-[11px] font-bold transition-colors shadow-xs ${
                          item.type === 'critical'
                            ? 'bg-[#EF4444] hover:bg-[#DC2626] text-white'
                            : item.type === 'warning'
                              ? 'bg-[#F97316] hover:bg-[#EA580C] text-white'
                              : 'bg-[#10B981] hover:bg-[#059669] text-white'
                        }`}>
                          Take Action
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Take Action WhatsApp Modal Dialog overlay */}
      {selectedActionStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 transition-all">
          <div className="bg-white border border-gray-100 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden transform scale-100 transition-transform">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-50/50 to-blue-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 fill-purple-100" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-gray-900">Take Action & Send Alert</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Send real-time updates directly to parents</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedActionStudent(null)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Student details summary card */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Student Name</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">
                      {selectedActionStudent.avatar}
                    </div>
                    <span className="text-[13px] font-extrabold text-gray-900">{selectedActionStudent.name}</span>
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Batch Name</span>
                  <span className="block text-[13px] font-bold text-gray-700 mt-1">{selectedActionStudent.batch}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Attendance Rate</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-extrabold mt-1 ${
                    selectedActionStudent.attendance < 60 
                      ? 'bg-[#FFF5F5] text-[#EF4444] border border-[#FEE2E2]' 
                      : 'bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7]'
                  }`}>
                    {selectedActionStudent.attendance}%
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Academic Risk</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-extrabold mt-1 ${
                    selectedActionStudent.status === 'Critical' 
                      ? 'bg-red-50 text-[#EF4444] border border-red-100' 
                      : 'bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7]'
                  }`}>
                    {selectedActionStudent.status} Risk ({selectedActionStudent.riskScore}%)
                  </span>
                </div>
              </div>

              {/* Parent Details */}
              <div className="space-y-3.5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Parent Name</label>
                    <input 
                      type="text" 
                      value={selectedActionStudent.parentName || 'Parent'}
                      disabled
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-bold text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Parent WhatsApp Phone</label>
                    <input 
                      type="text" 
                      value={selectedActionStudent.parentPhone || '+91 98765 43210'}
                      disabled
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-bold text-gray-700"
                    />
                  </div>
                </div>
              </div>

              {/* Text Area for custom message */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">WhatsApp Message Text</label>
                <textarea
                  rows={4}
                  value={actionMessageText}
                  onChange={(e) => setActionMessageText(e.target.value)}
                  className="w-full border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none rounded-xl p-3.5 text-xs text-gray-800 font-semibold leading-relaxed transition-all resize-none"
                  placeholder="Type your message to send on WhatsApp..."
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedActionStudent(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const phoneNumber = (selectedActionStudent.parentPhone || '+91 98765 43210').replace(/[^0-9]/g, '');
                  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(actionMessageText)}`;
                  window.open(url, '_blank');
                  toast.success(`WhatsApp message window opened for ${selectedActionStudent.name}'s parent!`);
                  setSelectedActionStudent(null);
                }}
                className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-100"
              >
                <MessageSquare className="w-4 h-4 fill-white text-white" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalytics;
