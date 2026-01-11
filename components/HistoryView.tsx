
import React from 'react';
import { HistoryItem } from '../types';

interface HistoryViewProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onBack: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ items, onSelect, onDelete, onBack }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">저장된 기록 보관함</h2>
        <button 
          onClick={onBack}
          className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          &larr; 돌아가기
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <p className="text-slate-500 font-medium">아직 저장된 기록이 없습니다.</p>
          <p className="text-sm text-slate-400 mt-1">대화를 분석하고 결과를 저장해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onSelect(item)}
              className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-yellow-300 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-yellow-400 transition-colors"></div>
              
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  {item.data.diary.date}
                </span>
                <button
                  onClick={(e) => onDelete(item.id, e)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-1"
                  title="삭제"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>

              <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-1 group-hover:text-yellow-600 transition-colors">
                {item.data.diary.title}
              </h3>
              
              <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">
                {item.data.diary.summary}
              </p>

              <div className="flex items-center gap-2 mt-auto">
                <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md font-medium">
                  기분: {item.data.diary.mood}
                </span>
                <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md font-medium">
                  일정: {item.data.schedule.length}개
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
