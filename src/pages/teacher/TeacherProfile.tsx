import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  Calendar, 
  Award, 
  GraduationCap
} from 'lucide-react';

interface BatchItem {
  name: string;
}

interface PerformanceMetric {
  value: string;
  label: string;
  colorClass: string;
}

interface QualificationItem {
  title: string;
  institution: string;
}

const TeacherProfile: React.FC = () => {
  const assignedBatches: BatchItem[] = [
    { name: 'JEE A-1' },
    { name: 'JEE A-2' },
    { name: 'JEE A-3' },
    { name: 'NEET B-12' },
    { name: 'NEET B-15' },
    { name: 'NEET B-18' }
  ];

  const metrics: PerformanceMetric[] = [
    { value: '280', label: 'Total Students', colorClass: 'text-[#3B82F6]' },
    { value: '92%', label: 'Avg Attendance', colorClass: 'text-[#10B981]' },
    { value: '78%', label: 'Avg Score', colorClass: 'text-[#3B82F6]' },
    { value: '24', label: 'Tests Conducted', colorClass: 'text-[#A855F7]' }
  ];

  const qualifications: QualificationItem[] = [
    {
      title: 'Ph.D. in Physics',
      institution: 'Indian Institute of Technology, Delhi'
    },
    {
      title: 'M.Sc. in Physics',
      institution: 'University of Delhi'
    },
    {
      title: 'Best Faculty Award 2024',
      institution: 'Excellence in Teaching & Student Performance'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Profile</h1>
        <p className="text-gray-500 text-[15px] mt-1.5 font-medium">Manage your profile and preferences</p>
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar circular badge */}
          <div className="w-24 h-24 bg-[#2563EB] text-white flex items-center justify-center rounded-full font-extrabold text-3xl shadow-sm shrink-0 select-none">
            RK
          </div>
          
          {/* Faculty Details */}
          <div className="space-y-4 text-center md:text-left flex-1 min-w-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Dr. Rajesh Kumar</h2>
              <p className="text-gray-400 text-sm font-semibold mt-1">Senior Physics Faculty</p>
            </div>

            {/* Quick Contact Links Row */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs font-semibold text-gray-500 pt-1">
              <a href="mailto:rajesh.kumar@institute.edu" className="flex items-center gap-2 hover:text-[#2563EB] transition-colors">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>rajesh.kumar@institute.edu</span>
              </a>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>Delhi, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Subject, Experience, Assigned Batches Count */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subject Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#EFF6FF] text-[#3B82F6] rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-gray-700">Subject</span>
          </div>
          <h3 className="text-2xl font-bold text-[#3B82F6] tracking-tight">Physics</h3>
        </div>

        {/* Experience Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#F5F3FF] text-[#8B5CF6] rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-gray-700">Experience</span>
          </div>
          <h3 className="text-2xl font-bold text-[#8B5CF6] tracking-tight">15 Years</h3>
        </div>

        {/* Assigned Batches Count Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#ECFDF5] text-[#10B981] rounded-xl">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-gray-700">Assigned Batches</span>
          </div>
          <h3 className="text-2xl font-bold text-[#10B981] tracking-tight">6</h3>
        </div>
      </div>

      {/* Assigned Batches List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold text-gray-800">Assigned Batches</h2>
        
        {/* Responsive Grid of Batches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {assignedBatches.map((batch, index) => (
            <div 
              key={index} 
              className="py-4 bg-[#F8FAFC] border border-[#E2E8F0]/60 hover:border-[#3B82F6]/30 hover:bg-[#EFF6FF]/10 text-center font-bold text-sm text-[#2563EB] rounded-xl transition-all shadow-2xs cursor-default"
            >
              {batch.name}
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold text-gray-800">Performance Metrics</h2>

        {/* 4 columns for metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="bg-[#F8FAFC] border border-[#E2E8F0]/40 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-1.5 shadow-2xs hover:shadow-3xs transition-shadow"
            >
              <span className={`text-3xl font-extrabold tracking-tight ${metric.colorClass}`}>
                {metric.value}
              </span>
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Qualifications & Achievements */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold text-gray-800">Qualifications & Achievements</h2>

        <div className="space-y-4">
          {qualifications.map((qual, index) => (
            <div 
              key={index} 
              className="p-5 bg-[#F8FAFC] border border-[#E2E8F0]/40 rounded-xl space-y-1.5 hover:bg-gray-50/50 transition-colors cursor-default"
            >
              <h4 className="font-bold text-gray-800 text-sm">{qual.title}</h4>
              <div className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold leading-relaxed">
                <GraduationCap className="w-4 h-4 text-gray-400 shrink-0" />
                <span>{qual.institution}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
