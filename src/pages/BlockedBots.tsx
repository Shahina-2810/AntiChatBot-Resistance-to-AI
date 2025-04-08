
import React, { useEffect, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Shield, Search, DownloadCloud, Clock, Info, Users, RefreshCw, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getBlockedBots, BlockedBot } from '@/services/botDetectionService';

const BlockedBots = () => {
  const [blockedBots, setBlockedBots] = useState<BlockedBot[]>([]);
  
  useEffect(() => {
    // Initial fetch
    setBlockedBots(getBlockedBots());
    
    // Set up interval for real-time updates
    const interval = setInterval(() => {
      setBlockedBots(getBlockedBots());
    }, 5000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);
  
  const handleRefresh = () => {
    setBlockedBots(getBlockedBots());
  };
  
  return (
    <div className="p-6 animate-enter">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Blocked Bots</h1>
        <p className="text-muted-foreground">Manage and review blocked bots and scraper activity</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <GlassCard className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Bots Blocked</p>
            <h3 className="text-2xl font-semibold">{blockedBots.length}</h3>
          </div>
        </GlassCard>
        
        <GlassCard className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Average Block Duration</p>
            <h3 className="text-2xl font-semibold">
              {blockedBots.length ? '24 hours' : 'N/A'}
            </h3>
          </div>
        </GlassCard>
        
        <GlassCard className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Active Blocks</p>
            <h3 className="text-2xl font-semibold">{blockedBots.length}</h3>
          </div>
        </GlassCard>
      </div>
      
      <GlassCard>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search blocked bots..." 
              className="pl-10 pr-4 py-2 rounded-lg bg-secondary/50 w-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select className="bg-secondary/50 text-sm rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
              <option value="all">All Durations</option>
              <option value="temporary">Temporary</option>
              <option value="permanent">Permanent</option>
            </select>
            <button 
              className="flex items-center gap-2 py-2 px-4 rounded-lg bg-secondary/50 text-sm hover:bg-secondary transition-colors"
              onClick={handleRefresh}
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
            <button className="flex items-center gap-2 py-2 px-4 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors">
              <DownloadCloud size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        {blockedBots.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Shield size={48} className="mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium mb-2">No Blocked Bots</h3>
            <p>When suspicious activity is detected, blocked bots will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {blockedBots.map((bot) => (
              <div 
                key={bot.id} 
                className="p-5 border border-border/60 rounded-lg hover:border-border transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between md:items-center">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Shield size={16} className="text-destructive" />
                      <h4 className="font-medium">{bot.ip}</h4>
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        bot.score > 90 ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : 
                        "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                      )}>
                        Score: {bot.score}
                      </span>
                      {bot.location && (
                        <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">
                          {bot.location}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium mt-1">{bot.reason}</p>
                    <p className="text-sm text-muted-foreground mt-1">{bot.details}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-3 md:mt-0">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} />
                      <span>{bot.duration}</span>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="View Details">
                        <Info size={16} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="Unblock">
                        <XCircle size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Blocked At:</span>
                    <span>{bot.blockedAt}</span>
                  </div>
                  {bot.deviceInfo && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Device Info:</span>
                      <span>{bot.deviceInfo}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {blockedBots.length > 0 && (
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-muted-foreground">Showing {blockedBots.length} of {blockedBots.length} active blocks</p>
            <div className="flex items-center gap-2">
              <button className="py-1 px-3 rounded bg-secondary text-sm hover:bg-secondary/80 transition-colors">Previous</button>
              <button className="py-1 px-3 rounded bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors">Next</button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default BlockedBots;
