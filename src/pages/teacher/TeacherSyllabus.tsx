import React, { useState, useEffect } from 'react';
import { CheckCircle, Check, ArrowLeft, ChevronRight } from 'lucide-react';
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

interface GlobalSyllabus {
  [batchId: string]: {
    subjects: SubjectSyllabus[];
  };
}

const defaultSyllabusData: GlobalSyllabus = {
  'IIT-JEE-Batch-A-12': {
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
                  { id: 't1_1', name: 'Motion in a Straight Line', completed: true, completedDate: '2026-06-10', notes: '' },
                  { id: 't1_2', name: 'Relative Velocity in 1D', completed: true, completedDate: '2026-06-11', notes: '' },
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
      }
    ]
  },
  'NEET-Batch-B-15': {
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
                  { id: 't4_1', name: 'Biodiversity & Taxonomy', completed: true, completedDate: '2026-06-05', notes: '' },
                  { id: 't4_2', name: 'Taxonomical Aids', completed: false, completedDate: '', notes: '' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};

const TeacherSyllabus: React.FC = () => {
  const [syllabus, setSyllabus] = useState<GlobalSyllabus>(() => {
    const saved = localStorage.getItem('coachmaster_syllabus');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const adapted: GlobalSyllabus = {};
        Object.keys(parsed).forEach(key => {
          const item = parsed[key];
          if (Array.isArray(item.subjects)) {
            adapted[key] = { subjects: item.subjects };
          } else {
            const subjectsArr: SubjectSyllabus[] = [];
            Object.keys(item).forEach(subKey => {
              subjectsArr.push({
                subject: subKey,
                type: 'manual',
                units: item[subKey]
              });
            });
            adapted[key] = { subjects: subjectsArr };
          }
        });
        return adapted;
      } catch (e) {
        return defaultSyllabusData;
      }
    }
    return defaultSyllabusData;
  });

  const [viewState, setViewState] = useState<'batches' | 'syllabus'>('batches');
  const [selectedBatch, setSelectedBatch] = useState('IIT-JEE-Batch-A-12');
  const [selectedSubject, setSelectedSubject] = useState('Physics');

  // Assigned batches
  const assignedBatches = [
    { id: 'IIT-JEE-Batch-A-12', name: 'IIT-JEE Batch A-12', details: 'Physics Lecture Class', studentCount: '32 Students' },
    { id: 'NEET-Batch-B-15', name: 'NEET Batch B-15', details: 'Physics Revision Class', studentCount: '28 Students' }
  ];

  useEffect(() => {
    localStorage.setItem('coachmaster_syllabus', JSON.stringify(syllabus));
  }, [syllabus]);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('coachmaster_syllabus');
      if (saved) {
        setSyllabus(JSON.parse(saved));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getActiveSyllabus = (): SubjectSyllabus | undefined => {
    return syllabus[selectedBatch]?.subjects.find(s => s.subject === selectedSubject);
  };

  const handleMarkCovered = (unitId: string, chapterId: string, topicId: string) => {
    setSyllabus(prev => {
      const batchData = prev[selectedBatch] || { subjects: [] };
      const updatedSubjects = batchData.subjects.map(s => {
        if (s.subject === selectedSubject && s.units) {
          const updatedUnits = s.units.map(u => {
            if (u.id === unitId) {
              const updatedChapters = u.chapters.map(ch => {
                if (ch.id === chapterId) {
                  return {
                    ...ch,
                    topics: ch.topics.map(t => {
                      if (t.id === topicId) {
                        return {
                          ...t,
                          completed: true,
                          completedDate: new Date().toISOString().split('T')[0]
                        };
                      }
                      return t;
                    })
                  };
                }
                return ch;
              });
              return { ...u, chapters: updatedChapters };
            }
            return u;
          });
          return { ...s, units: updatedUnits };
        }
        return s;
      });

      return {
        ...prev,
        [selectedBatch]: {
          subjects: updatedSubjects
        }
      };
    });

    toast.success('Topic marked as covered!');
  };

  const activeSyllabus = getActiveSyllabus();
  const activeUnits = activeSyllabus?.type === 'manual' ? (activeSyllabus.units || []) : [];

  // Calculate stats
  let totalTopics = 0;
  let completedTopics = 0;
  activeUnits.forEach(u => {
    u.chapters.forEach(ch => {
      ch.topics.forEach(t => {
        totalTopics++;
        if (t.completed) completedTopics++;
      });
    });
  });

  const progressPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto pb-10 px-4 sm:px-6">
      {/* 1. BATCHES VIEW */}
      {viewState === 'batches' ? (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Syllabus Tracker</h1>
            <p className="text-sm text-gray-500 mt-1">Select a class batch to view & update syllabus</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {assignedBatches.map((batch) => (
              <div
                key={batch.id}
                onClick={() => {
                  setSelectedBatch(batch.id);
                  setSelectedSubject('Physics');
                  setViewState('syllabus');
                }}
                className="bg-white hover:bg-gray-50/50 active:bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-xs flex items-center justify-between cursor-pointer transition-all duration-150"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Physics Class</span>
                  <h3 className="font-bold text-gray-900 text-base mt-1">{batch.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                    <span>{batch.details}</span>
                    <span>•</span>
                    <span>{batch.studentCount}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 2. SYLLABUS DETAIL VIEW */
        <div className="space-y-6">
          {/* Back Action Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setViewState('batches')}
              className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Batches</span>
            </button>
            <span className="text-xs font-bold text-gray-500 bg-gray-100 border border-gray-200/50 rounded-lg px-3 py-1">
              Batch: {selectedBatch.replace(/-/g, ' ')}
            </span>
          </div>

          {/* Simple Clutter-Free Progress Card */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Physics Completion</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-gray-900">{progressPercentage}%</span>
                <span className="text-xs font-semibold text-gray-500">({completedTopics}/{totalTopics} Completed)</span>
              </div>
            </div>
            {/* Simple progress bar bar */}
            <div className="w-32 bg-gray-100 h-2.5 rounded-full overflow-hidden shrink-0">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Syllabus Unit Content */}
          <div className="space-y-6">
            {!activeSyllabus ? (
              <div className="text-center py-8 text-gray-400 text-sm">Syllabus details unavailable.</div>
            ) : (
              activeUnits.map((unit) => (
                <div key={unit.id} className="space-y-3">
                  {/* Unit Title */}
                  <h3 className="font-bold text-sm text-gray-400 uppercase tracking-wider pl-1">{unit.name}</h3>

                  {/* Chapters and Topics */}
                  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100">
                    {unit.chapters.map((chapter) => (
                      <div key={chapter.id} className="p-4 space-y-3">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wide block">
                          Chapter: {chapter.name}
                        </span>

                        <div className="space-y-2">
                          {chapter.topics.map((topic) => (
                            <div
                              key={topic.id}
                              className={`flex items-center justify-between p-3 rounded-lg border text-sm font-medium ${topic.completed
                                  ? 'bg-emerald-50/20 border-emerald-100 text-gray-800'
                                  : 'bg-white border-gray-100 text-gray-900 hover:border-gray-200'
                                }`}
                            >
                              <div className="pr-4">
                                <span className={topic.completed ? 'line-through text-gray-400' : ''}>{topic.name}</span>
                              </div>

                              <div className="flex items-center shrink-0">
                                {topic.completed ? (
                                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                ) : (
                                  <button
                                    onClick={() => handleMarkCovered(unit.id, chapter.id, topic.id)}
                                    className="text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg shadow-xs transition-colors flex items-center gap-1"
                                  >
                                    <Check className="w-3 h-3" /> Mark Covered
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherSyllabus;
