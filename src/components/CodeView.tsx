import * as React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';
import {
  Play, Check, Copy, FileCode, Search,
  Settings, ChevronRight, Maximize2, MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface CodeViewProps {
  code: string;
  language?: string;
  fileName?: string;
}

export function CodeView({ code, language = 'tsx', fileName = 'ActiveFile.tsx' }: CodeViewProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [status, setStatus] = React.useState<'idle' | 'copied'>('idle');

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setStatus('copied');
    setTimeout(() => setStatus('idle'), 2000);
  };

  if (!mounted) return null;

  const currentTheme = theme === 'light' ? vs : vscDarkPlus;

  return (
    <div className="h-full w-full flex flex-col bg-[var(--vscode-bg)] font-mono text-sm overflow-hidden group">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-[var(--vscode-border)] bg-[var(--vscode-sidebar)]/50 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-2 opacity-60 text-[11px] font-medium">
          <span className="hover:text-blue-400 cursor-pointer transition-colors">src</span>
          <ChevronRight size={10} className="opacity-40" />
          <span className="hover:text-blue-400 cursor-pointer transition-colors">components</span>
          <ChevronRight size={10} className="opacity-40" />
          <span className="text-blue-400">{fileName}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-[var(--vscode-border)] transition-colors cursor-pointer group/run">
            <Play size={12} className="text-green-500 group-hover:scale-110 transition-transform" fill="currentColor" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-green-500">Run</span>
          </div>
          <div className="h-4 w-[1px] bg-[var(--vscode-border)] mx-1" />
          <button
            onClick={handleCopy}
            aria-label="Copy code to clipboard"
            title="Copy Code"
            className="p-1 hover:bg-[var(--vscode-border)] rounded-sm transition-all relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {status === 'copied' ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Check size={14} className="text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Copy size={14} className="opacity-60" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <button
            aria-label="More options"
            title="More Actions"
            className="p-1 hover:bg-[var(--vscode-border)] rounded-sm transition-all opacity-40 hover:opacity-100"
          >
            <MoreVertical size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        <div key={theme} className="flex-1 overflow-auto custom-scrollbar relative">
          <SyntaxHighlighter
            language={language}
            style={currentTheme}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: 'transparent',
              fontSize: '13px',
              lineHeight: '1.6',
              height: '100%',
            }}
            showLineNumbers={true}
            lineNumberStyle={{
              minWidth: '2.5em',
              paddingRight: '1em',
              color: 'var(--vscode-text)',
              opacity: 0.3,
              textAlign: 'right'
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </div>

    </div>
  );
}
