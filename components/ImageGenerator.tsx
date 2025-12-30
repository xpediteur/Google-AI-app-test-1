
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import { GeneratedImage } from '../types';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const imageUrl = await generateImage(prompt);
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: prompt,
        timestamp: new Date()
      };
      setImages(prev => [newImage, ...prev]);
    } catch (error) {
      console.error(error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full p-4 flex flex-col max-w-6xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold gradient-text mb-2">Visual Imaginator</h2>
        <p className="text-slate-400">Transform your words into stunning high-resolution artwork.</p>
      </div>

      <div className="mb-10 sticky top-0 z-10 py-2">
        <div className="max-w-3xl mx-auto glass-panel p-2 rounded-2xl flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="A futuristic city in the clouds, cyberpunk aesthetic, cinematic lighting..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-100 px-4 py-2"
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-6 py-2 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            {isGenerating ? (
              <><i className="fa-solid fa-spinner animate-spin"></i> Creating...</>
            ) : (
              <><i className="fa-solid fa-wand-magic-sparkles"></i> Generate</>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-10">
        {images.map((img) => (
          <div key={img.id} className="group relative glass-panel rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <img src={img.url} alt={img.prompt} className="w-full aspect-square object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <p className="text-sm text-slate-200 line-clamp-2 mb-2">{img.prompt}</p>
              <button 
                onClick={() => window.open(img.url, '_blank')}
                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md py-2 rounded-lg text-xs font-bold"
              >
                View Full Size
              </button>
            </div>
          </div>
        ))}
        {isGenerating && (
          <div className="aspect-square glass-panel rounded-2xl flex flex-col items-center justify-center border-dashed border-2 border-slate-700">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
              <i className="fa-solid fa-image absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sky-500 text-xl"></i>
            </div>
            <p className="mt-4 text-slate-400 animate-pulse font-medium">Bending light and pixels...</p>
          </div>
        )}
      </div>

      {images.length === 0 && !isGenerating && (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
          <i className="fa-solid fa-palette text-6xl mb-6 opacity-20"></i>
          <p className="text-lg">Your generated art will appear here.</p>
          <p className="text-sm opacity-60">Try describing something unique!</p>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
