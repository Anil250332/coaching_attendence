import React, { useState } from 'react';
import { BookOpen, Users, Clock, Calendar, Plus } from 'lucide-react';
import AddBatchModal from '../../components/AddBatchModal';
import ManageBatchModal from '../../components/ManageBatchModal';
import BatchDetailsModal from '../../components/BatchDetailsModal';

const batchesData = [
  {
    id: 1,
    name: 'IIT-JEE Batch A-12',
    course: 'IIT-JEE',
    status: 'ACTIVE',
    enrolled: 30,
    capacity: 35,
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    startedDate: 'Jan 15, 2024',
    teacher: 'Dr. Rajesh Kumar',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    manageColor: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    id: 2,
    name: 'NEET Batch B-15',
    course: 'NEET',
    status: 'ACTIVE',
    enrolled: 35,
    capacity: 35,
    schedule: 'Tue, Thu, Sat - 10:30 AM',
    startedDate: 'Feb 1, 2024',
    teacher: 'Prof. Meera Singh',
    iconColor: 'text-teal-600',
    iconBg: 'bg-teal-50',
    manageColor: 'bg-teal-500 hover:bg-teal-600'
  },
  {
    id: 3,
    name: 'SSC Batch C-08',
    course: 'SSC',
    status: 'ACTIVE',
    enrolled: 25,
    capacity: 30,
    schedule: 'Mon to Fri - 12:00 PM',
    startedDate: 'Jan 20, 2024',
    teacher: 'Mr. Amit Sharma',
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-50',
    manageColor: 'bg-orange-500 hover:bg-orange-600'
  },
  {
    id: 4,
    name: 'Banking Batch D-21',
    course: 'Banking',
    status: 'ACTIVE',
    enrolled: 20,
    capacity: 25,
    schedule: 'Tue, Thu - 2:00 PM',
    startedDate: 'Mar 1, 2024',
    teacher: 'Ms. Priya Verma',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
    manageColor: 'bg-purple-500 hover:bg-purple-600'
  },
  {
    id: 5,
    name: 'IIT-JEE Batch A-14',
    course: 'IIT-JEE',
    status: 'ACTIVE',
    enrolled: 28,
    capacity: 35,
    schedule: 'Mon, Wed, Fri - 4:00 PM',
    startedDate: 'Feb 15, 2024',
    teacher: 'Dr. Rajesh Kumar',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    manageColor: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    id: 6,
    name: 'NEET Batch B-17',
    course: 'NEET',
    status: 'UPCOMING',
    enrolled: 12,
    capacity: 35,
    schedule: 'Starting Soon',
    startedDate: 'Jul 1, 2024',
    teacher: 'Prof. Meera Singh',
    iconColor: 'text-gray-500',
    iconBg: 'bg-gray-100',
    manageColor: 'bg-gray-600 hover:bg-gray-700'
  }
];

const Batches: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<any>(null);

  const handleManageClick = (batch: any) => {
    setSelectedBatch(batch);
    setIsManageModalOpen(true);
  };

  const handleDetailsClick = (batch: any) => {
    setSelectedBatch(batch);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827]">Batches</h1>
          <p className="text-[15px] text-gray-500 font-medium">Manage all batches and schedules</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create New Batch
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batchesData.map((batch) => {
          const progress = Math.round((batch.enrolled / batch.capacity) * 100);
          // Set progress bar color based on capacity percentage
          let progressColorClass = 'bg-blue-500';
          if (progress <= 60) progressColorClass = 'bg-red-500';
          else if (progress <= 80) progressColorClass = 'bg-orange-500';
          else if (progress <= 90) progressColorClass = 'bg-blue-500';
          else progressColorClass = 'bg-emerald-500';

          return (
            <div key={batch.id} className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm flex flex-col h-full">
              {/* Card Header */}
              <div className="flex justify-between items-start mb-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${batch.iconBg} ${batch.iconColor}`}>
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${
                  batch.status === 'ACTIVE' 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {batch.status}
                </span>
              </div>

              {/* Title & Course */}
              <div className="mb-6">
                <h3 className="text-[18px] font-bold text-gray-900 mb-1">{batch.name}</h3>
                <p className="text-[14px] font-medium text-gray-500">{batch.course}</p>
              </div>

              {/* Stats */}
              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-center gap-3 text-[14px] text-gray-600">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{batch.enrolled}/{batch.capacity} Students</span>
                </div>
                <div className="flex items-center gap-3 text-[14px] text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{batch.schedule}</span>
                </div>
                <div className="flex items-center gap-3 text-[14px] text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">Started: {batch.startedDate}</span>
                </div>
              </div>

              {/* Capacity Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[13px] font-medium text-gray-500">Capacity</span>
                  <span className="text-[13px] font-medium text-gray-500">{progress}% Full</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${progressColorClass}`}
                    style={{ width: `${Math.max(progress, 2)}%` }}
                  ></div>
                </div>
              </div>

              {/* Teacher */}
              <div className="mb-6">
                <p className="text-[14px] font-medium text-gray-500">
                  Teacher: <span className="font-bold text-gray-900">{batch.teacher}</span>
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-auto">
                <button 
                  onClick={() => handleDetailsClick(batch)}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-[14px] text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  View Details
                </button>
                <button 
                  onClick={() => handleManageClick(batch)}
                  className={`flex-1 py-2.5 rounded-xl font-semibold text-[14px] text-white transition-colors shadow-sm ${batch.manageColor}`}
                >
                  Manage
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <AddBatchModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      <ManageBatchModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        batchData={selectedBatch}
      />

      <BatchDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        batchData={selectedBatch}
      />
    </div>
  );
};

export default Batches;
