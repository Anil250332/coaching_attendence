import React, { useState } from 'react';
import { Plus, Trash2, Layers, Book, FileText, Upload, Eye, Download, X, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Topic {
  id: string;
  name: string;
  completed: boolean;
  completedDate: string;
  notes: string;
}

interface Chapter {
  id: string;
  name: string;
  topics: Topic[];
}

interface Unit {
  id: string;
  name: string;
  chapters: Chapter[];
}

interface SubjectSyllabus {
  subject: string;
  type: 'pdf' | 'manual';
  pdfName?: string;
  units?: Unit[];
}

interface BatchCardData {
  id: string;
  name: string;
  course: string;
  subjects: SubjectSyllabus[];
}

const initialBatchesData: BatchCardData[] = [
  {
    id: 'IIT-JEE-Batch-A-12',
    name: 'IIT-JEE Batch A-12',
    course: 'IIT-JEE',
    subjects: [
      {
        subject: 'Physics',
        type: 'manual',
        units: [
          {
            id: 'u1',
            name: 'Unit 1: Mechanics & Kinematics',
            chapters: [
              {
                id: 'c1',
                name: 'Kinematics in 1D & 2D',
                topics: [
                  { id: 't1_1', name: 'Motion in a Straight Line', completed: true, completedDate: '2026-06-10', notes: 'Derivations of equations of motion covered.' },
                  { id: 't1_2', name: 'Relative Velocity in 1D', completed: true, completedDate: '2026-06-11', notes: 'Solved 10 conceptual problems.' },
                  { id: 't1_3', name: 'Projectile Motion', completed: false, completedDate: '', notes: '' }
                ]
              },
              {
                id: 'c2',
                name: 'Laws of Motion',
                topics: [
                  { id: 't2_1', name: 'Newton\'s First & Second Law', completed: false, completedDate: '', notes: '' },
                  { id: 't2_2', name: 'Friction and applications', completed: false, completedDate: '', notes: '' }
                ]
              }
            ]
          },
          {
            id: 'u2',
            name: 'Unit 2: Electrodynamics',
            chapters: [
              {
                id: 'c3',
                name: 'Electrostatics',
                topics: [
                  { id: 't3_1', name: 'Coulomb\'s Law & Electric Field', completed: false, completedDate: '', notes: '' },
                  { id: 't3_2', name: 'Gauss Theorem & Flux', completed: false, completedDate: '', notes: '' }
                ]
              }
            ]
          }
        ]
      },
      {
        subject: 'Chemistry',
        type: 'pdf',
        pdfName: 'JEE_Advanced_Chemistry_Syllabus.pdf'
      },
      {
        subject: 'Mathematics',
        type: 'pdf',
        pdfName: 'Mathematics_Calculus_Syllabus.pdf'
      }
    ]
  },
  {
    id: 'NEET-Batch-B-15',
    name: 'NEET Batch B-15',
    course: 'NEET',
    subjects: [
      {
        subject: 'Biology',
        type: 'manual',
        units: [
          {
            id: 'u3',
            name: 'Unit 1: Diversity in Living World',
            chapters: [
              {
                id: 'c4',
                name: 'The Living World',
                topics: [
                  { id: 't4_1', name: 'Biodiversity & Taxonomy', completed: true, completedDate: '2026-06-05', notes: 'Introduced basic classification rules.' },
                  { id: 't4_2', name: 'Taxonomical Aids', completed: false, completedDate: '', notes: '' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

const SyllabusManager: React.FC = () => {
  const [batchesData, setBatchesData] = useState<BatchCardData[]>(() => {
    const saved = localStorage.getItem('coachmaster_syllabus');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return initialBatchesData;
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState('IIT-JEE-Batch-A-12');
  const [selectedSubject, setSelectedSubject] = useState('Physics');
  const [syllabusType, setSyllabusType] = useState<'pdf' | 'manual'>('pdf');
  const [uploadedFileName, setUploadedFileName] = useState('');
  
  // Temp lists for modal
  const [manualUnits, setManualUnits] = useState<Unit[]>([]);
  const [currentUnitName, setCurrentUnitName] = useState('');
  const [currentChapterName, setCurrentChapterName] = useState('');
  const [currentTopicsInput, setCurrentTopicsInput] = useState('');

  // Selected View Details states
  const [viewingSyllabus, setViewingSyllabus] = useState<{ batchName: string; subject: string; data: SubjectSyllabus } | null>(null);

  const batchesOptions = [
    { id: 'IIT-JEE-Batch-A-12', name: 'IIT-JEE Batch A-12' },
    { id: 'NEET-Batch-B-15', name: 'NEET Batch B-15' },
    { id: 'SSC-Batch-C-08', name: 'SSC Batch C-08' },
    { id: 'Banking-Batch-D-21', name: 'Banking Batch D-21' }
  ];

  const subjectsOptions = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'General Studies'];

  const saveToLocalStorage = (data: BatchCardData[]) => {
    setBatchesData(data);
    localStorage.setItem('coachmaster_syllabus', JSON.stringify(data));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleAddUnitToTempList = () => {
    if (!currentUnitName.trim()) {
      toast.error('Please enter a Unit Name.');
      return;
    }
    if (!currentChapterName.trim()) {
      toast.error('Please enter at least one Chapter Name inside the unit.');
      return;
    }
    if (!currentTopicsInput.trim()) {
      toast.error('Please enter topics for the chapter.');
      return;
    }

    const topicsList: Topic[] = currentTopicsInput
      .split(/[,\n]/)
      .map(t => t.trim())
      .filter(t => t.length > 0)
      .map((tName, idx) => ({
        id: `t_temp_${Date.now()}_${idx}`,
        name: tName,
        completed: false,
        completedDate: '',
        notes: ''
      }));

    const newChapter: Chapter = {
      id: `c_temp_${Date.now()}`,
      name: currentChapterName.trim(),
      topics: topicsList
    };

    const newUnit: Unit = {
      id: `u_temp_${Date.now()}`,
      name: currentUnitName.trim(),
      chapters: [newChapter]
    };

    setManualUnits(prev => [...prev, newUnit]);
    
    // Clear only inputs except Unit Name to make it easy to add more chapters to same unit if needed
    setCurrentChapterName('');
    setCurrentTopicsInput('');
    toast.success('Unit configured and added to list!');
  };

  const handleRemoveTempUnit = (index: number) => {
    setManualUnits(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleAddSyllabusSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newSubjectSyllabus: SubjectSyllabus;

    if (syllabusType === 'pdf') {
      if (!uploadedFileName) {
        toast.error('Please upload a PDF file first.');
        return;
      }
      newSubjectSyllabus = {
        subject: selectedSubject,
        type: 'pdf',
        pdfName: uploadedFileName
      };
    } else {
      if (manualUnits.length === 0) {
        toast.error('Please configure and add at least one unit.');
        return;
      }
      newSubjectSyllabus = {
        subject: selectedSubject,
        type: 'manual',
        units: manualUnits
      };
    }

    const updatedData = batchesData.map(b => {
      if (b.id === selectedBatchId) {
        const filteredSubjects = b.subjects.filter(s => s.subject !== selectedSubject);
        return {
          ...b,
          subjects: [...filteredSubjects, newSubjectSyllabus]
        };
      }
      return b;
    });

    // If batch doesn't exist, create it
    const batchExists = batchesData.some(b => b.id === selectedBatchId);
    let finalData = updatedData;
    if (!batchExists) {
      const batchName = batchesOptions.find(opt => opt.id === selectedBatchId)?.name || selectedBatchId;
      finalData = [
        ...batchesData,
        {
          id: selectedBatchId,
          name: batchName,
          course: selectedBatchId.split('-')[0],
          subjects: [newSubjectSyllabus]
        }
      ];
    }

    saveToLocalStorage(finalData);
    toast.success(`Syllabus configured for ${selectedSubject}!`);
    setIsModalOpen(false);
    
    // Reset form states
    setUploadedFileName('');
    setManualUnits([]);
    setCurrentUnitName('');
    setCurrentChapterName('');
    setCurrentTopicsInput('');
  };

  const handleDeleteSubjectSyllabus = (batchId: string, subjectName: string) => {
    if (!window.confirm(`Are you sure you want to remove the syllabus for ${subjectName}?`)) return;
    const finalData = batchesData.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          subjects: b.subjects.filter(s => s.subject !== subjectName)
        };
      }
      return b;
    });
    saveToLocalStorage(finalData);
    toast.success(`${subjectName} syllabus removed.`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827]">Syllabus Manager</h1>
          <p className="text-[15px] text-gray-500 font-medium">Configure, view, and track course syllabus by batch</p>
        </div>
        <button
          onClick={() => {
            setManualUnits([]);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Syllabus
        </button>
      </div>

      {/* Main Grid View of Batches */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batchesData.map((batch) => (
          <div key={batch.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-[16px]">{batch.name}</h3>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{batch.course} Course</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Configured Subjects ({batch.subjects.length})</h4>
                {batch.subjects.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No syllabus uploaded yet.</p>
                ) : (
                  <div className="space-y-2.5">
                    {batch.subjects.map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-50/50 border border-gray-100/50 rounded-xl p-3 text-xs font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <Book className="w-4 h-4 text-blue-500 shrink-0" />
                          <div>
                            <span className="text-[13px] text-gray-800">{s.subject}</span>
                            <div className="text-[10px] text-gray-400 font-medium">
                              {s.type === 'pdf' ? `PDF: ${s.pdfName}` : `${s.units?.length || 0} units configured`}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setViewingSyllabus({ batchName: batch.name, subject: s.subject, data: s })}
                            className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                            title="View Syllabus"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSubjectSyllabus(batch.id, s.subject)}
                            className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Syllabus Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-gray-100 shadow-xl overflow-hidden my-8 animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
              <h3 className="font-extrabold text-[17px] text-gray-900">Upload or Configure Syllabus</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors font-bold text-lg p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSyllabusSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-bold text-gray-500">Select Batch</label>
                  <select
                    value={selectedBatchId}
                    onChange={(e) => setSelectedBatchId(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[13px] text-gray-900 font-semibold focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
                  >
                    {batchesOptions.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-bold text-gray-500">Select Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[13px] text-gray-900 font-semibold focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all cursor-pointer"
                  >
                    {subjectsOptions.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Format type selection */}
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-gray-500">Syllabus Format</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 font-semibold text-xs text-gray-700 cursor-pointer bg-gray-50/50 hover:bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 flex-1 justify-center">
                    <input
                      type="radio"
                      name="syllabusFormat"
                      checked={syllabusType === 'pdf'}
                      onChange={() => setSyllabusType('pdf')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Upload PDF File</span>
                  </label>
                  <label className="flex items-center gap-2 font-semibold text-xs text-gray-700 cursor-pointer bg-gray-50/50 hover:bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 flex-1 justify-center">
                    <input
                      type="radio"
                      name="syllabusFormat"
                      checked={syllabusType === 'manual'}
                      onChange={() => setSyllabusType('manual')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Type Manually (Units)</span>
                  </label>
                </div>
              </div>

              {/* Dynamic Input depending on Selection */}
              {syllabusType === 'pdf' ? (
                <div className="space-y-1.5 border-2 border-dashed border-gray-200 rounded-xl p-5 text-center flex flex-col items-center justify-center bg-gray-50/30">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <label className="bg-white hover:bg-gray-50 text-blue-600 border border-gray-200 px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer inline-block">
                    Choose PDF file
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                  {uploadedFileName ? (
                    <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{uploadedFileName}</span>
                    </div>
                  ) : (
                    <p className="text-[11px] text-gray-400 mt-1">Accepts PDF format only</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4 border border-gray-100 rounded-xl p-4.5 bg-gray-50/20">
                  <h4 className="text-[13px] font-bold text-gray-800 flex items-center gap-2">
                    <PlusCircle className="w-4.5 h-4.5 text-blue-600" />
                    Add Unit & Content
                  </h4>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Unit Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Unit 1: Electrostatics"
                        value={currentUnitName}
                        onChange={(e) => setCurrentUnitName(e.target.value)}
                        className="w-full bg-white border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-gray-900 font-medium focus:outline-hidden focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Chapter Name inside Unit</label>
                      <input
                        type="text"
                        placeholder="e.g. Coulomb's Law and Fields"
                        value={currentChapterName}
                        onChange={(e) => setCurrentChapterName(e.target.value)}
                        className="w-full bg-white border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-gray-900 font-medium focus:outline-hidden focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Topics (Comma separated)</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Coulomb's Law, Electric Fields, Dipole moment"
                        value={currentTopicsInput}
                        onChange={(e) => setCurrentTopicsInput(e.target.value)}
                        className="w-full bg-white border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-gray-900 font-medium focus:outline-hidden focus:border-blue-500 resize-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddUnitToTempList}
                      className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Unit Config
                    </button>
                  </div>

                  {/* Temp configured units list */}
                  {manualUnits.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                      <span className="text-[11px] font-bold text-gray-400 uppercase">Configured Units Queue ({manualUnits.length})</span>
                      <div className="space-y-2">
                        {manualUnits.map((u, i) => (
                          <div key={i} className="flex justify-between items-center bg-white border border-gray-100 p-2.5 rounded-lg text-xs font-semibold text-gray-700">
                            <div>
                              <span className="text-gray-900">{u.name}</span>
                              <p className="text-[10px] text-gray-400 font-medium">Chapter: {u.chapters[0]?.name || ''}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveTempUnit(i)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl text-xs sm:text-[13px] font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-xs sm:text-[13px] font-bold transition-all shadow-md shadow-blue-100"
                >
                  Save Syllabus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewingSyllabus && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-gray-100 shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="font-extrabold text-[16px] text-gray-900">{viewingSyllabus.subject} Syllabus Details</h3>
                <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">{viewingSyllabus.batchName}</p>
              </div>
              <button
                onClick={() => setViewingSyllabus(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors font-bold text-lg p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
              {viewingSyllabus.data.type === 'pdf' ? (
                <div className="flex flex-col items-center justify-center py-8 border border-gray-100 rounded-xl bg-gray-50/30">
                  <FileText className="w-14 h-14 text-red-500 mb-3" />
                  <p className="font-bold text-sm text-gray-800">{viewingSyllabus.data.pdfName}</p>
                  <p className="text-xs text-gray-400 mt-1 mb-5">Syllabus uploaded in PDF document format</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => toast.success('Mock File Downloading...')}
                      className="flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 shadow-xs transition-colors"
                    >
                      <Download className="w-4 h-4" /> Download PDF
                    </button>
                    <button
                      onClick={() => toast.success('Displaying PDF Viewer Mode...')}
                      className="flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl shadow-xs transition-colors"
                    >
                      <Eye className="w-4 h-4" /> View Fullscreen
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {(viewingSyllabus.data.units || []).map((unit) => (
                    <div key={unit.id} className="border border-gray-100 rounded-xl p-4.5 bg-gray-50/20">
                      <h4 className="font-bold text-gray-800 text-[14px] mb-3.5 border-b border-gray-100 pb-2">
                        {unit.name}
                      </h4>
                      <div className="space-y-4">
                        {unit.chapters.map((ch) => (
                          <div key={ch.id} className="pl-2.5">
                            <span className="font-bold text-xs text-blue-600 block mb-2">Chapter: {ch.name}</span>
                            <div className="space-y-2 pl-2 border-l border-gray-200">
                              {ch.topics.map(t => (
                                <div key={t.id} className="flex items-center justify-between text-xs font-medium text-gray-600 bg-white p-2 rounded-lg border border-gray-100">
                                  <span>{t.name}</span>
                                  {t.completed ? (
                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full">Completed</span>
                                  ) : (
                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full">Pending</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setViewingSyllabus(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2.5 rounded-xl text-xs font-bold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyllabusManager;
