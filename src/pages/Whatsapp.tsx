import React from 'react';
import { Send, Users, Clock, CheckCircle2, MessageSquare, Plus } from 'lucide-react';

interface Template {
  id: number;
  title: string;
  category: string;
  text: string;
  usageCount: number;
  color: string;
  buttonColor: string; 
  borderColor: string; 
  bgColor: string; 
  innerBorderColor: string; 
}

interface RecentMessage {
  id: number;
  recipient: string;
  text: string;
  time: string;
  status: 'delivered' | 'read';
}

const templates: Template[] = [
  {
    id: 1,
    title: 'Fee Reminder',
    category: 'Payment',
    text: 'Dear {name}, your Q3 fee of ₹{amount} is due on {date}. Please pay at the earliest.',
    usageCount: 245,
    color: '#F59E0B',
    borderColor: 'border-l-4 border-l-[#F59E0B] border-[#FFEDD5]',
    buttonColor: 'bg-[#F59E0B] hover:bg-[#D97706]',
    bgColor: 'bg-[#FFF9F2]',
    innerBorderColor: 'border-[#FEE0B2]'
  },
  {
    id: 2,
    title: 'Attendance Alert',
    category: 'Academic',
    text: 'Dear Parent, {student_name} was absent on {date} for {subject} class.',
    usageCount: 89,
    color: '#EF4444',
    borderColor: 'border-l-4 border-l-[#EF4444] border-[#FEE2E2]',
    buttonColor: 'bg-[#EF4444] hover:bg-[#DC2626]',
    bgColor: 'bg-[#FFF5F5]',
    innerBorderColor: 'border-[#FED7D7]'
  },
  {
    id: 3,
    title: 'Test Result',
    category: 'Academic',
    text: '{student_name} scored {score}% in {test_name}. Rank: {rank}. Well done!',
    usageCount: 312,
    color: '#10B981',
    borderColor: 'border-l-4 border-l-[#10B981] border-[#D1FAE5]',
    buttonColor: 'bg-[#10B981] hover:bg-[#059669]',
    bgColor: 'bg-[#F0FDF4]',
    innerBorderColor: 'border-[#C6F6D5]'
  },
  {
    id: 4,
    title: 'Admission Confirmation',
    category: 'Enrollment',
    text: 'Welcome to CoachMaster! {name} has been enrolled in {batch}. Classes start on {date}.',
    usageCount: 124,
    color: '#2563EB',
    borderColor: 'border-l-4 border-l-[#2563EB] border-[#DBEAFE]',
    buttonColor: 'bg-[#2563EB] hover:bg-[#1D4ED8]',
    bgColor: 'bg-[#F0F5FF]',
    innerBorderColor: 'border-[#BFDBFE]'
  }
];

const recentMessages: RecentMessage[] = [
  {
    id: 1,
    recipient: 'All Parents - IIT-JEE A-12',
    text: 'Mock test scheduled for Jun 8...',
    time: '2 hours ago',
    status: 'delivered'
  },
  {
    id: 2,
    recipient: 'Rahul Kumar - Parent',
    text: 'Fee reminder for Q3...',
    time: '5 hours ago',
    status: 'read'
  },
  {
    id: 3,
    recipient: 'All Students - NEET B-15',
    text: 'Extra class on Saturday...',
    time: '1 day ago',
    status: 'delivered'
  },
  {
    id: 4,
    recipient: 'Priya Singh - Parent',
    text: 'Attendance alert...',
    time: '1 day ago',
    status: 'read'
  }
];

const Whatsapp: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 sm:pt-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-[28px] font-bold text-[#111827]">WhatsApp Automation</h1>
            <p className="text-[15px] text-gray-500 font-medium mt-1">Automate messages and notifications</p>
          </div>
        </div>
        <button className="bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Send Message
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Messages Sent */}
        <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-6 shadow-xs flex items-center gap-4 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-white text-[#10B981] border border-[#DCFCE7] flex items-center justify-center shrink-0">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[22px] font-extrabold text-gray-900">12,458</h3>
            <p className="text-[13px] font-bold text-gray-500 mt-0.5">Messages Sent</p>
          </div>
        </div>

        {/* Active Contacts */}
        <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-2xl p-6 shadow-xs flex items-center gap-4 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-white text-[#2563EB] border border-[#DBEAFE] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[22px] font-extrabold text-gray-900">2,847</h3>
            <p className="text-[13px] font-bold text-gray-500 mt-0.5">Active Contacts</p>
          </div>
        </div>

        {/* Scheduled */}
        <div className="bg-[#FFF7ED] border border-[#FFEDD5] rounded-2xl p-6 shadow-xs flex items-center gap-4 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-white text-[#F59E0B] border border-[#FFEDD5] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[22px] font-extrabold text-gray-900">45</h3>
            <p className="text-[13px] font-bold text-gray-500 mt-0.5">Scheduled</p>
          </div>
        </div>

        {/* Delivered */}
        <div className="bg-[#ECFDF5] border border-[#D1FAE5] rounded-2xl p-6 shadow-xs flex items-center gap-4 hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-2xl bg-white text-[#059669] border border-[#D1FAE5] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[22px] font-extrabold text-gray-900">98.5%</h3>
            <p className="text-[13px] font-bold text-gray-500 mt-0.5">Delivered</p>
          </div>
        </div>
      </div>


      {/* Split section: Templates & History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Templates Column */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-6">
          <h3 className="text-[17px] font-extrabold text-gray-900">Message Templates</h3>
          <div className="space-y-4">
            {templates.map((tpl) => (
              <div 
                key={tpl.id} 
                className={`border rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden ${tpl.bgColor} ${tpl.borderColor}`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-extrabold text-gray-900 text-[15px]">{tpl.title}</h4>
                      <p className="text-[11px] text-gray-400 font-bold mt-0.5">{tpl.category}</p>
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded-lg border border-gray-200">
                      Used {tpl.usageCount}x
                    </span>
                  </div>
                  <p className={`text-[13px] font-semibold text-gray-600 bg-white p-3 rounded-xl border ${tpl.innerBorderColor} leading-relaxed font-sans`}>
                    {tpl.text}
                  </p>
                </div>
                <button className={`w-36 mt-4 text-white py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${tpl.buttonColor}`}>
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages Column */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-[17px] font-extrabold text-gray-900">Recent Messages</h3>
            <div className="space-y-4">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between bg-white shadow-xs">
                  <div className="space-y-1.5 flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-gray-900 text-[14px] truncate">{msg.recipient}</h4>
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                        msg.status === 'delivered'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : 'bg-blue-50 text-blue-600 border-blue-100'
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-[12px] text-gray-500 font-semibold truncate leading-relaxed">
                      {msg.text}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold">
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whatsapp;
