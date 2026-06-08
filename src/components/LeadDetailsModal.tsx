import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  User, 
  TrendingUp,
  MessageCircle,
  CheckCircle2,
  Send,
  Clock
} from 'lucide-react';
import ConvertStudentModal from './ConvertStudentModal';

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  interest: string;
  source: string;
  stage: string;
  date: string;
}

interface Activity {
  id: number;
  type: 'call' | 'message' | 'system' | 'note';
  user: string;
  time: string;
  text: string;
  icon: any;
  color: string;
}

interface LeadDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onUpdateStage?: (leadId: number, newStage: string) => void;
}

const stages = [
  { id: 'New Lead', title: 'New Lead', color: 'bg-gray-100 text-gray-600 hover:bg-gray-200', activeColor: 'bg-gray-100 text-gray-800 border-gray-800' },
  { id: 'Contacted', title: 'Contacted', color: 'bg-blue-100 text-blue-600 hover:bg-blue-200', activeColor: 'bg-blue-100 text-blue-700 border-blue-600' },
  { id: 'Follow-up', title: 'Follow-up', color: 'bg-orange-100 text-orange-600 hover:bg-orange-200', activeColor: 'bg-orange-100 text-orange-700 border-orange-500' },
  { id: 'Demo Scheduled', title: 'Demo Scheduled', color: 'bg-purple-100 text-purple-600 hover:bg-purple-200', activeColor: 'bg-purple-100 text-purple-700 border-purple-600' },
  { id: 'Admission Confirmed', title: 'Admission Confirmed', color: 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200', activeColor: 'bg-emerald-100 text-emerald-700 border-emerald-600' },
  { id: 'Lost', title: 'Lost', color: 'bg-red-100 text-red-600 hover:bg-red-200', activeColor: 'bg-red-100 text-red-700 border-red-600' },
];

const initialActivities: Activity[] = [
  { id: 1, type: 'call', user: 'Telecaller - Priya', time: '2 hours ago', text: 'Called the lead, interested in IIT-JEE coaching. Parent wants to visit center on Saturday.', icon: Phone, color: 'bg-green-100 text-green-700' },
  { id: 2, type: 'message', user: 'Telecaller - Amit', time: '1 day ago', text: 'Sent WhatsApp message with course brochure and fee structure. Awaiting response.', icon: MessageCircle, color: 'bg-blue-100 text-blue-700' },
  { id: 3, type: 'system', user: 'Admin - Rajesh', time: '2 days ago', text: 'Lead registered through website form. High priority - scored 95% in board exams.', icon: User, color: 'bg-gray-200 text-gray-700' },
];

const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({ isOpen, onClose, lead, onUpdateStage }) => {
  const [noteText, setNoteText] = useState('');
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);

  if (!isOpen || !lead) return null;

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    const newActivity: Activity = {
      id: Date.now(),
      type: 'note',
      user: 'You (Admin)',
      time: 'Just now',
      text: noteText,
      icon: Send,
      color: 'bg-indigo-100 text-indigo-700'
    };
    setActivities([newActivity, ...activities]);
    setNoteText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-xl relative z-10 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Lead Details</h2>
            <p className="text-sm text-gray-500 mt-1">{lead.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-8 custom-scrollbar">
          
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
              <div className="p-2.5 bg-teal-100 rounded-lg text-teal-700 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[12px] text-gray-500 font-medium">Phone</p>
                <p className="text-[14px] font-bold text-gray-900 mt-0.5">{lead.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
              <div className="p-2.5 bg-blue-100 rounded-lg text-blue-700 mt-0.5">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[12px] text-gray-500 font-medium">Email</p>
                <p className="text-[14px] font-bold text-gray-900 mt-0.5">{lead.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
              <div className="p-2.5 bg-orange-100 rounded-lg text-orange-700 mt-0.5">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[12px] text-gray-500 font-medium">Interest</p>
                <p className="text-[14px] font-bold text-gray-900 mt-0.5">{lead.interest}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
              <div className="p-2.5 bg-purple-100 rounded-lg text-purple-700 mt-0.5">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[12px] text-gray-500 font-medium">Source</p>
                <p className="text-[14px] font-bold text-gray-900 mt-0.5">{lead.source}</p>
              </div>
            </div>
          </div>

          {/* Lead Stage Section */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-semibold text-gray-900">Lead Stage</h3>
              <span className="text-[11px] font-medium px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                {lead.stage}
              </span>
            </div>
            <p className="text-[13px] text-gray-500 mb-4">Move this lead through the sales pipeline:</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {stages.map((stage) => {
                const isActive = stage.id === lead.stage;
                return (
                  <button 
                    key={stage.id}
                    onClick={() => {
                      if (onUpdateStage) onUpdateStage(lead.id, stage.id);
                    }}
                    className={`px-4 py-2.5 rounded-lg text-[13px] font-medium text-center transition-all ${
                      isActive 
                        ? `${stage.activeColor} border-2 shadow-sm font-semibold` 
                        : `${stage.color} border border-transparent`
                    }`}
                  >
                    → {stage.title}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
              <button className="flex-1 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-lg text-[14px] font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
              <button 
                onClick={() => setIsConvertModalOpen(true)}
                className="flex-1 w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-[14px] font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                Convert to Student
              </button>
            </div>
          </div>

          <hr className="border-gray-100" />
 
          {/* Schedule Follow-up */}
          <div>
            <h3 className="text-[15px] font-semibold text-gray-900 mb-4">Schedule Follow-up</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[12px] font-medium text-gray-700 mb-1.5">
                  Follow-up Date
                </label>
                <div className="relative">
                  <input 
                    type="date" 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[13px] text-gray-900 bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-gray-700 mb-1.5">
                  Follow-up Time
                </label>
                <div className="relative">
                  <input 
                    type="time" 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[13px] text-gray-900 bg-white"
                  />
                </div>
              </div>
            </div>
           
          </div>
          
          {/* Notes & Activity */}
          <div>
            <h3 className="text-[15px] font-semibold text-gray-900 mb-4">Notes & Activity</h3>
            
            {/* Add Note */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <textarea 
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a note about this lead."
                className="flex-1 h-20 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-[13px] text-gray-900 placeholder:text-gray-400 resize-none custom-scrollbar"
              />
              <button 
                onClick={handleAddNote}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-[14px] font-medium flex items-center justify-center gap-2 transition-colors shadow-sm h-11 shrink-0 self-start sm:self-auto"
              >
                <Send className="w-4 h-4" />
                Add Note
              </button>
            </div>

            {/* Activity List */}
            <div className="space-y-3">
              {activities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className={`p-1.5 rounded-full mt-0.5 ${activity.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-[13px] font-bold text-gray-900">{activity.user}</p>
                          <span className="text-[11px] text-gray-500 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3" /> {activity.time}
                          </span>
                        </div>
                        <p className="text-[13px] text-gray-700 mt-1.5 leading-relaxed font-medium">
                          {activity.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          

        </div>
      </div>

      {/* Convert to Student Modal */}
      <ConvertStudentModal 
        isOpen={isConvertModalOpen} 
        onClose={() => setIsConvertModalOpen(false)} 
        lead={lead}
      />
    </div>
  );
};

export default LeadDetailsModal;
