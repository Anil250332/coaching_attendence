import React, { useState } from 'react';
import { 
  HelpCircle, 
  Plus, 
  Search, 
  Trash2, 
  BookOpen, 
  Users, 
  Layers, 
  Sparkles,
  ChevronUp,
  Send
} from 'lucide-react';
import toast from 'react-hot-toast';

interface QuestionItem {
  id: number;
  chapter: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

const TeacherPractice: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState(false);

  // States for new question creation
  const [chapter, setChapter] = useState('Thermodynamics');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<'A' | 'B' | 'C' | 'D'>('A');

  // States for assignment
  const [assignBatch, setAssignBatch] = useState('JEE A-1');
  const [assignChapter, setAssignChapter] = useState('Thermodynamics');
  const [numberOfQuestions, setNumberOfQuestions] = useState('10');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterChapter, setFilterChapter] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');

  // Mock Question Bank (Locked to Physics)
  const [questionBank, setQuestionBank] = useState<QuestionItem[]>([
    {
      id: 1,
      chapter: "Thermodynamics",
      difficulty: "Medium",
      questionText: "What is the work done in an isothermal expansion of an ideal gas?",
      optionA: "W = nRT ln(V2/V1)",
      optionB: "W = zero",
      optionC: "W = P(V2 - V1)",
      optionD: "W = nCv(T2 - T1)",
      correctAnswer: "A"
    },
    {
      id: 2,
      chapter: "Rotational Mechanics",
      difficulty: "Hard",
      questionText: "A solid sphere rolls down an inclined plane of height h without slipping. What is its linear velocity at the bottom?",
      optionA: "v = sqrt(2gh)",
      optionB: "v = sqrt(10gh/7)",
      optionC: "v = sqrt(4gh/3)",
      optionD: "v = sqrt(gh)",
      correctAnswer: "B"
    },
    {
      id: 3,
      chapter: "Kinematics",
      difficulty: "Easy",
      questionText: "Which of the following remains constant in a projectile motion under gravity?",
      optionA: "Vertical velocity",
      optionB: "Horizontal component of velocity",
      optionC: "Kinetic energy",
      optionD: "Height",
      correctAnswer: "B"
    }
  ]);

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !optionA.trim() || !optionB.trim() || !optionC.trim() || !optionD.trim()) {
      toast.error("Please fill in all question fields!");
      return;
    }

    const newQuestion: QuestionItem = {
      id: Date.now(),
      chapter,
      difficulty,
      questionText,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer
    };

    setQuestionBank([newQuestion, ...questionBank]);
    toast.success("Question successfully added to bank!");

    // Reset Form
    setQuestionText('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setCorrectAnswer('A');
    setShowAddForm(false);
  };

  const handleAssignHomework = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Assigned a worksheet of ${numberOfQuestions} questions on ${assignChapter} to ${assignBatch}!`);
    setShowAssignForm(false);
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestionBank(questionBank.filter(q => q.id !== id));
    toast.success("Question deleted from bank.");
  };

  const getDifficultyColor = (diff: 'Easy' | 'Medium' | 'Hard') => {
    switch (diff) {
      case 'Easy': return 'bg-emerald-50 border-emerald-100 text-emerald-600';
      case 'Medium': return 'bg-amber-50 border-amber-100 text-amber-600';
      case 'Hard': return 'bg-red-50 border-red-100 text-red-600';
    }
  };

  const filteredQuestions = questionBank.filter(q => {
    const matchesSearch = q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.chapter.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChapter = filterChapter === 'All' || q.chapter === filterChapter;
    const matchesDifficulty = filterDifficulty === 'All' || q.difficulty === filterDifficulty;
    return matchesSearch && matchesChapter && matchesDifficulty;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Practice Question Bank</h1>
          <p className="text-gray-500 text-[15px] mt-1.5 font-medium">Create, review, and assign practice worksheets (Locked: Physics)</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => {
              setShowAssignForm(!showAssignForm);
              setShowAddForm(false);
            }}
            className={`flex items-center gap-2 px-5 py-3 font-bold text-sm rounded-xl transition-all shadow-xs active:scale-[0.98] ${
              showAssignForm 
                ? 'bg-gray-100 hover:bg-gray-250 text-gray-700'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {showAssignForm ? <ChevronUp className="w-4.5 h-4.5" /> : <Send className="w-4.5 h-4.5" />}
            Assign Homework
          </button>
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setShowAssignForm(false);
            }}
            className={`flex items-center gap-2 px-5 py-3 font-bold text-sm rounded-xl transition-all shadow-xs active:scale-[0.98] ${
              showAddForm 
                ? 'bg-gray-100 hover:bg-gray-250 text-gray-700'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {showAddForm ? <ChevronUp className="w-4.5 h-4.5" /> : <Plus className="w-4.5 h-4.5" />}
            Add New Question
          </button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Questions</span>
            <p className="text-2xl font-bold text-gray-850 mt-1">{questionBank.length}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <HelpCircle className="w-5.5 h-5.5" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Subject</span>
            <p className="text-2xl font-bold text-blue-600 mt-1">Physics</p>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <BookOpen className="w-5.5 h-5.5" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Chapters Covered</span>
            <p className="text-2xl font-bold text-gray-850 mt-1">8</p>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Layers className="w-5.5 h-5.5" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active Homeworks</span>
            <p className="text-2xl font-bold text-gray-850 mt-1">4</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Users className="w-5.5 h-5.5" />
          </div>
        </div>
      </div>

      {/* Expandable Form: Add Question */}
      {showAddForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
          <div className="p-6 border-b border-gray-50 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              Add Question to Bank
            </h2>
            <p className="text-gray-400 text-xs">Create custom multiple choice questions to reuse in assignments.</p>
          </div>

          <form onSubmit={handleAddQuestion} className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Chapter */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Chapter / Topic</label>
                <select
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold cursor-pointer"
                >
                  <option value="Thermodynamics">Thermodynamics</option>
                  <option value="Rotational Mechanics">Rotational Mechanics</option>
                  <option value="Kinematics">Kinematics</option>
                  <option value="Electrostatics">Electrostatics</option>
                  <option value="Optics">Optics</option>
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Difficulty</label>
                <div className="flex gap-2.5">
                  {(['Easy', 'Medium', 'Hard'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setDifficulty(level)}
                      className={`flex-1 py-3 text-xs font-bold rounded-xl border transition-all ${
                        difficulty === level
                          ? level === 'Easy' ? 'bg-emerald-100 text-emerald-700 border-emerald-300' 
                            : level === 'Medium' ? 'bg-amber-100 text-amber-700 border-amber-300'
                            : 'bg-red-100 text-red-700 border-red-300'
                          : 'bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject (Locked indicator) */}
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Subject</label>
                <input
                  type="text"
                  value="Physics"
                  disabled
                  className="block w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 text-sm font-semibold shadow-xs cursor-not-allowed outline-none"
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Question Text</label>
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Type question text here..."
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-medium shadow-xs resize-y"
              />
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {['A', 'B', 'C', 'D'].map((opt) => {
                const val = opt === 'A' ? optionA : opt === 'B' ? optionB : opt === 'C' ? optionC : optionD;
                const setter = opt === 'A' ? setOptionA : opt === 'B' ? setOptionB : opt === 'C' ? setOptionC : setOptionD;
                return (
                  <div key={opt}>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Option {opt}</label>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setter(e.target.value)}
                      placeholder={`Enter option ${opt}`}
                      className="block w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold shadow-xs"
                    />
                  </div>
                );
              })}
            </div>

            {/* Correct answer selection */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Correct Option</label>
              <div className="flex gap-4">
                {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setCorrectAnswer(opt)}
                    className={`h-12 w-12 rounded-xl text-sm font-bold border transition-all ${
                      correctAnswer === opt
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100'
                        : 'bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-xs active:scale-[0.98]"
              >
                Add Question
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Expandable Form: Assign Homework */}
      {showAssignForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
          <div className="p-6 border-b border-gray-50 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-500" />
              Assign Practice Assignment
            </h2>
            <p className="text-gray-400 text-xs">Assign automated homework to your selected batches.</p>
          </div>

          <form onSubmit={handleAssignHomework} className="p-6 grid grid-cols-1 sm:grid-cols-4 gap-6 items-end">
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Select Batch</label>
              <select
                value={assignBatch}
                onChange={(e) => setAssignBatch(e.target.value)}
                className="block w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold cursor-pointer"
              >
                <option value="JEE A-1">JEE A-1</option>
                <option value="NEET B-15">NEET B-15</option>
                <option value="JEE A-2">JEE A-2</option>
                <option value="NEET B-12">NEET B-12</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Target Chapter</label>
              <select
                value={assignChapter}
                onChange={(e) => setAssignChapter(e.target.value)}
                className="block w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold cursor-pointer"
              >
                <option value="Thermodynamics">Thermodynamics</option>
                <option value="Rotational Mechanics">Rotational Mechanics</option>
                <option value="Kinematics">Kinematics</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Number of Questions</label>
              <input
                type="number"
                min="1"
                max="50"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(e.target.value)}
                className="block w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm font-semibold shadow-xs"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-xs active:scale-[0.98]"
              >
                Send Assignment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters row & Question Feed */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1 w-full">
            <Search className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search questions by text or chapter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-sm placeholder-gray-400 shadow-xs"
            />
          </div>

          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            {/* Chapter filter */}
            <div className="flex-1 sm:flex-initial sm:w-48">
              <select
                value={filterChapter}
                onChange={(e) => setFilterChapter(e.target.value)}
                className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-xs font-bold cursor-pointer"
              >
                <option value="All">All Chapters</option>
                <option value="Thermodynamics">Thermodynamics</option>
                <option value="Rotational Mechanics">Rotational Mechanics</option>
                <option value="Kinematics">Kinematics</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="flex-1 sm:flex-initial sm:w-40">
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-700 text-xs font-bold cursor-pointer"
              >
                <option value="All">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-6">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q, index) => (
              <div 
                key={q.id}
                className="p-6 rounded-2xl bg-gray-50/20 border border-gray-100/80 hover:border-blue-100/50 hover:shadow-xs transition-all relative group"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-gray-400">Q{index + 1}.</span>
                    <span className="px-2.5 py-0.5 bg-blue-50/50 border border-blue-100/30 text-[10px] font-bold text-blue-600 rounded-full">
                      {q.chapter}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="p-1.5 bg-white border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 rounded-lg transition-all absolute right-4 top-4 sm:relative sm:right-0 sm:top-0"
                    title="Delete Question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-gray-800 text-sm font-semibold pr-8 mb-4 leading-relaxed">{q.questionText}</p>

                {/* Option list visual */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
                  {['A', 'B', 'C', 'D'].map((letter) => {
                    const optText = letter === 'A' ? q.optionA : letter === 'B' ? q.optionB : letter === 'C' ? q.optionC : q.optionD;
                    const isCorrect = q.correctAnswer === letter;
                    return (
                      <div 
                        key={letter}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-xs font-medium ${
                          isCorrect 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-white text-gray-600 border-gray-100'
                        }`}
                      >
                        <span className={`h-6 w-6 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                          isCorrect 
                            ? 'bg-green-200 text-green-800' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {letter}
                        </span>
                        <span>{optText}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-400 text-sm font-medium">
              No questions found. Try adding new questions or clearing search queries.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherPractice;
