import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Database, 
  Bell, 
  Palette, 
  Mail 
} from 'lucide-react';

interface SettingsCardProps {
  title: string;
  icon: React.ComponentType<any>;
  iconBgColor: string;
  iconTextColor: string;
  options: {
    label: string;
    description: string;
  }[];
}

const SettingsCard: React.FC<SettingsCardProps> = ({ 
  title, 
  icon: Icon, 
  iconBgColor, 
  iconTextColor, 
  options 
}) => {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-xl ${iconBgColor} ${iconTextColor} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-[17px] font-extrabold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-3">
        {options.map((opt, index) => (
          <div 
            key={index} 
            className="p-3 bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#E5E7EB] rounded-xl cursor-pointer transition-all duration-150"
          >
            <h4 className="text-[13px] font-bold text-gray-900">{opt.label}</h4>
            <p className="text-[11px] text-gray-500 font-semibold mt-0.5">{opt.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Settings: React.FC = () => {
  const [instituteName, setInstituteName] = useState('CoachMaster Institute');
  const [contactEmail, setContactEmail] = useState('admin@coachmaster.com');
  const [phoneNumber, setPhoneNumber] = useState('+91 98765 00000');
  const [website, setWebsite] = useState('www.coachmaster.com');
  const [address, setAddress] = useState('Sector 15, Noida, Uttar Pradesh 201301');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saved changes:', { instituteName, contactEmail, phoneNumber, website, address });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center gap-3 pt-4 sm:pt-0">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <SettingsIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-[28px] font-bold text-[#111827]">Settings</h1>
          <p className="text-[15px] text-gray-500 font-medium mt-1">Manage your institute settings and preferences</p>
        </div>
      </div>

      {/* Profile Banner */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-md transition-all duration-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-sm shrink-0">
            CM
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-snug">CoachMaster Institute</h2>
            <p className="text-[14px] text-gray-500 font-semibold">{contactEmail}</p>
            <p className="text-[12px] text-gray-400 font-bold mt-1">Premium Plan • Active since Jan 2024</p>
          </div>
        </div>
        <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-xl font-semibold text-[14px] transition-colors shadow-sm shrink-0">
          Edit Profile
        </button>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <SettingsCard 
            title="Profile Settings"
            icon={User}
            iconBgColor="bg-[#EFF6FF]"
            iconTextColor="text-[#2563EB]"
            options={[
              { label: 'Personal Information', description: 'Update your name, email, and contact details' },
              { label: 'Password & Security', description: 'Change password and enable 2FA' }
            ]}
          />

          <SettingsCard 
            title="Access & Permissions"
            icon={Shield}
            iconBgColor="bg-[#FEF2F2]"
            iconTextColor="text-[#EF4444]"
            options={[
              { label: 'User Roles', description: 'Manage admin, teacher, and staff roles' },
              { label: 'Module Permissions', description: 'Control access to different modules' }
            ]}
          />

          <SettingsCard 
            title="Data Management"
            icon={Database}
            iconBgColor="bg-[#ECFDF5]"
            iconTextColor="text-[#0D9488]"
            options={[
              { label: 'Backup & Restore', description: 'Manage data backups' },
              { label: 'Import/Export', description: 'Bulk import or export data' }
            ]}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <SettingsCard 
            title="Notifications"
            icon={Bell}
            iconBgColor="bg-[#FFF7ED]"
            iconTextColor="text-[#F59E0B]"
            options={[
              { label: 'Email Notifications', description: 'Configure email alerts and reports' },
              { label: 'WhatsApp Notifications', description: 'Manage WhatsApp message settings' },
              { label: 'SMS Notifications', description: 'Setup SMS alerts for important events' }
            ]}
          />

          <SettingsCard 
            title="Appearance"
            icon={Palette}
            iconBgColor="bg-[#F5F3FF]"
            iconTextColor="text-[#8B5CF6]"
            options={[
              { label: 'Theme Settings', description: 'Customize colors and branding' },
              { label: 'Layout Options', description: 'Configure dashboard layout' }
            ]}
          />

          <SettingsCard 
            title="Integrations"
            icon={Mail}
            iconBgColor="bg-[#FDF2F8]"
            iconTextColor="text-[#EC4899]"
            options={[
              { label: 'Payment Gateway', description: 'Connect payment processors' },
              { label: 'Email Service', description: 'Configure SMTP settings' },
              { label: 'WhatsApp Business API', description: 'Connect WhatsApp Business account' }
            ]}
          />
        </div>
      </div>

      {/* Bottom Form: Institute Information */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-200">
        <h3 className="text-[17px] font-extrabold text-gray-900 mb-6">Institute Information</h3>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-gray-700">Institute Name</label>
              <input 
                type="text" 
                value={instituteName}
                onChange={(e) => setInstituteName(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[14px] text-gray-900 font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-gray-700">Contact Email</label>
              <input 
                type="email" 
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[14px] text-gray-900 font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-gray-700">Phone Number</label>
              <input 
                type="text" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[14px] text-gray-900 font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-gray-700">Website</label>
              <input 
                type="text" 
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[14px] text-gray-900 font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-gray-700">Address</label>
            <textarea 
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[14px] text-gray-900 font-medium focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              className="bg-[#10B981] hover:bg-[#059669] text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
