
import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 border-b bg-card fixed top-0 right-0 left-0 z-20 ml-64">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 rounded-lg bg-secondary/50 w-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-secondary transition-colors relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="h-8 w-px bg-border"></div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">Administrator</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
            <button className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
              <User size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
