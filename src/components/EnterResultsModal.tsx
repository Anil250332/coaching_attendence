import React from 'react';
import { X, UserCheck, Save } from 'lucide-react';

interface StudentScore {
  id: string;
  rollNo: string;
  name: string;
  physics: string;
  chemistry: string;
  mathematics: string;
  biology: string;
  totalMarks: string;
}

interface EnterResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  testTitle: string;
  onSave?: (scores: StudentScore[]) => void;
}

const initialStudents: StudentScore[] = [
  { id: '1', rollNo: 'STU-2026-1234', name: 'Aarav Sharma', physics: '0', chemistry: '0', mathematics: '0', biology: '0', totalMarks: '0' },
  { id: '2', rollNo: 'STU-2026-1235', name: 'Diya Patel', physics: '0', chemistry: '0', mathematics: '0', biology: '0', totalMarks: '0' },
  { id: '3', rollNo: 'STU-2026-1236', name: 'Vivek Kumar', physics: '0', chemistry: '0', mathematics: '0', biology: '0', totalMarks: '0' },
  { id: '4', rollNo: 'STU-2026-1237', name: 'Ananya Singh', physics: '0', chemistry: '0', mathematics: '0', biology: '0', totalMarks: '0' },
  { id: '5', rollNo: 'STU-2026-1238', name: 'Rohan Verma', physics: '0', chemistry: '0', mathematics: '0', biology: '0', totalMarks: '0' },
];

const EnterResultsModal: React.FC<EnterResultsModalProps> = ({ isOpen, onClose, testTitle, onSave }) => {
  const [activeTab, setActiveTab] = React.useState<'subject' | 'total'>('subject');
  const [scores, setScores] = React.useState<StudentScore[]>(initialStudents);

  if (!isOpen) return null;

  const handleUpdateScore = (studentId: string, field: keyof StudentScore, value: string) => {
    // Validate value to ensure it's numeric and within bounds (e.g. max 25 for subjects, 100 for total)
    let parsedValue = value;
    if (value !== '') {
      const num = parseInt(value, 10);
      if (isNaN(num)) return;
      if (num < 0) parsedValue = '0';
      if (field === 'totalMarks' && num > 100) parsedValue = '100';
      if (field !== 'totalMarks' && field !== 'name' && field !== 'rollNo' && field !== 'id' && num > 25) parsedValue = '25';
    }

    setScores(prev => prev.map(s => {
      if (s.id === studentId) {
        const updated = { ...s, [field]: parsedValue };
        
        // Auto-update totalMarks if we edited a subject score
        if (field !== 'totalMarks' && field !== 'name' && field !== 'rollNo' && field !== 'id') {
          const p = parseInt(updated.physics || '0', 10);
          const c = parseInt(updated.chemistry || '0', 10);
          const m = parseInt(updated.mathematics || '0', 10);
          const b = parseInt(updated.biology || '0', 10);
          updated.totalMarks = (p + c + m + b).toString();
        }
        return updated;
      }
      return s;
    }));
  };

  // Calculations for Quick Stats
  const entriesCompleted = scores.filter(s => {
    if (activeTab === 'subject') {
      return s.physics !== '' && s.chemistry !== '' && s.mathematics !== '' && s.biology !== '';
    } else {
      return s.totalMarks !== '';
    }
  }).length;

  const getStudentTotal = (s: StudentScore) => {
    if (activeTab === 'subject') {
      const p = parseInt(s.physics || '0', 10);
      const c = parseInt(s.chemistry || '0', 10);
      const m = parseInt(s.mathematics || '0', 10);
      const b = parseInt(s.biology || '0', 10);
      return p + c + m + b;
    } else {
      return parseInt(s.totalMarks || '0', 10);
    }
  };

  const completedStudents = scores.filter(s => {
    if (activeTab === 'subject') {
      return s.physics !== '' && s.chemistry !== '' && s.mathematics !== '' && s.biology !== '';
    } else {
      return s.totalMarks !== '';
    }
  });

  const averageScore = completedStudents.length > 0
    ? Math.round(completedStudents.reduce((sum, s) => sum + getStudentTotal(s), 0) / completedStudents.length)
    : 0;

  const topScore = completedStudents.length > 0
    ? Math.max(...completedStudents.map(s => getStudentTotal(s)))
    : 0;

  const handleSave = () => {
    if (onSave) {
      onSave(scores);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-xl relative z-10 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Enter Test Results</h2>
              <p className="text-[13px] text-blue-100 mt-0.5">{testTitle}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {/* Top Actions: Tabs and Student count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Tabs */}
            <div className="bg-gray-100 p-1 rounded-xl flex gap-1 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('subject')}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex-1 sm:flex-none text-center ${
                  activeTab === 'subject'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Subject-wise Entry
              </button>
              <button
                onClick={() => setActiveTab('total')}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex-1 sm:flex-none text-center ${
                  activeTab === 'total'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Total Marks Entry
              </button>
            </div>

            {/* Students Count */}
            <span className="text-[14px] text-gray-500 font-semibold self-end sm:self-auto">
              {scores.length} students
            </span>
          </div>

          {/* Table Container */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden w-full">
            <div className="overflow-x-auto custom-scrollbar w-full">
              <table className="w-full min-w-[700px] border-collapse text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-[13px] font-bold text-gray-500">
                    <th className="px-6 py-4">Roll No</th>
                    <th className="px-6 py-4">Student Name</th>
                    {activeTab === 'subject' ? (
                      <>
                        <th className="px-4 py-4 text-center">
                          <div>Physics</div>
                          <div className="text-[11px] font-medium text-gray-400 mt-0.5">(25 marks)</div>
                        </th>
                        <th className="px-4 py-4 text-center">
                          <div>Chemistry</div>
                          <div className="text-[11px] font-medium text-gray-400 mt-0.5">(25 marks)</div>
                        </th>
                        <th className="px-4 py-4 text-center">
                          <div>Mathematics</div>
                          <div className="text-[11px] font-medium text-gray-400 mt-0.5">(25 marks)</div>
                        </th>
                        <th className="px-4 py-4 text-center">
                          <div>Biology</div>
                          <div className="text-[11px] font-medium text-gray-400 mt-0.5">(25 marks)</div>
                        </th>
                        <th className="px-6 py-4 text-center">
                          <div>Total</div>
                          <div className="text-[11px] font-medium text-gray-400 mt-0.5">(100 marks)</div>
                        </th>
                      </>
                    ) : (
                      <th className="px-6 py-4 text-center w-40">
                        <div>Total Marks</div>
                        <div className="text-[11px] font-medium text-gray-400 mt-0.5">(100 marks)</div>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-[14px] font-medium text-gray-900">
                  {scores.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 text-gray-500 font-mono">{student.rollNo}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">{student.name}</td>
                      {activeTab === 'subject' ? (
                        <>
                          <td className="px-4 py-4 text-center">
                            <input
                              type="text"
                              value={student.physics}
                              onChange={(e) => handleUpdateScore(student.id, 'physics', e.target.value)}
                              className="w-16 px-2 py-1.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-center"
                            />
                          </td>
                          <td className="px-4 py-4 text-center">
                            <input
                              type="text"
                              value={student.chemistry}
                              onChange={(e) => handleUpdateScore(student.id, 'chemistry', e.target.value)}
                              className="w-16 px-2 py-1.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-center"
                            />
                          </td>
                          <td className="px-4 py-4 text-center">
                            <input
                              type="text"
                              value={student.mathematics}
                              onChange={(e) => handleUpdateScore(student.id, 'mathematics', e.target.value)}
                              className="w-16 px-2 py-1.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-center"
                            />
                          </td>
                          <td className="px-4 py-4 text-center">
                            <input
                              type="text"
                              value={student.biology}
                              onChange={(e) => handleUpdateScore(student.id, 'biology', e.target.value)}
                              className="w-16 px-2 py-1.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-center"
                            />
                          </td>
                          <td className="px-6 py-4 text-center font-bold">
                            <span className="inline-block w-16 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-center">
                              {getStudentTotal(student)}
                            </span>
                          </td>
                        </>
                      ) : (
                        <td className="px-6 py-4 text-center">
                          <input
                            type="text"
                            value={student.totalMarks}
                            onChange={(e) => handleUpdateScore(student.id, 'totalMarks', e.target.value)}
                            className="w-20 px-2 py-1.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-center font-bold"
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Stats Section */}
          <div className="bg-blue-50/40 border border-blue-50/80 rounded-2xl p-5">
            <h3 className="text-[14px] font-bold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-[12px] font-medium text-gray-500">Entries Completed</p>
                <p className="text-[20px] font-extrabold text-gray-900">{entriesCompleted} / {scores.length}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[12px] font-medium text-gray-500">Average Score</p>
                <p className="text-[20px] font-extrabold text-emerald-600">{averageScore}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[12px] font-medium text-gray-500">Top Score</p>
                <p className="text-[20px] font-extrabold text-blue-600">{topScore}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100 shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm flex-1 sm:flex-none text-center"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm flex-1 sm:flex-none flex items-center justify-center gap-2 ml-4 sm:ml-0"
          >
            <Save className="w-4 h-4" />
            Save Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterResultsModal;
