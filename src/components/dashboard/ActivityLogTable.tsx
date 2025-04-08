
import React, { useEffect, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Bot, User, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getActivityLogs } from '@/services/botDetectionService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

export function ActivityLogTable() {
  const [activityLogs, setActivityLogs] = useState([]);
  
  // Fetch activity logs on component mount and every 5 seconds
  useEffect(() => {
    // Initial fetch
    setActivityLogs(getActivityLogs());
    
    // Set up interval for real-time updates
    const interval = setInterval(() => {
      setActivityLogs(getActivityLogs());
    }, 5000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);
  
  return (
    <GlassCard>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Activity Logs</h3>
        <button className="text-xs text-primary">View All</button>
      </div>
      
      {activityLogs.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          No activity logs yet. When users interact with the system, logs will appear here.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLogs.slice(0, 5).map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    {log.score > 50 ? (
                      <Bot size={16} className="text-destructive" />
                    ) : (
                      <User size={16} className="text-primary" />
                    )}
                  </TableCell>
                  <TableCell className="text-sm">{log.ip}</TableCell>
                  <TableCell className="text-sm">{log.timestamp}</TableCell>
                  <TableCell className="text-sm">{log.action}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full", 
                            log.score > 75 ? "bg-red-500" : 
                            log.score > 50 ? "bg-orange-500" : 
                            log.score > 25 ? "bg-yellow-500" : "bg-green-500"
                          )}
                          style={{ width: `${log.score}%` }}
                        ></div>
                      </div>
                      <span className="text-xs w-8">{log.score}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{log.device}</TableCell>
                  <TableCell>
                    {log.status === 'Blocked' ? (
                      <div className="flex items-center gap-1 text-xs font-medium text-red-500">
                        <AlertTriangle size={12} />
                        <span>Blocked</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs font-medium text-green-500">
                        <CheckCircle2 size={12} />
                        <span>Allowed</span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </GlassCard>
  );
}
