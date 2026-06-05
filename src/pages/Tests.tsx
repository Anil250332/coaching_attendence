import React from 'react';
import { 
  FileText, 
  Calendar, 
  Award, 
  TrendingUp, 
  Clock, 
  Edit3, 
  Plus 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import CreateTestModal from '../components/CreateTestModal';
import AddQuestionsModal from '../components/AddQuestionsModal';
import EnterResultsModal from '../components/EnterResultsModal';

const performanceData = [
  { name: 'Jan', score: 72 },
  { name: 'Feb', score: 75 },
  { name: 'Mar', score: 78 },
  { name: 'Apr', score: 76 },
  { name: 'May', score: 79 },
  { name: 'Jun', score: 82 },
];

const upcomingTests = [
  { id: 1, title: 'IIT-JEE Full Mock Test', batches: 'All IIT-JEE Batches', date: 'Jun 8, 2024', time: '9:00 AM', duration: '3 hours', tag: 'Mock Test' },
  { id: 2, title: 'NEET Biology Chapter Test', batches: 'NEET B-15', date: 'Jun 10, 2024', time: '10:30 AM', duration: '1 hour', tag: 'Chapter Test' },
  { id: 3, title: 'Chemistry Weekly Test', batches: 'IIT-JEE A-12', date: 'Jun 12, 2024', time: '2:00 PM', duration: '1.5 hours', tag: 'Weekly Test' },
  { id: 4, title: 'SSC Reasoning Mock', batches: 'SSC C-08', date: 'Jun 15, 2024', time: '12:00 PM', duration: '2 hours', tag: 'Mock Test' },
];

const recentResults = [
  { id: 1, title: 'Physics Mock Test 5', date: 'May 28', attempts: 30, avgScore: 76, topScore: 98 },
  { id: 2, title: 'Chemistry Chapter 12', date: 'May 25', attempts: 35, avgScore: 82, topScore: 95 },
  { id: 3, title: 'Mathematics Weekly', date: 'May 22', attempts: 28, avgScore: 85, topScore: 100 },
  { id: 4, title: 'Full Syllabus Mock 8', date: 'May 18', attempts: 287, avgScore: 73, topScore: 96 },
];

const Tests: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isAddQuestionsModalOpen, setIsAddQuestionsModalOpen] = React.useState(false);
  const [selectedTestForResults, setSelectedTestForResults] = React.useState<any | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 sm:pt-0">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827]">Tests & Exams</h1>
          <p className="text-[15px] text-gray-500 font-medium mt-1">Create and manage tests, view results</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create New Test
        </button>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[24px] font-bold text-gray-900">148</h3>
            <p className="text-[14px] font-medium text-gray-500 mt-1">Total Tests</p>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[24px] font-bold text-gray-900">12</h3>
            <p className="text-[14px] font-medium text-gray-500 mt-1">This Month</p>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-4">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[24px] font-bold text-gray-900">78.5%</h3>
            <p className="text-[14px] font-medium text-gray-500 mt-1">Average Score</p>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[24px] font-bold text-gray-900">94.2%</h3>
            <p className="text-[14px] font-medium text-gray-500 mt-1">Participation</p>
          </div>
        </div>
      </div>

      {/* Average Performance Trend Chart */}
      <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm">
        <h3 className="text-[16px] font-bold text-gray-900 mb-6">Average Performance Trend</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
              <YAxis domain={[60, 90]} ticks={[60, 68, 76, 90]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                labelStyle={{ fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}
                formatter={(value: any) => [`${value}%`, 'Score']}
              />
              <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#2563eb' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section: Upcoming Tests & Recent Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Upcoming Tests */}
        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h3 className="text-[16px] font-bold text-gray-900">Upcoming Tests</h3>
          </div>
          
          <div className="space-y-4">
            {upcomingTests.map((test) => (
              <div key={test.id} className="relative bg-white border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Thick Blue Left Border */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500"></div>
                
                <div className="pl-2">
                  <h4 className="text-[16px] font-bold text-gray-900">{test.title}</h4>
                  <p className="text-[13px] font-medium text-gray-500 mt-1">{test.batches}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-[13px] font-medium text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      {test.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {test.time}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {test.duration}
                    </div>
                  </div>
                </div>
                
                <div className="sm:self-start">
                  <span className="inline-flex px-3 py-1.5 rounded-full text-[12px] font-bold bg-blue-500 text-white shadow-sm whitespace-nowrap">
                    {test.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Test Results */}
        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-[16px] font-bold text-gray-900">Recent Test Results</h3>
          </div>

          <div className="space-y-4">
            {recentResults.map((result) => (
              <div key={result.id} className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-1 w-full">
                  <h4 className="text-[15px] font-bold text-gray-900">{result.title}</h4>
                  <p className="text-[13px] font-medium text-gray-500 mt-1">{result.date}</p>
                  
                  <div className="flex items-center gap-8 mt-4">
                    <div>
                      <p className="text-[12px] font-medium text-gray-500 mb-1">Average Score</p>
                      <p className="text-[18px] font-bold text-gray-900">{result.avgScore}%</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-gray-500 mb-1">Top Score</p>
                      <p className="text-[18px] font-bold text-emerald-500">{result.topScore}%</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center w-full sm:w-auto gap-4 sm:gap-2 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6">
                  <div className="text-[13px] font-medium text-gray-500 whitespace-nowrap">
                    {result.attempts} attempts
                  </div>
                  <button 
                    onClick={() => setSelectedTestForResults(result)}
                    className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-sm"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <CreateTestModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateSuccess={() => {
          setIsCreateModalOpen(false);
          setIsAddQuestionsModalOpen(true);
        }}
      />

      <AddQuestionsModal
        isOpen={isAddQuestionsModalOpen}
        onClose={() => setIsAddQuestionsModalOpen(false)}
        onSave={(questions) => {
          console.log('Saved questions:', questions);
          // Can implement a save notification/toast or API call here
        }}
      />

      {selectedTestForResults && (
        <EnterResultsModal
          isOpen={!!selectedTestForResults}
          onClose={() => setSelectedTestForResults(null)}
          testTitle={selectedTestForResults.title}
          onSave={(scores) => {
            console.log('Saved scores for', selectedTestForResults.title, scores);
          }}
        />
      )}
    </div>
  );
};

export default Tests;
