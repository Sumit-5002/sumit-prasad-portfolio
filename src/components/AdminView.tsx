import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Shield, Lock, Unlock, Save, 
  RefreshCcw, AlertTriangle, Eye, EyeOff,
  User, Database, Globe, Briefcase
} from 'lucide-react';
import { cn } from '../lib/utils';

export function AdminView() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  // Form states (Mocking local persistence)
  const [profile, setProfile] = React.useState({
    name: 'Sumit Prasad',
    role: 'Core Member @ FYI Club',
    status: 'Open for Opportunities',
    location: 'Bhopal, India'
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'google2028') { 
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // Removed alert() to prevent "broken" feel
    }, 1500);
  };

  if (!isAuthenticated) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-black/20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] p-8 rounded-xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 animate-pulse" />
          
          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-blue-500/10 rounded-full text-blue-500 mb-4 ring-4 ring-blue-500/5">
               <Shield size={48} />
            </div>
            <h2 className="text-2xl font-bold">Root Access Required</h2>
            <p className="opacity-40 text-xs mt-2 uppercase tracking-widest font-mono">Terminal ID: SUMIT_PRASAD_01</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="token" className="text-[10px] font-bold uppercase opacity-50 ml-1">Access Token</label>
              <div className="relative">
                <input 
                  id="token"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secret key..."
                  title="Enter secret key"
                  className={cn(
                    "w-full bg-[var(--vscode-bg)] border-[var(--vscode-border)] border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono",
                    error && "border-red-500 ring-2 ring-red-500/20"
                  )}
                />
                <Lock size={16} className="absolute right-4 top-3.5 opacity-20" />
              </div>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-[10px] font-bold uppercase text-center mt-2"
                >
                  <AlertTriangle size={10} className="inline mr-1" /> Access Denied
                </motion.p>
              )}
            </div>

            <button 
              type="submit"
              title="Authenticate"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-[0.98]"
            >
              <Unlock size={18} /> Authenticate
            </button>
          </form>

          <p className="mt-8 text-[10px] text-center opacity-30 font-mono">
            Hint: The target company + graduation year (all lowercase)
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 pb-32">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-green-500/10 rounded-lg text-green-500 border border-green-500/20">
             <Unlock size={18} />
           </div>
           <span className="text-[10px] opacity-50 uppercase tracking-widest font-bold">Admin Privileges Active</span>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={() => setIsAuthenticated(false)}
             title="Lock Console"
             className="px-4 py-2 text-xs font-bold opacity-50 hover:opacity-100 transition-opacity"
           >
             Lock Console
           </button>
           <button 
             onClick={handleSave}
             disabled={isSaving}
             title="Deploy Changes"
             className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-green-600/20 transition-all active:scale-95"
           >
             {isSaving ? <RefreshCcw size={16} className="animate-spin" /> : <Save size={16} />}
             Deploy Changes
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Section */}
          <section className="bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-xl overflow-hidden">
             <div className="px-6 py-4 border-b border-[var(--vscode-border)] bg-white/5 flex items-center gap-2">
                <User size={16} className="text-blue-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider">Identity Core</h3>
             </div>
             <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label htmlFor="p-name" className="text-[10px] font-bold uppercase opacity-40 ml-1">Full Name</label>
                   <input 
                     id="p-name"
                     value={profile.name}
                     placeholder="Your Name"
                     title="Full Name"
                     onChange={(e) => setProfile({...profile, name: e.target.value})}
                     className="w-full bg-[var(--vscode-bg)] border-[var(--vscode-border)] border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                   />
                </div>
                <div className="space-y-2">
                   <label htmlFor="p-role" className="text-[10px] font-bold uppercase opacity-40 ml-1">Public Role</label>
                   <input 
                     id="p-role"
                     value={profile.role}
                     placeholder="Your Role"
                     title="Public Role"
                     onChange={(e) => setProfile({...profile, role: e.target.value})}
                     className="w-full bg-[var(--vscode-bg)] border-[var(--vscode-border)] border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                   />
                </div>
                <div className="space-y-2">
                   <label htmlFor="p-status" className="text-[10px] font-bold uppercase opacity-40 ml-1">Current Status</label>
                   <select 
                     id="p-status"
                     value={profile.status}
                     title="Current Status"
                     onChange={(e) => setProfile({...profile, status: e.target.value})}
                     className="w-full bg-[var(--vscode-bg)] border-[var(--vscode-border)] border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                   >
                      <option>Open for Opportunities</option>
                      <option>Busy Building</option>
                      <option>Hired @ Google</option>
                      <option>Inactive</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label htmlFor="p-loc" className="text-[10px] font-bold uppercase opacity-40 ml-1">Location</label>
                   <input 
                     id="p-loc"
                     value={profile.location}
                     placeholder="Your Location"
                     title="Location"
                     onChange={(e) => setProfile({...profile, location: e.target.value})}
                     className="w-full bg-[var(--vscode-bg)] border-[var(--vscode-border)] border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                   />
                </div>
             </div>
          </section>

          {/* Project Controls */}
          <section className="bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-xl overflow-hidden">
             <div className="px-6 py-4 border-b border-[var(--vscode-border)] bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database size={16} className="text-purple-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Project Toggles</h3>
                </div>
                <button title="Add Project" className="text-[10px] font-bold text-blue-500 hover:underline">+ Add Project</button>
             </div>
             <div className="divide-y divide-[var(--vscode-border)]">
                {[
                  { name: 'SwiftCheck', status: 'Production', color: 'text-green-500' },
                  { name: 'Gati Rehab', status: 'Hackathon', color: 'text-blue-500' },
                  { name: 'AnyFileForge', status: 'Live', color: 'text-orange-500' },
                ].map((p) => (
                  <div key={p.name} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className={cn("w-2 h-2 rounded-full bg-current", p.color)} />
                       <span className="text-sm font-medium">{p.name}</span>
                       <span className="text-[10px] opacity-30 font-mono">[{p.status}]</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <button title="Toggle Visibility" className="p-1.5 hover:bg-white/5 rounded"><Eye size={14} className="opacity-40" /></button>
                       <button title="Delete Project" className="p-1.5 hover:bg-white/5 rounded text-red-500/50 hover:text-red-500 transition-colors">
                          <AlertTriangle size={14} />
                       </button>
                    </div>
                  </div>
                ))}
             </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <section className="bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-xl p-6 space-y-4">
             <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">Quick Actions</h3>
             <button title="Clear Cache" className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-blue-500/50 transition-all text-sm group">
                <span className="flex items-center gap-2">
                   <Globe size={16} className="text-blue-500" />
                   Clear Site Cache
                </span>
                <span className="text-[10px] opacity-20 group-hover:opacity-100 font-mono">CMD+K</span>
             </button>
             <button title="Update Resume" className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-orange-500/50 transition-all text-sm group">
                <span className="flex items-center gap-2">
                   <Briefcase size={16} className="text-orange-500" />
                   Update Resume PDF
                </span>
                <span className="text-[10px] opacity-20 group-hover:opacity-100 font-mono">UPLOAD</span>
             </button>
          </section>

          {/* System Health */}
          <section className="bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-xl p-6">
             <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">System Health</h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <span className="text-xs opacity-60 font-medium">Uptime</span>
                   <span className="text-xs font-mono font-bold">99.98%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: '99%' }}
                     className="h-full bg-blue-500"
                   />
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-xs opacity-60 font-medium">Build Status</span>
                   <span className="text-xs text-green-500 font-bold uppercase tracking-tighter flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      Success
                   </span>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
