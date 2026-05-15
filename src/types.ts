export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  isOpen?: boolean;
  children?: FileNode[];
  icon?: string;
  isLocked?: boolean;
}

export interface Tab {
  id: string;
  name: string;
}
