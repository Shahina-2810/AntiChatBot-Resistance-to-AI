
import React, { useEffect, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Clock, Info, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getBlockedBots, BlockedBot } from '@/services/botDetectionService';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function BlockedBotsTable() {
  const [blockedBots, setBlockedBots] = useState<BlockedBot[]>([]);
  
  // Fetch blocked bots on component mount and every 5 seconds
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
  
  return (
    <GlassCard>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recently Blocked Bots</h3>
        <button className="text-xs text-primary">View All</button>
      </div>
      
      {blockedBots.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          No bots have been blocked yet. When suspicious activity is detected, it will appear here in real-time.
        </div>
      ) : (
        <div className="space-y-3">
          {blockedBots.slice(0, 3).map((bot) => (
            <div 
              key={bot.id} 
              className="p-4 border border-border/60 rounded-lg hover:border-border transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-destructive" />
                    <h4 className="font-medium">{bot.ip}</h4>
                    <span className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      bot.score > 90 ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : 
                      "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                    )}>
                      Score: {bot.score}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{bot.reason}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>{bot.duration}</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="p-1.5 rounded-full hover:bg-secondary transition-colors">
                          <Info size={14} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{bot.location} • {bot.deviceInfo}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-muted-foreground flex items-center gap-2">
                <span className="px-2 py-1 bg-secondary rounded-md">{bot.blockedAt}</span>
                <div className="h-1 w-1 rounded-full bg-muted-foreground/50"></div>
                <span>{bot.details}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
