
import React, { useState } from 'react';
import { generateSpeech, decodeBase64Audio, createAudioBuffer } from '../services/geminiService';
import { GeneratedAudio } from '../types';

const SpeechGenerator: React.FC = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('Kore');
  const [history, setHistory] = useState<GeneratedAudio[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const voices = [
    { name: 'Kore', label: 'Classic (Balanced)' },
    { name: 'Puck', label: 'Energetic (Younger)' },
    { name: 'Charon', label: 'Wise (Deeper)' },
    { name: 'Fenrir', label: 'Narrator (Rich)' },
    { name: 'Zephyr', label: 'Friendly (Soft)' },
  ];

  const handleSpeak = async () => {
    if (!text.trim() || isSpeaking) return;

    setIsSpeaking(true);
    try {
      const base64Audio = await generateSpeech(text, voice);
      const audioData = decodeBase64Audio(base64Audio);
      
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const buffer = await createAudioBuffer(audioData, audioCtx, 24000, 1);
      
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      
      source.onended = () => setIsSpeaking(false);
      source.start();

      const newAudio: GeneratedAudio = {
        id: Date.now().toString(),
        text: text,
        timestamp: new Date()
      };
      setHistory(prev => [newAudio, ...prev]);
    } catch (error) {
      console.error(error);
      setIsSpeaking(false);
      alert('Error generating speech.');
    }
  };

  return (
    <div className="h-full p-4 flex flex-col max-w-4xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold gradient-text mb-2">Vocal Synthesis</h2>
        <p className="text-slate-400">Give your text a voice with natural-sounding AI speech.</p>
      </div>

      <div className="glass-panel p-6 rounded-3xl mb-10 shadow-xl border-slate-700/50">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {voices.map((v) => (
            <button
              key={v.name}
              onClick={() => setVoice(v.name)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                voice === v.name 
                  ? 'bg-sky-500/20 border-sky-500 text-sky-400 shadow-lg shadow-sky-500/10' 
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text you want to convert to speech..."
          className="w-full h-32 bg-slate-900/50 border border-slate-700 rounded-2xl p-4 focus:ring-2 focus:ring-sky-500/50 focus:outline-none transition-all text-slate-200 resize-none mb-4"
        />

        <button
          onClick={handleSpeak}
          disabled={isSpeaking || !text.trim()}
          className="w-full py-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-50 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.98]"
        >
          {isSpeaking ? (
            <><div className="flex gap-1"><div className="w-1 h-4 bg-white animate-[stretch_0.5s_ease-in-out_infinite]"></div><div className="w-1 h-4 bg-white animate-[stretch_0.5s_ease-in-out_infinite_0.1s]"></div><div className="w-1 h-4 bg-white animate-[stretch_0.5s_ease-in-out_infinite_0.2s]"></div></div> Processing...</>
          ) : (
            <><i className="fa-solid fa-volume-high"></i> Synthesize Speech</>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Recent Utterances</h3>
        {history.map((item) => (
          <div key={item.id} className="glass-panel p-4 rounded-2xl flex items-center gap-4 group border-slate-800/50">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sky-400">
              <i className="fa-solid fa-play"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-300 line-clamp-1">{item.text}</p>
              <p className="text-[10px] text-slate-500 mt-1">{item.timestamp.toLocaleTimeString()}</p>
            </div>
            <button className="text-slate-500 hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity px-2">
               <i className="fa-solid fa-redo"></i>
            </button>
          </div>
        ))}
        {history.length === 0 && (
          <div className="text-center py-10 text-slate-600">
            <p>No synthesis history yet.</p>
          </div>
        )}
      </div>
      <style>{`
        @keyframes stretch {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(2); }
        }
      `}</style>
    </div>
  );
};

export default SpeechGenerator;
