import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  CalendarCheck,
  FileText,
  HelpCircle,
  Bell,
  BrainCircuit,
  BarChart2,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

const sidebarLinks = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/teacher/dashboard' },
  { name: 'My Batches', icon: BookOpen, path: '/teacher/batches' },
  { name: 'Students', icon: GraduationCap, path: '/teacher/students' },
  { name: 'Attendance', icon: CalendarCheck, path: '/teacher/attendance' },
  { name: 'Tests & Exams', icon: FileText, path: '/teacher/tests' },
  { name: 'Practice Questions', icon: HelpCircle, path: '/teacher/practice' },
  { name: 'Notice Board', icon: Bell, path: '/teacher/notices' },
  { name: 'AI Insights', icon: BrainCircuit, path: '/teacher/ai-insights' },
  { name: 'Reports', icon: BarChart2, path: '/teacher/reports' },
  { name: 'Profile', icon: User, path: '/teacher/profile' },
];

const TeacherLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50/50">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity" 
          onClick={() => setIsMobileOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        } w-64 fixed lg:relative inset-y-0 left-0 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-50`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 shrink-0">
          <div className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${(!isCollapsed || isMobileOpen) ? 'opacity-100 w-full' : 'opacity-0 w-0'}`}>
            <h1 className="text-xl font-bold text-blue-600 truncate">Teacher Portal</h1>
            <p className="text-[10px] text-gray-500 font-medium truncate">IIT-JEE & NEET Coaching</p>
          </div>
          
          {/* Desktop Collapse Toggle */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`hidden lg:block text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100 ${isCollapsed ? 'mx-auto' : ''}`}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          {/* Mobile Close Toggle */}
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600 p-1.5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            const showLabel = !isCollapsed || isMobileOpen;

            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileOpen(false)}
                title={!showLabel ? link.name : undefined}
                className={`flex items-center px-3 py-3.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${!showLabel ? 'justify-center' : ''}`}
              >
                <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-gray-700'}`} />
                <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${showLabel ? 'opacity-100 ml-3 w-full' : 'opacity-0 ml-0 w-0'}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className={`px-5 py-8 border-t border-gray-100 flex items-center justify-between shrink-0 ${(!isCollapsed || isMobileOpen) ? '' : 'justify-center'}`}>
          <div className="flex items-center min-w-0">
            <div className="h-10 w-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0 cursor-pointer">
              RK
            </div>
            <div className={`whitespace-nowrap overflow-hidden transition-all duration-300 min-w-0 ${(!isCollapsed || isMobileOpen) ? 'opacity-100 ml-3' : 'opacity-0 ml-0 w-0'}`}>
              <p className="text-sm font-semibold text-gray-900 truncate">Dr. Rajesh Kumar</p>
              <p className="text-xs text-gray-500 truncate">Physics Faculty</p>
            </div>
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <button
              onClick={handleLogout}
              className="text-red-600 transition-colors p-2 bg-red-50 rounded-lg shrink-0 ml-2"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 bg-white border-b border-gray-100 flex items-center px-4 shrink-0 shadow-sm z-30">
          <div className="flex items-center gap-4 shrink-0 relative">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative group"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <div className="ml-2">
            <h1 className="text-lg font-bold text-blue-600 truncate">Teacher Portal</h1>
          </div>
          <div className="ml-auto w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0">
            RK
          </div>
        </div>

        {/* Header Content Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TeacherLayout;
