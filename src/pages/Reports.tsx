import React from 'react';
import { 
  Download, 
  FileText, 
  BarChart2, 
  TrendingUp, 
  Sliders 
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

interface ReportCard {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  lastGenerated: string;
  bgColor: string;
  iconBgColor: string;
  iconTextColor: string;
  btnColor: string;
}

const reports: ReportCard[] = [
  {
    id: 1,
    title: 'Admission Report',
    description: 'Monthly admissions and trends',
    icon: FileText,
    lastGenerated: 'Last generated: 2 hours ago',
    bgColor: 'bg-white',
    iconBgColor: 'bg-[#EFF6FF]',
    iconTextColor: 'text-[#2563EB]',
    btnColor: 'bg-[#2563EB] hover:bg-[#1D4ED8]'
  },
  {
    id: 2,
    title: 'Fee Collection Report',
    description: 'Revenue and pending fees',
    icon: BarChart2,
    lastGenerated: 'Last generated: 5 hours ago',
    bgColor: 'bg-white',
    iconBgColor: 'bg-[#ECFDF5]',
    iconTextColor: 'text-[#10B981]',
    btnColor: 'bg-[#10B981] hover:bg-[#059669]'
  },
  {
    id: 3,
    title: 'Attendance Report',
    description: 'Student attendance analysis',
    icon: BarChart2,
    lastGenerated: 'Last generated: 1 day ago',
    bgColor: 'bg-white',
    iconBgColor: 'bg-[#FFF7ED]',
    iconTextColor: 'text-[#F59E0B]',
    btnColor: 'bg-[#F59E0B] hover:bg-[#D97706]'
  },
  {
    id: 4,
    title: 'Performance Report',
    description: 'Test scores and rankings',
    icon: TrendingUp,
    lastGenerated: 'Last generated: 1 day ago',
    bgColor: 'bg-white',
    iconBgColor: 'bg-[#F5F3FF]',
    iconTextColor: 'text-[#8B5CF6]',
    btnColor: 'bg-[#8B5CF6] hover:bg-[#7C3AED]'
  },
  {
    id: 5,
    title: 'Batch Performance',
    description: 'Batch-wise analysis',
    icon: BarChart2,
    lastGenerated: 'Last generated: 2 days ago',
    bgColor: 'bg-white',
    iconBgColor: 'bg-[#ECFDF5]',
    iconTextColor: 'text-[#10B981]',
    btnColor: 'bg-[#0D9488] hover:bg-[#0F766E]'
  },
  {
    id: 6,
    title: 'Teacher Report',
    description: 'Faculty performance metrics',
    icon: FileText,
    lastGenerated: 'Last generated: 3 days ago',
    bgColor: 'bg-white',
    iconBgColor: 'bg-[#FDF2F8]',
    iconTextColor: 'text-[#EC4899]',
    btnColor: 'bg-[#EC4899] hover:bg-[#DB2777]'
  }
];

const revenueData = [
  { name: 'Jan', revenue: 1500000, display: '₹15.0L' },
  { name: 'Feb', revenue: 1650000, display: '₹16.5L' },
  { name: 'Mar', revenue: 1900000, display: '₹19.0L' },
  { name: 'Apr', revenue: 2100000, display: '₹21.0L' },
  { name: 'May', revenue: 2350000, display: '₹23.5L' },
  { name: 'Jun', revenue: 2500000, display: '₹25.0L' },
];

const attendanceData = [
  { name: 'Jan', attendance: 87 },
  { name: 'Feb', attendance: 89 },
  { name: 'Mar', attendance: 91 },
  { name: 'Apr', attendance: 88 },
  { name: 'May', attendance: 90 },
  { name: 'Jun', attendance: 92 },
];

const Reports: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 sm:pt-0">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827]">Reports & Analytics</h1>
          <p className="text-[15px] text-gray-500 font-medium mt-1">Generate and download comprehensive reports</p>
        </div>
        <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] transition-colors shadow-sm flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download All
        </button>
      </div>

      {/* Grid of Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div 
              key={report.id} 
              className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-4">
                <div className={`w-10 h-10 rounded-xl ${report.iconBgColor} ${report.iconTextColor} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[16px] font-extrabold text-gray-900 leading-snug">{report.title}</h3>
                  <p className="text-[13px] text-gray-500 font-medium mt-0.5">{report.description}</p>
                </div>
                <p className="text-[11px] text-gray-400 font-bold">{report.lastGenerated}</p>
              </div>

              <div className="flex gap-2.5 mt-6 pt-2">
                <button className={`flex-1 text-white py-2.5 rounded-xl text-xs font-bold transition-all text-center shadow-xs ${report.btnColor}`}>
                  Generate
                </button>
                <button className="bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-gray-700 w-11 h-10 rounded-xl flex items-center justify-center transition-all shrink-0">
                  <Download className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Overview */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
          <h3 className="text-[17px] font-extrabold text-[#111827] mb-6">Revenue Overview</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                  tickFormatter={(value) => `${value / 100000}L`}
                />
                <Tooltip 
                  cursor={{ fill: '#F3F4F6' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white border border-[#E5E7EB] rounded-lg p-3 shadow-md">
                          <p className="text-xs font-bold text-gray-500">{payload[0].payload.name}</p>
                          <p className="text-[14px] font-extrabold text-[#10B981] mt-1">
                            revenue : {payload[0].payload.display}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Trend */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
          <h3 className="text-[17px] font-extrabold text-[#111827] mb-6">Attendance Trend</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                  domain={[80, 100]}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white border border-[#E5E7EB] rounded-lg p-3 shadow-md">
                          <p className="text-xs font-bold text-gray-500">{payload[0].payload.name}</p>
                          <p className="text-[14px] font-extrabold text-[#2563EB] mt-1">
                            Attendance: {payload[0].value}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="#2563EB" 
                  strokeWidth={2.5}
                  dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Custom Report Builder Banner */}
      <div className="bg-[#2563EB] rounded-2xl p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-md shadow-blue-100/50">
        <div className="space-y-2 max-w-2xl">
          <h3 className="text-xl font-bold">Custom Report Builder</h3>
          <p className="text-[13px] text-blue-50/90 font-semibold leading-relaxed">
            Create custom reports with your preferred metrics and date ranges. Export in PDF, Excel, or CSV formats.
          </p>
        </div>
        <button className="bg-white hover:bg-blue-50 text-[#2563EB] px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-md shrink-0 flex items-center gap-2">
          <Sliders className="w-4 h-4" />
          Build Custom Report
        </button>
      </div>
    </div>
  );
};

export default Reports;
