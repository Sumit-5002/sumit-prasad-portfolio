import * as React from 'react';
import { ChevronDown, ChevronRight, FileCode, Music, Lock, MoreHorizontal } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { FileNode } from '@/src/types';

interface ExplorerProps {
  onFileClick: (file: { id: string; name: string }) => void;
  activeFileId: string;
}

const FILE_TREE: FileNode[] = [
  {
    id: 'src',
    name: 'src',
    type: 'folder',
    isOpen: true,
    children: [
      { id: 'about', name: 'about.tsx', type: 'file' },
      { id: 'projects', name: 'projects.tsx', type: 'file' },
      { id: 'skills', name: 'skills.tsx', type: 'file' },
      { id: 'experience', name: 'experience.tsx', type: 'file' },
      { id: 'stats', name: 'stats.tsx', type: 'file' },
      { id: 'contact', name: 'contact.tsx', type: 'file' },
      { id: 'resume', name: 'resume.tsx', type: 'file' },
    ],
  },
];

export function Explorer({ onFileClick, activeFileId }: ExplorerProps) {
  const [openFolders, setOpenFolders] = React.useState<Record<string, boolean>>({
    'SUMIT-PORTFOLIO': true,
    'src': true
  });

  const toggleFolder = (id: string) => {
    setOpenFolders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTree = (nodes: FileNode[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.id}>
        <div
          onClick={() => node.type === 'folder' ? toggleFolder(node.id) : onFileClick({ id: node.id, name: node.name })}
          className={cn(
            "flex items-center gap-1 py-0.5 px-4 cursor-pointer hover:bg-vscode-border/30 transition-colors text-[15px] overflow-hidden text-nowrap",
            activeFileId === node.id && "bg-[var(--color-vscode-selection)] text-white"
          )}
          style={{ paddingLeft: `${(level * 12) + 16}px` }}
        >
          {node.type === 'folder' ? (
            openFolders[node.id] ? <ChevronDown size={16} className="shrink-0" /> : <ChevronRight size={16} className="shrink-0" />
          ) : (
            node.icon === 'music' ? <Music size={16} className="shrink-0 text-blue-400" /> : 
            node.isLocked ? <Lock size={16} className="shrink-0 text-yellow-500" /> :
            <FileCode size={16} className="shrink-0 text-blue-400" />
          )}
          <span className={cn(
            "truncate flex-1",
            activeFileId === node.id ? "font-semibold" : "opacity-90",
            node.id === 'about' && "text-amber-700 dark:text-amber-400", 
            node.id === 'projects' && "text-emerald-700 dark:text-emerald-400"
          )}>
            {node.name}
          </span>
          {node.id === 'about' && <span className="text-[13px] font-bold text-amber-700 dark:text-amber-400 ml-auto min-w-[12px] text-center">M</span>}
          {node.id === 'projects' && <span className="text-[13px] font-bold text-emerald-700 dark:text-emerald-400 ml-auto min-w-[12px] text-center">U</span>}
        </div>
        {node.type === 'folder' && openFolders[node.id] && node.children && (
          <div>{renderTree(node.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-full bg-[var(--vscode-sidebar)] w-full overflow-hidden select-none">
      <div className="h-9 px-4 flex items-center justify-between text-[14px] font-bold uppercase tracking-wider opacity-70">
        <span>Explorer</span>
        <button aria-label="More Actions" className="hover:bg-vscode-border/50 rounded p-0.5 transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pt-1">
        <div 
          onClick={() => toggleFolder('SUMIT-PORTFOLIO')}
          className="flex items-center gap-1 py-1 px-4 cursor-pointer hover:bg-vscode-border/30 transition-colors text-[15px] font-bold"
        >
          {openFolders['SUMIT-PORTFOLIO'] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span>SUMIT-PORTFOLIO</span>
        </div>
        
        {openFolders['SUMIT-PORTFOLIO'] && (
          <div className="mt-0.5">
            {renderTree(FILE_TREE)}
          </div>
        )}
      </div>
    </div>
  );
}
