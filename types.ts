
export interface ChatMessage {
  sender: string;
  time: string;
  content: string;
}

export interface DiaryEntry {
  date: string;
  title: string;
  mood: string;
  summary: string;
  keyEvents: string[];
  reflections: string;
}

export interface ScheduleItem {
  time: string;
  task: string;
  participants: string[];
  location?: string;
}

export interface AnalysisResult {
  diary: DiaryEntry;
  schedule: ScheduleItem[];
  topTopics: string[];
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  data: AnalysisResult;
}

export type ViewState = 'upload' | 'analyzing' | 'result' | 'history';
