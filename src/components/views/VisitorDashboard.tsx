import * as React from 'react';
import { motion } from 'motion/react';
import { Users, Globe, Terminal, Shield, ChartBar, MapPin, Activity } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function VisitorDashboard() {
  const [stats, setStats] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div className="p-8 opacity-50 italic">Loading intelligence data...</div>;

  return (
    <div className="h-full overflow-auto bg-[var(--vscode-bg)] p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500">
            <ChartBar size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">System Intelligence</h1>
            <p className="text-sm opacity-60">Visitor analytics and system telemetry</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard 
            icon={<Users className="text-blue-400" />} 
            label="Total Visits" 
            value={stats.visits.toLocaleString()} 
            sub="Lifetime traffic"
          />
          <StatCard 
            icon={<MapPin className="text-green-400" />} 
            label="Unique Regions" 
            value={Object.keys(stats.locations).length.toString()} 
            sub="Global reach"
          />
          <StatCard 
            icon={<Activity className="text-red-400" />} 
            label="System Load" 
            value="Lo-Fi" 
            sub="Optimized for performance"
          />
          <StatCard 
            icon={<Terminal className="text-purple-400" />} 
            label="Commands Run" 
            value={(stats.visits * 4.2).toFixed(0)} 
            sub="Estimated interaction"
          />
        </div>

        <div className="bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-xl p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-6 opacity-60 flex items-center gap-2">
            <Activity size={16} /> Incoming Telemetery (24h)
          </h3>
          <div className="h-24 flex items-end gap-1 px-2">
            {Array.from({ length: 24 }).map((_, i) => {
              const height = Math.random() * 80 + 20;
              return (
                <div key={i} className="flex-1 group relative">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    className={cn(
                      "w-full rounded-t-sm transition-all",
                      i === 23 ? "bg-blue-500" : "bg-blue-500/20"
                    )}
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[var(--vscode-tab-active)] text-[var(--vscode-text)] border border-[var(--vscode-border)] text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {Math.round(height)} hits
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-[10px] opacity-30 font-mono">
            <span>24h ago</span>
            <span>Now</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6 opacity-60 flex items-center gap-2">
              <MapPin size={16} /> Regional Distribution
            </h3>
            <div className="space-y-4">
              {Object.entries(stats.locations).sort((a:any, b:any) => b[1] - a[1]).map(([loc, count]: any) => (
                <div key={loc} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{loc}</span>
                    <span className="opacity-60">{count}</span>
                  </div>
                  <div className="h-1 bg-[var(--vscode-bg)] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / stats.visits) * 100}%` }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-xl p-6 overflow-hidden relative">
             <div className="absolute top-0 right-0 p-8 opacity-5">
               <Shield size={120} />
             </div>
             <h3 className="text-sm font-bold uppercase tracking-wider mb-6 opacity-60 flex items-center gap-2">
              <Shield size={16} /> System Health
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="text-sm">
                  <div className="font-bold">Real-time Connection Area</div>
                  <div className="text-xs opacity-60 text-green-500/80">LATENCY: 24ms</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="text-sm">
                  <div className="font-bold">Encryption Status</div>
                  <div className="text-xs opacity-60">TLS 1.3 | AES-256-GCM</div>
                </div>
              </div>
              <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-[10px] leading-relaxed opacity-80">
                   Intelligence dashboard is currently in "Observer Mode". Global telemetry is anonymized and aggregated across sessions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-xl p-6 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-[var(--vscode-bg)] rounded-lg">
          {icon}
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold mb-1 tracking-tight">{value}</div>
        <div className="text-xs font-bold uppercase opacity-40">{label}</div>
        <p className="text-[10px] opacity-30 mt-2 italic">{sub}</p>
      </div>
    </motion.div>
  );
}
