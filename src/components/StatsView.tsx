import * as React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, Activity, Github, 
  Clock, Code, Star, GitBranch,
  Cpu, Monitor, Server, Globe, Trophy, Zap
} from 'lucide-react';
import { cn } from '../lib/utils';

interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
}

export function StatsView() {
  const [githubData, setGithubData] = React.useState<GitHubData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://api.github.com/users/Sumit-5002')
      .then(res => res.json())
      .then(data => {
        setGithubData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h2 className="text-3xl font-bold">System Status</h2>
          <p className="opacity-50 text-sm">Live GitHub synchronization active</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
           <div className={cn("w-2 h-2 bg-green-500 rounded-full", loading ? "animate-ping" : "animate-pulse")} />
           <span className="text-green-500 text-[10px] font-bold uppercase tracking-widest">
             {loading ? 'Syncing...' : 'Live Data Connected'}
           </span>
        </div>
      </motion.div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: 'GitHub Repos', 
            value: loading ? '...' : githubData?.public_repos || '15+', 
            icon: <Code className="text-blue-500" />, 
            trend: 'Live' 
          },
          { 
            label: 'Followers', 
            value: loading ? '...' : githubData?.followers || '0', 
            icon: <Star className="text-yellow-500" />, 
            trend: 'GitHub' 
          },
          { 
            label: 'Cloud Badges', 
            value: '100+', 
            icon: <Zap className="text-orange-500" />, 
            trend: 'Elite' 
          },
          { 
            label: 'Hackathon Status', 
            value: 'Finalist', 
            icon: <Trophy className="text-purple-500" />, 
            trend: 'Johns Hopkins' 
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-xl relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[var(--vscode-bg)] border border-[var(--vscode-border)] rounded-lg">
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded">
                {stat.trend}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-[10px] uppercase font-bold opacity-40 tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coding Activity Graph */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Activity size={16} className="text-blue-500" />
              Development Activity
            </h3>
            <div className="text-[10px] opacity-40 font-mono italic">Github Pulse</div>
          </div>
          
          <div className="h-48 flex items-end gap-1.5">
             {Array.from({ length: 48 }).map((_, i) => {
               const height = i % 7 === 0 ? 10 + Math.random() * 20 : 30 + Math.random() * 60;
               return (
                 <motion.div
                   key={i}
                   initial={{ height: 0 }}
                   animate={{ height: `${height}%` }}
                   transition={{ delay: i * 0.01 + 0.5, duration: 0.5 }}
                   className={cn(
                     "flex-1 rounded-t-sm transition-all hover:brightness-150 cursor-help",
                     height > 75 ? "bg-green-500" : height > 40 ? "bg-green-500/60" : "bg-green-500/20"
                   )}
                   title={`Project Activity`}
                 />
               );
             })}
          </div>
          <div className="mt-4 flex justify-between text-[10px] opacity-40 uppercase font-bold">
             <span>Oct 2023</span>
             <span>Jan 2024</span>
             <span>Apr 2024</span>
             <span>Jul 2024</span>
             <span>Oct 2024</span>
          </div>
        </motion.div>

        {/* Language Split */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-xl p-6"
        >
          <h3 className="text-sm font-bold flex items-center gap-2 mb-8">
            <BarChart3 size={16} className="text-purple-500" />
            Top Stack
          </h3>
          
          <div className="space-y-6">
            {[
              { name: 'TypeScript', percent: 40, color: 'bg-blue-500' },
              { name: 'Python', percent: 25, color: 'bg-green-500' },
              { name: 'React/JSX', percent: 20, color: 'bg-cyan-500' },
              { name: 'JavaScript', percent: 10, color: 'bg-yellow-500' },
              { name: 'Other', percent: 5, color: 'bg-gray-500' },
            ].map((lang) => (
              <div key={lang.name} className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold">
                   <span className="opacity-60">{lang.name}</span>
                   <span className="opacity-40">{lang.percent}%</span>
                </div>
                <div className="h-1 bg-[var(--vscode-bg)] rounded-full overflow-hidden">
                   <motion.div
                     initial={{ width: 0 }}
                     animate={{ width: `${lang.percent}%` }}
                     transition={{ duration: 1, delay: 0.8 }}
                     className={cn("h-full", lang.color)}
                   />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* GitHub & Other Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <motion.a
           href="https://github.com/Sumit-5002"
           target="_blank"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6 }}
           className="p-5 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-xl flex items-center gap-4 hover:scale-[1.02] transition-transform cursor-pointer"
         >
            <div className="p-3 bg-blue-500/20 rounded-full text-blue-500">
               <Github size={24} />
            </div>
            <div>
               <div className="text-xs opacity-50 font-bold uppercase tracking-wider">GitHub Profile</div>
               <div className="text-xl font-bold">Sumit-5002</div>
            </div>
         </motion.a>
         
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.7 }}
           className="p-5 bg-gradient-to-br from-purple-600/10 to-transparent border border-purple-500/20 rounded-xl flex items-center gap-4"
         >
            <div className="p-3 bg-purple-500/20 rounded-full text-purple-500">
               <Globe size={24} />
            </div>
            <div>
               <div className="text-xs opacity-50 font-bold uppercase tracking-wider">Active Region</div>
               <div className="text-xl font-bold">Bhopal, IN</div>
            </div>
         </motion.div>

         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8 }}
           className="p-5 bg-gradient-to-br from-green-600/10 to-transparent border border-green-500/20 rounded-xl flex items-center gap-4"
         >
            <div className="p-3 bg-green-500/20 rounded-full text-green-500">
               <Monitor size={24} />
            </div>
            <div>
               <div className="text-xs opacity-50 font-bold uppercase tracking-wider">Current Focus</div>
               <div className="text-xl font-bold">Google SWE</div>
            </div>
         </motion.div>
      </div>
    </div>
  );
}
