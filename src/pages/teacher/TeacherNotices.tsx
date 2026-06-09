import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Bell, 
  FileText, 
  UploadCloud, 
  AlertCircle, 
  Clock, 
  Trash2, 
  Search, 
  Calendar, 
  CheckCircle2, 
  Target, 
  AlertTriangle,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Notice {
  id: string;
  title: string;
  description: string;
  attachmentName?: string;
  targetAudience: 'all' | 'batch' | 'students';
  targetBatch?: string;
  targetStudents?: string;
  priority: 'normal' | 'important' | 'urgent';
  date: string;
  scheduledTime?: string;
  isScheduled: boolean;
}

const TeacherNotices: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [targetAudience, setTargetAudience] = useState<'all' | 'batch' | 'students'>('all');
  const [targetBatch, setTargetBatch] = useState('JEE A-1');
  const [targetStudents, setTargetStudents] = useState('');
  const [priority, setPriority] = useState<'normal' | 'important' | 'urgent'>('normal');
  const [scheduleMode, setScheduleMode] = useState<'now' | 'later'>('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Notices List State
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: '1',
      title: 'JEE Advanced Registration',
      description: 'Registration for JEE Advanced 2026 is now open. Make sure to upload all required documents before the deadline.',
      attachmentName: 'JEE_Advanced_Instructions.pdf',
      targetAudience: 'all',
      priority: 'urgent',
      date: '2026-06-05',
      isScheduled: false
    },
    {
      id: '2',
      title: 'Special Doubt Session',
      description: 'A special doubt solving session for Physics will be held this Sunday at 10:00 AM in Room 102.',
      targetAudience: 'batch',
      targetBatch: 'JEE A-1',
      priority: 'important',
      date: '2026-06-07',
      isScheduled: false
    },
    {
      id: '3',
      title: 'Holiday Notice',
      description: 'The institute will remain closed on June 15th on account of the upcoming festival. Online classes will run as scheduled.',
      targetAudience: 'all',
      priority: 'normal',
      date: '2026-06-10',
      isScheduled: false
    },
    {
      id: '4',
      title: 'Mock Test Schedule',
      description: 'Syllabus and timetable for the upcoming NEET mock test has been uploaded. Please prepare accordingly.',
      targetAudience: 'batch',
      targetBatch: 'NEET B-15',
      priority: 'important',
      date: '2026-06-12',
      isScheduled: false
    }
  ]);

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
      toast.success(`Attached file: ${e.target.files[0].name}`);
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast.success('Attachment removed');
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Please enter notice title!');
      return;
    }
    if (!description.trim()) {
      toast.error('Please enter notice description!');
      return;
    }

    if (scheduleMode === 'later' && (!scheduleDate || !scheduleTime)) {
      toast.error('Please specify schedule date and time!');
      return;
    }

    const newNotice: Notice = {
      id: Date.now().toString(),
      title,
      description,
      attachmentName: attachment ? attachment.name : undefined,
      targetAudience,
      targetBatch: targetAudience === 'batch' ? targetBatch : undefined,
      targetStudents: targetAudience === 'students' ? targetStudents : undefined,
      priority,
      date: scheduleMode === 'now' ? new Date().toISOString().split('T')[0] : scheduleDate,
      scheduledTime: scheduleMode === 'later' ? scheduleTime : undefined,
      isScheduled: scheduleMode === 'later'
    };

    setNotices([newNotice, ...notices]);
    toast.success(
      scheduleMode === 'now' 
        ? 'Notice published successfully!' 
        : `Notice scheduled for ${scheduleDate} at ${scheduleTime}!`
    );

    // Reset Form fields
    setTitle('');
    setDescription('');
    setAttachment(null);
    setTargetAudience('all');
    setPriority('normal');
    setScheduleMode('now');
    setScheduleDate('');
    setScheduleTime('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteNotice = (id: string) => {
    setNotices(notices.filter(notice => notice.id !== id));
    toast.success('Notice deleted successfully!');
  };

  const getPriorityBadgeStyle = (priority: 'normal' | 'important' | 'urgent') => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-50 text-red-600 border border-red-100';
      case 'important':
        return 'bg-amber-50 text-amber-600 border border-amber-100';
      default:
        return 'bg-blue-50 text-blue-600 border border-blue-100';
    }
  };

  const getNoticeIcon = (priority: 'normal' | 'important' | 'urgent') => {
    switch (priority) {
      case 'urgent':
        return (
          <div className="p-2.5 bg-red-50 text-red-600 rounded-full border border-red-100/50 shrink-0">
            <AlertCircle className="w-5.5 h-5.5" />
          </div>
        );
      case 'important':
        return (
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-full border border-amber-100/50 shrink-0">
            <Clock className="w-5.5 h-5.5" />
          </div>
        );
      default:
        return (
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100/50 shrink-0">
            <CheckCircle2 className="w-5.5 h-5.5" />
          </div>
        );
    }
  };

  const filteredNotices = notices.filter(notice => {
    const query = searchQuery.toLowerCase();
    return (
      notice.title.toLowerCase().includes(query) ||
      notice.description.toLowerCase().includes(query) ||
      (notice.targetBatch && notice.targetBatch.toLowerCase().includes(query))
    );
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Notice Board</h1>
          <p className="text-gray-500 text-[15px] mt-1.5 font-medium">Publish and manage notices for students</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className={`flex items-center gap-2 px-5 py-3 font-bold text-sm rounded-xl transition-all shadow-xs active:scale-[0.98] ${
            showCreateForm 
              ? 'bg-gray-100 hover:bg-gray-150 text-gray-700'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {showCreateForm ? (
            <>
              <X className="w-4.5 h-4.5" />
              Hide Form
            </>
          ) : (
            <>
              <Plus className="w-4.5 h-4.5" />
              Create New Notice
            </>
          )}
        </button>
      </div>

      {/* Create New Notice Section */}
      {showCreateForm && (
        <form onSubmit={handlePublish} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
          <div className="p-6 sm:p-8 border-b border-gray-50 bg-gray-50/30">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-500" />
              Create New Notice
            </h2>
            <p className="text-gray-400 text-xs mt-1">Fill out the form below to publish or schedule an announcement.</p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Grid for Audience, Priority, Schedule (at the top) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Target Audience */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
                    <Target className="w-4.5 h-4.5 text-blue-500" />
                    Target Audience
                  </h3>
                  
                  <div className="space-y-2">
                    <div 
                      onClick={() => setTargetAudience('all')}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        targetAudience === 'all'
                          ? 'border-blue-500 bg-blue-50/20'
                          : 'border-gray-100 hover:border-gray-200 bg-gray-50/20'
                      }`}
                    >
                      <span className="text-xs font-bold text-gray-700">All Students</span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        targetAudience === 'all' ? 'border-blue-500' : 'border-gray-300'
                      }`}>
                        {targetAudience === 'all' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                      </div>
                    </div>

                    <div 
                      onClick={() => setTargetAudience('batch')}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        targetAudience === 'batch'
                          ? 'border-blue-500 bg-blue-50/20'
                          : 'border-gray-100 hover:border-gray-200 bg-gray-50/20'
                      }`}
                    >
                      <span className="text-xs font-bold text-gray-700">Selected Batch</span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        targetAudience === 'batch' ? 'border-blue-500' : 'border-gray-300'
                      }`}>
                        {targetAudience === 'batch' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                      </div>
                    </div>

                    <div 
                      onClick={() => setTargetAudience('students')}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        targetAudience === 'students'
                          ? 'border-blue-500 bg-blue-50/20'
                          : 'border-gray-100 hover:border-gray-200 bg-gray-50/20'
                      }`}
                    >
                      <span className="text-xs font-bold text-gray-700">Selected Students</span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        targetAudience === 'students' ? 'border-blue-500' : 'border-gray-300'
                      }`}>
                        {targetAudience === 'students' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conditional Inputs */}
                {(targetAudience === 'batch' || targetAudience === 'students') && (
                  <div className="pt-2 border-t border-gray-100 animate-in fade-in slide-in-from-top-1 duration-150">
                    {targetAudience === 'batch' ? (
                      <div className="relative">
                        <select
                          value={targetBatch}
                          onChange={(e) => setTargetBatch(e.target.value)}
                          className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-xs font-bold cursor-pointer"
                        >
                          <option value="JEE A-1">JEE A-1</option>
                          <option value="NEET B-15">NEET B-15</option>
                          <option value="JEE A-2">JEE A-2</option>
                          <option value="NEET B-12">NEET B-12</option>
                        </select>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={targetStudents}
                        onChange={(e) => setTargetStudents(e.target.value)}
                        placeholder="Enter student names (e.g. Aarav, Diya)"
                        className="block w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-xs font-semibold"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Priority */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4.5 h-4.5 text-amber-500" />
                    Priority Level
                  </h3>

                  <div className="space-y-2">
                    <div 
                      onClick={() => setPriority('normal')}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        priority === 'normal'
                          ? 'border-blue-500 bg-blue-50/20'
                          : 'border-gray-100 hover:border-gray-200 bg-gray-50/20'
                      }`}
                    >
                      <span className="text-xs font-bold text-blue-600 bg-blue-50/80 px-2.5 py-1 rounded-lg">Normal</span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        priority === 'normal' ? 'border-blue-500' : 'border-gray-300'
                      }`}>
                        {priority === 'normal' && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                      </div>
                    </div>

                    <div 
                      onClick={() => setPriority('important')}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        priority === 'important'
                          ? 'border-amber-550 bg-amber-50/20'
                          : 'border-gray-100 hover:border-gray-200 bg-gray-50/20'
                      }`}
                    >
                      <span className="text-xs font-bold text-amber-600 bg-amber-50/80 px-2.5 py-1 rounded-lg">Important</span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        priority === 'important' ? 'border-amber-550' : 'border-gray-300'
                      }`}>
                        {priority === 'important' && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                      </div>
                    </div>

                    <div 
                      onClick={() => setPriority('urgent')}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        priority === 'urgent'
                          ? 'border-red-500 bg-red-50/20'
                          : 'border-gray-100 hover:border-gray-200 bg-gray-50/20'
                      }`}
                    >
                      <span className="text-xs font-bold text-red-655 bg-red-50/80 px-2.5 py-1 rounded-lg">Urgent</span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        priority === 'urgent' ? 'border-red-500' : 'border-gray-300'
                      }`}>
                        {priority === 'urgent' && <div className="w-2 h-2 rounded-full bg-red-500" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Notice */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <Calendar className="w-4.5 h-4.5 text-purple-500" />
                    Schedule Notice
                  </h3>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setScheduleMode('now')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                        scheduleMode === 'now'
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                          : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Publish Now
                    </button>

                    <button
                      type="button"
                      onClick={() => setScheduleMode('later')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                        scheduleMode === 'later'
                          ? 'bg-purple-600 border-purple-600 text-white shadow-xs'
                          : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Schedule Later
                    </button>
                  </div>

                  {scheduleMode === 'later' && (
                    <div className="space-y-2 pt-1 animate-in fade-in slide-in-from-top-1 duration-150">
                      <input
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold outline-none focus:ring-2 focus:ring-purple-400"
                        required
                      />
                      <input
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold outline-none focus:ring-2 focus:ring-purple-400"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Title field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter notice title"
                className="block w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-medium shadow-xs"
                required
              />
            </div>

            {/* Description field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter notice description"
                rows={4}
                className="block w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-medium shadow-xs resize-y"
                required
              />
            </div>

            {/* Attachment field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Attachment</label>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange} 
              />
              {attachment ? (
                <div className="flex items-center justify-between p-3.5 bg-blue-50/50 border border-dashed border-blue-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-semibold text-gray-700">{attachment.name}</span>
                    <span className="text-xs text-gray-400">({(attachment.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={handleRemoveAttachment}
                    className="p-1 hover:bg-red-50 text-red-500 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>
              ) : (
                <div 
                  onClick={handleFileUploadClick}
                  className="border-2 border-dashed border-gray-200 hover:border-blue-500 rounded-xl py-6 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-blue-500 cursor-pointer transition-all bg-gray-50/30 hover:bg-blue-50/10 group"
                >
                  <UploadCloud className="w-8 h-8 text-gray-450 group-hover:text-blue-550 transition-colors" />
                  <span className="text-sm font-semibold">Click to upload file</span>
                </div>
              )}
            </div>

            {/* Submit Button at the bottom */}
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                type="submit"
                className={`px-8 py-3.5 text-white font-extrabold text-sm rounded-xl transition-all shadow-sm active:scale-[0.98] ${
                  scheduleMode === 'later' 
                    ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-100' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'
                }`}
              >
                {scheduleMode === 'later' ? 'Schedule Notice' : 'Publish Notice'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Published Notices Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Bell className="w-5.5 h-5.5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Published Notices</h2>
              <p className="text-gray-400 text-xs mt-0.5 font-medium">View, search and manage recently published notices</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-t border-gray-50 pt-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search by title, description or batch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm placeholder-gray-400 shadow-xs"
            />
          </div>
        </div>

        {/* Notices Feed List */}
        <div className="space-y-4">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <div 
                key={notice.id}
                className="relative rounded-2xl border border-gray-100/80 hover:border-blue-100/50 bg-white shadow-xs overflow-hidden transition-all p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-start"
              >
                <div className="flex gap-3 sm:gap-4 items-start">
                  {getNoticeIcon(notice.priority)}
                  
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 pr-8 sm:pr-0">
                      <h4 className="font-extrabold text-gray-800 text-[15px] break-words">{notice.title}</h4>
                      
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-md uppercase tracking-wider ${getPriorityBadgeStyle(notice.priority)}`}>
                          {notice.priority}
                        </span>

                        <span className="px-2 py-0.5 bg-gray-100 border border-gray-200/50 text-[9px] font-bold text-gray-500 rounded-md">
                          {notice.targetAudience === 'all' 
                            ? 'All Students' 
                            : notice.targetAudience === 'batch' 
                              ? `Batch: ${notice.targetBatch}` 
                              : 'Selected Students'
                        }
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm font-medium leading-relaxed max-w-3xl break-words">
                    {notice.description}
                  </p>

                  {notice.attachmentName && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-650 hover:bg-gray-100 transition-colors max-w-full overflow-hidden">
                      <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="truncate">{notice.attachmentName}</span>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-405 font-semibold pt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>{new Date(notice.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    {notice.isScheduled && notice.scheduledTime && (
                      <div className="flex items-center gap-1 text-purple-650 font-bold bg-purple-50/50 border border-purple-100/30 px-2 py-0.5 rounded-md">
                        <Clock className="w-3 h-3 text-purple-500" />
                        <span>Scheduled: {notice.scheduledTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={() => handleDeleteNotice(notice.id)}
                className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 p-2 hover:bg-red-50 text-gray-455 hover:text-red-655 rounded-xl transition-all active:scale-95 cursor-pointer shrink-0"
                title="Delete Notice"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50/20 border border-dashed border-gray-100 rounded-2xl">
            <Bell className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-450 font-semibold text-sm">No notices found match your criteria</p>
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default TeacherNotices;
