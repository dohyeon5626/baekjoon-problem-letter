import React, { useState } from 'react';
import { UserMinus, Loader2 } from 'lucide-react';
import { validateEmail } from '../utils/emailValidator';

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

export default CancelPage;
