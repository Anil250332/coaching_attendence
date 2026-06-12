import React, { useState } from 'react';
import {
  IndianRupee,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import RecordPaymentModal from '../../components/RecordPaymentModal';

const monthlyRevenueData = [
  { name: 'Jan', Collected: 1850000, Target: 1950000 },
  { name: 'Feb', Collected: 1900000, Target: 2000000 },
  { name: 'Mar', Collected: 2150000, Target: 2100000 },
  { name: 'Apr', Collected: 2250000, Target: 2200000 },
  { name: 'May', Collected: 2350000, Target: 2300000 },
  { name: 'Jun', Collected: 2500000, Target: 2400000 },
];

const feeCollectionData = [
  { name: 'Jan', rate: 82 },
  { name: 'Feb', rate: 85 },
  { name: 'Mar', rate: 88 },
  { name: 'Apr', rate: 86 },
  { name: 'May', rate: 89 },
  { name: 'Jun', rate: 87.4 },
];

const courseRevenueData = [
  { name: 'IIT-JEE', value: 124.5, color: '#3b82f6' },
  { name: 'NEET', value: 89.2, color: '#10b981' },
  { name: 'SSC', value: 45.6, color: '#f59e0b' },
  { name: 'Banking', value: 25.4, color: '#8b5cf6' },
];

const pendingPayments = [
  { id: 1, name: 'Rahul Kumar', course: 'IIT-JEE A-12', amount: 45000, dueDate: 'Jun 5, 2024', status: 'overdue' },
  { id: 2, name: 'Priya Singh', course: 'NEET B-15', amount: 38000, dueDate: 'Jun 10, 2024', status: 'upcoming' },
  { id: 3, name: 'Amit Patel', course: 'SSC C-08', amount: 22000, dueDate: 'Jun 2, 2024', status: 'overdue' },
  { id: 4, name: 'Neha Sharma', course: 'Banking D-21', amount: 18000, dueDate: 'Jun 15, 2024', status: 'upcoming' },
];

const recentTransactions = [
  { id: 'TXN-2024-1247', student: 'Aarav Sharma', amount: 45000, method: 'UPI', status: 'completed', date: '2 hours ago' },
  { id: 'TXN-2024-1246', student: 'Diya Patel', amount: 38000, method: 'Card', status: 'completed', date: '5 hours ago' },
  { id: 'TXN-2024-1245', student: 'Vivek Kumar', amount: 45000, method: 'Cash', status: 'completed', date: '1 day ago' },
  { id: 'TXN-2024-1244', student: 'Ananya Singh', amount: 32000, method: 'UPI', status: 'pending', date: '1 day ago' },
];

const formatCurrency = (value: number) => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return `₹${value.toLocaleString('en-IN')}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100 z-50">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-[13px]" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Fees: React.FC = () => {
  const [isRecordPaymentModalOpen, setIsRecordPaymentModalOpen] = useState(false);
  const [selectedPaymentStudent, setSelectedPaymentStudent] = useState<any>(null);

  const handleRecordPayment = (student?: any) => {
    setSelectedPaymentStudent(student);
    setIsRecordPaymentModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 sm:pt-0">
        <div>
          <h1 className="text-[28px] font-bold text-[#111827]">Fee Management</h1>
          <p className="text-[15px] text-gray-500 font-medium mt-1">Track payments and manage finances</p>
        </div>
        <button
          onClick={() => handleRecordPayment()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Record Payment
        </button>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <IndianRupee className="w-6 h-6" />
            </div>
            <span className="text-[13px] font-bold text-emerald-500">+18.2%</span>
          </div>
          <div>
            <h3 className="text-[24px] font-bold text-gray-900">₹24.8L</h3>
            <p className="text-[14px] font-medium text-gray-500 mt-1">Total Revenue</p>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-[13px] font-bold text-emerald-500">+12%</span>
          </div>
          <div>
            <h3 className="text-[24px] font-bold text-gray-900">₹8.2L</h3>
            <p className="text-[14px] font-medium text-gray-500 mt-1">Collected This Month</p>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-[13px] font-bold text-red-500">-8%</span>
          </div>
          <div>
            <h3 className="text-[24px] font-bold text-gray-900">₹3.2L</h3>
            <p className="text-[14px] font-medium text-gray-500 mt-1">Pending Fees</p>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <span className="text-[13px] font-bold text-emerald-500">+5%</span>
          </div>
          <div>
            <h3 className="text-[24px] font-bold text-gray-900">₹1.1L</h3>
            <p className="text-[14px] font-medium text-gray-500 mt-1">Overdue Payments</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue vs Target */}
        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm">
          <h3 className="text-[16px] font-bold text-gray-900 mb-6">Monthly Revenue vs Target</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={(value) => value === 0 ? '0' : value}
                  domain={[0, 2600000]}
                  ticks={[0, 650000, 1300000, 1950000, 2600000]}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Legend iconType="square" wrapperStyle={{ fontSize: '13px', paddingTop: '20px' }} />
                <Bar dataKey="Collected" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="Target" fill="#e5e7eb" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Collection Rate */}
        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-[16px] font-bold text-gray-900 mb-6">Fee Collection Rate (%)</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={feeCollectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <YAxis domain={[75, 95]} ticks={[75, 80, 85, 90, 95]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                    labelStyle={{ fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}
                  />
                  <Line type="monotone" dataKey="rate" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#2563eb' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-6 bg-blue-600 rounded-xl p-6 text-white shadow-sm flex flex-col justify-center">
            <p className="text-blue-100 text-[14px] font-medium">Current Month</p>
            <h4 className="text-[36px] font-bold mt-1">87.4%</h4>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Revenue by Course */}
        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm">
          <h3 className="text-[16px] font-bold text-gray-900 mb-6">Revenue by Course</h3>
          <div className="h-[220px] w-full relative mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseRevenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {courseRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => `₹${value}L`}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text (mocked) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[14px] font-medium text-gray-500">NEET</span>
              <span className="text-[16px] font-bold text-gray-900">₹89.2L</span>
            </div>
          </div>
          <div className="space-y-4">
            {courseRevenueData.map((course) => (
              <div key={course.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: course.color }}></div>
                  <span className="text-[14px] text-gray-600 font-medium">{course.name}</span>
                </div>
                <span className="text-[14px] font-bold text-gray-900">₹{course.value}L</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm lg:col-span-2 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-amber-500" />
            <h3 className="text-[16px] font-bold text-gray-900">Pending Payments</h3>
          </div>
          <div className="space-y-4 flex-1">
            {pendingPayments.map((payment) => (
              <div key={payment.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl relative overflow-hidden"
                style={{ backgroundColor: payment.status === 'overdue' ? '#fff5f5' : '#fffff0' }}>
                {/* Colored Left Border indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${payment.status === 'overdue' ? 'bg-red-500' : 'bg-amber-400'}`}></div>

                <div className="pl-2 flex-1">
                  <h4 className="text-[16px] font-bold text-gray-900">{payment.name}</h4>
                  <p className="text-[13px] font-medium text-gray-500 mt-1">{payment.course}</p>
                </div>

                <div className="flex flex-col sm:items-end w-full sm:w-auto relative sm:static">
                  <div className="text-left sm:text-right mb-4 sm:mb-0 sm:absolute sm:top-5 sm:right-5">
                    <div className="text-[16px] font-bold text-gray-900">₹{payment.amount.toLocaleString('en-IN')}</div>
                    <div className={`text-[12px] font-bold mt-0.5 ${payment.status === 'overdue' ? 'text-red-500' : 'text-amber-600'}`}>
                      Due: {payment.dueDate}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-12 w-full sm:w-auto">
                    <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg text-[13px] font-semibold transition-colors flex-1 sm:flex-none text-center shadow-sm">
                      Send Reminder
                    </button>
                    <button className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-lg text-[13px] font-semibold transition-colors flex-1 sm:flex-none text-center shadow-sm">
                      WhatsApp
                    </button>
                    <button
                      onClick={() => handleRecordPayment({
                        id: `STU-${payment.id + 1000}`,
                        name: payment.name,
                        totalAmount: payment.course.includes('IIT-JEE') ? 120000 : payment.course.includes('NEET') ? 95000 : payment.course.includes('SSC') ? 60000 : 45000,
                        dueAmount: payment.amount
                      })}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-[13px] font-semibold transition-colors flex-1 sm:flex-none text-center shadow-sm"
                    >
                      Record Payment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm mt-6">
        <h3 className="text-[16px] font-bold text-gray-900 mb-6">Recent Transactions</h3>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-4 text-[13px] font-semibold text-gray-500">Transaction ID</th>
                <th className="py-4 px-4 text-[13px] font-semibold text-gray-500">Student</th>
                <th className="py-4 px-4 text-[13px] font-semibold text-gray-500">Amount</th>
                <th className="py-4 px-4 text-[13px] font-semibold text-gray-500">Method</th>
                <th className="py-4 px-4 text-[13px] font-semibold text-gray-500">Status</th>
                <th className="py-4 px-4 text-[13px] font-semibold text-gray-500">Date</th>
                <th className="py-4 px-4 text-[13px] font-semibold text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((txn, index) => (
                <tr key={txn.id} className={index !== recentTransactions.length - 1 ? 'border-b border-gray-50 hover:bg-gray-50/50 transition-colors' : 'hover:bg-gray-50/50 transition-colors'}>
                  <td className="py-4 px-4 text-[14px] font-medium text-gray-900">{txn.id}</td>
                  <td className="py-4 px-4 text-[14px] font-medium text-gray-600">{txn.student}</td>
                  <td className="py-4 px-4 text-[14px] font-bold text-gray-900">₹{txn.amount.toLocaleString('en-IN')}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-50 text-gray-600 text-[13px] font-medium border border-gray-200">
                      {txn.method}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold ${txn.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[14px] text-gray-500">{txn.date}</td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-blue-600 hover:text-blue-700 text-[14px] font-semibold transition-colors">
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <RecordPaymentModal
        isOpen={isRecordPaymentModalOpen}
        onClose={() => setIsRecordPaymentModalOpen(false)}
        defaultStudent={selectedPaymentStudent}
      />
    </div>
  );
};

export default Fees;
