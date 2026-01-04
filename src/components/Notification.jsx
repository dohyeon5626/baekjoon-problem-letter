import React from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

const Notification = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
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
        <button onClick={onClose} className="p-1 text-slate-300 hover:text-slate-900 transition-colors focus:outline-none"><X className="w-4 h-4" /></button>
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-50">
          <div className={`h-full ${notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'} animate-[timer_4s_linear_forwards]`} />
        </div>
      </div>
    </div>
  );
};

export default Notification;
