import React, { useState } from 'react';
import { 
  Calendar, 
  ClipboardCheck,
  AlertCircle,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Student {
  id: number;
  name: string;
  initials: string;
  rollNumber: string;
  batchName?: string;
}

const TeacherAttendance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mark' | 'history'>('mark');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loaded, setLoaded] = useState(false);

  const handleLoadStudents = () => {
    if (!selectedBatch) {
      toast.error("Please select a batch first!");
      return;
    }
    setLoaded(true);
  };

  // Sample student directories per batch
  const studentsData: Record<string, Student[]> = {
    'JEE A-1': [
      { id: 1, name: "Rahul Sharma", initials: "RS", rollNumber: "JEE-26-001" },
      { id: 2, name: "Vijay Singh", initials: "VS", rollNumber: "JEE-26-005" },
      { id: 3, name: "Amit Patel", initials: "AP", rollNumber: "JEE-26-012" },
      { id: 4, name: "Riya Sen", initials: "RS", rollNumber: "JEE-26-015" },
      { id: 5, name: "Kunal Jha", initials: "KJ", rollNumber: "JEE-26-018" },
    ],
    'NEET B-15': [
      { id: 6, name: "Priya Patel", initials: "PP", rollNumber: "NEET-26-002" },
      { id: 7, name: "Ananya Das", initials: "AD", rollNumber: "NEET-26-006" },
      { id: 8, name: "Suresh Rao", initials: "SR", rollNumber: "NEET-26-010" },
      { id: 9, name: "Neha Roy", initials: "NR", rollNumber: "NEET-26-014" },
    ],
    'JEE A-2': [
      { id: 10, name: "Amit Kumar", initials: "AK", rollNumber: "JEE-26-003" },
      { id: 11, name: "Rajesh Gupta", initials: "RG", rollNumber: "JEE-26-009" },
    ],
    'NEET B-12': [
      { id: 12, name: "Sneha Reddy", initials: "SR", rollNumber: "NEET-26-004" },
      { id: 13, name: "Vikram Malhotra", initials: "VM", rollNumber: "NEET-26-008" },
    ]
  };

  const currentStudents = selectedBatch === 'All Batches'
    ? Object.entries(studentsData).flatMap(([batchName, list]) => 
        list.map(s => ({ ...s, batchName }))
      )
    : (studentsData[selectedBatch] || []).map(s => ({ ...s, batchName: selectedBatch }));

  // Local state for attendance marking
  const [attendanceRecords, setAttendanceRecords] = useState<Record<number, 'Present' | 'Absent' | 'Late'>>(
    currentStudents.reduce((acc, student) => ({ ...acc, [student.id]: 'Present' }), {})
  );

  // Sync state if batch or date changes
  React.useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const isPast = selectedDate < todayStr;
    const defaultRecords = currentStudents.reduce((acc, student) => {
      let status: 'Present' | 'Absent' | 'Late' = 'Present';
      if (isPast) {
        const histChar = mockHistory[student.id]?.[selectedDate];
        if (histChar === 'P') status = 'Present';
        else if (histChar === 'A') status = 'Absent';
        else if (histChar === 'L') status = 'Late';
      }
      return { ...acc, [student.id]: status };
    }, {});
    setAttendanceRecords(defaultRecords);
  }, [selectedBatch, selectedDate]);

  // Reset loaded status on batch change
  React.useEffect(() => {
    setLoaded(false);
  }, [selectedBatch]);

  // Bulk Actions
  const handleBulkMark = (status: 'Present' | 'Absent' | 'Late') => {
    const updated = { ...attendanceRecords };
    currentStudents.forEach(student => {
      updated[student.id] = status;
    });
    setAttendanceRecords(updated);
    toast.success(`All students marked as ${status}!`);
  };

  const handleSingleMark = (studentId: number, status: 'Present' | 'Absent' | 'Late') => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmit = () => {
    toast.success(`Attendance for ${selectedBatch} submitted successfully for ${selectedDate}!`);
  };

  // Mock Attendance History Matrix Data
  const getHistoryDates = (startDateStr: string) => {
    const dates = [];
    try {
      const baseDate = new Date(startDateStr);
      if (!isNaN(baseDate.getTime())) {
        for (let i = 4; i >= 0; i--) {
          const d = new Date(baseDate);
          d.setDate(baseDate.getDate() - i);
          dates.push(d.toISOString().split('T')[0]);
        }
        return dates;
      }
    } catch (e) {
      // fallback
    }
    return ['2026-06-04', '2026-06-05', '2026-06-06', '2026-06-07', '2026-06-08'];
  };

  const historyDates = getHistoryDates(selectedDate);
  const mockHistory: Record<number, Record<string, 'P' | 'A' | 'L'>> = {
    1: { '2026-06-08': 'P', '2026-06-07': 'P', '2026-06-06': 'P', '2026-06-05': 'P', '2026-06-04': 'A' },
    2: { '2026-06-08': 'P', '2026-06-07': 'A', '2026-06-06': 'P', '2026-06-05': 'P', '2026-06-04': 'P' },
    3: { '2026-06-08': 'P', '2026-06-07': 'P', '2026-06-06': 'L', '2026-06-05': 'P', '2026-06-04': 'P' },
    4: { '2026-06-08': 'A', '2026-06-07': 'P', '2026-06-06': 'P', '2026-06-05': 'A', '2026-06-04': 'P' },
    5: { '2026-06-08': 'P', '2026-06-07': 'P', '2026-06-06': 'P', '2026-06-05': 'P', '2026-06-04': 'P' },
    6: { '2026-06-08': 'P', '2026-06-07': 'P', '2026-06-06': 'P', '2026-06-05': 'P', '2026-06-04': 'A' },
    7: { '2026-06-08': 'P', '2026-06-07': 'L', '2026-06-06': 'P', '2026-06-05': 'P', '2026-06-04': 'P' },
    8: { '2026-06-08': 'P', '2026-06-07': 'P', '2026-06-06': 'P', '2026-06-05': 'P', '2026-06-04': 'P' },
    9: { '2026-06-08': 'A', '2026-06-07': 'P', '2026-06-06': 'P', '2026-06-05': 'L', '2026-06-04': 'P' },
    10: { '2026-06-08': 'P', '2026-06-07': 'P', '2026-06-06': 'P', '2026-06-05': 'P', '2026-06-04': 'P' },
    11: { '2026-06-08': 'P', '2026-06-07': 'P', '2026-06-06': 'P', '2026-06-05': 'P', '2026-06-04': 'P' },
    12: { '2026-06-08': 'P', '2026-06-07': 'P', '2026-06-06': 'P', '2026-06-05': 'P', '2026-06-04': 'P' },
    13: { '2026-06-08': 'P', '2026-06-07': 'P', '2026-06-06': 'P', '2026-06-05': 'P', '2026-06-04': 'P' },
  };

  const getHistoryStatusColor = (status: 'P' | 'A' | 'L' | undefined) => {
    switch (status) {
      case 'P': return 'bg-green-100 text-green-700 font-bold';
      case 'A': return 'bg-red-100 text-red-700 font-bold';
      case 'L': return 'bg-amber-100 text-amber-700 font-bold';
      default: return 'bg-gray-50 text-gray-400';
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const isPastDate = selectedDate < todayStr;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Attendance Command Center</h1>
          <p className="text-gray-500 text-[15px] mt-1.5 font-medium">Mark or track student attendance batch-wise & date-wise</p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('mark')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'mark'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <ClipboardCheck className="w-4.5 h-4.5" />
            Mark Attendance
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'history'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Calendar className="w-4.5 h-4.5" />
            Attendance History
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-1">
          {/* Batch Selector */}
          <div className="w-full sm:w-48">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Select Batch</label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-bold shadow-xs cursor-pointer"
            >
              <option value="">-- Select Batch --</option>
              <option value="All Batches">All Batches</option>
              <option value="JEE A-1">JEE A-1</option>
              <option value="NEET B-15">NEET B-15</option>
              <option value="JEE A-2">JEE A-2</option>
              <option value="NEET B-12">NEET B-12</option>
            </select>
          </div>

          {/* Date Selector */}
          <div className="w-full sm:w-48">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="block w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-bold shadow-xs cursor-pointer"
            />
          </div>
        </div>

        {/* Bulk Action Controls (Only for Mark Tab and if not a past date) */}
        {activeTab === 'mark' && currentStudents.length > 0 && !isPastDate && (
          <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end mt-4 sm:mt-0">
            <button
              onClick={() => handleBulkMark('Present')}
              className="px-4 py-2.5 bg-emerald-550 text-white font-bold text-xs bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-xs active:scale-[0.98]"
            >
              All Present
            </button>
            <button
              onClick={() => handleBulkMark('Absent')}
              className="px-4 py-2.5 bg-red-550 text-white font-bold text-xs bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-xs active:scale-[0.98]"
            >
              All Absent
            </button>
          </div>
        )}
      </div>

      {activeTab === 'mark' ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {isPastDate && (
            <div className="mx-6 mt-5 p-3.5 bg-amber-50/60 border border-amber-100/80 text-amber-800 rounded-xl flex items-center gap-2.5 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Viewing attendance for a past date ({new Date(selectedDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}). Editing is disabled.</span>
            </div>
          )}
          {!loaded ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-4 border border-blue-100/50">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-700 text-lg mb-1">Load Batch Data</h3>
              <p className="text-gray-400 text-xs max-w-sm mb-5 font-medium">
                Click the button below to load the student list and attendance records for the selected batch.
              </p>
              <button
                onClick={handleLoadStudents}
                className="px-6 py-2.5 bg-blue-650 hover:bg-blue-700 text-white font-bold text-sm bg-blue-600 rounded-xl transition-all shadow-xs active:scale-[0.98]"
              >
                Load Students
              </button>
            </div>
          ) : currentStudents.length > 0 ? (
            <div>
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider w-16">S.No.</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Student Name</th>
                      {selectedBatch === 'All Batches' && (
                        <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Batch</th>
                      )}
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Roll Number</th>
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-center">Mark Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentStudents.map((student, index) => {
                      const currentStatus = attendanceRecords[student.id] || 'Present';
                      return (
                        <tr key={student.id} className="hover:bg-gray-50/20 transition-colors">
                          <td className="py-4 px-6 text-[13px] text-gray-500 font-semibold">{index + 1}</td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-xs shadow-xs">
                                {student.initials}
                              </div>
                              <span className="font-bold text-gray-800 text-[14px]">{student.name}</span>
                            </div>
                          </td>
                          {selectedBatch === 'All Batches' && (
                            <td className="py-4 px-6 text-sm font-bold text-blue-600">
                              <span className="px-2.5 py-1 bg-blue-50 rounded-lg border border-blue-100 text-[11px]">
                                {student.batchName}
                              </span>
                            </td>
                          )}
                          <td className="py-4 px-6 text-sm text-gray-500 font-semibold">{student.rollNumber}</td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                disabled={isPastDate}
                                onClick={() => handleSingleMark(student.id, 'Present')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                  currentStatus === 'Present'
                                    ? 'bg-green-100 text-green-700 border border-green-200 shadow-xs'
                                    : isPastDate 
                                      ? 'bg-gray-50/40 text-gray-300 border-transparent cursor-not-allowed'
                                      : 'bg-gray-50 text-gray-400 border border-transparent hover:bg-gray-100 hover:text-gray-600'
                                }`}
                              >
                                Present
                              </button>
                              <button
                                disabled={isPastDate}
                                onClick={() => handleSingleMark(student.id, 'Absent')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                  currentStatus === 'Absent'
                                    ? 'bg-red-100 text-red-700 border border-red-200 shadow-xs'
                                    : isPastDate 
                                      ? 'bg-gray-50/40 text-gray-300 border-transparent cursor-not-allowed'
                                      : 'bg-gray-50 text-gray-400 border border-transparent hover:bg-gray-100 hover:text-gray-600'
                                }`}
                              >
                                Absent
                              </button>
                              <button
                                disabled={isPastDate}
                                onClick={() => handleSingleMark(student.id, 'Late')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                  currentStatus === 'Late'
                                    ? 'bg-amber-100 text-amber-700 border border-amber-200 shadow-xs'
                                    : isPastDate 
                                      ? 'bg-gray-50/40 text-gray-300 border-transparent cursor-not-allowed'
                                      : 'bg-gray-50 text-gray-400 border border-transparent hover:bg-gray-100 hover:text-gray-600'
                                }`}
                              >
                                Late
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Submit footer */}
              {!isPastDate && (
                <div className="px-6 py-5 bg-gray-50/50 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2.5 px-6 rounded-xl transition-all shadow-xs active:scale-[0.98]"
                  >
                    Submit Attendance
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-400 font-medium text-sm">
              No students found for this batch.
            </div>
          )}
        </div>
      ) : (
        /* History View Grid Matrix */
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {!loaded ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-4 border border-blue-100/50">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-gray-700 text-lg mb-1">Load Attendance History</h3>
              <p className="text-gray-400 text-xs max-w-sm mb-5 font-medium">
                Click the button below to load the attendance history records for the selected batch.
              </p>
              <button
                onClick={handleLoadStudents}
                className="px-6 py-2.5 bg-blue-650 hover:bg-blue-700 text-white font-bold text-sm bg-blue-600 rounded-xl transition-all shadow-xs active:scale-[0.98]"
              >
                Load Students
              </button>
            </div>
          ) : currentStudents.length > 0 ? (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider w-16">S.No.</th>
                    <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Student Name</th>
                    {selectedBatch === 'All Batches' && (
                      <th className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider">Batch</th>
                    )}
                    {historyDates.map(date => (
                      <th key={date} className="py-4 px-6 text-[12px] font-bold text-gray-400 uppercase tracking-wider text-center whitespace-nowrap">
                        {new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentStudents.map((student, index) => (
                    <tr key={student.id} className="hover:bg-gray-50/20 transition-colors">
                      <td className="py-4 px-6 text-[13px] text-gray-500 font-semibold">{index + 1}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-xs shadow-xs">
                            {student.initials}
                          </div>
                          <span className="font-bold text-gray-800 text-[14px]">{student.name}</span>
                        </div>
                      </td>
                      {selectedBatch === 'All Batches' && (
                        <td className="py-4 px-6 text-sm font-bold text-blue-600">
                          <span className="px-2.5 py-1 bg-blue-50 rounded-lg border border-blue-100 text-[11px]">
                            {student.batchName}
                          </span>
                        </td>
                      )}
                      {historyDates.map(date => {
                        const status = mockHistory[student.id]?.[date];
                        return (
                          <td key={date} className="py-4 px-6 text-center">
                            <span className={`inline-block px-2.5 py-1 text-xs rounded-lg ${getHistoryStatusColor(status)}`}>
                              {status || '-'}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center text-gray-400 font-medium text-sm">
              No history records found for this batch.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherAttendance;
