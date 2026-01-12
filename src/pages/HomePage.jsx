import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, Hash, Calendar, Loader2, CheckCircle2, ExternalLink, 
  ChevronLeft, ChevronRight, Check
} from 'lucide-react';
import { addSubscription } from '../utils/subscription';
import { validateEmail } from '../utils/emailValidator';

const HomePage = ({ showNotification, isSuccess, setIsSuccess }) => {
  const [bojId, setBojId] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('09:00');
  const [selectedDays, setSelectedDays] = useState(['월', '화', '수', '목', '금']);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const timeScrollRef = useRef(null);
  const defaultTimeRef = useRef(null);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isDraggedRef = useRef(false);

  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const timeOptions = [];
  for (let hour = 6; hour <= 23; hour++) {
    const h = hour.toString().padStart(2, '0');
    timeOptions.push(`${h}:00`); timeOptions.push(`${h}:30`);
  }

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

    const dayToEng = {
      '월': 'MON', '화': 'TUE', '수': 'WED', '목': 'THU', '금': 'FRI', '토': 'SAT', '일': 'SUN'
    };
    const daysInEng = selectedDays.map(day => dayToEng[day]);

    try {
      const result = await addSubscription({ bojId, email, time, days: daysInEng });
      if (result.success) {
        const displayData = { ...result.data, days: selectedDays };
        setSubmittedData(displayData);
        setIsSuccess(true);
      } else {
        showNotification('error', result.message);
      }
    } catch (error) {
      showNotification('error', '처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (e) => {
    const slider = timeScrollRef.current;
    if (!slider) return;
    isDraggingRef.current = true;
    isDraggedRef.current = false;
    startXRef.current = e.pageX - slider.offsetLeft;
    scrollLeftRef.current = slider.scrollLeft;
    slider.style.scrollSnapType = 'none';
    slider.style.cursor = 'grabbing';
    slider.style.scrollBehavior = 'auto';
  };

  const handleDragEnd = () => {
    const slider = timeScrollRef.current;
    if (!slider) return;
    isDraggingRef.current = false;
    slider.style.scrollSnapType = '';
    slider.style.cursor = 'grab';
    slider.style.scrollBehavior = 'smooth';
  };

  const handleDragMove = (e) => {
    if (!isDraggingRef.current || !timeScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - timeScrollRef.current.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 5) { // Threshold to differentiate click from drag
      isDraggedRef.current = true;
    }
    timeScrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  if (isSuccess && submittedData) {
    return (
      <div className="w-full max-w-md mx-auto px-4 animate-in zoom-in-95 duration-500">
        <div className="bg-white border border-slate-200 shadow-xl rounded-3xl overflow-hidden p-8 md:p-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
            <Check className="w-8 h-8 text-emerald-500" strokeWidth={3} />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-2">구독 신청 완료!</h2>
          <p className="text-[13px] md:text-sm text-slate-500 font-medium mb-8 leading-relaxed">설정하신 정보로 매일 아침<br/>맞춤 알고리즘 문제가 발송됩니다.</p>
          <div className="w-full bg-slate-50 rounded-2xl p-5 space-y-4 border border-slate-100 text-left">
            <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">백준 ID</span><span className="text-sm font-black text-slate-800">{submittedData.bojId}</span></div>
            <div className="flex justify-between items-center"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">수신 메일</span><span className="text-sm font-black text-slate-800 tracking-tight">{submittedData.email}</span></div>
            <div className="flex justify-between items-center border-t border-slate-200 pt-4"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">발송 요일</span><span className="text-sm font-black text-emerald-600">{submittedData.days.join(', ')}</span></div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">발송 시간</span>
              <span className="text-sm font-black text-emerald-600">{submittedData.time}</span>
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
              <div 
                ref={timeScrollRef} 
                className="flex overflow-x-auto gap-2 py-1 px-10 hide-scrollbar snap-x scroll-smooth w-full cursor-grab select-none"
                onMouseDown={handleDragStart}
                onMouseLeave={handleDragEnd}
                onMouseUp={handleDragEnd}
                onMouseMove={handleDragMove}
              >
                {timeOptions.map((t) => (
                  <button key={t} ref={t === '09:00' ? defaultTimeRef : null} onClick={() => { if (isDraggedRef.current) return; setTime(t); }} className={`flex-shrink-0 min-w-[75px] py-2.5 rounded-xl text-[11px] font-bold transition-all border snap-center focus:outline-none ${time === t ? 'bg-emerald-600 border-emerald-600 text-white shadow-md scale-105' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'}`}>{t}</button>
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
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-700 flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-slate-400" /> 발송 요일</label>
              <button
                onClick={() => {
                  if (selectedDays.length === days.length) {
                    setSelectedDays([]);
                  } else {
                    setSelectedDays(days);
                  }
                }}
                className="text-[10px] text-emerald-600 font-bold hover:opacity-70 transition-opacity focus:outline-none tracking-tight"
              >
                {selectedDays.length === days.length ? '전체 해제하기' : '전체 선택하기'}
              </button>
            </div>
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

export default HomePage;
