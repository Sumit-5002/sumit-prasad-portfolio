import * as React from 'react';
import { Files, Search, GitGraph, Blocks, Settings, CircleUser, Lock, Music } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ActivityBarProps {
  onSecretClick?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  onMusicClick?: () => void;
  activeActionTab: string;
  onActionTabChange: (tabId: string) => void;
  activeFileId: string;
}

export function ActivityBar({
  onSecretClick,
  onSettingsClick,
  onProfileClick,
  onMusicClick,
  activeActionTab,
  onActionTabChange,
  activeFileId
}: ActivityBarProps) {
  const items = [
    { id: 'files', icon: Files },
    { id: 'search', icon: Search },
    { id: 'extensions', icon: Blocks },
    { id: 'music', icon: Music, onClick: onMusicClick },
    { id: 'secret', icon: Lock, onClick: onSecretClick },
  ];

  return (
    <div className="hidden md:flex w-10 bg-[var(--vscode-activity-bar)] flex-col items-center py-2 justify-between shrink-0 h-full border-r border-[var(--vscode-border)]">
      <div className="flex flex-col gap-2 w-full">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.onClick) {
                item.onClick();
              }
              onActionTabChange(item.id);
            }}
            aria-label={`Show ${item.id} view`}
            className={cn(
              "relative flex items-center justify-center py-2.5 cursor-pointer transition-colors w-full group",
              activeActionTab === item.id ? "text-white" : "text-vscode-text opacity-70 hover:opacity-100"
            )}
          >
            {activeActionTab === item.id && (
              <div className="absolute left-0 w-0.5 h-6 bg-white" />
            )}
            <item.icon
              size={20}
              strokeWidth={1.5}
              className={cn(item.id === 'secret' && "text-amber-500")}
            />
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={onProfileClick}
          aria-label="Profile"
          className="flex items-center justify-center py-2.5 text-vscode-text opacity-70 hover:opacity-100 transition-opacity"
        >
          <CircleUser size={20} strokeWidth={1.5} />
        </button>
        <button
          onClick={onSettingsClick}
          aria-label="Settings"
          className="flex items-center justify-center py-2.5 text-vscode-text opacity-70 hover:opacity-100 transition-opacity"
        >
          <Settings size={20} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
