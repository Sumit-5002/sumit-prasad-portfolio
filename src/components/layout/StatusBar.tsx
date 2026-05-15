import * as React from 'react';
import { GitBranch, Wifi, Check, Bell, Activity, Music } from 'lucide-react';

export function StatusBar({
  isTyping,
  onClickStats,
  nowPlaying,
  isPlaying
}: {
  isTyping?: boolean;
  onClickStats?: () => void;
  nowPlaying?: string;
  isPlaying?: boolean;
}) {
  const [visitorCount, setVisitorCount] = React.useState<number | null>(null);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setVisitorCount(data.visits);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };
    const fetchWithIdle = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => fetchStats());
      } else {
        setTimeout(fetchStats, 2000);
      }
    };

    fetchWithIdle();
    const interval = setInterval(fetchStats, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[26px] bg-[var(--vscode-statusbar)] text-white text-[12px] hidden md:flex items-center justify-between px-3 shrink-0 select-none">
      <div className="flex items-center gap-4 h-full">
        <button
          aria-label="Current Branch: main"
          className="flex items-center gap-1 hover:bg-white/10 px-2 h-full transition-colors"
        >
          <GitBranch size={12} />
          <span>main*</span>
        </button>
        <div className="flex items-center gap-1 opacity-80">
          <Wifi size={12} />
          <span>Remote: Sumit-Portfolio</span>
        </div>
        <button
          onClick={onClickStats}
          aria-label="View Visitor Statistics"
          className="flex items-center gap-1 hover:bg-white/10 px-2 h-full transition-colors group"
        >
          <Activity size={12} className="group-hover:text-blue-300" />
          <span>Visitors: {visitorCount ?? '...'}</span>
        </button>

        {isPlaying && nowPlaying && (
          <div className="flex items-center gap-2 px-3 h-full bg-indigo-500/10 text-indigo-300 animate-in fade-in slide-in-from-left-2 duration-500">
            <Music size={11} className="animate-pulse" />
            <span className="max-w-[150px] truncate">{nowPlaying}</span>
          </div>
        )}

        {isTyping && (
          <div className="flex items-center gap-2 px-2 h-full bg-blue-400/20">
            <div className="flex gap-1">
              <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
            <span className="opacity-80 italic">Terminal active</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 h-full">
        <div className="hidden md:flex items-center h-full">
          <span className="hover:bg-white/10 px-3 h-full flex items-center cursor-pointer transition-colors">Ln 1, Col 1</span>
          <span className="hover:bg-white/10 px-3 h-full flex items-center cursor-pointer transition-colors">Spaces: 2</span>
          <span className="hover:bg-white/10 px-3 h-full flex items-center cursor-pointer transition-colors">UTF-8</span>
          <span className="hover:bg-white/10 px-3 h-full flex items-center cursor-pointer transition-colors">TypeScript JSX</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-white/10 px-2 h-full transition-colors">
          <Check size={12} />
          <span>Prettier</span>
        </div>
        <button
          aria-label="Notifications"
          className="hover:bg-white/10 px-2 h-full transition-colors"
        >
          <Bell size={12} />
        </button>
      </div>
    </div>
  );
}
