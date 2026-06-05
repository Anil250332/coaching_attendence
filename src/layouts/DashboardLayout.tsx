import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  GraduationCap, 
  BookOpen, 
  CalendarCheck, 
  IndianRupee, 
  FileText, 
  BrainCircuit, 
  School, 
  MessageCircle,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const sidebarLinks = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Leads CRM', icon: Users, path: '/leads' },
  { name: 'Admissions', icon: UserPlus, path: '/admissions' },
  { name: 'Students', icon: GraduationCap, path: '/students' },
  { name: 'Batches', icon: BookOpen, path: '/batches' },
  { name: 'Attendance', icon: CalendarCheck, path: '/attendance' },
  { name: 'Fees Management', icon: IndianRupee, path: '/fees' },
  { name: 'Tests & Exams', icon: FileText, path: '/tests' },
  { name: 'AI Analytics', icon: BrainCircuit, path: '/analytics' },
  { name: 'Teachers', icon: School, path: '/teachers' },
  { name: 'WhatsApp Automation', icon: MessageCircle, path: '/whatsapp' },
  { name: 'Reports', icon: BarChart2, path: '/reports' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
            <h1 className="text-xl font-bold text-blue-600 truncate">CoachMaster</h1>
            <p className="text-[10px] text-gray-500 font-medium truncate">Institute Management</p>
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
        <div className={`p-4 border-t border-gray-100 flex items-center shrink-0 ${(!isCollapsed || isMobileOpen) ? '' : 'justify-center'}`}>
          <div className="h-10 w-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0 cursor-pointer">
            A
          </div>
          <div className={`whitespace-nowrap overflow-hidden transition-all duration-300 min-w-0 ${(!isCollapsed || isMobileOpen) ? 'opacity-100 ml-3 flex-1' : 'opacity-0 ml-0 w-0 flex-none'}`}>
            <p className="text-sm font-semibold text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@coachmaster.com</p>
          </div>
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
            <h1 className="text-lg font-bold text-blue-600 truncate">CoachMaster</h1>
          </div>
          <div className="ml-auto w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0">
            A
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

export default DashboardLayout;
