import * as React from 'react';
import { motion } from 'motion/react';
import { Play, SkipForward, SkipBack, Volume2, Music as MusicIcon } from 'lucide-react';

interface MusicViewProps {
  isPlaying: boolean;
  togglePlay: () => void;
  currentTrack: { name: string, url: string, cover: string };
  nextTrack: () => void;
}

export function MusicView({ isPlaying, togglePlay, currentTrack, nextTrack }: MusicViewProps) {
  return (
    <div className="h-full flex items-center justify-center p-2 bg-[var(--vscode-bg)] font-sans overflow-hidden">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-[280px] bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] rounded-xl p-6 shadow-2xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
          <MusicIcon size={80} />
        </div>

        <div className="relative z-10">
          <div className={`aspect-square w-40 mx-auto bg-gradient-to-br ${
            currentTrack.cover === 'blue' ? 'from-blue-500 to-indigo-600' : 
            currentTrack.cover === 'purple' ? 'from-purple-500 to-pink-600' : 
            'from-green-500 to-teal-600'
          } rounded-lg mb-6 flex items-center justify-center shadow-2xl group overflow-hidden relative`}>
             <motion.div
               animate={isPlaying ? { rotate: 360 } : {}}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="w-16 h-16 border-4 border-white/20 rounded-full flex items-center justify-center"
             >
               <div className="w-3 h-3 bg-white rounded-full shadow-inner" />
             </motion.div>
             
             {/* Sound waves when playing */}
             {isPlaying && (
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-0.5 h-6">
                 {[1, 2, 3, 4, 5].map((i) => (
                   <motion.div
                     key={i}
                     animate={{ height: [10, 24, 12, 20, 10] }}
                     transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                     className="w-1 bg-white/40 rounded-full"
                   />
                 ))}
               </div>
             )}
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-bold mb-1 truncate px-2">{currentTrack.name}</h3>
            <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Sumit's Code Beats</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono opacity-50">LIVE</span>
              <div className="flex-1 h-1.5 bg-black/20 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                   animate={isPlaying ? { width: ['0%', '100%'] } : { width: '40%' }}
                   transition={isPlaying ? { duration: 180, repeat: Infinity, ease: "linear" } : {}}
                   className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
                />
              </div>
              <span className="text-[9px] font-mono opacity-50">SYNC</span>
            </div>

            <div className="flex items-center justify-center gap-8">
              <button 
                title="Previous Track"
                className="opacity-40 hover:opacity-100 transition-opacity active:scale-90"
              >
                <SkipBack size={20} />
              </button>
              
              <button 
                onClick={togglePlay}
                title={isPlaying ? "Pause" : "Play"}
                className="w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-blue-600/30 transition-all active:scale-90 ring-4 ring-blue-500/10"
              >
                {isPlaying ? (
                  <div className="w-5 h-5 flex gap-1.5 justify-center items-center">
                    <div className="w-1.5 h-full bg-white rounded-full"/>
                    <div className="w-1.5 h-full bg-white rounded-full"/>
                  </div>
                ) : (
                  <Play size={22} className="ml-1" fill="currentColor" />
                )}
              </button>

              <button 
                onClick={nextTrack}
                title="Next Track"
                className="opacity-40 hover:opacity-100 transition-opacity active:scale-90"
              >
                <SkipForward size={20} />
              </button>
            </div>

            <div className="flex items-center gap-3 opacity-60 justify-center">
              <Volume2 size={16} />
              <div className="w-20 h-1 bg-black/20 rounded-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-3/4 h-full bg-blue-500/50" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
