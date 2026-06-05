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
  Download 
} from 'lucide-react';

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
    predictedRank: 'AIR 22,000',
    weakLessons: 'Physics, Chemistry',
    action: 'Parent Call Required',
    status: 'Critical'
  },
  {
    id: 2,
    name: 'Priya Deshmukh',
    avatar: 'PD',
    batch: 'NEET B-15',
    attendance: 62,
    lastTestScore: 52,
    riskScore: 85,
    predictedRank: 'AIR 18,500',
    weakLessons: 'Physics',
    action: 'Counseling Required',
    status: 'Critical'
  },
  {
    id: 3,
    name: 'Rahul Verma',
    avatar: 'RV',
    batch: 'JEE A-2',
    attendance: 68,
    lastTestScore: 58,
    riskScore: 72,
    predictedRank: 'AIR 15,000',
    weakLessons: 'Mathematics',
    action: 'Extra Classes',
    status: 'Warning'
  },
  {
    id: 4,
    name: 'Amit Patel',
    avatar: 'AP',
    batch: 'NEET B-15',
    attendance: 74,
    lastTestScore: 64,
    riskScore: 61,
    predictedRank: 'AIR 28,000',
    weakLessons: 'Chemistry',
    action: 'Study Plan Revision',
    status: 'Warning'
  }
];

const rankPredictions = [
  { name: 'Aarav Sharma', currentMarks: 285, jeeRank: 'AIR 2,500', neetRank: '-', probability: 92 },
  { name: 'Diya Patel', currentMarks: 648, jeeRank: '-', neetRank: 'AIR 1,200', probability: 95 },
  { name: 'Vivek Kumar', currentMarks: 258, jeeRank: 'AIR 4,800', neetRank: '-', probability: 85 }
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
  { name: 'Organic Chemistry', value: 32, color: 'bg-[#EF4444]' }, // red
  { name: 'Thermodynamics', value: 28, color: 'bg-[#F97316]', active: true }, // orange
  { name: 'Calculus', value: 24, color: 'bg-[#F97316]' }, // orange
  { name: 'Coordinate Geometry', value: 18, color: 'bg-[#F59E0B]' }, // yellow
  { name: 'Algebra', value: 14, color: 'bg-[#F59E0B]' } // yellow
];

const AIAnalytics: React.FC = () => {
  const [filterRisk, setFilterRisk] = useState<'all' | 'critical' | 'warning'>('all');
  const [searchTerm, setSearchTerm] = useState('');

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
            <button className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-2 rounded-xl text-[11px] font-bold transition-colors shadow-xs">
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
                    <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ml-auto">
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
        
        {/* Left Column: Weak Lesson Analyzer */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-[17px] font-extrabold text-gray-900 mb-6">Weak Lesson Analyzer</h3>
            
            {/* Custom Bar Chart */}
            <div className="flex h-52 items-end gap-6 border-b border-gray-200 pb-2 relative pl-8">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[11px] font-bold text-gray-400 w-6 text-right">
                <span>32</span>
                <span>24</span>
                <span>16</span>
                <span>8</span>
                <span>0</span>
              </div>

              {/* Grid Lines */}
              <div className="absolute left-8 right-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none">
                <div className="border-t border-dashed border-gray-100 w-full h-0"></div>
                <div className="border-t border-dashed border-gray-100 w-full h-0"></div>
                <div className="border-t border-dashed border-gray-100 w-full h-0"></div>
                <div className="border-t border-dashed border-gray-100 w-full h-0"></div>
                <div className="border-t border-gray-200 w-full h-0"></div>
              </div>

              {/* Bars */}
              <div className="flex-1 flex justify-around items-end h-full pb-6 z-10">
                {barChartData.map((bar, idx) => {
                  const percentage = (bar.value / 32) * 100;
                  return (
                    <div key={idx} className="relative flex flex-col justify-end items-center h-full group cursor-pointer w-16 pb-8">
                      {/* Hover background shadow */}
                      {bar.active && (
                        <div className="absolute -inset-x-2 bottom-8 top-0 bg-gray-100/50 rounded-t-lg -z-10 border border-transparent border-t-gray-200"></div>
                      )}
                      
                      {/* Tooltip */}
                      {bar.active && (
                        <div className="absolute -top-6 bg-white border border-gray-200 rounded-lg p-2 shadow-md z-30 w-32 text-center">
                          <p className="text-[10px] font-bold text-gray-950">{bar.name}</p>
                          <p className="text-[9px] text-gray-500 font-bold mt-0.5">students : {bar.value}</p>
                          <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-r border-b border-gray-200 rotate-45"></div>
                        </div>
                      )}

                      {/* Bar */}
                      <div 
                        style={{ height: `${percentage * 0.7}%` }}
                        className={`w-8 rounded-t-md transition-all duration-300 ${bar.color} shadow-xs group-hover:opacity-90`}
                      ></div>

                      {/* Label rotated */}
                      <span className="absolute bottom-0 text-[10px] font-bold text-gray-400 whitespace-nowrap rotate-[-15deg] origin-center">
                        {bar.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weak Lessons list below chart */}
            <div className="space-y-3 mt-10">
              {[
                { name: 'Organic Chemistry', students: 32 },
                { name: 'Thermodynamics', students: 28 },
                { name: 'Calculus', students: 24 }
              ].map((lesson, idx) => (
                <div key={idx} className="bg-[#FFF5F5] p-4 rounded-xl flex items-center justify-between border border-[#FEE2E2]">
                  <div>
                    <h4 className="font-bold text-gray-900 text-[14px]">{lesson.name}</h4>
                    <p className="text-[11px] text-gray-400 font-bold mt-0.5">{lesson.students} students affected</p>
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
                    <button className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors w-full sm:w-auto shadow-xs">
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

      {/* Bottom Section: Parent Alert & AI Action Center */}
      <div className="space-y-6">
        {/* Parent Alert Center */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-orange-600">
            <Bell className="w-5 h-5" />
            <h3 className="text-[17px] font-extrabold text-gray-900">Parent Alert Center</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {parentAlerts.map((alert, idx) => (
              <div 
                key={idx} 
                className={`border rounded-2xl p-4 bg-white relative flex flex-col justify-between hover:shadow-md transition-all ${
                  alert.status === 'Critical'
                    ? 'border-[#FEE2E2] bg-[#FFF5F5]'
                    : 'border-[#FFEDD5] bg-[#FFF7ED]'
                }`}
              >
                <span className={`absolute top-4 right-4 w-2 h-2 rounded-full ${alert.status === 'Critical' ? 'bg-[#EF4444]' : 'bg-[#EA580C]'}`}></span>
                <div className="space-y-3 mb-4">
                  <h4 className="font-bold text-gray-900 text-[14px]">{alert.name}</h4>
                  <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${
                    alert.status === 'Critical' 
                      ? 'bg-white text-[#EF4444] border-red-100' 
                      : 'bg-white text-[#EA580C] border-orange-100'
                  }`}>
                    {alert.issue}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#22C55E] hover:bg-[#16A34A] text-white py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 shadow-xs">
                    <MessageSquare className="w-3 h-3" />
                    Send WhatsApp
                  </button>
                  <button className="flex-1 bg-[#374151] hover:bg-[#1F2937] text-white py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1">
                    <Download className="w-3 h-3" />
                    Generate Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Action Center */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-purple-700">
            <Sparkles className="w-5 h-5 fill-purple-600" />
            <h3 className="text-[17px] font-extrabold text-gray-900">AI Action Center</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {aiActionItems.map((item, idx) => (
              <div 
                key={idx} 
                className={`border rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-all ${
                  item.type === 'critical'
                    ? 'bg-[#FFF5F5] border-[#FFF5F5]'
                    : item.type === 'warning'
                      ? 'bg-[#FFF7ED] border-[#FFF7ED]'
                      : 'bg-[#F0FDF4] border-[#F0FDF4]'
                }`}
              >
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-[14px] font-bold text-gray-900 leading-snug">
                    <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                      item.type === 'critical' 
                        ? 'bg-[#EF4444]' 
                        : item.type === 'warning' 
                          ? 'bg-[#F97316]' 
                          : 'bg-[#10B981]'
                    }`}></span>
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-semibold">{item.recommendation}</p>
                </div>
                <button className={`w-full py-2 rounded-xl text-[12px] font-bold transition-colors shadow-xs ${
                  item.type === 'critical'
                    ? 'bg-[#EF4444] hover:bg-[#DC2626] text-white'
                    : item.type === 'warning'
                      ? 'bg-[#F97316] hover:bg-[#EA580C] text-white'
                      : 'bg-[#10B981] hover:bg-[#059669] text-white'
                }`}>
                  Take Action
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalytics;
