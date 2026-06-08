import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Plus, 
  LayoutGrid, 
  List as ListIcon
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import AddLeadModal from '../../components/AddLeadModal';
import LeadDetailsModal from '../../components/LeadDetailsModal';

const statsData = [
  { title: 'Total Leads', value: '7', icon: Users, color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { title: 'Conversion Rate', value: '34.8%', icon: TrendingUp, color: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { title: 'Active Demos', value: '12', icon: Calendar, color: 'text-purple-500', bgColor: 'bg-purple-50' },
  { title: 'This Week', value: '24', icon: Clock, color: 'text-teal-500', bgColor: 'bg-teal-50' },
];

const initialLeadsData = [
  { id: 1, name: 'Rohan Joshi', phone: '+91 98765 77777', email: 'rohan@email.com', interest: 'IIT-JEE', source: 'Referral', stage: 'Admission Confirmed', date: '5 days ago' },
  { id: 2, name: 'Sneha Gupta', phone: '+91 98765 66666', email: 'sneha@email.com', interest: 'NEET', source: 'Website', stage: 'Demo Scheduled', date: '3 days ago' },
  { id: 3, name: 'Vikram Reddy', phone: '+91 98765 55555', email: 'vikram@email.com', interest: 'SSC', source: 'Instagram', stage: 'Follow-up', date: '2 days ago' },
  { id: 4, name: 'Neha Sharma', phone: '+91 98765 44444', email: 'neha@email.com', interest: 'Banking', source: 'Google', stage: 'Contacted', date: '1 day ago' },
  { id: 5, name: 'Amit Patel', phone: '+91 98765 33333', email: 'amit@email.com', interest: 'IIT-JEE', source: 'Referral', stage: 'Contacted', date: '1 day ago' },
  { id: 6, name: 'Raj Kumar', phone: '+91 98765 22222', email: 'raj@email.com', interest: 'IIT-JEE', source: 'Website', stage: 'New Lead', date: 'Just now' },
  { id: 7, name: 'Priya Singh', phone: '+91 98765 11111', email: 'priya@email.com', interest: 'NEET', source: 'Facebook', stage: 'New Lead', date: 'Just now' },
];

const stages = [
  { id: 'New Lead', title: 'New Lead', color: 'bg-gray-100', borderColor: 'border-gray-800', textColor: 'text-gray-800' },
  { id: 'Contacted', title: 'Contacted', color: 'bg-blue-50', borderColor: 'border-blue-500', textColor: 'text-blue-600' },
  { id: 'Follow-up', title: 'Follow-up', color: 'bg-orange-50', borderColor: 'border-orange-400', textColor: 'text-orange-500' },
  { id: 'Demo Scheduled', title: 'Demo Scheduled', color: 'bg-purple-50', borderColor: 'border-purple-500', textColor: 'text-purple-600' },
  { id: 'Admission Confirmed', title: 'Admission Confirmed', color: 'bg-emerald-50', borderColor: 'border-emerald-500', textColor: 'text-emerald-600' },
  { id: 'Lost', title: 'Lost', color: 'bg-red-50', borderColor: 'border-red-500', textColor: 'text-red-600' },
];

const stageColors: Record<string, string> = {
  'New Lead': 'bg-gray-100 text-gray-700',
  'Contacted': 'bg-blue-50 text-blue-600',
  'Follow-up': 'bg-orange-50 text-orange-600',
  'Demo Scheduled': 'bg-purple-50 text-purple-600',
  'Admission Confirmed': 'bg-emerald-50 text-emerald-600',
  'Lost': 'bg-red-50 text-red-600',
};

const funnelData = [
  { name: 'New Lead', value: 100 },
  { name: 'Contacted', value: 75 },
  { name: 'Follow-up', value: 60 },
  { name: 'Demo', value: 45 },
  { name: 'Confirmed', value: 30 },
];

const pieData = [
  { name: 'Website', value: 32, color: '#3b82f6' },
  { name: 'Facebook', value: 21, color: '#0ea5e9' },
  { name: 'Google', value: 19, color: '#22c55e' },
  { name: 'Referral', value: 17, color: '#f59e0b' },
  { name: 'Instagram', value: 12, color: '#ef4444' },
];

const leadGenData = [
  { name: 'Mon', leads: 12 },
  { name: 'Tue', leads: 15 },
  { name: 'Wed', leads: 18 },
  { name: 'Thu', leads: 14 },
  { name: 'Fri', leads: 20 },
  { name: 'Sat', leads: 16 },
  { name: 'Sun', leads: 8 },
];

const Leads: React.FC = () => {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [leads, setLeads] = useState(initialLeadsData);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);

  const handleUpdateStage = (leadId: number, newStage: string) => {
    const updatedLeads = leads.map((lead) => 
      lead.id === leadId ? { ...lead, stage: newStage } : lead
    );
    setLeads(updatedLeads);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, stage: newStage });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827]">Lead Management CRM</h1>
          <p className="text-[14px] text-gray-500 mt-1 font-medium">Manage and track all your leads in one place</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-white border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => setView('kanban')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                view === 'kanban' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Kanban
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                view === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ListIcon className="w-4 h-4" />
              List
            </button>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm whitespace-nowrap flex-1 sm:flex-none"
          >
            <Plus className="w-4 h-4 shrink-0" />
            Add New Lead
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-[14px] p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[13px] text-gray-500 font-medium mb-1">{stat.title}</p>
                  <h3 className="text-[22px] font-bold text-gray-800 leading-none">{stat.value}</h3>
                </div>
                <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {view === 'kanban' ? (
        <>
          {/* Kanban Board */}
          <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Pipeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {stages.map((stage) => {
                const stageLeads = leads.filter(l => l.stage === stage.id);
                return (
                  <div key={stage.id} className="flex-1">
                    <div className={`${stage.color} border-l-4 ${stage.borderColor} rounded-lg p-3 mb-4`}>
                      <h4 className={`text-sm font-semibold ${stage.textColor}`}>{stage.title}</h4>
                      <p className={`text-xl font-bold mt-1 ${stage.textColor}`}>{stageLeads.length}</p>
                    </div>
                    <div className="space-y-3">
                      {stageLeads.map((lead) => (
                        <div 
                          key={lead.id} 
                          onClick={() => setSelectedLead(lead)}
                          className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <h5 className="text-sm font-semibold text-gray-900">{lead.name}</h5>
                          <p className="text-xs text-gray-500 mt-1">{lead.interest}</p>
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-[10px] font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded">
                              {lead.source}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* List View */
        <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">All Leads ({leads.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-4 pl-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wider w-1">S.No.</th>
                  <th className="py-4 pr-6 pl-4 text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Lead Name</th>
                  <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Interest</th>
                  <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Stage</th>
                  <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead, index) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 pl-6 text-[13px] text-gray-500 font-medium">
                      {index + 1}
                    </td>
                    <td className="py-4 pr-6 pl-2">
                      <p className="text-[14px] font-semibold text-gray-900">{lead.name}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-[13px] text-gray-900 font-medium">{lead.phone}</p>
                      <p className="text-[12px] text-gray-500 mt-0.5">{lead.email}</p>
                    </td>
                    <td className="py-4 px-6 text-[13px] text-gray-700 font-medium">
                      {lead.interest}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[11px] font-medium px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${stageColors[lead.stage]}`}>
                        {lead.stage}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[13px] text-gray-500 whitespace-nowrap">
                      {lead.date}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button 
                          onClick={() => setSelectedLead(lead)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-[12px] font-medium transition-colors whitespace-nowrap"
                        >
                          View Details
                        </button>
                       
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-[14px] p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Conversion Funnel</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-[14px] p-6 border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Lead Sources</h3>
          <div className="h-[250px] w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  outerRadius={75}
                  dataKey="value"
                  stroke="none"
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[14px] p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Lead Generation</h3>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={leadGenData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="leads" stroke="#14b8a6" strokeWidth={3} dot={{ r: 5, fill: '#14b8a6', strokeWidth: 0 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Add Lead Modal */}
      <AddLeadModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      {/* Lead Details Modal */}
      <LeadDetailsModal 
        isOpen={!!selectedLead} 
        lead={selectedLead}
        onClose={() => setSelectedLead(null)} 
        onUpdateStage={handleUpdateStage}
      />
    </div>
  );
};

export default Leads;
