import React, { useEffect, useState } from 'react';
import { Play, Film, Scissors, MonitorPlay, CheckCircle2, ChevronRight, Menu, X, Sparkles, Loader2, Wand2, Volume2, PlayCircle } from 'lucide-react';

// ==========================================
// 1. КОНФИГУРАЦИЯ И СТИЛИ
// ==========================================
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Raleway:wght@300;400;500;600&display=swap');

    html { scroll-behavior: smooth; }
    body {
      background-color: #0B0F19;
      color: #F3F4F6;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      font-family: 'Raleway', sans-serif;
    }
    .font-primary { font-family: 'Montserrat', sans-serif; font-weight: 800; letter-spacing: -0.02em; }
    .font-secondary { font-family: 'Raleway', sans-serif; }

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

    .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in" onClick={onClose}>
      <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
        <X size={32} />
      </button>
      
      <div 
        className="relative w-full max-w-[420px] aspect-[9/16] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(92,107,255,0.3)] bg-black"
        onClick={(e) => e.stopPropagation()}
      >
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

// ... (Navbar остается прежним)

const Layout = ({ children, onOpenVideo }) => (
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
        <p className="font-secondary text-sm text-gray-500 font-light">© {new Date().getFullYear()} Все права защищены.</p>
      </div>
    </footer>
  </div>
);

// ==========================================
// 3. СЕКЦИИ КОНТЕНТА
// ==========================================

const HeroSection = () => (
  <section 
    id="home" 
    className="relative min-h-[70vh] flex flex-col items-center justify-center text-center rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl"
  >
    {/* ФОНОВОЕ ИЗОБРАЖЕНИЕ */}
    <div className="absolute inset-0 -z-10">
      <img 
        src="./content/background.png" 
        className="w-full h-full object-cover opacity-40 scale-105"
        alt="Background" 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-transparent to-[#0B0F19]"></div>
    </div>

    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111827]/60 border border-white/10 backdrop-blur-xl mb-8">
      <span className="w-2 h-2 rounded-full bg-[#5C6BFF] animate-pulse"></span>
      <span className="font-secondary text-xs font-semibold tracking-wider text-gray-300 uppercase">Свободен для новых проектов</span>
    </div>
    
    <h1 className="font-primary text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-6 leading-[1.1] uppercase">
      Визуальное <br />
      <span className="text-[#5C6BFF]">Искусство</span>
    </h1>
    <p className="font-secondary text-lg md:text-xl text-gray-400 font-light max-w-2xl mb-12 leading-relaxed">
      Профессиональный видеомонтаж для бизнеса. Переводим идеи в вертикальный формат с миллионными охватами.
    </p>
    
    <a href="#portfolio" className="group relative inline-flex items-center justify-center gap-3 bg-[#5C6BFF] text-white px-10 py-4 rounded-full font-secondary font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(92,107,255,0.4)]">
      <Play size={18} className="fill-current" />
      Смотреть работы
    </a>
  </section>
);

// НОВЫЙ БЛОК: ШОУРИЛ
const ShowreelSection = ({ onPlay }) => (
  <section className="relative group cursor-pointer" onClick={() => onPlay('./content/10.mp4')}>
    <div className="text-center mb-12">
      <h2 className="font-primary text-3xl md:text-5xl text-white mb-4 uppercase">Showreel 2026</h2>
      <div className="w-24 h-1 bg-[#5C6BFF] mx-auto rounded-full"></div>
    </div>
    
    <div className="relative max-w-4xl mx-auto aspect-video md:aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
      <img 
        src="./content/10.png" 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        alt="Showreel Preview" 
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <PlayCircle size={48} className="text-white fill-white/20" />
        </div>
      </div>
    </div>
  </section>
);

const PortfolioCard = ({ work, onPlay }) => (
  <div 
    onClick={() => onPlay(work.videoUrl)}
    className="group relative rounded-3xl overflow-hidden bg-[#111827]/60 backdrop-blur-xl border border-white/10 aspect-[9/16] cursor-pointer"
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
    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
      <p className="font-secondary text-[#5C6BFF] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{work.category}</p>
      <h3 className="font-primary text-xl text-white leading-tight mb-3 uppercase">{work.title}</h3>
      <div className="flex items-center gap-2 text-white/50 text-[9px] uppercase tracking-widest">
         <div className="px-2 py-1 border border-white/10 rounded-md">4K Quality</div>
         <div className="px-2 py-1 border border-white/10 rounded-md">Sound Design</div>
      </div>
    </div>
  </div>
);

const PortfolioSection = ({ onPlay }) => {
  const works = [
    { title: "Интервью Сергея Минаева", category: "Interview", thumbnailUrl: "./content/1.png", videoUrl: "./content/1.mp4" },
    { title: "ИИ-инфлюенсер стоматолог", category: "AI Content", thumbnailUrl: "./content/2.png", videoUrl: "./content/2.mp4" },
    { title: "Сервис оплаты подписок", category: "Motion Design", thumbnailUrl: "./content/3.png", videoUrl: "./content/3.mp4" },
    { title: "Кроссовки Puma", category: "Commercial", thumbnailUrl: "./content/4.png", videoUrl: "./content/4.mp4" },
    { title: "UGC Bombar", category: "Lifestyle", thumbnailUrl: "./content/5.png", videoUrl: "./content/5.mp4" },
    { title: "Коттедж Эльбрус", category: "Real Estate", thumbnailUrl: "./content/6.png", videoUrl: "./content/6.mp4" },
    { title: "Сериал Городок", category: "Entertainment", thumbnailUrl: "./content/7.png", videoUrl: "./content/7.mp4" },
    { title: "Dodo Pizza Vlog", category: "Food / Promo", thumbnailUrl: "./content/8.png", videoUrl: "./content/8.mp4" },
    { title: "Доставка цветов", category: "Product", thumbnailUrl: "./content/9.png", videoUrl: "./content/9.mp4" },
  ];

  return (
    <section id="portfolio" className="scroll-mt-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="font-primary text-5xl md:text-7xl text-white mb-4 leading-none uppercase">Портфолио</h2>
          <p className="font-secondary text-gray-400 font-light max-w-md">Избранные проекты, оптимизированные под удержание внимания.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {works.map((work, idx) => (
          <PortfolioCard key={idx} work={work} onPlay={onPlay} />
        ))}
      </div>
    </section>
  );
};

// ... (WorkflowSection и PricingSection остаются прежними)

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
        <a href="#contact" className="hidden md:block font-secondary text-sm font-semibold bg-[#5C6BFF] text-white px-6 py-2 rounded-full hover:bg-[#5C6BFF]/80 transition-all">Связаться</a>
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-[#111827]/90 backdrop-blur-xl border border-[#E8E9FF]/10 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl md:hidden">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="font-secondary text-lg font-medium text-gray-200 hover:text-[#5C6BFF] transition-colors">{link.name}</a>
          ))}
        </div>
      )}
    </nav>
  );
};

// ==========================================
// ГЛАВНЫЙ КОМПОНЕНТ
// ==========================================
export default function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <Layout>
      <HeroSection />
      
      {/* Шоурил сразу под главным блоком */}
      <ShowreelSection onPlay={(url) => setSelectedVideo(url)} />
      
      <PortfolioSection onPlay={(url) => setSelectedVideo(url)} />
      
      {/* Остальные секции */}
      <WorkflowSection />
      <PricingSection />
      
      <section id="contact" className="mt-12 bg-gradient-to-b from-[#111827]/40 to-[#0B0F19]/10 backdrop-blur-xl border border-white/10 rounded-[3rem] p-16 text-center relative overflow-hidden">
        <h2 className="font-primary text-5xl md:text-7xl text-white mb-8 uppercase">Начнем работу?</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="bg-white text-black px-12 py-5 rounded-full font-secondary font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Telegram @reelz4biz</button>
        </div>
      </section>

      {/* Модальное окно для всех видео */}
      <VideoModal 
        isOpen={!!selectedVideo} 
        videoUrl={selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />
    </Layout>
  );
}

// Вспомогательные компоненты, которые были в твоем коде (Workflow и Pricing)
const WorkflowStep = ({ number, title, description, icon: Icon }) => (
    <div className="bg-[#111827]/60 backdrop-blur-xl border border-[#E8E9FF]/10 rounded-3xl p-8 hover:border-[#5C6BFF]/30 transition-all duration-500 group">
      <div className="flex justify-between items-start mb-10">
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#5C6BFF] group-hover:bg-[#5C6BFF] group-hover:text-white transition-all duration-500">
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <WorkflowStep number="1" title="Стратегия" description="Анализируем тренды и цели вашего бизнеса." icon={MonitorPlay} />
        <WorkflowStep number="2" title="Монтаж" description="Динамичная нарезка для удержания внимания." icon={Scissors} />
        <WorkflowStep number="3" title="Упаковка" description="Цвет, саунд-дизайн и субтитры." icon={Film} />
        <WorkflowStep number="4" title="Результат" description="Готовый ролик под алгоритмы соцсетей." icon={CheckCircle2} />
      </div>
    </section>
  );
  
  const PricingCard = ({ title, price, features, isPopular = false }) => (
    <div className={`relative bg-[#111827]/60 backdrop-blur-xl border ${isPopular ? 'border-[#5C6BFF]/50 shadow-[0_0_40px_rgba(92,107,255,0.1)]' : 'border-[#E8E9FF]/10'} rounded-3xl p-10 flex flex-col transition-transform hover:-translate-y-2 duration-500`}>
      {isPopular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#5C6BFF] text-white font-secondary text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-widest">Best Value</div>}
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
        <PricingCard title="Starter" price="$150" features={["5 Reels в месяц", "Базовый монтаж", "Субтитры"]} />
        <PricingCard title="Growth" price="$400" isPopular={true} features={["15 Reels в месяц", "Динамичный монтаж", "Sound Design"]} />
        <PricingCard title="Pro" price="$800" features={["30 Reels в месяц", "VFX элементы", "Сценарии"]} />
      </div>
    </section>
  );