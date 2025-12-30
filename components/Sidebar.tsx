
import React from 'react';
import { ToolType } from '../types';

interface SidebarProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTool, setActiveTool }) => {
  const menuItems = [
    { id: ToolType.TEXT, icon: 'fa-message', label: 'Chat' },
    { id: ToolType.IMAGE, icon: 'fa-image', label: 'Images' },
    { id: ToolType.SPEECH, icon: 'fa-volume-high', label: 'Voice' },
  ];

  return (
    <aside className="w-20 md:w-64 flex flex-col h-screen border-r border-slate-800 glass-panel z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <i className="fa-solid fa-brain text-white text-xl"></i>
        </div>
        <h1 className="text-xl font-bold hidden md:block tracking-tight">
          Omni<span className="text-sky-400">Mind</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTool(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTool === item.id
                ? 'bg-sky-500/10 text-sky-400 shadow-[inset_0_0_10px_rgba(56,189,248,0.1)]'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg w-6`}></i>
            <span className="font-medium hidden md:block">{item.label}</span>
            {activeTool === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400 hidden md:block"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="glass-panel rounded-2xl p-4 hidden md:block">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">Power Source</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-sm font-semibold text-slate-200">Gemini Pro 2.5/3</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
