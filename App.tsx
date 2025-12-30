
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TextGenerator from './components/TextGenerator';
import ImageGenerator from './components/ImageGenerator';
import SpeechGenerator from './components/SpeechGenerator';
import { ToolType } from './types';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType>(ToolType.TEXT);

  const renderContent = () => {
    switch (activeTool) {
      case ToolType.TEXT:
        return <TextGenerator />;
      case ToolType.IMAGE:
        return <ImageGenerator />;
      case ToolType.SPEECH:
        return <SpeechGenerator />;
      default:
        return <TextGenerator />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-50">
      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
      
      <main className="flex-1 relative flex flex-col h-full overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
        {/* Animated background glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <header className="h-16 border-b border-slate-800/50 glass-panel flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Tool Mode</span>
            <div className="h-4 w-[1px] bg-slate-800 mx-2"></div>
            <span className="text-sm font-semibold text-slate-200">
              {activeTool === ToolType.TEXT && 'Cognitive Dialogue'}
              {activeTool === ToolType.IMAGE && 'Latent Space Imaging'}
              {activeTool === ToolType.SPEECH && 'Neural Phonetics'}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 rounded-full border border-slate-800">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
              <span className="text-xs font-medium text-slate-400">Gemini Online</span>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-hidden relative z-10">
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default App;
