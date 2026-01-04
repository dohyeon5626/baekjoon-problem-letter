import React, { useState } from 'react';
import Notification from './components/Notification';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CancelPage from './pages/CancelPage';

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
      
      <Notification notification={notification} onClose={() => setNotification(null)} />
      
      <Header 
        currentPage={currentPage}
        navigateTo={navigateTo}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main className="min-h-[calc(100vh-64px)] overflow-x-hidden pt-24 md:pt-32 pb-24">
        {currentPage === 'home' ? (
          <HomePage showNotification={showNotification} isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
        ) : (
          <CancelPage showNotification={showNotification} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
