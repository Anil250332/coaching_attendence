import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/admin/Dashboard'
import Leads from './pages/admin/Leads'
import Admissions from './pages/admin/Admissions'
import Students from './pages/admin/Students'
import StudentProfile from './pages/admin/StudentProfile'
import Batches from './pages/admin/Batches'
import Attendance from './pages/admin/Attendance'
import BatchAttendance from './pages/admin/BatchAttendance'
import Fees from './pages/admin/Fees'
import Tests from './pages/admin/Tests'
import AIAnalytics from './pages/admin/AIAnalytics'
import Teachers from './pages/admin/Teachers'
import Whatsapp from './pages/admin/Whatsapp'
import Reports from './pages/admin/Reports'
import Settings from './pages/admin/Settings'

// Teacher layout & page imports
import TeacherLayout from './layouts/TeacherLayout'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherBatches from './pages/teacher/TeacherBatches'
import TeacherStudents from './pages/teacher/TeacherStudents'
import TeacherAttendance from './pages/teacher/TeacherAttendance'
import TeacherTests from './pages/teacher/TeacherTests'
import TeacherPractice from './pages/teacher/TeacherPractice'
import TeacherNotices from './pages/teacher/TeacherNotices'
import TeacherAIInsights from './pages/teacher/TeacherAIInsights'
import TeacherReports from './pages/teacher/TeacherReports'
import TeacherProfile from './pages/teacher/TeacherProfile'

import { Toaster } from 'react-hot-toast'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:id" element={<StudentProfile />} />
          <Route path="/batches" element={<Batches />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/attendance/batch/:id" element={<BatchAttendance />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/analytics" element={<AIAnalytics />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/whatsapp" element={<Whatsapp />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Protected Teacher Routes */}
        <Route element={<TeacherLayout />}>
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/batches" element={<TeacherBatches />} />
          <Route path="/teacher/students" element={<TeacherStudents />} />
          <Route path="/teacher/attendance" element={<TeacherAttendance />} />
          <Route path="/teacher/tests" element={<TeacherTests />} />
          <Route path="/teacher/practice" element={<TeacherPractice />} />
          <Route path="/teacher/notices" element={<TeacherNotices />} />
          <Route path="/teacher/ai-insights" element={<TeacherAIInsights />} />
          <Route path="/teacher/reports" element={<TeacherReports />} />
          <Route path="/teacher/profile" element={<TeacherProfile />} />
        </Route>

        {/* Catch all other paths and redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
