
import React from 'react';
import { Shield, Activity, AlertCircle, User } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { BotScoreChart } from '@/components/dashboard/BotScoreChart';
import { ActivityLogTable } from '@/components/dashboard/ActivityLogTable';
import { BlockedBotsTable } from '@/components/dashboard/BlockedBotsTable';
import { GlassCard } from '@/components/ui/GlassCard';
import { ChatInterface } from '@/components/chat/ChatInterface';

const Index = () => {
  return (
    <div className="p-6 animate-enter">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage bot detection activity</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard 
          title="Total Visitors" 
          value="2,584" 
          description="Unique IP addresses" 
          icon={<User size={20} />} 
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard 
          title="Detection Rate" 
          value="98.2%" 
          description="Accuracy score" 
          icon={<Shield size={20} />} 
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard 
          title="Blocked Bots" 
          value="127" 
          description="This month" 
          icon={<AlertCircle size={20} />} 
          trend={{ value: 18, isPositive: true }}
        />
        <StatCard 
          title="Scraping Attempts" 
          value="89" 
          description="Last 7 days" 
          icon={<Activity size={20} />} 
          trend={{ value: 5, isPositive: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="md:col-span-2">
          <BotScoreChart />
        </div>
        <div>
          <GlassCard className="h-[350px]">
            <h3 className="text-lg font-semibold mb-3">Protection Status</h3>
            
            <div className="space-y-6 mt-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">RVRJC Scraping Status</span>
                  <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs px-2 py-0.5 rounded-full font-medium">Allowed</span>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">VVIT Scraping Status</span>
                  <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs px-2 py-0.5 rounded-full font-medium">Allowed</span>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">KITS Guntur Scraping Status</span>
                  <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs px-2 py-0.5 rounded-full font-medium">Blocked</span>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Bot Detection ML Model</span>
                  <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs px-2 py-0.5 rounded-full font-medium">Active</span>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Real-time Monitoring</span>
                  <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs px-2 py-0.5 rounded-full font-medium">Active</span>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <ChatInterface />
        <BlockedBotsTable />
      </div>
      
      <div className="grid grid-cols-1 gap-5">
        <ActivityLogTable />
      </div>
    </div>
  );
};

export default Index;
