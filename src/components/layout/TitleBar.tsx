import * as React from 'react';
import { ChevronLeft, ChevronRight, Moon, Sun, Menu, PanelLeft, PanelBottom, Layout, Square, Lock, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface TitleBarProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  isActivityBarOpen: boolean;
  onToggleActivityBar: () => void;
  isTerminalOpen: boolean;
  onToggleTerminal: () => void;
  isStatusBarOpen: boolean;
  onToggleStatusBar: () => void;
  viewMode: 'code' | 'preview';
  onViewModeChange: (mode: 'code' | 'preview') => void;
  onSecretClick?: () => void;
}

export function TitleBar({
  onMenuClick,
  isSidebarOpen,
  onToggleSidebar,
  isActivityBarOpen,
  onToggleActivityBar,
  isTerminalOpen,
  onToggleTerminal,
  isStatusBarOpen,
  onToggleStatusBar,
  viewMode,
  onViewModeChange,
  onSecretClick
}: TitleBarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-8 bg-[var(--vscode-sidebar)] border-b border-[var(--vscode-border)] flex items-center justify-between pl-1 pr-2 sm:px-3 shrink-0 select-none drag-region relative">
      <div className="flex items-center gap-1 sm:gap-3 z-10">
        {/* VS Code Icon - Desktop */}
        <img src="/vscode.svg" alt="" className="w-5 h-5 hidden md:block" />

        {/* Mobile Menu Toggle - Far left */}
        <button
          onClick={onMenuClick}
          aria-label="Toggle Mobile Menu"
          className="md:hidden p-1.5 hover:bg-vscode-border/50 rounded transition-colors text-[var(--vscode-text)]"
        >
          <Menu size={18} />
        </button>

        {/* Divider before layout controls */}
        <div className="h-full w-px bg-[var(--vscode-border)] ml-2 hidden md:block" />

        {/* Layout Control Toggles - Separate Boxes */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleActivityBar}
            aria-label="Toggle Activity Bar"
            className={cn(
              "w-8 h-7 hidden sm:flex items-center justify-center hover:bg-vscode-border/50 rounded border transition-all",
              isActivityBarOpen ? "border-blue-500/50 bg-blue-500/20 text-blue-500 dark:text-blue-400" : "border-[var(--vscode-border)] text-[var(--vscode-text)] opacity-70"
            )}
            title="Toggle Activity Bar"
          >
            <Layout size={18} />
          </button>
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle Side Bar"
            className={cn(
              "w-8 h-7 hidden sm:flex items-center justify-center hover:bg-vscode-border/50 rounded border transition-all",
              isSidebarOpen ? "border-blue-500/50 bg-blue-500/20 text-blue-500 dark:text-blue-400" : "border-[var(--vscode-border)] text-[var(--vscode-text)] opacity-70"
            )}
            title="Toggle Side Bar"
          >
            <PanelLeft size={18} />
          </button>
          <button
            onClick={onToggleTerminal}
            aria-label="Toggle Terminal"
            className={cn(
              "w-8 h-7 hidden lg:flex items-center justify-center hover:bg-vscode-border/50 rounded border transition-all",
              isTerminalOpen ? "border-blue-500/50 bg-blue-500/20 text-blue-500 dark:text-blue-400" : "border-[var(--vscode-border)] text-[var(--vscode-text)] opacity-70"
            )}
            title="Toggle Terminal"
          >
            <PanelBottom size={18} />
          </button>
          <button
            onClick={onToggleStatusBar}
            aria-label="Toggle Status Bar"
            className={cn(
              "w-8 h-7 hidden lg:flex items-center justify-center hover:bg-vscode-border/50 rounded border transition-all",
              isStatusBarOpen ? "border-blue-500/50 bg-blue-500/20 text-blue-500 dark:text-blue-400" : "border-[var(--vscode-border)] text-[var(--vscode-text)] opacity-70"
            )}
            title="Toggle Status Bar"
          >
            <Square size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="h-full w-px bg-[var(--vscode-border)] mx-1 hidden md:block" />

        {/* View Mode Controls */}
        <div className="hidden sm:flex items-center gap-1">
          <button
            onClick={() => onViewModeChange('preview')}
            aria-label="Switch to Preview Mode"
            className={cn(
              "px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase transition-all border",
              viewMode === 'preview'
                ? "bg-blue-600 text-white border-blue-600"
                : "border-[var(--vscode-border)] text-[var(--vscode-text)] opacity-70 hover:opacity-100"
            )}
          >
            Output
          </button>
          <button
            onClick={() => onViewModeChange('code')}
            aria-label="Switch to Code Mode"
            className={cn(
              "px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase transition-all border",
              viewMode === 'code'
                ? "bg-blue-600 text-white border-blue-600"
                : "border-[var(--vscode-border)] text-[var(--vscode-text)] opacity-70 hover:opacity-100"
            )}
          >
            Code
          </button>
        </div>

        <div className="h-full w-px bg-[var(--vscode-border)] mx-1 hidden md:block" />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-medium tracking-wide text-[var(--vscode-text)] opacity-80 hidden lg:block pointer-events-none">
        sumit-prasad.dev — Visual Studio Code
      </div>

      <div className="flex items-center gap-1 z-10">
        {onSecretClick && (
          <button
            onClick={onSecretClick}
            aria-label="Access Restricted Data"
            className="hidden sm:flex p-1.5 hover:bg-vscode-border/50 rounded transition-colors text-yellow-500"
            title="Access Restricted Data"
          >
            <Lock size={16} />
          </button>
        )}
        <div className="h-4 w-px bg-[var(--vscode-border)] mx-1" />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          className="p-1.5 hover:bg-vscode-border/50 rounded transition-colors text-[var(--vscode-text)]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ y: -10, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 10, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        <div className="hidden sm:flex items-center ml-2">
          <button
            onClick={() => alert('Minimize: Coming Soon')}
            aria-label="Minimize"
            className="w-8 h-8 flex items-center justify-center hover:bg-vscode-border/30 transition-colors opacity-80"
          >
            <div className="w-3 h-px bg-current" />
          </button>
          <button
            onClick={() => alert('Maximize: Coming Soon')}
            aria-label="Maximize"
            className="w-8 h-8 flex items-center justify-center hover:bg-vscode-border/30 transition-colors opacity-80"
          >
            <div className="w-3 h-3 border border-current" />
          </button>
          <button
            onClick={() => window.location.href = 'https://www.google.com'}
            aria-label="Close"
            className="w-10 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors opacity-80"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
