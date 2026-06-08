import React from 'react';
import { 
  BookOpen, 
  Users, 
  MessageSquare, 
  FileText, 
  AlertTriangle, 
  TrendingDown, 
  Clock, 
  MapPin
} from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const stats = [
    {
      title: "Today's Classes",
      value: "4",
      icon: BookOpen,
      iconColor: "text-blue-600 bg-blue-50",
    },
    {
      title: "Students Present",
      value: "258/280",
      subtext: "92% attendance",
      icon: Users,
      iconColor: "text-green-600 bg-green-50",
    },
    {
      title: "Pending Doubts",
      value: "12",
      icon: MessageSquare,
      iconColor: "text-orange-600 bg-orange-50",
    },
    {
      title: "Tests Scheduled",
      value: "3",
      subtext: "This week",
      icon: FileText,
      iconColor: "text-cyan-600 bg-cyan-50",
    },
    {
      title: "Weak Students",
      value: "18",
      subtext: "Need attention",
      icon: AlertTriangle,
      iconColor: "text-amber-600 bg-amber-50",
    },
    {
      title: "Weak Topics",
      value: "5",
      subtext: "Thermodynamics leading",
      icon: TrendingDown,
      iconColor: "text-purple-600 bg-purple-50",
    },
  ];

  const schedule = [
    { time: "9:00 AM", class: "JEE A-1 Physics", type: "In-person", status: "Upcoming" },
    { time: "11:00 AM", class: "JEE A-2 Physics", type: "In-person", status: "Upcoming" },
    { time: "2:00 PM", class: "NEET B-15 Physics", type: "In-person", status: "Upcoming" },
    { time: "5:00 PM", class: "Doubt Session", type: "In-person", status: "Upcoming" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Teacher Academic Command Center</h1>
        <p className="text-gray-500 text-[15px] mt-1.5 font-medium">Welcome Back Dr. Rajesh Kumar</p>
      </div>

      {/* Main Banner Grid */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/20 text-center gap-4 sm:gap-0">
          <div className="space-y-1 sm:space-y-2 pb-4 sm:pb-0">
            <span className="text-xs text-blue-100 font-bold uppercase tracking-wider">Subject</span>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">Physics</p>
          </div>  
          <div className="space-y-1 sm:space-y-2 py-4 sm:py-0">
            <span className="text-xs text-blue-100 font-bold uppercase tracking-wider">Assigned Batches</span>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">6</p>
          </div>
          <div className="space-y-1 sm:space-y-2 pt-4 sm:pt-0">
            <span className="text-xs text-blue-100 font-bold uppercase tracking-wider">Total Students</span>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">280</p>
          </div>
        </div>
      </div>

      {/* Key Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">{stat.title}</span>
                <p className="text-[32px] font-bold text-gray-800 leading-tight">{stat.value}</p>
                {stat.subtext && (
                  <p className="text-xs text-gray-500 font-semibold mt-0.5">{stat.subtext}</p>
                )}
              </div>
              <div className={`p-4 rounded-2xl ${stat.iconColor} shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Schedule Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-50 rounded-xl">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Today's Schedule</h2>
        </div>

        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl bg-blue-50 hover:bg-blue-50/40 transition-colors border border-blue-100/30"
            >
              <div className="flex items-center gap-5">
                <div className="px-4 py-2 bg-white text-blue-600 text-sm font-bold rounded-xl border border-blue-100/50 shadow-sm min-w-[95px] text-center">
                  {item.time}
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-800">{item.class}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold mt-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{item.type}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-4 sm:mt-0 justify-between sm:justify-start">
                <span className="px-4 py-1.5 bg-white text-blue-600 border border-blue-100 text-xs font-bold rounded-full shadow-xs">
                  {item.status}
                </span>
              
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
