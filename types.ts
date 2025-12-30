
export enum ToolType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  SPEECH = 'SPEECH'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
}

export interface GeneratedAudio {
  id: string;
  text: string;
  audioUrl?: string;
  timestamp: Date;
}
