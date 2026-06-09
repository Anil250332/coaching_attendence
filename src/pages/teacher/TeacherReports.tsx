import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  BarChart3, 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  HelpCircle, 
  FileEdit,
  ChevronDown,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ReportCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  type: string;
}

interface RecentDownload {
  id: string;
  filename: string;
  date: string;
  fileType: 'pdf' | 'excel';
}

const TeacherReports: React.FC = () => {
  const [reportType, setReportType] = useState('Batch Performance');
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [batchSelection, setBatchSelection] = useState('All Batches');
  const [exportFormat, setExportFormat] = useState('PDF');

  const [recentDownloads, setRecentDownloads] = useState<RecentDownload[]>([
    {
      id: '1',
      filename: 'JEE A-1 Monthly Report',
      date: 'June 5, 2026',
      fileType: 'pdf'
    },
    {
      id: '2',
      filename: 'Attendance Summary May 2026',
      date: 'June 1, 2026',
      fileType: 'excel'
    },
    {
      id: '3',
      filename: 'Test Analytics Report',
      date: 'May 28, 2026',
      fileType: 'pdf'
    }
  ]);

  const reportCards: ReportCard[] = [
    {
      title: 'Batch Reports',
      description: 'Overall batch performance and analytics',
      icon: (
        <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
          <BarChart3 className="w-6 h-6" />
        </div>
      ),
      type: 'batch'
    },
    {
      title: 'Student Reports',
      description: 'Individual student progress tracking',
      icon: (
        <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
          <GraduationCap className="w-6 h-6" />
        </div>
      ),
      type: 'student'
    },
    {
      title: 'Attendance Reports',
      description: 'Detailed attendance analytics',
      icon: (
        <div className="p-3 bg-indigo-50 text-indigo-500 rounded-xl">
          <Calendar className="w-6 h-6" />
        </div>
      ),
      type: 'attendance'
    },
    {
      title: 'Test Reports',
      description: 'Test scores and performance metrics',
      icon: (
        <div className="p-3 bg-[#EEF2F6] text-gray-500 rounded-xl">
          <FileEdit className="w-6 h-6" />
        </div>
      ),
      type: 'test'
    },
    {
      title: 'Question Analytics',
      description: 'Question-wise difficulty analysis',
      icon: (
        <div className="p-3 bg-red-50 text-red-500 rounded-xl">
          <HelpCircle className="w-6 h-6" />
        </div>
      ),
      type: 'question'
    },
    {
      title: 'Topic Analytics',
      description: 'Subject and topic-wise insights',
      icon: (
        <div className="p-3 bg-teal-50 text-teal-500 rounded-xl">
          <BookOpen className="w-6 h-6" />
        </div>
      ),
      type: 'topic'
    }
  ];

  const handleQuickDownload = (reportName: string, format: 'PDF' | 'Excel') => {
    toast.success(`Generating ${format} for ${reportName}...`);
    
    // Simulate generation and download
    setTimeout(() => {
      const newDl: RecentDownload = {
        id: Date.now().toString(),
        filename: `${reportName} (${format === 'PDF' ? 'Quick PDF' : 'Quick Excel'})`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        fileType: format === 'PDF' ? 'pdf' : 'excel'
      };
      setRecentDownloads([newDl, ...recentDownloads]);
      toast.success(`${format} downloaded successfully!`);
    }, 1000);
  };

  const handleGenerateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Generating Custom Report (${reportType}) as ${exportFormat}...`);

    setTimeout(() => {
      const newDl: RecentDownload = {
        id: Date.now().toString(),
        filename: `${batchSelection} - ${reportType} (${dateRange})`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        fileType: exportFormat === 'PDF' ? 'pdf' : 'excel'
      };
      setRecentDownloads([newDl, ...recentDownloads]);
      toast.success(`Downloaded custom ${exportFormat} report!`);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Reports</h1>
          <p className="text-gray-500 text-[15px] mt-1.5 font-medium">Generate and export comprehensive reports</p>
        </div>
      </div>

      {/* Grid of Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCards.map((card, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-100 hover:border-blue-100/50 rounded-2xl p-6 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between space-y-5"
          >
            <div className="flex items-start gap-4">
              {card.icon}
              <div className="space-y-1">
                <h3 className="font-bold text-gray-800 text-base">{card.title}</h3>
                <p className="text-gray-400 text-xs font-semibold leading-relaxed">{card.description}</p>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button 
                onClick={() => handleQuickDownload(card.title, 'PDF')}
                className="flex items-center justify-center gap-1.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                PDF
              </button>
              <button 
                onClick={() => handleQuickDownload(card.title, 'Excel')}
                className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                Excel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Report Generation Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold text-gray-800">Generate Custom Report</h2>
        
        <form onSubmit={handleGenerateCustom} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Report Type */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Report Type</label>
              <div className="relative">
                <select 
                  value={reportType} 
                  onChange={(e) => setReportType(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold cursor-pointer appearance-none"
                >
                  <option value="Batch Performance">Batch Performance</option>
                  <option value="Student Attendance">Student Attendance</option>
                  <option value="Test Results Summary">Test Results Summary</option>
                  <option value="Question Difficulty Analysis">Question Difficulty Analysis</option>
                  <option value="Topic Strengths & Weaknesses">Topic Strengths & Weaknesses</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Date Range</label>
              <div className="relative">
                <select 
                  value={dateRange} 
                  onChange={(e) => setDateRange(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold cursor-pointer appearance-none"
                >
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="This Month">This Month</option>
                  <option value="All Time">All Time</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Batch Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Batch Selection</label>
              <div className="relative">
                <select 
                  value={batchSelection} 
                  onChange={(e) => setBatchSelection(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold cursor-pointer appearance-none"
                >
                  <option value="All Batches">All Batches</option>
                  <option value="JEE A-1">JEE A-1</option>
                  <option value="JEE A-2">JEE A-2</option>
                  <option value="NEET B-15">NEET B-15</option>
                  <option value="NEET B-12">NEET B-12</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Export Format */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Export Format</label>
              <div className="relative">
                <select 
                  value={exportFormat} 
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold cursor-pointer appearance-none"
                >
                  <option value="PDF">PDF</option>
                  <option value="Excel">Excel</option>
                  <option value="CSV">CSV</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-start">
            <button 
              type="submit"
              className="flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-xs active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              Generate & Download Report
            </button>
          </div>
        </form>
      </div>

      {/* Recent Downloads */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold text-gray-800">Recent Downloads</h2>

        <div className="space-y-3">
          {recentDownloads.map((dl) => (
            <div 
              key={dl.id}
              className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between p-4 bg-gray-50/40 hover:bg-gray-50/80 border border-gray-100 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg shrink-0 ${
                  dl.fileType === 'pdf' 
                    ? 'bg-blue-50 text-blue-550' 
                    : 'bg-emerald-50 text-emerald-550'
                }`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm break-words">{dl.filename}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400 font-semibold mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Generated on {dl.date}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => toast.success(`Re-downloading: ${dl.filename}`)}
                className="flex w-full sm:w-auto items-center justify-center gap-1.5 px-4 py-2.5 hover:bg-gray-100 border border-gray-200/40 text-blue-600 font-extrabold text-xs rounded-xl transition-all shadow-2xs active:scale-95 cursor-pointer shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherReports;
