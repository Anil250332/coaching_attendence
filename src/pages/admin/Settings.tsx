import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Settings as SettingsIcon,
  User,
  Key,
  Mail,
  Phone,
  Building,
  Lock,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Shield,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

interface StaffUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'Sub-Admin' | 'Telecaller';
  status: 'Active' | 'Inactive';
  permissions: string[];
}

const availablePages = [
  'Dashboard',
  'Leads CRM',
  'Admissions',
  'Students',
  'Teachers',
  'Batches',
  'Attendance',
  'Fees Management',
  'Tests & Exams',
  'AI Analytics',
  'WhatsApp Automation',
  'Reports',
  'Settings'
];

const Settings: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get('tab') || 'profile';

  // Profile settings state
  const [instituteName, setInstituteName] = useState('CoachMaster Institute');
  const [contactEmail, setContactEmail] = useState('admin@coachmaster.com');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 00000');
  
  // Password security state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Password visibility states
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Staff Management state
  const [staffList, setStaffList] = useState<StaffUser[]>([
    { id: 1, name: 'Amit Sharma', email: 'amit@coachmaster.com', phone: '+91 99999 11111', role: 'Sub-Admin', status: 'Active', permissions: ['Dashboard', 'Students', 'Batches', 'Attendance'] },
    { id: 2, name: 'Pooja Patel', email: 'pooja@coachmaster.com', phone: '+91 99999 22222', role: 'Telecaller', status: 'Active', permissions: ['Leads CRM'] },
    { id: 3, name: 'Rohan Verma', email: 'rohan@coachmaster.com', phone: '+91 99999 33333', role: 'Telecaller', status: 'Active', permissions: ['Leads CRM'] }
  ]);

  // Modal states for adding staff
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffPhone, setNewStaffPhone] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<'Sub-Admin' | 'Telecaller'>('Sub-Admin');
  const [newStaffPassword, setNewStaffPassword] = useState('');
  const [newStaffPermissions, setNewStaffPermissions] = useState<string[]>(['Dashboard', 'Leads CRM', 'Admissions', 'Students']);

  const handleRoleChange = (role: 'Sub-Admin' | 'Telecaller') => {
    setNewStaffRole(role);
    if (role === 'Telecaller') {
      setNewStaffPermissions(['Leads CRM']);
    } else {
      setNewStaffPermissions(['Dashboard', 'Leads CRM', 'Admissions', 'Students']);
    }
  };

  const handlePermissionToggle = (page: string) => {
    if (newStaffRole === 'Telecaller') return; // Cannot modify telecaller permissions
    if (newStaffPermissions.includes(page)) {
      setNewStaffPermissions(newStaffPermissions.filter(p => p !== page));
    } else {
      setNewStaffPermissions([...newStaffPermissions, page]);
    }
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instituteName.trim() || !contactEmail.trim() || !phoneNumber.trim()) {
      toast.error('Please fill in all profile fields');
      return;
    }
    toast.success('Profile settings updated successfully!');
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    
    toast.success('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleAddStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim() || !newStaffEmail.trim() || !newStaffPhone.trim() || !newStaffPassword.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    const newStaff: StaffUser = {
      id: staffList.length + 1,
      name: newStaffName,
      email: newStaffEmail,
      phone: newStaffPhone,
      role: newStaffRole,
      status: 'Active',
      permissions: newStaffPermissions
    };

    setStaffList([...staffList, newStaff]);
    toast.success(`${newStaffRole} user added successfully!`);
    
    // Reset form
    setNewStaffName('');
    setNewStaffEmail('');
    setNewStaffPhone('');
    setNewStaffRole('Sub-Admin');
    setNewStaffPassword('');
    setNewStaffPermissions(['Dashboard', 'Leads CRM', 'Admissions', 'Students']);
    setIsAddStaffOpen(false);
  };

  const handleDeleteStaff = (id: number, name: string) => {
    setStaffList(staffList.filter(s => s.id !== id));
    toast.success(`Removed staff user: ${name}`);
  };

  return (
    <div className="space-y-8  mx-auto pb-12 px-4 sm:px-6">
      
      {/* Header */}
      <div className="flex items-center  gap-4 pt-4 sm:pt-0">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs border border-blue-100">
          <SettingsIcon className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-[28px] font-extrabold text-[#111827] leading-tight">Account Settings</h1>
          <p className="text-[14px] text-gray-500 font-semibold mt-1">
            {activeTab === 'staff' 
              ? 'Manage sub-admin and telecaller portal access accounts' 
              : 'Update your institute profile details and change password credentials'
            }
          </p>
        </div>
      </div>

      {activeTab === 'staff' ? (
        // STAFF MANAGEMENT VIEW
        <div className="bg-white border max-w-6xl border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[18px] font-extrabold text-gray-900">Staff Portal Access</h3>
                <p className="text-[12px] text-gray-400 font-bold mt-0.5">Manage and add sub-admin and telecaller accounts</p>
              </div>
            </div>
            <button
              onClick={() => setIsAddStaffOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-100 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Staff User
            </button>
          </div>

          {/* Staff List Table */}
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200 text-[12px] font-bold text-gray-500">
                  <th className="py-4 px-4 w-16">S.NO.</th>
                  <th className="py-4 px-4">NAME</th>
                  <th className="py-4 px-4">EMAIL</th>
                  <th className="py-4 px-4">PHONE</th>
                  <th className="py-4 px-4">ROLE</th>
                  <th className="py-4 px-4">ALLOWED PAGES</th>
                  <th className="py-4 px-4">STATUS</th>
                  <th className="py-4 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-[13px] font-medium text-gray-900">
                {staffList.map((staff, idx) => (
                  <tr key={staff.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4 text-gray-400 font-bold">{idx + 1}</td>
                    <td className="py-4 px-4 font-bold text-gray-900">{staff.name}</td>
                    <td className="py-4 px-4 text-gray-500">{staff.email}</td>
                    <td className="py-4 px-4 text-gray-600">{staff.phone}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${
                        staff.role === 'Sub-Admin' 
                          ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                          : 'bg-purple-50 text-purple-600 border border-purple-100'
                      }`}>
                        {staff.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {staff.permissions.map((perm, pIdx) => (
                          <span key={pIdx} className="bg-gray-100 text-gray-700 text-[10px] px-1.5 py-0.5 rounded border border-gray-200 font-semibold">
                            {perm}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        {staff.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button 
                        onClick={() => handleDeleteStaff(staff.id, staff.name)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Staff Modal dialog */}
          {isAddStaffOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
              <div className="bg-white border border-gray-100 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden transform scale-100 transition-transform">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-50/50 to-blue-50/50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Plus className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-gray-900">Add Staff Access</h3>
                      <p className="text-[11px] text-gray-500 font-semibold">Create new sub-admin or telecaller portal login</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsAddStaffOpen(false)}
                    className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddStaffSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Name</label>
                    <input
                      type="text"
                      required
                      value={newStaffName}
                      onChange={(e) => setNewStaffName(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-gray-900 font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="Enter Full Name"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      required
                      value={newStaffEmail}
                      onChange={(e) => setNewStaffEmail(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-gray-900 font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="Enter Email"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={newStaffPhone}
                      onChange={(e) => setNewStaffPhone(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-gray-900 font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="Enter Phone Number"
                    />
                  </div>

                  {/* Role selection dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Select Role</label>
                    <select
                      value={newStaffRole}
                      onChange={(e) => handleRoleChange(e.target.value as 'Sub-Admin' | 'Telecaller')}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-gray-900 font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all outline-none cursor-pointer"
                    >
                      <option value="Sub-Admin">Sub-Admin</option>
                      <option value="Telecaller">Telecaller</option>
                    </select>
                  </div>

                  {/* Dashboard Page Permissions */}
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-gray-700 block">
                      Page Permissions {newStaffRole === 'Telecaller' && <span className="text-[10px] text-gray-400 font-medium">(Auto-assigned to leads)</span>}
                    </label>
                    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 grid grid-cols-2 gap-2.5 max-h-44 overflow-y-auto custom-scrollbar">
                      {availablePages.map((page) => {
                        const isChecked = newStaffPermissions.includes(page);
                        const isDisabled = newStaffRole === 'Telecaller';
                        return (
                          <label key={page} className={`flex items-center gap-2 text-xs font-semibold select-none ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              disabled={isDisabled}
                              onChange={() => handlePermissionToggle(page)}
                              className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed"
                            />
                            <span className={isChecked ? 'text-gray-900 font-bold' : 'text-gray-500'}>{page}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-[12px] font-bold text-gray-700">Password</label>
                    <input
                      type="password"
                      required
                      value={newStaffPassword}
                      onChange={(e) => setNewStaffPassword(e.target.value)}
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs text-gray-900 font-semibold focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all outline-none"
                      placeholder="Enter Password"
                    />
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddStaffOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-100"
                    >
                      Save User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        // PROFILE & SECURITY VIEW
        <div className="flex flex-col max-w-4xl gap-6">
          
          {/* Form 1: Profile details card */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-3.5 mb-8 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[18px] font-extrabold text-gray-900">Profile Details</h3>
                <p className="text-[12px] text-gray-400 font-bold mt-0.5">Update public profile details of the institute</p>
              </div>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-5">
              {/* Institute Name */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  Institute Name
                </label>
                <input
                  type="text"
                  value={instituteName}
                  onChange={(e) => setInstituteName(e.target.value)}
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4.5 py-3 text-[13.5px] text-gray-900 font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all outline-none"
                  placeholder="Enter Institute Name"
                />
              </div>

              {/* Contact Email */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  Contact Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4.5 py-3 text-[13.5px] text-gray-900 font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all outline-none"
                  placeholder="Enter Contact Email"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4.5 py-3 text-[13.5px] text-gray-900 font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all outline-none"
                  placeholder="Enter Phone Number"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-100"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>

          {/* Form 2: Password Change Form */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-3.5 mb-8 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[18px] font-extrabold text-gray-900">Change Password</h3>
                <p className="text-[12px] text-gray-400 font-bold mt-0.5">Update and renew your security password</p>
              </div>
            </div>

            <form onSubmit={handlePasswordSave} className="space-y-5">
              {/* Current Password */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl pl-4.5 pr-12 py-3 text-[13.5px] text-gray-900 font-semibold focus:outline-hidden focus:border-purple-500 focus:bg-white transition-all outline-none"
                    placeholder="Enter Current Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl pl-4.5 pr-12 py-3 text-[13.5px] text-gray-900 font-semibold focus:outline-hidden focus:border-purple-500 focus:bg-white transition-all outline-none"
                    placeholder="Min 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl pl-4.5 pr-12 py-3 text-[13.5px] text-gray-900 font-semibold focus:outline-hidden focus:border-purple-500 focus:bg-white transition-all outline-none"
                    placeholder="Repeat New Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-6 py-3.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-purple-100"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

        </div>
      )}
    </div>
  );
};

export default Settings;
