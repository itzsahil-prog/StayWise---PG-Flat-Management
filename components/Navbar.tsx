
import React from 'react';
import { User, UserRole } from '../types';
import { LayoutDashboard, Search, Home, Bell, MessageSquare, LogOut, Settings, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  user: User;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onRoleChange, activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 md:top-0 md:bottom-auto w-full bg-white border-t md:border-t-0 md:border-b border-slate-200 z-50 px-4 py-2 md:py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">SW</div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">StayWise</span>
        </div>

        <div className="flex flex-1 justify-around md:justify-center md:gap-8">
          <button 
            onClick={() => setActiveTab('explore')}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-1 rounded-lg transition-colors ${activeTab === 'explore' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-500'}`}
          >
            <Search size={20} />
            <span className="text-xs md:text-sm font-medium">Explore</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-1 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-500'}`}
          >
            <LayoutDashboard size={20} />
            <span className="text-xs md:text-sm font-medium">Dashboard</span>
          </button>

          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-1 rounded-lg transition-colors ${activeTab === 'messages' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-500'}`}
          >
            <MessageSquare size={20} />
            <span className="text-xs md:text-sm font-medium">Chat</span>
          </button>

          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-1 rounded-lg transition-colors ${activeTab === 'notifications' ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-500'}`}
          >
            <Bell size={20} />
            <span className="text-xs md:text-sm font-medium">Inbox</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <select 
            value={user.role}
            onChange={(e) => onRoleChange(e.target.value as UserRole)}
            className="text-sm bg-slate-100 border-none rounded-full px-4 py-2 font-medium cursor-pointer focus:ring-2 focus:ring-indigo-500"
          >
            <option value={UserRole.RENTER}>Renter View</option>
            <option value={UserRole.OWNER}>Owner View</option>
            <option value={UserRole.ADMIN}>Admin View</option>
          </select>
          
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100 ring-2 ring-white">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
