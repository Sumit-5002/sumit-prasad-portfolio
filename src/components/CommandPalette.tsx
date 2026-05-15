import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, FileCode, Monitor, Moon, Sun, Command, Palette } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface CommandItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  category: string;
  action: () => void;
}

export function CommandPalette({ isOpen, onClose, onFileSelect }: { 
  isOpen: boolean; 
  onClose: () => void;
  onFileSelect: (id: string) => void;
}) {
  const [search, setSearch] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const items: CommandItem[] = [
    { id: 'about', icon: <FileCode size={16} />, label: 'Go to about.tsx', category: 'Navigation', action: () => onFileSelect('about') },
    { id: 'projects', icon: <FileCode size={16} />, label: 'Go to projects.json', category: 'Navigation', action: () => onFileSelect('projects') },
    { id: 'skills', icon: <FileCode size={16} />, label: 'Go to skills.ts', category: 'Navigation', action: () => onFileSelect('skills') },
    { id: 'stats', icon: <Monitor size={16} />, label: 'Open System Dashboard', category: 'Views', action: () => onFileSelect('visitor-stats') },
    { id: 'theme-dark', icon: <Moon size={16} />, label: 'Color Theme: Dark Modern', category: 'Selection', action: () => alert('Theme changed to Dark') },
    { id: 'theme-light', icon: <Sun size={16} />, label: 'Color Theme: Light Modern', category: 'Selection', action: () => alert('Theme changed to Light') },
  ];

  const filteredItems = items.filter(item => 
    item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  React.useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        filteredItems[selectedIndex]?.action();
        onClose();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] bg-[var(--vscode-sidebar)] border border-[var(--vscode-border)] shadow-2xl rounded-lg overflow-hidden z-[101]"
          >
            <div className="flex items-center px-4 py-3 gap-3 border-b border-[var(--vscode-border)]">
              <Search size={16} className="opacity-40" />
              <input
                autoFocus
                placeholder="Type a command or search files..."
                aria-label="Command search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-xs w-full text-white"
              />
            </div>

            <div className="max-h-[400px] overflow-auto py-2 custom-scrollbar">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => { item.action(); onClose(); }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "px-4 py-2 flex items-center justify-between text-xs cursor-pointer group",
                    index === selectedIndex ? "bg-blue-600 text-white" : "text-white/60 hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(index === selectedIndex ? "text-white" : "text-blue-400")}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <span className={cn(
                    "text-[10px] uppercase font-bold opacity-40 px-1.5 py-0.5 rounded border border-current",
                    index === selectedIndex && "opacity-100 border-white/20"
                  )}>
                    {item.category}
                  </span>
                </div>
              ))}
              {filteredItems.length === 0 && (
                <div className="px-8 py-12 text-center opacity-40 italic text-xs">
                  No matching commands found.
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-2 bg-[var(--vscode-tab-inactive)] text-[10px] opacity-40 font-mono">
              <div className="flex gap-3">
                <span className="flex items-center gap-1"><Command size={10} /> + P for files</span>
                <span className="flex items-center gap-1"><Palette size={10} /> themes</span>
              </div>
              <div className="flex gap-3">
                <span>↑↓ to navigate</span>
                <span>↵ to select</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
