
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatUploader } from './components/ChatUploader';
import { ResultView } from './components/ResultView';
import { HistoryView } from './components/HistoryView';
import { analyzeChatLog } from './services/geminiService';
import { AnalysisResult, ViewState, HistoryItem } from './types';

const HISTORY_KEY = 'kakao-diary-history';

function App() {
  const [viewState, setViewState] = useState<ViewState>('upload');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleAnalyze = async (content: string) => {
    try {
      setViewState('analyzing');
      setError(null);
      const result = await analyzeChatLog(content);
      setAnalysisResult(result);
      setIsSaved(false);
      setViewState('result');
    } catch (err) {
      console.error(err);
      setError('분석 중 오류가 발생했습니다. 대화 형식을 확인해주세요.');
      setViewState('upload');
    }
  };

  const handleSaveResult = () => {
    if (!analysisResult) return;

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      data: analysisResult
    };

    const newHistory = [newItem, ...history];
    setHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    setIsSaved(true);
  };

  const handleDeleteHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const handleLoadHistory = (item: HistoryItem) => {
    setAnalysisResult(item.data);
    setIsSaved(true); // Already saved since it came from history
    setViewState('result');
  };

  const reset = () => {
    setAnalysisResult(null);
    setViewState('upload');
    setError(null);
    setIsSaved(false);
  };

  const navigateHome = () => {
    if (viewState === 'history') {
      if (analysisResult) {
        setViewState('result');
      } else {
        setViewState('upload');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header 
        onHomeClick={navigateHome}
        onHistoryClick={() => setViewState('history')}
        currentView={viewState}
      />
      
      <main className="max-w-4xl mx-auto px-4 mt-8 md:mt-12">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {viewState === 'upload' && (
          <ChatUploader onAnalyze={handleAnalyze} isLoading={false} />
        )}

        {viewState === 'analyzing' && (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-yellow-100 border-t-yellow-400 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-yellow-500">AI</div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-slate-900">대화 내용을 깊게 분석하고 있어요</h3>
              <p className="text-slate-500">감정을 읽고 일정을 정리하는 중입니다. 잠시만 기다려주세요...</p>
            </div>
          </div>
        )}

        {viewState === 'result' && analysisResult && (
          <ResultView 
            data={analysisResult} 
            onReset={reset} 
            onSave={handleSaveResult}
            isSaved={isSaved}
          />
        )}

        {viewState === 'history' && (
          <HistoryView 
            items={history} 
            onSelect={handleLoadHistory}
            onDelete={handleDeleteHistory}
            onBack={navigateHome}
          />
        )}
      </main>

      {/* Floating CTA for Mobile if needed */}
      <div className="fixed bottom-6 right-6 md:hidden">
        {viewState === 'result' && (
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-white shadow-xl rounded-full border border-slate-200 flex items-center justify-center text-slate-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
