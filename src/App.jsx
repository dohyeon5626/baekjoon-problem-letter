import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Terminal, UserMinus, Clock, Hash, Calendar, 
  Loader2, CheckCircle2, AlertCircle, Github, Mail, ExternalLink, 
  ChevronLeft, ChevronRight, Check
} from 'lucide-react';

// 이메일 유효성 검사 함수
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // 알림 시스템
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // 페이지 이동 처리
  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsSuccess(false);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-800 selection:bg-emerald-100">
      {/* 스크롤바를 숨기기 위한 스타일 주입 */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
        @keyframes timer {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}} />
      {/* 토스트 알림창 */}
      {notification && (
        <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-sm animate-in fade-in slide-in-from-top-8 duration-500">
          <div className="relative overflow-hidden bg-white/95 backdrop-blur-lg border border-slate-200 shadow-xl rounded-2xl p-4 flex items-center gap-4">
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`} />
            <div className={`flex-shrink-0 p-2.5 rounded-xl ${notification.type === 'success' ? 'bg-emerald-50' : 'bg-red-50'}`}>
              {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
            </div>
            <div className="flex flex-col flex-1 gap-0.5">
              <h4 className="text-[13px] font-extrabold text-slate-900 tracking-tight">{notification.type === 'success' ? '완료' : '알림'}</h4>
              <p className="text-[12px] font-medium text-slate-500 leading-snug">{notification.message}</p>
            </div>
            <button onClick={() => setNotification(null)} className="p-1 text-slate-300 hover:text-slate-900 transition-colors focus:outline-none"><X className="w-4 h-4" /></button>
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-50">
              <div className={`h-full ${notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'} animate-[timer_4s_linear_forwards]`} />
            </div>
          </div>
        </div>
      )}

      {/* 상단 네비게이션 */}
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

      <main className="min-h-[calc(100vh-64px)] overflow-x-hidden pt-24 md:pt-32 pb-24">
        {currentPage === 'home' ? (
          <HomePage showNotification={showNotification} isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        ) : (
          <CancelPage showNotification={showNotification} />
        )}
      </main>

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
    </div>
  );
};

const HomePage = ({ showNotification, isSuccess, setIsSuccess }) => {
  const [bojId, setBojId] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('09:00'); 
  const [count, setCount] = useState('3개'); 
  const [selectedDays, setSelectedDays] = useState(['월', '화', '수', '목', '금']);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const timeScrollRef = useRef(null);
  const defaultTimeRef = useRef(null);

  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const timeOptions = [];
  for (let hour = 6; hour <= 23; hour++) {
    const h = hour.toString().padStart(2, '0');
    timeOptions.push(`${h}:00`); timeOptions.push(`${h}:30`);
  }
  const countOptions = ['1개', '2개', '3개', '4개', '5개'];

  useEffect(() => {
    if (!isSuccess && defaultTimeRef.current) {
      defaultTimeRef.current.scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
    }
  }, [isSuccess]);

  const handleTimeScroll = (direction) => {
    if (timeScrollRef.current) {
      const scrollAmount = 180; 
      timeScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSubscribe = async () => {
    if (!bojId || !email) { showNotification('error', '모든 정보를 입력해주세요.'); return; }
    if (!validateEmail(email)) { showNotification('error', '유효하지 않은 이메일 형식입니다.'); return; }

    setLoading(true);
    // 나중에 이 부분을 자신의 API 주소로 바꾸시면 됩니다.
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('subscriptions') || '[]');
        if (stored.some(sub => sub.email === email)) {
          showNotification('error', '이미 이메일 구독 정보가 존재합니다.');
          setLoading(false);
          return;
        }
        const newData = { bojId, email, time, count, days: selectedDays, createdAt: new Date().toISOString() };
        localStorage.setItem('subscriptions', JSON.stringify([...stored, newData]));
        setSubmittedData(newData);
        showNotification('success', '구독 신청이 완료되었습니다.');
        setIsSuccess(true);
      } catch (error) {
        showNotification('error', '처리 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  if (isSuccess && submittedData) {
    return (
      <div className="w-full max-w-md mx-auto px-4 animate-in zoom-in-95 duration-500">
        <div className="bg-white border border-slate-200 shadow-xl rounded-3xl overflow-hidden p-8 md:p-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-emerald-500" strokeWidth={3} />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-2">구독 신청 완료!</h2>
          <p className="text-[13px] md:text-sm text-slate-500 font-medium mb-8 leading-relaxed">설정하신 정보로 매일 아침<br/>엄선된 알고리즘 문제가 배달됩니다.</p>
          <div className="w-full bg-slate-50 rounded-2xl p-5 space-y-4 border border-slate-100 text-left">
            <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">백준 ID</span><span className="text-sm font-black text-slate-800">{submittedData.bojId}</span></div>
            <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">수신 메일</span><span className="text-sm font-black text-slate-800 tracking-tight">{submittedData.email}</span></div>
            <div className="flex justify-between items-center border-t border-slate-200 pt-4"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">발송 요일</span><span className="text-sm font-black text-emerald-600">{submittedData.days.join(', ')}</span></div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">발송 시간</span>
              <span className="text-sm font-black text-emerald-600">{submittedData.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">문제 개수</span>
              <span className="text-sm font-black text-emerald-600">{submittedData.count}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 flex flex-col items-center">
      <div className="text-center mb-10 md:mb-16 space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">백준 문제 구독</h1>
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm md:text-base text-slate-500 font-medium">Baekjoon Online Judge 문제 추천 구독 서비스</p>
          <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50/50 px-4 py-1.5 rounded-full border border-emerald-100 text-[11px] md:text-sm font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />사용자 티어에 맞는 문제가 추천됩니다.
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden p-6 md:p-10">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-700 tracking-widest">백준 ID</label>
                <a href="https://solved.ac" target="_blank" rel="noopener noreferrer" className="text-[10px] text-emerald-600 font-bold hover:opacity-70 flex items-center gap-1 transition-opacity focus:outline-none tracking-tight">solved.ac <ExternalLink className="w-3 h-3" /></a>
              </div>
              <input type="text" value={bojId} onChange={(e) => setBojId(e.target.value)} placeholder="ID를 입력하세요" className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:border-slate-400 focus:bg-white transition-all text-sm font-medium" />
              <p className="text-[10px] text-slate-400 pl-1 leading-relaxed">※ solved.ac와 연동되어 있어야 티어 인식이 가능합니다.</p>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-700 tracking-widest">이메일 주소</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.com" className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:border-slate-400 focus:bg-white transition-all text-sm font-medium" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-700 flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-slate-400" /> 발송 시간</label>
            <div className="relative flex items-center">
              <div className="absolute left-0 z-10 flex items-center h-full">
                <div className="w-8 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <button onClick={() => handleTimeScroll('left')} className="absolute left-0 w-8 h-8 bg-white border border-slate-200 shadow-sm rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-50 ml-1 active:scale-95 transition-all focus:outline-none"><ChevronLeft className="w-4 h-4" /></button>
              </div>
              <div ref={timeScrollRef} className="flex overflow-x-auto gap-2 py-1 px-10 hide-scrollbar snap-x scroll-smooth w-full">
                {timeOptions.map((t) => (
                  <button key={t} ref={t === '09:00' ? defaultTimeRef : null} onClick={() => setTime(t)} className={`flex-shrink-0 min-w-[75px] py-2.5 rounded-xl text-[11px] font-bold transition-all border snap-center focus:outline-none ${time === t ? 'bg-emerald-600 border-emerald-600 text-white shadow-md scale-105' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}>{t}</button>
                ))}
              </div>
              <div className="absolute right-0 z-10 flex items-center h-full">
                <div className="w-8 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
                <button onClick={() => handleTimeScroll('right')} className="absolute right-0 w-8 h-8 bg-white border border-slate-200 shadow-sm rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-50 mr-1 active:scale-95 transition-all focus:outline-none"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 pl-1 leading-relaxed">※ 이메일로 문제가 발송될 시간입니다.</p>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-700 flex items-center gap-2"><Hash className="w-3.5 h-3.5 text-slate-400" /> 문제 개수</label>
            <div className="flex gap-2">
              {countOptions.map((c) => (
                <button key={c} onClick={() => setCount(c)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border focus:outline-none ${count === c ? 'bg-emerald-600 border-emerald-600 text-white shadow-md scale-105' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}>{c}</button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 pl-1 leading-relaxed">※ 하루에 이메일로 추천받을 문제의 수입니다.</p>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-700 flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-slate-400" /> 발송 요일</label>
            <div className="flex flex-wrap gap-2">
              {days.map((day) => (
                <button key={day} onClick={() => setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])} className={`flex-1 min-w-[42px] py-2.5 rounded-xl font-bold text-[11px] transition-all border focus:outline-none ${selectedDays.includes(day) ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:bg-slate-50'}`}>{day}</button>
              ))}
            </div>
          </div>
          <button onClick={handleSubscribe} disabled={loading} className={`w-full py-4 rounded-xl font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] focus:outline-none ${loading ? 'bg-emerald-50 text-emerald-400 cursor-not-allowed border border-emerald-100' : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md'}`}>{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "구독하기"}</button>
        </div>
      </div>
    </div>
  );
};

const CancelPage = ({ showNotification }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    if (!email) { showNotification('error', '이메일 주소를 입력해주세요.'); return; }
    if (!validateEmail(email)) { showNotification('error', '유효하지 않은 이메일 형식입니다.'); return; }
    setLoading(true);
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('subscriptions') || '[]');
        const filtered = stored.filter(sub => sub.email !== email);
        if (stored.length === filtered.length) {
          showNotification('error', '등록된 구독 정보를 찾을 수 없습니다.');
        } else {
          localStorage.setItem('subscriptions', JSON.stringify(filtered));
          showNotification('success', '구독이 정상적으로 해지되었습니다.');
          setEmail('');
        }
      } catch (error) {
        showNotification('error', '처리 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="text-center mb-10 space-y-2">
        <div className="bg-red-50/50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100 shadow-sm"><UserMinus className="h-7 w-7 text-red-500" /></div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">구독 취소</h1>
        <p className="text-sm text-slate-400 font-medium">이메일을 입력하면 즉시 발송이 중단됩니다.</p>
      </div>
      <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-2 focus-within:border-slate-300 transition-colors">
        <div className="space-y-6">
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-black text-slate-700 tracking-widest">이메일 주소</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@mail.com" className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:border-slate-400 focus:bg-white transition-all text-sm font-medium" />
          </div>
          <button onClick={handleCancel} disabled={loading} className={`w-full py-4 rounded-xl font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] focus:outline-none ${loading ? 'bg-red-50 text-red-400 cursor-not-allowed border border-red-100' : 'bg-red-600 hover:bg-red-700 text-white'}`}>{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "취소하기"}</button>
        </div>
      </div>
    </div>
  );
};

export default App;