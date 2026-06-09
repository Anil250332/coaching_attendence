import React from 'react';
import { 
  AlertTriangle, 
  Lightbulb, 
  Users, 
  Brain,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface AttendanceStudent {
  name: string;
  attendance: string;
  score: string;
  statusDetails: string;
  riskLevel: 'Critical' | 'Warning' | 'Low Risk';
}

interface BatchHealthData {
  name: string;
  percentage: number;
  status: 'Excellent' | 'Good' | 'Needs Attention';
}

interface Recommendation {
  action: string;
  description: string;
  type: 'alert' | 'meeting' | 'review';
}

const TeacherAIInsights: React.FC = () => {
  // Chart Data: Batch Attendance Averages
  const chartData = [
    { label: 'JEE A-1', value: 85 },
    { label: 'JEE A-2', value: 72 },
    { label: 'NEET B-15', value: 88 },
    { label: 'NEET B-12', value: 90 }
  ];

  // Weak/Critical Students in Attendance
  const weakStudents: AttendanceStudent[] = [
    {
      name: 'Amit Kumar',
      attendance: '78%',
      score: '62%',
      statusDetails: 'Absent last 2 classes consecutively',
      riskLevel: 'Warning'
    },
    {
      name: 'Karthik Iyer',
      attendance: '72%',
      score: '58%',
      statusDetails: 'Absent last 4 classes consecutively',
      riskLevel: 'Critical'
    },
    {
      name: 'Rohit Sharma',
      attendance: '80%',
      score: '65%',
      statusDetails: 'Short attendance / Frequent partial leaves',
      riskLevel: 'Warning'
    }
  ];

  // Batch health data
  const batchHealth: BatchHealthData[] = [
    { name: 'JEE A-1', percentage: 85, status: 'Good' },
    { name: 'JEE A-2', percentage: 72, status: 'Needs Attention' },
    { name: 'NEET B-15', percentage: 88, status: 'Excellent' },
    { name: 'NEET B-12', percentage: 90, status: 'Excellent' }
  ];

  // AI Recommendations focused on Attendance & Class engagement
  const recommendations: Recommendation[] = [
    {
      action: 'Notify Parents of Absentees',
      description: 'Automatically send SMS alerts to parents of JEE A-2 students with <75% attendance.',
      type: 'alert'
    },
    {
      action: 'Conduct Student Counseling Session',
      description: 'Karthik Iyer attendance dropped below 75% - schedule a quick offline discussion.',
      type: 'meeting'
    },
    {
      action: 'Review Weekly Attendance Reports',
      description: 'Attendance drop by 4% detected in JEE A-2 this week. View audit log.',
      type: 'review'
    }
  ];

  const getStatusBadgeClass = (status: 'Excellent' | 'Good' | 'Needs Attention') => {
    switch (status) {
      case 'Excellent':
        return 'bg-[#EBFDF5] text-[#10B981] border border-[#D1FAE5]';
      case 'Good':
        return 'bg-[#EFF6FF] text-[#3B82F6] border border-[#DBEAFE]';
      default:
        return 'bg-[#FFF7ED] text-[#F97316] border border-[#FFEDD5]';
    }
  };

  const getStatusProgressColor = (status: 'Excellent' | 'Good' | 'Needs Attention') => {
    switch (status) {
      case 'Excellent':
        return 'bg-[#10B981]';
      case 'Good':
        return 'bg-[#3B82F6]';
      default:
        return 'bg-[#F97316]';
    }
  };

  const getRiskBadgeClass = (risk: 'Critical' | 'Warning' | 'Low Risk') => {
    switch (risk) {
      case 'Critical':
        return 'bg-[#FFE8E8] text-[#FF4D49] border border-[#FFD2D2]';
      case 'Warning':
        return 'bg-[#FFF7ED] text-[#F97316] border border-[#FFEDD5]';
      default:
        return 'bg-[#EFF6FF] text-[#3B82F6] border border-[#DBEAFE]';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2.5">
            <Brain className="w-8 h-8 text-[#3B82F6]" />
            AI Insights
          </h1>
          <p className="text-gray-500 text-[15px] mt-1.5 font-medium">AI-powered attendance analytics and engagement patterns</p>
        </div>
      </div>

      {/* Average Batch Attendance (Gradient purple/pink container card) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#B936F5] via-[#DE3FF2] to-[#F23FD4] p-6 sm:p-8 shadow-md text-white">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5.5 h-5.5 text-white" />
            <h2 className="text-[17px] font-semibold tracking-wide">Average Attendance by Batch (%)</h2>
          </div>

          {/* Vertical Bar Chart */}
          <div className="relative w-full h-64 flex flex-col justify-between pt-2">
            {/* Grid lines */}
            <div className="absolute inset-y-0 left-12 right-0 flex flex-col justify-between pointer-events-none pb-8">
              {[0, 1, 2, 3, 4].map((n) => (
                <div key={n} className="w-full border-t border-white/10" />
              ))}
            </div>

            {/* Bars */}
            <div className="flex-1 flex items-end justify-between pl-12 pb-8 relative z-10 gap-4 sm:gap-8">
              {chartData.map((bar, i) => {
                const barHeight = bar.value; // since max is 100%, value directly represents height percentage
                return (
                  <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                    <div 
                      style={{ height: `${barHeight}%` }} 
                      className="w-full max-w-[90px] bg-white rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center"
                    >
                      <span className="text-[10px] font-extrabold text-[#DE3FF2] hidden sm:block">
                        {bar.value}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Y-Axis Labels */}
            <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-[11px] font-medium text-white/80 pb-8 select-none">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-between pl-12 text-[11px] font-medium text-white/90 select-none">
              {chartData.map((bar, i) => (
                <span key={i} className="flex-1 text-center truncate px-1">
                  {bar.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weak Students - Top 3 (Focused on attendance warning) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5.5 h-5.5 text-[#FF4D49]" />
          <h2 className="text-lg font-bold text-gray-800">Critical Attendance Alerts - Top 3</h2>
        </div>

        <div className="space-y-4">
          {weakStudents.map((student, index) => (
            <div 
              key={index} 
              className="bg-[#FFF8F5] border border-[#FFEBE3] rounded-xl p-5 sm:p-6 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h4 className="font-bold text-gray-800 text-[15px]">{student.name}</h4>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-lg tracking-wide self-start sm:self-auto uppercase border ${getRiskBadgeClass(student.riskLevel)}`}>
                  {student.riskLevel}
                </span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Attendance Rate</span>
                  <p className="font-bold text-[#FF4D49] text-[13px]">{student.attendance}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Avg Test Score</span>
                  <p className="font-bold text-gray-700 text-[13px]">{student.score}</p>
                </div>
                <div className="space-y-1 col-span-1 md:col-span-1">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Attendance Status / Details</span>
                  <p className="font-bold text-orange-600 text-[13px]">
                    {student.statusDetails}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Batch Health Section (Matches screenshot exactly) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5">
          <Users className="w-5.5 h-5.5 text-[#3B82F6]" />
          <h2 className="text-lg font-bold text-gray-800">Batch Performance & Attendance</h2>
        </div>

        <div className="space-y-6">
          {batchHealth.map((batch, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700 text-sm">{batch.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-gray-800 text-base">{batch.percentage}%</span>
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md ${getStatusBadgeClass(batch.status)}`}>
                    {batch.status}
                  </span>
                </div>
              </div>
              
              {/* Progress track */}
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${getStatusProgressColor(batch.status)}`}
                  style={{ width: `${batch.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations Section (Matches screenshot exactly) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5">
          <Lightbulb className="w-5.5 h-5.5 text-[#3B82F6]" />
          <h2 className="text-lg font-bold text-gray-800">AI Recommendations</h2>
        </div>

        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div 
              key={index} 
              className="flex items-start gap-4 p-5 bg-gray-50/40 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all cursor-pointer group"
            >
              <div className="space-y-1 flex-1 min-w-0">
                <h4 className="font-bold text-gray-800 text-[14px]">{rec.action}</h4>
                <p className="text-gray-400 text-xs font-semibold leading-relaxed break-words">{rec.description}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors self-center shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherAIInsights;
