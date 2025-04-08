
import React, { useEffect, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Bot, User, AlertTriangle, CheckCircle2, Search, DownloadCloud, Filter, RefreshCw } from 'lucide-react';
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

const ActivityLogs = () => {
  const [activityLogs, setActivityLogs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  
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
  
  const handleRefresh = () => {
    setActivityLogs(getActivityLogs());
  };
  
  // Filter logs based on selected status
  const filteredLogs = activityLogs.filter(log => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'blocked') return log.status === 'Blocked';
    if (statusFilter === 'allowed') return log.status === 'Allowed';
    return true;
  });
  
  return (
    <div className="p-6 animate-enter">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Activity Logs</h1>
        <p className="text-muted-foreground">Detailed history of all system activity</p>
      </div>
      
      <GlassCard>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="pl-10 pr-4 py-2 rounded-lg bg-secondary/50 w-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 py-2 px-4 rounded-lg bg-secondary/50 text-sm hover:bg-secondary transition-colors">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <select 
              className="bg-secondary/50 text-sm rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Activities</option>
              <option value="blocked">Blocked Only</option>
              <option value="allowed">Allowed Only</option>
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
        
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Bot size={48} className="mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium mb-2">No Activity Logs</h3>
            <p>Activity logs will appear here as users interact with the system.</p>
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
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
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
                    <TableCell className="text-sm">{log.location}</TableCell>
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
        
        {filteredLogs.length > 0 && (
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-muted-foreground">Showing {filteredLogs.length} of {activityLogs.length} entries</p>
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

export default ActivityLogs;
