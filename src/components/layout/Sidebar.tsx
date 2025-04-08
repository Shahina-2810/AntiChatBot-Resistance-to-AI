
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Shield, 
  List, 
  Activity, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

type NavLinkProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
};

const NavLink = ({ to, icon, label, collapsed }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={cn("nav-link group", isActive && "active")}
    >
      <span className="w-5 h-5">{icon}</span>
      <span className={cn(
        "transition-all duration-300",
        collapsed ? "opacity-0 w-0 hidden" : "opacity-100"
      )}>
        {label}
      </span>
    </Link>
  );
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div 
      className={cn(
        "h-screen bg-card border-r fixed top-0 left-0 z-30 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="h-16 border-b flex items-center justify-between px-4">
        <div className={cn(
          "flex items-center gap-2 transition-opacity duration-300",
          collapsed ? "opacity-0" : "opacity-100"
        )}>
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">ShieldGuard</span>
        </div>
        {collapsed && <Shield className="h-6 w-6 text-primary mx-auto" />}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full p-1 hover:bg-secondary transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <nav className="p-3 flex flex-col gap-1">
        <NavLink to="/" icon={<BarChart3 size={18} />} label="Dashboard" collapsed={collapsed} />
        <NavLink to="/activity-logs" icon={<Activity size={18} />} label="Activity Logs" collapsed={collapsed} />
        <NavLink to="/blocked-bots" icon={<List size={18} />} label="Blocked Bots" collapsed={collapsed} />
        <NavLink to="/settings" icon={<Settings size={18} />} label="Settings" collapsed={collapsed} />
      </nav>
    </div>
  );
}
