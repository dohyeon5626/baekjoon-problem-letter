import React from 'react';
import { Terminal, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2 text-slate-300 opacity-70">
            <Terminal className="h-4 w-4" />
            <span className="font-bold text-xs tracking-tight">baekjoon-problem-letter</span>
          </div>
          <p className="text-xs text-slate-400 font-medium text-center md:text-left">Baekjoon Online Judge 문제 추천 구독 서비스</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"><Github className="w-5 h-5" /></div>
          <div className="text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"><Mail className="w-5 h-5" /></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
