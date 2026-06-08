import React from 'react';
import { 
  Users, 
  BookOpen, 
  IndianRupee, 
  Target, 
  Clock, 
  UserPlus, 
  AlertCircle, 
  TrendingUp,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const statsData = [
  { title: 'Total Students', value: '2,847', change: '+12.5%', isPositive: true, icon: Users, color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { title: 'Active Batches', value: '42', change: '+3', isPositive: true, icon: BookOpen, color: 'text-teal-500', bgColor: 'bg-teal-50' },
  { title: 'Monthly Revenue', value: '₹24.8L', change: '+18.2%', isPositive: true, icon: IndianRupee, color: 'text-green-500', bgColor: 'bg-green-50' },
  { title: 'Fee Collection %', value: '87.4%', change: '+5.2%', isPositive: true, icon: Target, color: 'text-orange-400', bgColor: 'bg-orange-50' },
  { title: 'Student Attendance %', value: '91.2%', change: '-2.1%', isPositive: false, icon: Clock, color: 'text-purple-500', bgColor: 'bg-purple-50' },
  { title: 'New Admissions', value: '124', change: '+8', isPositive: true, icon: UserPlus, color: 'text-pink-500', bgColor: 'bg-pink-50' },
  { title: 'Pending Fees', value: '₹3.2L', change: '-12%', isPositive: false, icon: AlertCircle, color: 'text-red-500', bgColor: 'bg-red-50' },
  { title: 'Lead Conversion Rate', value: '34.8%', change: '+4.5%', isPositive: true, icon: TrendingUp, color: 'text-cyan-500', bgColor: 'bg-cyan-50' },
];

const areaChartData = [
  { name: 'Jan', students: 130 },
  { name: 'Feb', students: 145 },
  { name: 'Mar', students: 160 },
  { name: 'Apr', students: 185 },
  { name: 'May', students: 200 },
  { name: 'Jun', students: 215 },
];

const barChartData = [
  { name: 'Jan', revenue: 1500000 },
  { name: 'Feb', revenue: 1650000 },
  { name: 'Mar', revenue: 1900000 },
  { name: 'Apr', revenue: 2100000 },
  { name: 'May', revenue: 2300000 },
  { name: 'Jun', revenue: 2500000 },
];

const lineChartData = [
  { name: 'Mon', attendance: 94 },
  { name: 'Tue', attendance: 89 },
  { name: 'Wed', attendance: 92 },
  { name: 'Thu', attendance: 88 },
  { name: 'Fri', attendance: 91 },
  { name: 'Sat', attendance: 87 },
];

const pieData = [
  { name: 'IIT-JEE', value: 1245, color: '#3b82f6' },
  { name: 'NEET', value: 892, color: '#14b8a6' },
  { name: 'SSC', value: 456, color: '#f59e0b' },
  { name: 'Banking', value: 254, color: '#8b5cf6' },
];

const subjectData = [
  { name: 'Physics', score: 85 },
  { name: 'Chemistry', score: 78 },
  { name: 'Mathematics', score: 92 },
  { name: 'Biology', score: 88 },
];

const recentActivities = [
  { title: 'New Admission', desc: 'Rahul Kumar enrolled in IIT-JEE Batch A', time: '5 minutes ago', color: 'text-teal-500', bgColor: 'bg-teal-50' },
  { title: 'Fee Payment', desc: 'Priya Sharma paid ₹45,000 for Q2', time: '12 minutes ago', color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { title: 'Attendance Alert', desc: '8 students absent in Chemistry Batch B', time: '28 minutes ago', color: 'text-red-500', bgColor: 'bg-red-50' },
  { title: 'AI Performance Alert', desc: '15 students weak in Organic Chemistry', time: '1 hour ago', color: 'text-purple-500', bgColor: 'bg-purple-50' },
  { title: 'Fee Payment', desc: 'Amit Verma paid ₹32,000 for Q2', time: '2 hours ago', color: 'text-blue-500', bgColor: 'bg-blue-50' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div>
        <h1 className="text-[28px] font-bold text-[#111827]">Dashboard</h1>
        <p className="text-[14px] text-gray-500 mt-1 font-medium">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-[14px] p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-[13px] font-semibold ${stat.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                  <TrendingUp className={`w-3.5 h-3.5 ${!stat.isPositive && 'rotate-180'}`} />
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-[22px] font-bold text-gray-800 leading-none">{stat.value}</h3>
                <p className="text-[13px] text-gray-500 font-medium mt-2">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Area Chart */}
        <div className="bg-white rounded-[14px] p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Admissions Trend</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-[14px] p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Growth</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  tickFormatter={(value) => `${value / 100000}`}
                />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`₹${(Number(value) / 100000).toFixed(1)}L`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#14b8a6" radius={[4, 4, 0, 0]} maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Line Chart */}
        <div className="bg-white rounded-[14px] p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Attendance</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} domain={[80, 100]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="attendance" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-[14px] p-6 border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Distribution</h3>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-[13px]">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </div>
                <span className="font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Bar Chart */}
        <div className="bg-white rounded-[14px] p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Subject Performance</h3>
          <div className="h-[230px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={subjectData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} domain={[0, 100]} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} width={80} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="score" fill="#f59e0b" radius={[0, 6, 6, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-[14px] p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h3>
        <div className="space-y-9">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="text-[14px] font-bold text-gray-400 w-4 text-right">
                {index + 1}.
              </span>
              {/* <div className={`w-10 h-10 flex items-center justify-center rounded-[10px] flex-shrink-0 ${activity.bgColor}`}>
                <div className={`w-2 h-2 rounded-full ${activity.color} bg-current`} />
              </div> */}
              <div className="flex-1 min-w-0">
                <h4 className="text-[14px] font-semibold text-gray-900 truncate">{activity.title}</h4>
                <p className="text-[13px] text-gray-500 mt-0.5 truncate">{activity.desc}</p>
              </div>
              <div className="text-[12px] text-gray-400 font-medium whitespace-nowrap">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
