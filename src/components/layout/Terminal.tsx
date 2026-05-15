import * as React from 'react';
import { X, Plus, Trash2, Maximize2, Trash, Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface TerminalProps {
  onClose: () => void;
  height: number;
  onOpenFile: (id: string, name: string) => void;
  onTyping?: (typing: boolean) => void;
  onMeltdown?: () => void;
}

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'success' | 'warning' | 'ascii';
  text: string | React.ReactNode;
}

export function Terminal({ onClose, height, onOpenFile, onTyping, onMeltdown }: TerminalProps) {
  const [lines, setLines] = React.useState<TerminalLine[]>([
    { type: 'output', text: 'Welcome to Sumit\'s Portfolio Terminal. Type "help" to see available commands.' }
  ]);
  const [inputValue, setInputValue] = React.useState('');
  const [history, setHistory] = React.useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState(-1);
  const [isGlitching, setIsGlitching] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const commandToLog = `sumit@portfolio:~$ ${cmd}`;
    
    if (trimmedCmd) {
      setHistory(prev => [cmd, ...prev]);
      setHistoryIndex(-1);
    }

    const currentLines: TerminalLine[] = [...lines, { type: 'input', text: commandToLog }];

    if (trimmedCmd === 'clear') {
      setLines([]);
      return;
    }

    switch (trimmedCmd) {
      case 'help':
        currentLines.push({ type: 'output', text: (
          <div className="grid grid-cols-[140px_1fr] gap-x-4 opacity-80 text-xs text-white">
            <span className="text-blue-400">whoami</span> <span>Display personal info</span>
            <span className="text-blue-400">skills</span> <span>Show tech stack</span>
            <span className="text-blue-400">open gati-rehab</span> <span>Open project details</span>
            <span className="text-blue-400">hire sumit</span> <span>Initiate recruitment protocol</span>
            <span className="text-blue-400">sudo hire sumit</span> <span>Bypass restrictions</span>
            <span className="text-blue-400">play music</span> <span>Launch music exe</span>
            <span className="text-blue-400">google</span> <span>Apply to Google</span>
            <span className="text-blue-400">matrix</span> <span>Enter the void</span>
            <span className="text-blue-400">coffee</span> <span>Refuel system</span>
            <span className="text-blue-400">hack</span> <span>Movie mode</span>
            <span className="text-blue-400">clear</span> <span>Clear history</span>
          </div>
        )});
        break;

      case 'whoami':
        currentLines.push({ type: 'ascii', text: (
          <pre className="font-mono text-blue-400 leading-[1.1] text-[11px] md:text-sm">
{`  ╔══════════════════════════════╗
  ║  Sumit Prasad                ║
  ║  B.Tech CSE · VIT Bhopal     ║
  ║  CGPA: 8.83 · Class of 2028  ║
  ║  Target: Google SWE          ║
  ╚══════════════════════════════╝`}
          </pre>
        )});
        break;

      case 'skills':
        currentLines.push({ type: 'output', text: (
          <div className="space-y-1 text-xs md:text-sm text-white">
            <div><span className="text-yellow-500 w-24 inline-block font-bold">Languages:</span> TypeScript · Python · Java · C++</div>
            <div><span className="text-blue-500 w-24 inline-block font-bold">Frontend:</span> Next.js · React · Tailwind · Framer Motion</div>
            <div><span className="text-green-500 w-24 inline-block font-bold">Backend:</span> Node.js · Express · FastAPI</div>
            <div><span className="text-cyan-500 w-24 inline-block font-bold">Cloud:</span> GCP · Firebase · Docker</div>
            <div><span className="text-orange-500 w-24 inline-block font-bold">Tools:</span> Git · GitHub · VS Code · Figma</div>
          </div>
        )});
        break;

      case 'open gati-rehab':
        currentLines.push({ type: 'success', text: 'Opening Gati Rehab...' });
        onOpenFile('projects', 'projects.tsx');
        break;

      case 'hire sumit':
        currentLines.push({ type: 'output', text: 'Hmm... let me think about it.' });
        setLines([...currentLines]);
        await new Promise(r => setTimeout(r, 2000));
        currentLines.push({ type: 'output', text: '...still thinking.' });
        setLines([...currentLines]);
        await new Promise(r => setTimeout(r, 2000));
        currentLines.push({ type: 'warning', text: "Try 'sudo hire sumit' for better results." });
        break;

      case 'sudo hire sumit':
        currentLines.push({ type: 'output', text: '[MOCK] sumit@google:~$ [sudo] password for recruiter: ••••••••' });
        currentLines.push({ type: 'output', text: '[MOCK] Verifying credentials...' });
        setLines([...currentLines]);
        await new Promise(r => setTimeout(r, 1000));
        currentLines.push({ type: 'success', text: '✓ [MOCK] Access Granted.' });
        currentLines.push({ type: 'success', text: '✓ [MOCK] Offer letter sent to sumit@portfolio.dev' });
        currentLines.push({ type: 'success', text: '✓ [MOCK] Welcome to the team, Sumit.' });
        break;

      case 'play music':
        currentLines.push({ type: 'success', text: 'Launching music player...' });
        onOpenFile('music', 'music.exe');
        break;

      case 'google':
        currentLines.push({ type: 'output', text: '[SIMULATION] Crafting cover letter... 📝' });
        setLines([...currentLines]);
        await new Promise(r => setTimeout(r, 1500));
        currentLines.push({ type: 'output', text: '[SIMULATION] Submitting application... 📨' });
        setLines([...currentLines]);
        await new Promise(r => setTimeout(r, 1500));
        currentLines.push({ type: 'output', text: '[SIMULATION] Now we wait. ⏳' });
        break;

      case 'matrix':
        currentLines.push({ type: 'success', text: '[SIMULATION] Booting Matrix Protocol...' });
        setLines([...currentLines]);
        await new Promise(r => setTimeout(r, 800));
        currentLines.push({ type: 'ascii', text: (
          <div className="text-green-500 font-mono text-[10px] space-y-0 opacity-80">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                {Array.from({ length: 40 }).map(() => String.fromCharCode(0x30A0 + Math.random() * 96)).join(' ')}
              </div>
            ))}
          </div>
        )});
        break;

      case 'coffee':
        currentLines.push({ type: 'output', text: '☕ Brewing the life-force of a developer...' });
        setLines([...currentLines]);
        await new Promise(r => setTimeout(r, 1000));
        currentLines.push({ type: 'output', text: '⚡ Injecting caffeine into process thread #42...' });
        setLines([...currentLines]);
        await new Promise(r => setTimeout(r, 1000));
        currentLines.push({ type: 'success', text: '🚀 Productivity increased by 300%. Ready to code.' });
        break;

      case 'hack':
        currentLines.push({ type: 'warning', text: '⚠️ [MOVIE_MODE] Initiating cinematic hack sequence...' });
        setLines([...currentLines]);
        await new Promise(r => setTimeout(r, 1000));
        for (let i = 0; i < 5; i++) {
          currentLines.push({ type: 'output', text: `BYPASSING_FIREWALL_LAYER_${i+1}... [SUCCESS]` });
          setLines([...currentLines]);
          await new Promise(r => setTimeout(r, 400));
        }
        currentLines.push({ type: 'ascii', text: (
          <div className="text-blue-500 font-bold py-2 border-y border-blue-500/30">
            [ACCESS_GRANTED] - ENCRYPTED_VAULT_OPENED
          </div>
        )});
        break;

      case 'ls secret/':
        currentLines.push({ type: 'output', text: (
          <div className="flex gap-4">
            <span className="text-blue-400 font-bold underline">music.exe</span>
            <span className="text-vscode-text opacity-50 flex items-center gap-1 italic">secret.exe 🔒</span>
          </div>
        )});
        break;

      case 'cat secret.exe':
        currentLines.push({ type: 'output', text: 'aGlyZSBtZSBhbmQgSSB3aWxsIG1ha2UgZ29vZ2xlIHByb3Vk' });
        currentLines.push({ type: 'warning', text: 'Hint: decode this.' });
        break;

      case 'rm -rf /':
        currentLines.push({ type: 'error', text: '[CRITICAL] Filesystem destruction sequence initiated...' });
        setLines([...currentLines]);
        setIsGlitching(true);
        if (onMeltdown) onMeltdown();
        
        await new Promise(r => setTimeout(r, 1000));
        currentLines.push({ type: 'error', text: '[ERROR] Unmounting /home/sumit...' });
        setLines([...currentLines]);
        
        await new Promise(r => setTimeout(r, 800));
        currentLines.push({ type: 'error', text: '[ERROR] Deleting source files...' });
        setLines([...currentLines]);
        
        await new Promise(r => setTimeout(r, 1200));
        currentLines.push({ type: 'ascii', text: (
          <div className="text-red-500 font-bold animate-pulse py-4">
             SYSTEM_FAILURE: NULL_POINTER_EXCEPTION<br/>
             CORE_DUMP_COMPLETE<br/>
             REBOOTING_IN_SAFE_MODE...
          </div>
        )});
        setLines([...currentLines]);
        
        await new Promise(r => setTimeout(r, 3000));
        setIsGlitching(false);
        currentLines.push({ type: 'success', text: '✓ Backup restored. System healthy. (Don\'t do that again!)' });
        break;

      default:
        if (trimmedCmd) {
          currentLines.push({ type: 'error', text: `Command not found: ${trimmedCmd}` });
        }
    }

    setLines(currentLines);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
      setInputValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const idx = historyIndex + 1;
        setHistoryIndex(idx);
        setInputValue(history[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > -1) {
        const idx = historyIndex - 1;
        setHistoryIndex(idx);
        setInputValue(idx === -1 ? '' : history[idx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const cmds = ['help', 'whoami', 'skills', 'open', 'hire', 'sudo', 'play', 'google', 'ls', 'cat', 'rm', 'clear'];
      const match = cmds.find(c => c.startsWith(inputValue.toLowerCase()));
      if (match) setInputValue(match);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onTyping) onTyping(e.target.value.length > 0);
  };

  const handleFocus = () => {
    if (onTyping) onTyping(inputValue.length > 0);
  };

  const handleBlur = () => {
    if (onTyping) onTyping(false);
  };

  return (
    <motion.div 
      animate={isGlitching ? { 
        x: [0, -4, 4, -4, 4, 0],
        y: [0, 2, -2, 2, -2, 0],
        filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(0deg)']
      } : {}}
      transition={{ duration: 0.15, repeat: isGlitching ? Infinity : 0 }}
      className="bg-[#1e1e1e] border-t border-[var(--vscode-border)] flex flex-col shrink-0 overflow-hidden" 
      style={{ height: `${height}px` }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="h-9 flex items-center justify-between px-4 border-b border-[var(--vscode-border)] shrink-0 bg-[#252526]">
        <div className="flex items-center gap-6 h-full text-[11px] font-bold text-[#d4d4d4]">
          <div className="flex items-center gap-1 h-full border-b border-white">
            <TerminalIcon size={12} className="opacity-80" />
            <span>TERMINAL</span>
          </div>
          <button 
            onClick={() => alert('Output Panel: Coming Soon')} 
            aria-label="View Output"
            className="opacity-70 hover:opacity-100 transition-opacity uppercase"
          >
            OUTPUT
          </button>
          <button 
            onClick={() => alert('Debug Console: Coming Soon')} 
            aria-label="View Debug Console"
            className="opacity-70 hover:opacity-100 transition-opacity uppercase"
          >
            DEBUG CONSOLE
          </button>
          <button 
            onClick={() => alert('Problems Panel: Coming Soon')} 
            aria-label="View Problems"
            className="opacity-70 hover:opacity-100 transition-opacity uppercase"
          >
            PROBLEMS
          </button>
        </div>
        <div className="flex items-center gap-3 text-[#d4d4d4] opacity-80">
          <Plus size={14} aria-label="New Terminal" className="cursor-pointer hover:opacity-100 transition-opacity" />
          <Maximize2 size={12} aria-label="Maximize Terminal" className="cursor-pointer hover:opacity-100 transition-opacity" />
          <Trash size={14} aria-label="Clear Terminal" className="cursor-pointer hover:opacity-100 transition-opacity" />
          <X size={14} onClick={onClose} aria-label="Close Terminal" className="cursor-pointer hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 p-4 font-mono text-[13px] overflow-y-auto bg-[#1e1e1e]">
        <div className="flex flex-col gap-1 text-[#cccccc]">
          {lines.map((line, i) => (
            <div key={i} className={cn(
              "whitespace-pre-wrap break-all leading-relaxed",
              line.type === 'error' && "text-red-500 font-bold",
              line.type === 'success' && "text-green-500",
              line.type === 'warning' && "text-yellow-500 italic",
              line.type === 'ascii' && "leading-[1.1]"
            )}>
              {line.text}
            </div>
          ))}
          <div className="flex gap-2 items-center">
            <span className="text-[#40c463] font-bold whitespace-nowrap">sumit@portfolio:~$</span>
            <input
              ref={inputRef}
              autoFocus
              aria-label="Terminal Input"
              className="flex-1 bg-transparent border-none outline-none text-[#cccccc] font-mono p-0 caret-white"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
