
import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { 
  Save, 
  Shield, 
  AlertTriangle, 
  Clock, 
  RefreshCw, 
  Database, 
  Server, 
  Settings as SettingsIcon,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

const Settings = () => {
  const [aiModelEnabled, setAiModelEnabled] = React.useState(true);
  const [realTimeMonitoring, setRealTimeMonitoring] = React.useState(true);
  const [kitsProtection, setKitsProtection] = React.useState(true);
  const [automatedBlocking, setAutomatedBlocking] = React.useState(true);
  
  return (
    <div className="p-6 animate-enter">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">Configure and manage system preferences</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <Shield size={18} />
              <h3 className="text-lg font-semibold">Protection Settings</h3>
            </div>
            
            <div className="space-y-5">
              <div className="flex justify-between items-center p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">AI Model Detection</h4>
                  <p className="text-sm text-muted-foreground mt-1">Enable the machine learning model for bot detection</p>
                </div>
                <button 
                  onClick={() => setAiModelEnabled(!aiModelEnabled)}
                  className="text-primary"
                >
                  {aiModelEnabled ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                </button>
              </div>
              
              <div className="flex justify-between items-center p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">Real-time Monitoring</h4>
                  <p className="text-sm text-muted-foreground mt-1">Enable real-time behavior analysis for visitors</p>
                </div>
                <button 
                  onClick={() => setRealTimeMonitoring(!realTimeMonitoring)}
                  className="text-primary"
                >
                  {realTimeMonitoring ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                </button>
              </div>
              
              <div className="flex justify-between items-center p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">KITS Guntur Protection</h4>
                  <p className="text-sm text-muted-foreground mt-1">Block all scraping attempts for KITS Guntur</p>
                </div>
                <button 
                  onClick={() => setKitsProtection(!kitsProtection)}
                  className="text-primary"
                >
                  {kitsProtection ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                </button>
              </div>
              
              <div className="flex justify-between items-center p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">Automated Blocking</h4>
                  <p className="text-sm text-muted-foreground mt-1">Allow system to automatically block detected bots</p>
                </div>
                <button 
                  onClick={() => setAutomatedBlocking(!automatedBlocking)}
                  className="text-primary"
                >
                  {automatedBlocking ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                </button>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} />
              <h3 className="text-lg font-semibold">Detection Parameters</h3>
            </div>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Bot Score Threshold</label>
                  <span className="text-xs bg-secondary rounded px-2 py-1">Current: 50</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue={50}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Lenient</span>
                  <span>Strict</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Block Duration</label>
                  <span className="text-xs bg-secondary rounded px-2 py-1">Current: 24 hours</span>
                </div>
                <select className="w-full p-2 rounded-lg border border-input bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                  <option>1 hour</option>
                  <option>6 hours</option>
                  <option>12 hours</option>
                  <option selected>24 hours</option>
                  <option>48 hours</option>
                  <option>1 week</option>
                  <option>Permanent</option>
                </select>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Detection Sensitivity</label>
                  <span className="text-xs bg-secondary rounded px-2 py-1">Current: Medium</span>
                </div>
                <select className="w-full p-2 rounded-lg border border-input bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                  <option>Low</option>
                  <option selected>Medium</option>
                  <option>High</option>
                  <option>Very High</option>
                </select>
              </div>
            </div>
          </GlassCard>
        </div>
        
        <div className="space-y-6">
          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} />
              <h3 className="text-lg font-semibold">System Maintenance</h3>
            </div>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-input bg-secondary/30 hover:bg-secondary/60 transition-all">
                <div className="flex items-center gap-2">
                  <RefreshCw size={16} />
                  <span className="text-sm font-medium">Update AI Model</span>
                </div>
                <span className="text-xs text-muted-foreground">Last: 2 days ago</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-input bg-secondary/30 hover:bg-secondary/60 transition-all">
                <div className="flex items-center gap-2">
                  <Database size={16} />
                  <span className="text-sm font-medium">Clear Activity Logs</span>
                </div>
                <span className="text-xs text-muted-foreground">154 entries</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-input bg-secondary/30 hover:bg-secondary/60 transition-all">
                <div className="flex items-center gap-2">
                  <Server size={16} />
                  <span className="text-sm font-medium">System Diagnostics</span>
                </div>
                <span className="text-xs text-muted-foreground">Run check</span>
              </button>
            </div>
          </GlassCard>
          
          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <SettingsIcon size={18} />
              <h3 className="text-lg font-semibold">Advanced Settings</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Model Path</label>
                <input 
                  type="text"
                  defaultValue="/data/models/bot_detection.pkl"
                  className="w-full mt-1 p-2 rounded-lg border border-input bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Dataset Directory</label>
                <input 
                  type="text"
                  defaultValue="/data/datasets/bot_behavior/"
                  className="w-full mt-1 p-2 rounded-lg border border-input bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">API Key</label>
                <input 
                  type="password"
                  defaultValue="sk_test_example_key"
                  className="w-full mt-1 p-2 rounded-lg border border-input bg-secondary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
      
      <div className="flex justify-end mt-6">
        <button className="flex items-center gap-2 py-2 px-6 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Save size={16} />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Settings;
