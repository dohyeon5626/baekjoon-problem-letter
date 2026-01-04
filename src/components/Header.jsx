import React from 'react';
import { Menu, X, Terminal } from 'lucide-react';

const Header = ({ currentPage, navigateTo, isMenuOpen, setIsMenuOpen }) => {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => navigateTo('home')} className="flex items-center gap-2.5 group hover:opacity-80 transition-opacity focus:outline-none">
            <div className="bg-emerald-600 p-1.5 rounded-md shadow-sm transition-transform group-hover:scale-110">
              <Terminal className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-sm md:text-base tracking-tight text-slate-900">baekjoon-problem-letter</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigateTo('home')} className={`text-sm font-semibold transition-colors ${currentPage === 'home' ? 'text-emerald-600' : 'text-slate-500 hover:text-emerald-600'}`}>구독하기</button>
            <button onClick={() => navigateTo('cancel')} className={`text-sm font-semibold transition-colors ${currentPage === 'cancel' ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}>취소하기</button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-500 focus:outline-none hover:bg-slate-50 rounded-lg transition-colors">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 py-4 flex flex-col gap-2 shadow-lg animate-in slide-in-from-top-2">
          <button onClick={() => navigateTo('home')} className={`w-full p-3 rounded-xl text-sm font-bold text-left transition-colors ${currentPage === 'home' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'}`}>구독 신청하기</button>
          <button onClick={() => navigateTo('cancel')} className={`w-full p-3 rounded-xl text-sm font-bold text-left transition-colors ${currentPage === 'cancel' ? 'bg-red-50 text-red-600' : 'text-slate-600 hover:bg-slate-50'}`}>구독 취소하기</button>
        </div>
      )}
    </nav>
  );
};

export default Header;
