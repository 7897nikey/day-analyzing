
import React, { useState } from 'react';

interface ChatUploaderProps {
  onAnalyze: (content: string) => void;
  isLoading: boolean;
}

export const ChatUploader: React.FC<ChatUploaderProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = () => {
    if (text.trim()) {
      onAnalyze(text);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">대화 분석 시작하기</h2>
        <p className="text-slate-500">카카오톡에서 내보낸 대화 내용(.txt)을 업로드하거나 아래에 붙여넣어 주세요.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="relative group">
          <input
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="border-2 border-dashed border-slate-300 group-hover:border-yellow-400 rounded-xl p-8 transition-colors flex flex-col items-center justify-center gap-3 bg-slate-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-slate-400 group-hover:text-yellow-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-sm font-medium text-slate-600">파일 업로드 (대화내용 .txt)</span>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="또는 대화 내용을 여기에 직접 붙여넣으세요..."
            className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all resize-none text-sm font-mono"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || !text.trim()}
        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg shadow-yellow-200/50 transition-all flex items-center justify-center gap-2
          ${isLoading || !text.trim() 
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
            : 'bg-yellow-400 text-slate-900 hover:bg-yellow-500 active:scale-[0.98]'}`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            AI 분석 중...
          </>
        ) : (
          '하루 기록 분석하기'
        )}
      </button>
    </div>
  );
};
