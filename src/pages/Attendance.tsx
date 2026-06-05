import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Calendar, 
  XCircle, 
  AlertCircle,
  Clock,
  X
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const weeklyTrendData = [
  { name: 'Mon', value: 92 },
  { name: 'Tue', value: 89 },
  { name: 'Wed', value: 94 },
  { name: 'Thu', value: 88 },
  { name: 'Fri', value: 91 },
  { name: 'Sat', value: 87 },
];

const batchRateData = [
  { name: 'IIT-JEE A-12', value: 94, color: '#10b981' },
  { name: 'NEET B-15', value: 100, color: '#10b981' },
  { name: 'SSC C-08', value: 88, color: '#f59e0b' },
  { name: 'Banking D-21', value: 85, color: '#f59e0b' },
  { name: 'IIT-JEE A-14', value: 92, color: '#10b981' },
];

const dummyScannedStudents = [
  { name: 'Aarav Sharma', time: '09:15 AM' },
  { name: 'Diya Patel', time: '09:16 AM' },
  { name: 'Vivek Kumar', time: '09:17 AM' },
  { name: 'Ananya Singh', time: '09:18 AM' },
  { name: 'Rohan Verma', time: '09:20 AM' },
  { name: 'Neha Gupta', time: '09:21 AM' },
  { name: 'Karan Mehra', time: '09:23 AM' },
  { name: 'Priya Raj', time: '09:25 AM' },
  { name: 'Amit Desai', time: '09:28 AM' },
  { name: 'Sanya Kapoor', time: '09:30 AM' }
];

const AttendanceDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<'face' | 'qr' | 'biometric' | 'manual' | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827]">Attendance Management</h1>
          <p className="text-[15px] text-gray-500 font-medium">Track and manage student attendance</p>
        </div>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto mt-4 lg:mt-0">
       
          <button onClick={() => setActiveModal('manual')} className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:px-5 sm:py-2 rounded-lg font-semibold text-[12px] sm:text-[14px] transition-colors shadow-sm flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <span className="text-center leading-tight">Mark Manual</span>
          </button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall */}
        <div className="bg-[#10b981] rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between h-[140px]">
          <CheckCircle2 className="w-7 h-7 text-emerald-100" />
          <div>
            <h2 className="text-4xl font-bold mb-1">91.2%</h2>
            <p className="text-emerald-100 font-medium text-[14px]">Overall Attendance</p>
          </div>
        </div>
        
        {/* Present */}
        <div className="bg-[#2563eb] rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between h-[140px]">
          <Calendar className="w-7 h-7 text-blue-200" />
          <div>
            <h2 className="text-4xl font-bold mb-1">2,604</h2>
            <p className="text-blue-200 font-medium text-[14px]">Present Today</p>
          </div>
        </div>

        {/* Absent */}
        <div className="bg-[#ef4444] rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between h-[140px]">
          <XCircle className="w-7 h-7 text-red-200" />
          <div>
            <h2 className="text-4xl font-bold mb-1">243</h2>
            <p className="text-red-200 font-medium text-[14px]">Absent Today</p>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-[#f59e0b] rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between h-[140px]">
          <AlertCircle className="w-7 h-7 text-amber-200" />
          <div>
            <h2 className="text-4xl font-bold mb-1">3</h2>
            <p className="text-amber-200 font-medium text-[14px]">Critical Alerts</p>
          </div>
        </div>
      </div>

      {/* Today's Attendance by Batch */}
      <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm">
        <h3 className="text-[16px] font-bold text-[#111827] mb-6">Today's Attendance by Batch</h3>
        <div className="space-y-6">
          
          {/* IIT-JEE */}
          <div onClick={() => navigate('/attendance/batch/IIT-JEE-A-12')} className="cursor-pointer hover:bg-gray-50 p-3 -mx-3 rounded-xl transition-colors">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px]">IIT-JEE A-12</h4>
                  <p className="text-[13px] text-gray-500 font-medium">09:00 AM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 text-[18px]">93%</p>
                <p className="text-[13px] text-gray-500 font-medium">28/30 Present</p>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden mt-3">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '93%' }}></div>
            </div>
          </div>

          {/* NEET */}
          <div onClick={() => navigate('/attendance/batch/NEET-B-15')} className="cursor-pointer hover:bg-gray-50 p-3 -mx-3 rounded-xl transition-colors">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px]">NEET B-15</h4>
                  <p className="text-[13px] text-gray-500 font-medium">10:30 AM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 text-[18px]">100%</p>
                <p className="text-[13px] text-gray-500 font-medium">35/35 Present</p>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden mt-3">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* SSC */}
          <div onClick={() => navigate('/attendance/batch/SSC-C-08')} className="cursor-pointer hover:bg-gray-50 p-3 -mx-3 rounded-xl transition-colors">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px]">SSC C-08</h4>
                  <p className="text-[13px] text-gray-500 font-medium">12:00 PM</p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-[12px] font-bold mb-1">
                  Pending
                </span>
              </div>
            </div>
          </div>

          {/* Banking */}
          <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-[15px]">Banking D-21</h4>
                <p className="text-[13px] text-gray-500 font-medium">02:00 PM</p>
              </div>
            </div>
            <span className="bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-lg text-[13px] font-bold">
              Pending
            </span>
          </div>

        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend */}
        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm">
          <h3 className="text-[16px] font-bold text-[#111827] mb-6">Weekly Attendance Trend</h3>
          <div className="h-[300px] sm:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrendData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2563eb" 
                  strokeWidth={3} 
                  dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Batch-wise Rate */}
        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm">
          <h3 className="text-[16px] font-bold text-[#111827] mb-6">Batch-wise Attendance Rate</h3>
          <div className="h-[300px] sm:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={batchRateData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {batchRateData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Absent Alerts */}
        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h3 className="text-[16px] font-bold text-[#111827]">Absent Students Alert</h3>
          </div>
          
          <div className="space-y-4">
            {/* Alert 1 */}
            <div className="bg-[#fff6f6] rounded-lg border-l-4 border-l-[#ef4444] p-4 mb-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px]">Rahul Kumar</h4>
                  <p className="text-[13px] text-gray-500 font-medium">IIT-JEE A-12</p>
                </div>
                <span className="bg-[#ef4444] text-white px-3 py-1 rounded-full text-[12px] font-bold">2 days</span>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-[#22c55e] hover:bg-[#16a34a] text-white py-2 rounded-lg text-[13px] font-bold transition-colors">
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Alert 2 */}
            <div className="bg-[#fff6f6] rounded-lg border-l-4 border-l-[#ef4444] p-4 mb-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px]">Priya Singh</h4>
                  <p className="text-[13px] text-gray-500 font-medium">IIT-JEE A-12</p>
                </div>
                <span className="bg-[#ef4444] text-white px-3 py-1 rounded-full text-[12px] font-bold">1 day</span>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-[#22c55e] hover:bg-[#16a34a] text-white py-2 rounded-lg text-[13px] font-bold transition-colors">
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Alert 3 */}
            <div className="bg-[#fff6f6] rounded-lg border-l-4 border-l-[#ef4444] p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px]">Amit Patel</h4>
                  <p className="text-[13px] text-gray-500 font-medium">SSC C-08</p>
                </div>
                <span className="bg-[#ef4444] text-white px-3 py-1 rounded-full text-[12px] font-bold">3 days</span>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-[#22c55e] hover:bg-[#16a34a] text-white py-2 rounded-lg text-[13px] font-bold transition-colors">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm lg:col-span-2 overflow-x-auto custom-scrollbar">
          <h3 className="text-[16px] font-bold text-[#111827] mb-6">Weekly Attendance Heatmap</h3>
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-3 pr-4 text-[13px] font-semibold text-gray-500">Student</th>
                <th className="py-3 px-2 text-[13px] font-semibold text-gray-500 text-center">Mon</th>
                <th className="py-3 px-2 text-[13px] font-semibold text-gray-500 text-center">Tue</th>
                <th className="py-3 px-2 text-[13px] font-semibold text-gray-500 text-center">Wed</th>
                <th className="py-3 px-2 text-[13px] font-semibold text-gray-500 text-center">Thu</th>
                <th className="py-3 px-2 text-[13px] font-semibold text-gray-500 text-center">Fri</th>
                <th className="py-3 px-2 text-[13px] font-semibold text-gray-500 text-center">Sat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {/* Row 1 */}
              <tr>
                <td className="py-4 pr-4 font-bold text-gray-900 text-[14px]">Aarav S.</td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
              </tr>
              {/* Row 2 */}
              <tr>
                <td className="py-4 pr-4 font-bold text-gray-900 text-[14px]">Diya P.</td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mx-auto"><XCircle className="w-5 h-5 text-red-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
              </tr>
              {/* Row 3 */}
              <tr>
                <td className="py-4 pr-4 font-bold text-gray-900 text-[14px]">Vivek K.</td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mx-auto"><XCircle className="w-5 h-5 text-red-500" /></div></td>
              </tr>
              {/* Row 4 */}
              <tr>
                <td className="py-4 pr-4 font-bold text-gray-900 text-[14px]">Ananya S.</td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mx-auto"><XCircle className="w-5 h-5 text-red-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
              </tr>
              {/* Row 5 */}
              <tr>
                <td className="py-4 pr-4 font-bold text-gray-900 text-[14px]">Rohan V.</td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mx-auto"><XCircle className="w-5 h-5 text-red-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
                <td className="py-4 px-2 text-center"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {activeModal === 'face' && 'Attendance Management'}
                {activeModal === 'qr' && 'QR Code Attendance'}
                {activeModal === 'biometric' && 'Biometric Attendance'}
                {activeModal === 'manual' && 'Manual Attendance'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col items-center text-center">

              {activeModal === 'manual' && (
                <div className="w-full text-left">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Batch</label>
                    <select className="w-full border border-blue-600 rounded-xl p-3 outline-none text-sm font-medium focus:ring-2 focus:ring-blue-100">
                      <option>IIT-JEE A-12</option>
                      <option>NEET B-15</option>
                      <option>SSC C-08</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4 max-h-60 overflow-y-auto custom-scrollbar pr-2 mb-6 mt-6">
                    {dummyScannedStudents.map((student, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="font-bold text-gray-900 text-[15px]">{student.name}</span>
                      </div>
                    ))}
                  </div>

                  <button onClick={closeModal} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-colors">
                    Save Attendance
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceDashboard;
