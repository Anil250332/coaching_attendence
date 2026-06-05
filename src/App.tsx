import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Leads from './pages/Leads'
import Admissions from './pages/Admissions'
import Students from './pages/Students'
import StudentProfile from './pages/StudentProfile'
import Batches from './pages/Batches'
import Attendance from './pages/Attendance'
import BatchAttendance from './pages/BatchAttendance'
import Fees from './pages/Fees'
import Tests from './pages/Tests'
import AIAnalytics from './pages/AIAnalytics'
import Teachers from './pages/Teachers'
import Whatsapp from './pages/Whatsapp'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import { Toaster } from 'react-hot-toast'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected/Dashboard Routes */}
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
          {/* Catch all other sidebar paths and redirect to dashboard for now */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
