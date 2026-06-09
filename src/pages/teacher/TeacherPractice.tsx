import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  BookOpen, 
  Users, 
  Sparkles,
  ChevronUp,
  ChevronDown,
  Layers,
  CheckCircle2,
  Calendar,
  HelpCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import AddQuestionsModal from '../../components/AddQuestionsModal';

interface Question {
  id: string;
  type: 'mcq' | 'subjective';
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  marks: string;
}

interface PracticeSet {
  id: number;
  name: string;
  topic: string;
  batch: string;
  date: string;
  questions: Question[];
}

const TeacherPractice: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(true);
  const [isAddQuestionsOpen, setIsAddQuestionsOpen] = useState(false);
  
  // Form Details
  const [setName, setSetName] = useState('');
  const [topic, setTopic] = useState('');
  const [batch, setBatch] = useState('All Batches');
  
  // Temporal holder before saving questions
  const [tempSetInfo, setTempSetInfo] = useState<{ name: string; topic: string; batch: string } | null>(null);

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBatch, setFilterBatch] = useState('All');

  // Expanded practice set IDs
  const [expandedSetIds, setExpandedSetIds] = useState<number[]>([]);

  // Practice Sets state
  const [practiceSets, setPracticeSets] = useState<PracticeSet[]>([
    {
      id: 1,
      name: "Isothermal Process Basics",
      topic: "Thermodynamics",
      batch: "JEE A-1",
      date: "2026-06-09",
      questions: [
        {
          id: "q1",
          type: "mcq",
          questionText: "What is the work done in an isothermal expansion of an ideal gas?",
          optionA: "W = nRT ln(V2/V1)",
          optionB: "W = zero",
          optionC: "W = P(V2 - V1)",
          optionD: "W = nCv(T2 - T1)",
          correctAnswer: "Option A",
          marks: "4"
        }
      ]
    },
    {
      id: 2,
      name: "Projectile Kinematics Practice",
      topic: "Kinematics",
      batch: "All Batches",
      date: "2026-06-08",
      questions: [
        {
          id: "q2",
          type: "mcq",
          questionText: "Which of the following remains constant in a projectile motion under gravity?",
          optionA: "Vertical component of velocity",
          optionB: "Horizontal component of velocity",
          optionC: "Kinetic energy",
          optionD: "Height attained",
          correctAnswer: "Option B",
          marks: "4"
        }
      ]
    }
  ]);

  const handleStartCreation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!setName.trim()) {
      toast.error("Please enter a practice set name!");
      return;
    }
    if (!topic.trim()) {
      toast.error("Please enter a topic name!");
      return;
    }

    // Save info temporarily and launch modal
    setTempSetInfo({ name: setName, topic, batch });
    setIsAddQuestionsOpen(true);
  };

  const handleSaveQuestions = (questionsList: Question[]) => {
    if (!tempSetInfo) return;
    
    if (questionsList.length === 0) {
      toast.error("No questions were added!");
      return;
    }

    const newSet: PracticeSet = {
      id: Date.now(),
      name: tempSetInfo.name,
      topic: tempSetInfo.topic,
      batch: tempSetInfo.batch,
      date: new Date().toISOString().split('T')[0],
      questions: questionsList
    };

    setPracticeSets([newSet, ...practiceSets]);
    toast.success(`Practice set "${newSet.name}" with ${questionsList.length} questions created successfully!`);

    // Reset Form
    setSetName('');
    setTopic('');
    setTempSetInfo(null);
    setShowAddForm(false);
  };

  const handleDelete = (id: number) => {
    setPracticeSets(practiceSets.filter(s => s.id !== id));
    toast.success("Practice set deleted successfully!");
  };

  const toggleExpandSet = (id: number) => {
    if (expandedSetIds.includes(id)) {
      setExpandedSetIds(expandedSetIds.filter(x => x !== id));
    } else {
      setExpandedSetIds([...expandedSetIds, id]);
    }
  };

  const filteredSets = practiceSets.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = filterBatch === 'All' || s.batch === filterBatch;
    return matchesSearch && matchesBatch;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Practice Worksheets</h1>
          <p className="text-gray-500 text-[15px] mt-1.5 font-medium">Create multi-question practice sets for student revision and practice</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`flex items-center gap-2 px-5 py-3 font-bold text-sm rounded-xl transition-all shadow-xs active:scale-[0.98] ${
            showAddForm 
              ? 'bg-gray-150 hover:bg-gray-200 text-gray-700'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {showAddForm ? (
            <>
              <ChevronUp className="w-4.5 h-4.5" />
              Hide Creator
            </>
          ) : (
            <>
              <Plus className="w-4.5 h-4.5" />
              Create Practice Set
            </>
          )}
        </button>
      </div>

      {/* Form: Start Creation */}
      {showAddForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
          <div className="p-6 sm:p-8 border-b border-gray-50 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              Create New Practice Set
            </h2>
            <p className="text-gray-400 text-xs">Specify name, topic, and batch. You will configure questions in the manual builder next.</p>
          </div>

          <form onSubmit={handleStartCreation} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Set Name */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Practice Set Name</label>
                <div className="relative">
                  <Layers className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={setName}
                    onChange={(e) => setSetName(e.target.value)}
                    placeholder="e.g., Optics Revision Set 1"
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold shadow-xs"
                    required
                  />
                </div>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Topic / Chapter</label>
                <div className="relative">
                  <BookOpen className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Ray Optics"
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold shadow-xs"
                    required
                  />
                </div>
              </div>

              {/* Target Batch */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Target Batch</label>
                <div className="relative">
                  <Users className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-3.5" />
                  <select
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold shadow-xs cursor-pointer appearance-none"
                  >
                    <option value="All Batches">All Batches (All Students)</option>
                    <option value="JEE A-1">JEE A-1</option>
                    <option value="NEET B-15">NEET B-15</option>
                    <option value="JEE A-2">JEE A-2</option>
                    <option value="NEET B-12">NEET B-12</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-xs active:scale-[0.98] flex items-center gap-2"
              >
                Configure Questions
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Practice Sets List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <HelpCircle className="w-5.5 h-5.5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Active Practice Sets</h2>
              <p className="text-gray-400 text-xs mt-0.5 font-medium">Conduct student revision and practice sets</p>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-t border-gray-50 pt-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search by set name or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm placeholder-gray-400 shadow-xs"
            />
          </div>

          <div className="w-full md:w-56 shrink-0">
            <select
              value={filterBatch}
              onChange={(e) => setFilterBatch(e.target.value)}
              className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-xs font-bold cursor-pointer"
            >
              <option value="All">All Batches</option>
              <option value="All Batches">All Batches (All Students)</option>
              <option value="JEE A-1">JEE A-1</option>
              <option value="NEET B-15">NEET B-15</option>
              <option value="JEE A-2">JEE A-2</option>
              <option value="NEET B-12">NEET B-12</option>
            </select>
          </div>
        </div>

        {/* Practice sets feed list */}
        <div className="space-y-4">
          {filteredSets.length > 0 ? (
            filteredSets.map((set) => {
              const isExpanded = expandedSetIds.includes(set.id);
              return (
                <div 
                  key={set.id}
                  className="rounded-2xl border border-gray-100/80 hover:border-blue-100/50 bg-gray-50/20 shadow-xs overflow-hidden transition-all"
                >
                  {/* Top card banner */}
                  <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-extrabold text-gray-800 text-[15px]">{set.name}</h4>
                        <span className="px-2 py-0.5 bg-blue-50 border border-blue-100/40 text-[9px] font-bold text-blue-600 rounded-md">
                          {set.topic}
                        </span>
                        <span className="px-2 py-0.5 bg-purple-50 border border-purple-100/30 text-[9px] font-bold text-purple-600 rounded-md">
                          Batch: {set.batch}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-400 font-semibold">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(set.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>{set.questions.length} Questions</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleExpandSet(set.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-xs font-bold text-gray-600 rounded-lg transition-all border border-gray-100"
                      >
                        {isExpanded ? (
                          <>
                            Collapse Questions
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            View Questions ({set.questions.length})
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(set.id)}
                        className="p-2 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100 active:scale-95 shadow-xs"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Questions list */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 p-5 bg-gray-50/10 space-y-4">
                      {set.questions.map((q, qIdx) => (
                        <div key={q.id} className="p-4 bg-white border border-gray-100 rounded-xl space-y-3 shadow-2xs">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-400">Question {qIdx + 1}</span>
                            <span className="text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded">
                              {q.marks} Marks
                            </span>
                          </div>
                          <p className="text-gray-800 text-sm font-semibold">{q.questionText}</p>
                          
                          {/* MCQ Options */}
                          {/* MCQ Options */}
                          {q.type === 'mcq' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl pt-1">
                              {['Option A', 'Option B', 'Option C', 'Option D'].map((label) => {
                                const optVal = label === 'Option A' ? q.optionA : label === 'Option B' ? q.optionB : label === 'Option C' ? q.optionC : q.optionD;
                                const isCorrect = q.correctAnswer === label;
                                return (
                                  <div 
                                    key={label}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-xs font-medium ${
                                      isCorrect 
                                        ? 'bg-green-50 text-green-700 border-green-200' 
                                        : 'bg-white text-gray-600 border-gray-100'
                                    }`}
                                  >
                                    <span className={`h-5 w-5 rounded-md flex items-center justify-center font-bold text-[9px] ${
                                      isCorrect 
                                        ? 'bg-green-200 text-green-800' 
                                        : 'bg-gray-100 text-gray-500'
                                    }`}>
                                      {label.split(' ')[1]}
                                    </span>
                                    <span>{optVal}</span>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            /* Subjective Answer fallback */
                            <div className="p-3 bg-green-50/30 border border-green-100/50 rounded-lg flex items-start gap-2 max-w-2xl">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 mt-0.5" />
                              <div className="text-xs">
                                <span className="font-bold text-green-700 block">Correct Solution</span>
                                <p className="text-green-800 mt-0.5 font-medium">{q.correctAnswer}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-gray-400 text-sm font-medium">
              No practice sets assigned. Start by creating a set above!
            </div>
          )}
        </div>
      </div>

      {/* Manual Questions configuration Modal */}
      <AddQuestionsModal
        isOpen={isAddQuestionsOpen}
        onClose={() => {
          setIsAddQuestionsOpen(false);
          setTempSetInfo(null);
        }}
        onSave={handleSaveQuestions}
      />
    </div>
  );
};

export default TeacherPractice;
