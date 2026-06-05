import React, { useState } from 'react';
import { 
  UserPlus, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Plus
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import NewAdmissionModal from '../components/NewAdmissionModal';

const statsData = [
  { title: 'Total Admissions', value: '2,847', change: '+12.5%', isPositive: true, icon: UserPlus, color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { title: 'This Month', value: '124', change: '+18%', isPositive: true, icon: Calendar, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { title: 'Pending Applications', value: '32', change: '-5%', isPositive: false, icon: Clock, color: 'text-orange-500', bgColor: 'bg-orange-50' },
  { title: 'Conversion Rate', value: '34.8%', change: '+4.5%', isPositive: true, icon: TrendingUp, color: 'text-purple-500', bgColor: 'bg-purple-50' },
];

const monthlyAdmissionsData = [
  { name: 'Jan', admissions: 140 },
  { name: 'Feb', admissions: 160 },
  { name: 'Mar', admissions: 190 },
  { name: 'Apr', admissions: 210 },
  { name: 'May', admissions: 230 },
  { name: 'Jun', admissions: 120 },
];

const courseDistributionData = [
  { name: 'IIT-JEE', students: 1250 },
  { name: 'NEET', students: 880 },
  { name: 'SSC', students: 450 },
  { name: 'Banking', students: 250 },
];

const recentAdmissions = [
  { id: 1, name: 'Aarav Sharma', course: 'IIT-JEE', batch: 'A-12', fee: '₹45,000', status: 'completed', date: '2 hours ago' },
  { id: 2, name: 'Diya Patel', course: 'NEET', batch: 'B-15', fee: '₹38,000', status: 'completed', date: '5 hours ago' },
  { id: 3, name: 'Vivek Kumar', course: 'IIT-JEE', batch: 'A-14', fee: '₹45,000', status: 'pending', date: '1 day ago' },
  { id: 4, name: 'Ananya Singh', course: 'SSC', batch: 'C-08', fee: '₹22,000', status: 'completed', date: '1 day ago' },
];

const Admissions: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827]">Admissions</h1>
          <p className="text-[14px] text-gray-500 mt-1 font-medium">Manage student admissions and enrollments</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4 shrink-0" />
          New Admission
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-[14px] p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Admissions</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyAdmissionsData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="admissions" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-[14px] p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Course-wise Distribution</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseDistributionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="students" fill="#14b8a6" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Recent Admissions</h3>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="py-4 pl-6 pr-4 text-[12px] font-semibold text-gray-500 whitespace-nowrap w-12">S.No</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 whitespace-nowrap">Student Name</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 whitespace-nowrap">Course</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 whitespace-nowrap">Batch</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 whitespace-nowrap">Fee</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 whitespace-nowrap">Status</th>
                <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentAdmissions.map((admission, index) => (
                <tr key={admission.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 pl-6 pr-4 text-[13px] text-gray-500 font-medium whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-[14px] font-semibold text-gray-900 whitespace-nowrap">{admission.name}</p>
                  </td>
                  <td className="py-4 px-6 text-[13px] text-gray-600 font-medium whitespace-nowrap">
                    {admission.course}
                  </td>
                  <td className="py-4 px-6 text-[13px] text-gray-600 font-medium whitespace-nowrap">
                    {admission.batch}
                  </td>
                  <td className="py-4 px-6 text-[13px] font-bold text-gray-900 whitespace-nowrap">
                    {admission.fee}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                      admission.status === 'completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {admission.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[13px] text-gray-500 font-medium whitespace-nowrap">
                    {admission.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Admission Modal */}
      <NewAdmissionModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  );
};

export default Admissions;
