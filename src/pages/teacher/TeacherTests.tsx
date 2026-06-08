import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Clock, 
  PlusCircle, 
  Upload, 
  BookOpen, 
  Trash2, 
  Sparkles,
  ClipboardList,
  ChevronUp
} from 'lucide-react';
import toast from 'react-hot-toast';
import AddQuestionsModal from '../../components/AddQuestionsModal';

interface Test {
  id: number;
  name: string;
  subject: string;
  batch: string;
  date: string;
  duration: string;
  avgScore: number;
}

const TeacherTests: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [testName, setTestName] = useState('');
  const subject = 'Physics';
  const [batch, setBatch] = useState('JEE A-1');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'pdf' | 'manual' | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAddQuestionsModalOpen, setIsAddQuestionsModalOpen] = useState(false);

  // Mock list of recent tests
  const [tests, setTests] = useState<Test[]>([
    { id: 1, name: "Thermodynamics Mock Test", subject: "Physics", batch: "JEE A-1", date: "2026-06-08", duration: "3 hours", avgScore: 78 },
    { id: 2, name: "Organic Chemistry Test", subject: "Chemistry", batch: "NEET B-15", date: "2026-06-10", duration: "2 hours", avgScore: 82 },
    { id: 3, name: "Rotational Motion Quiz", subject: "Physics", batch: "JEE A-2", date: "2026-06-12", duration: "1 hour", avgScore: 74 }
  ]);

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName.trim()) {
      toast.error("Please enter a test name!");
      return;
    }
    if (!date) {
      toast.error("Please pick a test date!");
      return;
    }
    if (!duration.trim()) {
      toast.error("Please enter a duration!");
      return;
    }
    if (!uploadMethod) {
      toast.error("Please choose a question paper upload method!");
      return;
    }
    if (uploadMethod === 'pdf' && !selectedFile) {
      toast.error("Please upload a question paper PDF!");
      return;
    }

    const newTest: Test = {
      id: Date.now(),
      name: testName,
      subject,
      batch,
      date,
      duration,
      avgScore: 0 // newly scheduled test
    };

    setTests([newTest, ...tests]);
    
    if (uploadMethod === 'manual') {
      toast.success(`Test "${testName}" scheduled! Now let's add questions manually.`);
      setIsAddQuestionsModalOpen(true);
    } else {
      toast.success(`Test "${testName}" has been successfully scheduled!`);
    }
    
    // Reset form
    setTestName('');
    setDate('');
    setDuration('');
    setUploadMethod(null);
    setSelectedFile(null);
    setShowCreateForm(false);
  };

  const handleDelete = (id: number) => {
    setTests(tests.filter(t => t.id !== id));
    toast.success("Test deleted successfully!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast.success(`File "${e.target.files[0].name}" attached successfully!`);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Tests & Exams</h1>
          <p className="text-gray-500 text-[15px] mt-1.5 font-medium">Create and manage tests for your batches</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className={`flex items-center gap-2 px-5 py-3 font-bold text-sm rounded-xl transition-all shadow-xs active:scale-[0.98] ${
            showCreateForm 
              ? 'bg-gray-150 text-gray-700 hover:bg-gray-250 bg-gray-100 hover:bg-gray-200'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {showCreateForm ? (
            <>
              <ChevronUp className="w-4.5 h-4.5" />
              Close Creator
            </>
          ) : (
            <>
              <PlusCircle className="w-4.5 h-4.5" />
              Create New Test
            </>
          )}
        </button>
      </div>

      {/* Expandable Create Test Section */}
      {showCreateForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
          <div className="p-6 sm:px-8 border-b border-gray-50">
            <h2 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              Create Assessment Paper
            </h2>
            <p className="text-gray-400 text-xs">Fill in details and upload the question sheet to schedule this test.</p>
          </div>

          <form onSubmit={handleCreateTest} className="p-6 sm:px-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Test Name */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Test Name</label>
                <div className="relative">
                  <FileText className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={testName}
                    onChange={(e) => setTestName(e.target.value)}
                    placeholder="Enter test name"
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold shadow-xs"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Subject</label>
                <div className="relative">
                  <BookOpen className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={subject}
                    disabled
                    className="block w-full pl-11 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 text-sm font-semibold shadow-xs cursor-not-allowed outline-none"
                  />
                </div>
              </div>

              {/* Batch */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Target Batch</label>
                <select
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold shadow-xs cursor-pointer"
                >
                  <option value="JEE A-1">JEE A-1</option>
                  <option value="NEET B-15">NEET B-15</option>
                  <option value="JEE A-2">JEE A-2</option>
                  <option value="NEET B-12">NEET B-12</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Test Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold shadow-xs cursor-pointer"
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Duration</label>
                <div className="relative">
                  <Clock className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 3 hours"
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Question Paper Upload Box */}
            <div className="space-y-3">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Upload Question Paper</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Method 1: Upload PDF */}
                <div
                  onClick={() => setUploadMethod('pdf')}
                  className={`border-2 border-dashed p-6 rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-center text-center ${
                    uploadMethod === 'pdf'
                      ? 'border-blue-500 bg-blue-50/20'
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50/20'
                  }`}
                >
                  <Upload className={`w-8 h-8 mb-2 ${uploadMethod === 'pdf' ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className="font-bold text-sm text-gray-700">Upload PDF</span>
                  <span className="text-[11px] text-gray-400 mt-1">Select and attach exam PDF file</span>
                </div>

                {/* Method 2: Manual Questions */}
                <div
                  onClick={() => {
                    setUploadMethod('manual');
                    setSelectedFile(null);
                  }}
                  className={`border-2 border-dashed p-6 rounded-2xl cursor-pointer transition-all flex flex-col items-center justify-center text-center ${
                    uploadMethod === 'manual'
                      ? 'border-blue-500 bg-blue-50/20'
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50/20'
                  }`}
                >
                  <PlusCircle className={`w-8 h-8 mb-2 ${uploadMethod === 'manual' ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className="font-bold text-sm text-gray-700">Add Questions Manually</span>
                  <span className="text-[11px] text-gray-400 mt-1">Key in questions step-by-step</span>
                </div>
              </div>
            </div>

            {/* File Input for PDF */}
            {uploadMethod === 'pdf' && (
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/30 flex flex-col items-center justify-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="pdf-upload-input"
                />
                <label
                  htmlFor="pdf-upload-input"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition-all"
                >
                  Choose PDF Document
                </label>
                {selectedFile && (
                  <span className="text-xs font-bold text-gray-600 mt-2.5">
                    Selected File: {selectedFile.name}
                  </span>
                )}
              </div>
            )}

            {/* Manual placeholder */}
            {uploadMethod === 'manual' && (
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/30 text-center">
                <p className="text-xs font-bold text-blue-700">Manual Questions Creator Activated</p>
              </div>
            )}

            {/* Submit button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-xs active:scale-[0.98]"
              >
                Schedule Test
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Recent Tests list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Recent Tests</h2>
              <p className="text-gray-400 text-xs mt-0.5 font-medium">List of recently conducted or upcoming exams</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {tests.map((test) => (
            <div 
              key={test.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-gray-50/30 hover:bg-blue-50/10 transition-all border border-gray-100 hover:border-blue-100/55 hover:shadow-xs group"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{test.name}</h4>
                  <span className="px-2.5 py-0.5 bg-blue-50 border border-blue-100/60 text-[10px] font-bold text-blue-600 rounded-full">
                    {test.subject}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{new Date(test.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span>Batch: <strong className="text-gray-700">{test.batch}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>{test.duration}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-4 sm:mt-0 justify-between sm:justify-start">
                <div className="text-right">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Average Score</span>
                  <p className="text-xl font-bold text-blue-600 mt-0.5">
                    {test.avgScore > 0 ? `${test.avgScore}%` : 'N/A'}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(test.id)}
                  className="p-2 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100 active:scale-95 shadow-xs"
                  title="Delete Test"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddQuestionsModal
        isOpen={isAddQuestionsModalOpen}
        onClose={() => setIsAddQuestionsModalOpen(false)}
        onSave={(questions) => {
          toast.success(`Successfully saved ${questions.length} questions manually!`);
        }}
      />
    </div>
  );
};

export default TeacherTests;
