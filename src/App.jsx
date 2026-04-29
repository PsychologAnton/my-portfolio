import React, { useEffect, useState } from 'react';
import { Play, Film, Scissors, MonitorPlay, CheckCircle2, ChevronRight, Menu, X, Sparkles, Loader2, Wand2, Volume2 } from 'lucide-react';

// ==========================================
// 1. КОНФИГУРАЦИЯ И СТИЛИ
// ==========================================
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Raleway:wght@300;400;500;600&display=swap');

    html {
      scroll-behavior: smooth;
    }

    body {
      background-color: #0B0F19;
      color: #F3F4F6;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      font-family: 'Raleway', sans-serif;
    }

    /* Основной шрифт для заголовков */
    .font-primary {
      font-family: 'Montserrat', sans-serif;
      font-weight: 800;
      letter-spacing: -0.02em;
    }

    /* Дополнительный шрифт для текста */
    .font-secondary {
      font-family: 'Raleway', sans-serif;
    }

    .mesh-gradient {
      background: 
        radial-gradient(circle at 15% 50%, #1E1B4B 0%, transparent 50%),
        radial-gradient(circle at 85% 30%, #312E81 0%, transparent 50%),
        radial-gradient(circle at 50% 80%, #0B0F19 0%, transparent 50%);
      background-color: #0B0F19;
      background-size: 200% 200%;
      animation: mesh-shift 15s ease-in-out infinite alternate;
    }

    @keyframes mesh-shift {
      0% { background-position: 0% 0%; }
      50% { background-position: 100% 100%; }
      100% { background-position: 0% 100%; }
    }

    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #0B0F19;
    }
    ::-webkit-scrollbar-thumb {
      background: #1E1B4B;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #5C6BFF;
    }

    .animate-fade-in {
      animation: fadeIn 0.6s ease-out forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `}} />
);

// ==========================================
// 2. ГЛОБАЛЬНЫЕ КОМПОНЕНТЫ
// ==========================================
const MeshBackground = () => (
  <div className="fixed inset-0 w-full h-full -z-10 mesh-gradient pointer-events-none">
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
  </div>
);

const VideoModal = ({ isOpen, videoUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
      >
        <X size={32} />
      </button>
      
      <div className="relative w-full max-w-[400px] aspect-[9/16] rounded-3xl overflow-hidden border border-[#E8E9FF]/10 shadow-[0_0_50px_rgba(92,107,255,0.2)] bg-black">
        <video 
          src={videoUrl} 
          className="w-full h-full object-cover"
          controls
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: 'Главная', href: '#home' },
    { name: 'Портфолио', href: '#portfolio' },
    { name: 'Процесс', href: '#workflow' },
    { name: 'Прайс', href: '#pricing' },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="bg-[#111827]/60 backdrop-blur-xl border border-[#E8E9FF]/10 rounded-full px-8 py-4 flex items-center justify-between w-full max-w-3xl shadow-2xl transition-all">
        <a href="#home" className="font-primary text-xl text-white tracking-tight hover:text-[#5C6BFF] transition-colors uppercase">
          REELZ<span className="text-[#5C6BFF]">4BIZ</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="font-secondary text-sm font-medium text-gray-300 hover:text-[#5C6BFF] transition-colors">{link.name}</a>
          ))}
        </div>

        <a href="#contact" className="hidden md:block font-secondary text-sm font-semibold bg-[#5C6BFF] text-white px-6 py-2 rounded-full hover:bg-[#5C6BFF]/80 transition-all shadow-[0_0_15px_rgba(92,107,255,0.3)]">Связаться</a>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-[#111827]/90 backdrop-blur-xl border border-[#E8E9FF]/10 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl md:hidden">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="font-secondary text-lg font-medium text-gray-200 hover:text-[#5C6BFF] transition-colors">{link.name}</a>
          ))}
          <a href="#contact" className="mt-4 text-center font-secondary text-sm font-semibold bg-[#5C6BFF] text-white px-5 py-3 rounded-full hover:bg-[#5C6BFF]/80 transition-all">Связаться</a>
        </div>
      )}
    </nav>
  );
};

const Layout = ({ children }) => (
  <div className="relative min-h-screen font-secondary selection:bg-[#5C6BFF]/30 selection:text-white">
    <GlobalStyles />
    <MeshBackground />
    <Navbar />
    <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-32">
      {children}
    </main>
    <footer className="border-t border-[#E8E9FF]/10 bg-[#0B0F19]/50 backdrop-blur-md py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-primary text-xl text-white uppercase">REELZ<span className="text-[#5C6BFF]">4BIZ</span></div>
        <p className="font-secondary text-sm text-gray-500 font-light">© {new Date().getFullYear()} Все права защищены. Кинематографичный монтаж.</p>
      </div>
    </footer>
  </div>
);

// ==========================================
// СЕКЦИИ КОНТЕНТА
// ==========================================

const HeroSection = () => (
  <section id="home" className="min-h-[60vh] flex flex-col items-center justify-center text-center mt-12 animate-fade-in">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111827]/60 border border-[#E8E9FF]/10 backdrop-blur-xl mb-8">
      <span className="w-2 h-2 rounded-full bg-[#5C6BFF] animate-pulse"></span>
      <span className="font-secondary text-xs font-semibold tracking-wider text-gray-300 uppercase">Свободен для новых проектов</span>
    </div>
    <h1 className="font-primary text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-6 leading-[1.1] uppercase">
      Визуальное <br />
      <span className="text-[#5C6BFF]">Искусство</span>
    </h1>
    <p className="font-secondary text-lg md:text-xl text-gray-400 font-light max-w-2xl mb-12 leading-relaxed">Профессиональный видеомонтаж для бизнеса. Переводим идеи в вертикальный формат с миллионными охватами.</p>
    <div className="flex flex-col sm:flex-row gap-4">
      <a href="#portfolio" className="group relative inline-flex items-center justify-center gap-3 bg-[#5C6BFF] text-white px-10 py-4 rounded-full font-secondary font-bold text-sm uppercase tracking-widest hover:bg-[#5C6BFF]/80 transition-all overflow-hidden shadow-[0_0_20px_rgba(92,107,255,0.4)]">
        <Play size={18} className="fill-current" />
        Смотреть портфолио
      </a>
    </div>
  </section>
);

const PortfolioCard = ({ work, onPlay }) => (
  <div 
    onClick={() => onPlay(work.videoUrl)}
    className="group relative rounded-2xl overflow-hidden bg-[#111827]/60 backdrop-blur-xl border border-[#E8E9FF]/10 aspect-[9/16] cursor-pointer"
  >
    <img 
      src={work.thumbnailUrl} 
      alt={work.title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500"></div>
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
      <div className="w-16 h-16 rounded-full bg-[#5C6BFF]/90 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(92,107,255,0.6)]">
        <Play className="text-white fill-white ml-1" size={24} />
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
      <p className="font-secondary text-[#5C6BFF] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{work.category}</p>
      <h3 className="font-primary text-2xl text-white leading-tight mb-1 uppercase">{work.title}</h3>
      <div className="flex items-center gap-1.5 text-white/40 text-[10px] uppercase font-secondary tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-100">
        <Volume2 size={10} /> Sound On
      </div>
    </div>
  </div>
);

const PortfolioSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const works = [
    { title: "Neon Streets", category: "Cinematic", thumbnailUrl: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=400", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-1070-large.mp4" },
    { title: "Urban Fashion", category: "Commercial", thumbnailUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-lighting-sitting-in-a-cyberpunk-room-30230-large.mp4" },
    { title: "Nature Soul", category: "Lifestyle", thumbnailUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4" },
    { title: "Cyber Workout", category: "Fitness", thumbnailUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-in-a-neon-lit-gym-30234-large.mp4" },
    { title: "Luxury Drive", category: "Automotive", thumbnailUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=400", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-driving-on-a-highway-at-night-with-city-lights-1065-large.mp4" },
    { title: "Tech Unboxing", category: "Review", thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-computer-hardware-parts-on-a-table-30238-large.mp4" },
    { title: "Deep House", category: "Music", thumbnailUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-dj-hands-mixing-music-at-a-party-1570-large.mp4" },
    { title: "Coffee Art", category: "Promotion", thumbnailUrl: "https://images.unsplash.com/photo-1511920135377-68a39a23a0d9?auto=format&fit=crop&q=80&w=400", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-coffee-being-poured-into-a-cup-1172-large.mp4" },
    { title: "City Drone", category: "Travel", thumbnailUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=400", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-a-city-at-night-1072-large.mp4" },
  ];

  return (
    <section id="portfolio" className="scroll-mt-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="font-primary text-5xl md:text-7xl text-white mb-4 leading-none uppercase">Вертикальный<br/>Контент</h2>
          <p className="font-secondary text-gray-400 font-light max-w-md leading-relaxed">9 избранных проектов, оптимизированных для удержания внимания с первых секунд.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-secondary text-[10px] text-white/30 uppercase tracking-[0.3em] font-semibold">Scroll to explore</span>
          <div className="w-12 h-[1px] bg-white/10"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.map((work, idx) => (
          <PortfolioCard key={idx} work={work} onPlay={(url) => setSelectedVideo(url)} />
        ))}
      </div>

      <VideoModal isOpen={!!selectedVideo} videoUrl={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  );
};

const WorkflowStep = ({ number, title, description, icon: Icon }) => (
  <div className="bg-[#111827]/60 backdrop-blur-xl border border-[#E8E9FF]/10 rounded-3xl p-8 hover:border-[#5C6BFF]/30 transition-all duration-500 group">
    <div className="flex justify-between items-start mb-10">
      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#5C6BFF] group-hover:bg-[#5C6BFF] group-hover:text-white transition-all duration-500 shadow-xl shadow-black/20">
        <Icon size={28} />
      </div>
      <span className="font-primary text-5xl text-white/5 group-hover:text-white/10 transition-colors tracking-tighter">0{number}</span>
    </div>
    <h3 className="font-primary text-2xl text-white mb-4 uppercase">{title}</h3>
    <p className="font-secondary text-sm text-gray-400 font-light leading-relaxed">{description}</p>
  </div>
);

const WorkflowSection = () => (
  <section id="workflow" className="scroll-mt-32">
    <div className="text-center mb-20">
      <h2 className="font-primary text-5xl md:text-6xl text-white mb-4 uppercase">Этапы производства</h2>
      <p className="font-secondary text-gray-400 font-light max-w-xl mx-auto">От хаотичных исходников до структурированной истории.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <WorkflowStep number="1" title="Стратегия" description="Анализируем тренды и цели вашего бизнеса для создания цепляющего сценария." icon={MonitorPlay} />
      <WorkflowStep number="2" title="Монтаж" description="Динамичная нарезка, которая не дает пользователю свайпнуть видео." icon={Scissors} />
      <WorkflowStep number="3" title="Упаковка" description="Цветокоррекция, субтитры и звуковые эффекты, создающие эффект погружения." icon={Film} />
      <WorkflowStep number="4" title="Результат" description="Готовый ролик, полностью оптимизированный под алгоритмы соцсетей." icon={CheckCircle2} />
    </div>
  </section>
);

const PricingCard = ({ title, price, features, isPopular = false }) => (
  <div className={`relative bg-[#111827]/60 backdrop-blur-xl border ${isPopular ? 'border-[#5C6BFF]/50 shadow-[0_0_40px_rgba(92,107,255,0.1)]' : 'border-[#E8E9FF]/10'} rounded-3xl p-10 flex flex-col transition-transform hover:-translate-y-2 duration-500`}>
    {isPopular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#5C6BFF] text-white font-secondary text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-[#5C6BFF]/20">Best Value</div>}
    <h3 className="font-primary text-3xl text-white mb-2 uppercase">{title}</h3>
    <div className="flex items-baseline gap-2 mb-8"><span className="font-primary text-5xl text-white">{price}</span></div>
    <ul className="flex flex-col gap-5 mb-12 flex-grow">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-4">
          <CheckCircle2 size={18} className="text-[#5C6BFF] shrink-0 mt-0.5" />
          <span className="font-secondary text-sm text-gray-300 font-light leading-relaxed">{f}</span>
        </li>
      ))}
    </ul>
    <button className={`w-full py-5 rounded-2xl font-secondary font-bold text-sm uppercase tracking-widest transition-all ${isPopular ? 'bg-[#5C6BFF] text-white hover:bg-[#5C6BFF]/80' : 'bg-white/5 text-white hover:bg-white/10'}`}>Заказать</button>
  </div>
);

const PricingSection = () => (
  <section id="pricing" className="scroll-mt-32">
    <div className="text-center mb-20">
      <h2 className="font-primary text-5xl md:text-7xl text-white mb-4 uppercase">Пакеты услуг</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <PricingCard title="Starter" price="$150" features={["5 Reels в месяц", "Базовый монтаж", "Субтитры", "1 круг правок"]} />
      <PricingCard title="Growth" price="$400" isPopular={true} features={["15 Reels в месяц", "Динамичный монтаж", "Sound Design", "Аналитика трендов"]} />
      <PricingCard title="Pro" price="$800" features={["30 Reels в месяц", "VFX элементы", "Сценарии", "Безлимитные правок"]} />
    </div>
  </section>
);

export default function App() {
  return (
    <Layout>
      <HeroSection />
      <PortfolioSection />
      <WorkflowSection />
      <PricingSection />
      
      <section id="contact" className="mt-12 bg-gradient-to-b from-[#111827]/40 to-[#0B0F19]/10 backdrop-blur-xl border border-[#E8E9FF]/10 rounded-[3rem] p-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#5C6BFF] to-transparent opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5C6BFF]/5 rounded-full blur-[100px] -z-10"></div>
        
        <h2 className="font-primary text-5xl md:text-7xl text-white mb-8 uppercase">Начнем работу?</h2>
        <p className="font-secondary text-xl text-gray-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">Масштабируйте свой бизнес через качественный вертикальный контент с гарантированным вовлечением.</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="bg-white text-black px-12 py-5 rounded-full font-secondary font-bold text-sm uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl">Telegram @reelz4biz</button>
          <button className="text-white/60 hover:text-white font-secondary text-sm underline underline-offset-8 transition-all font-medium">WhatsApp Contact</button>
        </div>
      </section>
    </Layout>
  );
}