
import React from 'react';

interface HeaderProps {
  onHomeClick: () => void;
  onHistoryClick: () => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({ onHomeClick, onHistoryClick, currentView }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={onHomeClick}
        >
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform">
            <span className="text-xl font-bold text-slate-800">K</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">Talk Diary</h1>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <button 
            onClick={onHomeClick}
            className={`transition-colors ${currentView !== 'history' ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'}`}
          >
            분석하기
          </button>
          <div className="w-px h-4 bg-slate-300"></div>
          <button 
            onClick={onHistoryClick}
            className={`flex items-center gap-1 transition-colors ${currentView === 'history' ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            기록 보관함
          </button>
        </div>
      </div>
    </header>
  );
};
