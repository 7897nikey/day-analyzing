
import React, { useState } from 'react';
import { AnalysisResult } from '../types';

interface ResultViewProps {
  data: AnalysisResult;
  onReset: () => void;
  onSave: () => void;
  isSaved: boolean;
}

export const ResultView: React.FC<ResultViewProps> = ({ data, onReset, onSave, isSaved }) => {
  const [activeTab, setActiveTab] = useState<'diary' | 'schedule'>('diary');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-slate-400 uppercase mb-1">Date</span>
          <span className="text-lg font-bold text-slate-900">{data.diary.date}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-slate-400 uppercase mb-1">Mood</span>
          <span className="text-lg font-bold text-slate-900">{data.diary.mood}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-slate-400 uppercase mb-1">Topics</span>
          <div className="flex flex-wrap gap-1 justify-center">
            {data.topTopics.map((t, i) => (
              <span key={i} className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex p-1 bg-slate-200 rounded-xl">
        <button
          onClick={() => setActiveTab('diary')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
            activeTab === 'diary' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          나의 일기
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
            activeTab === 'schedule' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          일정 리스트
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {activeTab === 'diary' ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-2 border-b border-slate-100 pb-6">
              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                {data.diary.title}
              </h3>
            </div>

            <div className="space-y-6">
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap italic">
                  "{data.diary.summary}"
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-1 h-5 bg-yellow-400 rounded-full"></span>
                  오늘의 주요 사건
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.diary.keyEvents.map((event, idx) => (
                    <li key={idx} className="flex gap-3 bg-slate-50 p-3 rounded-lg text-sm text-slate-600 border border-slate-100">
                      <span className="text-yellow-500 font-black">•</span>
                      {event}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-50/50 p-6 rounded-2xl border border-yellow-100">
                <h4 className="font-bold text-slate-900 mb-3">오늘의 회고</h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {data.diary.reflections}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6 animate-in fade-in duration-500">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">타임라인 일정</h3>
            
            {data.schedule.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                추출된 명확한 일정이 없습니다.
              </div>
            ) : (
              <div className="space-y-8 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                {data.schedule.map((item, idx) => (
                  <div key={idx} className="relative pl-8 group">
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-yellow-400 z-10 group-hover:scale-110 transition-transform"></div>
                    <div className="space-y-1">
                      <span className="text-xs font-black text-yellow-600 uppercase tracking-widest">{item.time}</span>
                      <h4 className="text-lg font-bold text-slate-900">{item.task}</h4>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded font-medium">
                          참여: {item.participants.join(', ')}
                        </span>
                        {item.location && (
                          <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded font-medium flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                            {item.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="flex-1 py-4 border-2 border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition-colors"
        >
          새로운 분석
        </button>
        <button
          onClick={onSave}
          disabled={isSaved}
          className={`flex-1 py-4 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2
            ${isSaved 
              ? 'bg-green-100 text-green-700 cursor-default border border-green-200 shadow-none' 
              : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200'}`}
        >
          {isSaved ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              저장 완료
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
              결과 저장하기
            </>
          )}
        </button>
      </div>
    </div>
  );
};
