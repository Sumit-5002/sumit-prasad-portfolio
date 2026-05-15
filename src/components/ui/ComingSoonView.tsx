import * as React from 'react';
import { motion } from 'motion/react';
import { Hourglass, Hammer, ArrowLeft } from 'lucide-react';

export function ComingSoonView({ title, description }: { title: string, description: string }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-[var(--vscode-bg)] text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className="space-y-6 max-w-md"
      >
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
          <div className="relative p-6 bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-2xl shadow-2xl">
            <Hourglass size={48} className="text-blue-500 animate-[spin_4s_linear_infinite]" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
          <p className="text-sm opacity-50 leading-relaxed">
            {description || "Internal systems are being calibrated. This portal will be operational in the next cycle."}
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-6">
          <div className="flex items-center justify-center gap-2 text-xs font-mono opacity-30 select-none">
            <Hammer size={12} />
            BUILD_STATUS: IN_PROGRESS
          </div>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-all border border-white/10"
          >
            <ArrowLeft size={16} />
            Return to Core
          </button>
        </div>
      </motion.div>

      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden dark:opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-dot-pattern" />
      </div>
    </div>
  );
}
