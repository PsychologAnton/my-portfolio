import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useParams, Link, useLocation } from 'react-router-dom';
import { Play, Film, Scissors, MonitorPlay, CheckCircle2, ChevronRight, Menu, X, Sparkles, Loader2, Wand2, Volume2, PlayCircle, MessageSquare, FileText, FileCheck, CreditCard, Pause, VolumeX, Maximize, RotateCcw, Sun, Moon, MessageCircle, Mail, Send, Camera } from 'lucide-react';
const portfolioData = [
  { id: "portfolio1", title: "Showreel 2026", category: "Showreel", videoUrl: "./content/10.mp4", thumbnailUrl: "./content/10.webp", description: "Демонстрация лучших работ и монтажных решений за последний год. Квинтэссенция стиля и технических возможностей.", features: ["Best Works", "Fast Cut", "VFX"] },
  { id: "portfolio2", title: "Интервью Сергея Минаева", category: "Interview", videoUrl: "./content/1.mp4", thumbnailUrl: "./content/1.webp", description: "Динамичный многокамерный монтаж интервью Сергея Минаева с профессиональной очисткой звука и субтитрами.", features: ["Multi-cam Edit", "Dynamic Subs", "Audio Clean-up"] },
  { id: "portfolio3", title: "ИИ-инфлюенсер стоматолог", category: "AI Content", videoUrl: "./content/2.mp4", thumbnailUrl: "./content/2.webp", description: "Создание виртуального ИИ-инфлюенсера с безупречным липсинком и генерацией окружения в HeyGen.", features: ["AI Avatar", "Lip Sync", "Virtual Studio"] },
  { id: "portfolio4", title: "Сервис оплаты подписок", category: "Motion Design", videoUrl: "./content/3.mp4", thumbnailUrl: "./content/3.webp", description: "Технологичный моушн-дизайн IT-сервиса в стиле 3D Glassmorphism с детальной анимацией интерфейса.", features: ["3D Glassmorphism", "App UI Demo", "SFX"] },
  { id: "portfolio5", title: "Кроссовки Puma", category: "Commercial", videoUrl: "./content/4.mp4", thumbnailUrl: "./content/4.webp", description: "Кинематографичная реклама PUMA с интеграцией CGI-ассетов и динамичной кинетической типографикой.", features: ["Kinetic Typography", "CGI Assets", "Color Grading"] },
  { id: "portfolio6", title: "UGC Bombar", category: "Lifestyle", videoUrl: "./content/5.mp4", thumbnailUrl: "./content/5.webp", description: "Нативный UGC-ролик для Bombar со сверхдинамичным ритмом и трендовыми переходами.", features: ["Fast-paced Cut", "Trendy Transitions", "Natural Look"] },
  { id: "portfolio7", title: "Коттедж Эльбрус", category: "Real Estate", videoUrl: "./content/6.mp4", thumbnailUrl: "./content/6.webp", description: "Атмосферный видео-обзор недвижимости у Эльбруса с кадрами с дрона.", features: ["Drone Footage", "Info-graphics", "Ambient Sound"] },
  { id: "portfolio8", title: "Сериал Городок", category: "Entertainment", videoUrl: "./content/7.mp4", thumbnailUrl: "./content/7.webp", description: "Креативный эдит сериала «Городок» с ретро-эффектами и ИИ-реставрацией исходного качества.", features: ["Retro VFX", "Sound Design"] },
  { id: "portfolio9", title: "Dodo Pizza Vlog", category: "Food / Promo", videoUrl: "./content/8.mp4", thumbnailUrl: "./content/8.webp", description: "Ритмичное фуд-промо для Dodo Pizza с использованием макро-съемки и элементов стоп-моушн.", features: ["Macro Shots", "Stop Motion", "Music Sync"] },
  { id: "portfolio10", title: "Доставка цветов", category: "Product", videoUrl: "./content/9.mp4", thumbnailUrl: "./content/9.webp", description: "Эстетичная рекламная кампания доставки цветов, полностью созданная на базе нейросетей.", features: ["Full AI Ads", "Soft Lighting"] }
];

// 1. КОНФИГУРАЦИЯ И СТИЛИ
// ==========================================
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Raleway:wght@300;400;500;600&display=swap');

    :root {
      --bg-body: #0B0F19;
      --bg-card: rgba(17, 24, 39, 0.6);
      --bg-overlay: rgba(11, 15, 25, 0.8); /* Глубокий темный для Hero */
      --text-main: #F3F4F6;
      --text-muted: #9CA3AF;
      --border-color: rgba(232, 233, 255, 0.1);
      --accent: #5C6BFF;
      --mesh-1: #1E1B4B;
      --mesh-2: #312E81;
    }

  [data-theme='light'] {
        --bg-body: #F0F2F5;
        --bg-card: rgba(255, 255, 255, 0.45); /* Сделали более прозрачным */
        --bg-overlay: rgba(240, 242, 245, 0.6); /* Светлый оверлей вместо темного */
        --text-main: #1A1C2E;
        --text-muted: #64748B;
        --border-color: rgba(92, 107, 255, 0.15); /* Более нежная граница */
        --accent: #4F46E5;
        --mesh-1: #D2D8FF;
        --mesh-2: #E0E7FF;
      }

    html { scroll-behavior: smooth; }
    body {
      background-color: var(--bg-body);
      color: var(--text-main);
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      font-family: 'Raleway', sans-serif;
      transition: background-color 0.4s ease, color 0.4s ease;
    }
    html, body {
      max-width: 100vw;
      overflow-x: hidden;
      /* остальной твой код... */
    }
    .font-primary { font-family: 'Montserrat', sans-serif; font-weight: 800; letter-spacing: -0.02em; }
    .font-secondary { font-family: 'Raleway', sans-serif; }

  .mesh-gradient {
      background: 
        radial-gradient(circle at 15% 50%, var(--mesh-1) 0%, transparent 50%),
        radial-gradient(circle at 85% 30%, var(--mesh-2) 0%, transparent 50%),
        radial-gradient(circle at 50% 80%, var(--bg-body) 0%, transparent 50%);
      background-color: var(--bg-body);
      background-size: 200% 200%;
      /* Добавляем ускорение GPU */
      transform: translateZ(0);
      will-change: background-position;
      animation: mesh-shift 15s ease-in-out infinite alternate;
    }
      /* ОТКЛЮЧАЕМ ТЯЖЕЛУЮ АНИМАЦИЮ НА ПЛАНШЕТАХ И ТЕЛЕФОНАХ */
    @media (max-width: 1024px) {
      .mesh-gradient {
        animation: none; 
        background-size: 100% 100%;
      }
      /* Уменьшаем нагрузку от размытия */
      .backdrop-blur-2xl {
        backdrop-filter: blur(10px); /* Вместо 40px+ */
      }
      .backdrop-blur-md {
        backdrop-filter: blur(4px);
      }
    }

    @keyframes mesh-shift {
      0% { background-position: 0% 0%; }
      100% { background-position: 100% 100%; }
    }


    .bg-card-custom { background-color: var(--bg-card); border-color: var(--border-color); }
    .text-main-custom { color: var(--text-main); }
    .text-muted-custom { color: var(--text-muted); }
    .bg-accent-custom { background-color: var(--accent); }
    
    .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `}} />
);
const AnimatedOrbs = () => (
  /* Изменили md:block на lg:block — теперь на планшетах сферы скроются */
  <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
    <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[#5C6BFF]/10 blur-[80px] animate-float delay-1"></div>
    <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#312E81]/20 blur-[90px] animate-float"></div>
    <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#1E1B4B]/30 blur-[70px] animate-float delay-2"></div>
  </div>
);


// ==========================================
// 2. ГЛОБАЛЬНЫЕ КОМПОНЕНТЫ
// ==========================================
const MeshBackground = () => (
  <div className="fixed inset-0 w-full h-full -z-10 mesh-gradient pointer-events-none">
    <AnimatedOrbs />
    {/* Добавили hidden md:block для шума */}
    <div className="hidden md:block absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,...")' }}></div>
  </div>
);

// ==========================================
// УНИВЕРСАЛЬНЫЙ КАСТОМНЫЙ ПЛЕЕР
// ==========================================
import { Plyr } from "plyr-react"; 
import "plyr/dist/plyr.css";

const CustomPlayer = ({ videoUrl, posterUrl, autoPlay = false }) => {
  const plyrProps = {
    source: {
      type: 'video',
      sources: [{ src: videoUrl, type: 'video/mp4' }],
      poster: posterUrl,
    },
    options: {
      autoplay: autoPlay,
      muted: autoPlay, // Safari требует mute для автоплея
      playsinline: true,
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      settings: ['quality', 'speed'],
      // Тонкая настройка стиля под твой бренд
      tooltips: { controls: true, seek: true },
    }
  };

  return (
    <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black group shadow-2xl border border-white/10">
      <style>{`
        :root {
          --plyr-color-main: #5C6BFF; /* Твой акцентный синий */
          --plyr-video-control-background-hover: rgba(92, 107, 255, 0.2);
          --plyr-range-fill-background: #5C6BFF;
        }
        .plyr--video {
          border-radius: 1.5rem;
          height: 100%;
        }
        .plyr__video-wrapper {
          height: 100%;
        }
        .plyr__poster {
          background-size: cover;
        }
      `}</style>
      <Plyr {...plyrProps} />
    </div>
  );
};
// Обновленная модалка, которая просто использует наш CustomPlayer
const VideoModal = ({ isOpen, videoUrl, posterUrl, onClose }) => {
  if (!isOpen) return null;
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 animate-fade-in" 
      onClick={onClose}
    >
      <button className="absolute top-6 right-6 text-white/60 hover:text-white z-[110]">
        <X size={32} />
      </button>
    <div 
      className="relative w-full max-w-[400px] aspect-[9/16] rounded-[2.5rem] overflow-hidden border border-white/10 bg-black shadow-2xl" 
      onClick={(e) => e.stopPropagation()}
    >
      <CustomPlayer videoUrl={videoUrl} posterUrl={posterUrl} autoPlay={true} />
    </div>
    </div>
  );
};

const Layout = ({ children, theme, onToggleTheme }) => (
  <div className="relative min-h-screen font-secondary selection:bg-[#5C6BFF]/30 transition-colors duration-400 overflow-x-hidden w-full">
    <GlobalStyles />
    <MeshBackground />
    {/* Теперь пропсы передаются в Navbar */}
    <Navbar theme={theme} onToggleTheme={onToggleTheme} />
    <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-32">
      {children}
    </main>
    <footer className="border-t border-[var(--border-color)] bg-card-custom backdrop-blur-md py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-main-custom">
        <div className="font-primary text-xl uppercase">REELZ<span className="text-[#5C6BFF]">4BIZ</span></div>
        <p className="font-secondary text-sm opacity-60 font-light">© {new Date().getFullYear()} Горбенко Антон. Все права защищены.</p>
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
    className="relative min-h-[75vh] flex flex-col items-center justify-center text-center rounded-[3rem] overflow-hidden border border-[var(--border-color)] shadow-2xl transition-colors duration-500"
  >
    <div className="absolute inset-0 -z-10 bg-card-custom">
      <img 
        src="./content/background.webp" 
        className="w-full h-full object-cover scale-110 opacity-90 brightness-90 contrast-110 transition-opacity duration-500" 
        alt="Background" 
      />
      {/* Слой высококачественного размытия (Backdrop Blur) */}
      <div className="absolute inset-0 backdrop-blur-[2px] lg:backdrop-blur-[6px] bg-black/30"></div>
    </div>

    {/* Плашка "Свободен" — теперь всегда в одном стиле */}
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
      <span className="w-2 h-2 rounded-full bg-[#5C6BFF] animate-pulse"></span>
      <span className="font-secondary text-xs font-semibold tracking-wider text-white/80 uppercase">
        Свободен для новых проектов
      </span>
    </div>
    
    {/* Заголовок — зафиксирован белый и синий */}
    <h1 className="font-primary text-4xl md:text-7xl lg:text-8xl mb-6 leading-[1.1] uppercase drop-shadow-2xl break-words px-2">
      <span className="text-white">Визуальное</span> <br />
      <span className="text-[#5C6BFF]">Искусство</span>
    </h1>
    
    {/* Описание — зафиксирован светлый цвет */}
    <p className="font-secondary text-lg md:text-xl text-white/70 font-medium max-w-2xl mb-12 leading-relaxed drop-shadow-sm">
      Профессиональный video-production для бизнеса. Переводим идеи в вертикальный формат с миллионными охватами.
    </p>
    
    {/* Кнопка остается без изменений (она и так синяя) */}
    <a href="#portfolio" className="group relative inline-flex items-center justify-center gap-3 bg-[#5C6BFF] text-white px-10 py-4 rounded-full font-secondary font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
      <Play size={18} className="fill-current" />
      Смотреть работы
    </a>
  </section>
);
// НОВЫЙ БЛОК: ШОУРИЛ
const ShowreelSection = ({ onPlay }) => (
  <section id="showreel" className="relative group cursor-pointer scroll-mt-32" onClick={() => onPlay('./content/10.mp4')}>
    <div className="text-center mb-12">
      <h2 className="font-primary text-3xl md:text-5xl text-white mb-4 uppercase tracking-tight drop-shadow-md">Showreel 2026</h2>
      <div className="w-24 h-1 bg-[#5C6BFF] mx-auto rounded-full"></div>
    </div>
    <div className="relative max-w-4xl mx-auto aspect-video md:aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-[var(--border-color)] shadow-2xl">
      <img src="./content/10.webp" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" alt="Showreel" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
          <PlayCircle size={48} className="text-white fill-white/20" />
        </div>
      </div>
    </div>
  </section>
);

const PortfolioCard = ({ work, onPlay }) => (
  <div 
    onClick={() => onPlay(work.videoUrl, work.thumbnailUrl)}
    className="group relative rounded-3xl overflow-hidden bg-card-custom backdrop-blur-xl border border-[var(--border-color)] aspect-[9/16] cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
  >
    <img src={work.thumbnailUrl} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-body)] via-transparent to-transparent opacity-90 transition-opacity duration-500"></div>
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
      <div className="w-16 h-16 rounded-full bg-[#5C6BFF]/90 flex items-center justify-center shadow-2xl">
        <Play className="text-white fill-white ml-1" size={24} />
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
      <p className="font-secondary text-[#5C6BFF] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{work.category}</p>
      <h3 className="font-primary text-xl text-main-custom leading-tight mb-3 uppercase">{work.title}</h3>
    <div className="flex flex-wrap items-center gap-2 text-muted-custom text-[8px] uppercase tracking-widest">
      {work.features?.map((feature, i) => (
        <div key={i} className="px-2 py-1 border border-[var(--border-color)] rounded-md bg-white/5">
          {feature}
        </div>
      ))}
    </div>
    </div>
  </div>
);

const PortfolioSection = ({ onPlay }) => {
  const works = [
      { 
        title: "Интервью Сергея Минаева", 
        category: "Interview", 
        thumbnailUrl: "./content/1.webp", 
        videoUrl: "./content/1.mp4",
        features: ["Multi-cam Edit", "Dynamic Subs", "Audio Clean-up"]
      },
      { 
        title: "ИИ-инфлюенсер стоматолог", 
        category: "AI Content", 
        thumbnailUrl: "./content/2.webp", 
        videoUrl: "./content/2.mp4",
        features: ["AI Avatar", "Lip Sync", "Virtual Studio"]
      },
      { 
        title: "Сервис оплаты подписок", 
        category: "Motion Design", 
        thumbnailUrl: "./content/3.webp", 
        videoUrl: "./content/3.mp4",
        features: ["3D Glassmorphism", "App UI Demo", "SFX"]
      },
      { 
        title: "Кроссовки Puma", 
        category: "Commercial", 
        thumbnailUrl: "./content/4.webp", 
        videoUrl: "./content/4.mp4",
        features: ["Kinetic Typography", "CGI Assets", "Color Grading"]
      },
      { 
        title: "UGC Bombar", 
        category: "Lifestyle", 
        thumbnailUrl: "./content/5.webp", 
        videoUrl: "./content/5.mp4",
        features: ["Fast-paced Cut", "Trendy Transitions", "Natural Look"]
      },
      { 
        title: "Коттедж Эльбрус", 
        category: "Real Estate", 
        thumbnailUrl: "./content/6.webp", 
        videoUrl: "./content/6.mp4",
        features: ["Drone Footage", "Info-graphics", "Ambient Sound"]
      },
      { 
        title: "Сериал Городок", 
        category: "Entertainment", 
        thumbnailUrl: "./content/7.webp", 
        videoUrl: "./content/7.mp4",
        features: ["Retro VFX", "Sound Design"]
      },
      { 
        title: "Dodo Pizza Vlog", 
        category: "Food / Promo", 
        thumbnailUrl: "./content/8.webp", 
        videoUrl: "./content/8.mp4",
        features: ["Macro Shots", "Stop Motion", "Music Sync"]
      },
      { 
        title: "Доставка цветов", 
        category: "Product", 
        thumbnailUrl: "./content/9.webp", 
        videoUrl: "./content/9.mp4",
        features: ["Full AI Ads", "Soft Lighting"]
      },
    ];

  return (
    <section id="portfolio" className="scroll-mt-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="font-primary text-5xl md:text-7xl text-white mb-4 leading-none uppercase drop-shadow-md">Портфолио</h2>
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


const Navbar = ({ theme, onToggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Главная', href: '#/' }, // Путь к корню
    { name: 'Showreel', href: '#/showreel' },
    { name: 'Портфолио', href: '#/portfolio' },
    { name: 'Обо мне', href: '#/about' },
    { name: 'Инструменты', href: '#/tools' },
    { name: 'Процесс', href: '#/workflow' },
    { name: 'Прайс', href: '#/pricing' },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="bg-card-custom backdrop-blur-xl border border-[var(--border-color)] rounded-full px-6 py-4 flex items-center justify-between w-full max-w-6xl shadow-2xl transition-all duration-300"> 
        <a href="/#home" className="font-primary text-xl text-main-custom tracking-tight hover:text-[#5C6BFF] transition-colors uppercase">
          REELZ<span className="text-[#5C6BFF]">4BIZ</span>
        </a>

        {/* ЗАМЕНЕНО: md:flex на lg:flex */}
        <div className="hidden lg:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="font-secondary text-[13px] lg:text-sm font-medium text-muted-custom hover:text-[#5C6BFF] transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <button 
            onClick={onToggleTheme}
            className="p-2.5 rounded-full hover:bg-white/10 transition-colors text-main-custom flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-yellow-400 fill-yellow-400/20" />
            ) : (
              <Moon size={20} className="text-[#5C6BFF] fill-[#5C6BFF]/10" />
            )}
          </button>

          {/* ЗАМЕНЕНО: md:block на lg:block */}
          <a 
            href="/#contact" 
            className="hidden lg:block font-secondary text-sm font-semibold bg-[#5C6BFF] text-white px-6 py-2.5 rounded-full hover:bg-[#5C6BFF]/80 transition-all active:scale-95"
          >
            Связаться
          </a>
          
          {/* ЗАМЕНЕНО: md:hidden на lg:hidden */}
          <button 
            className="lg:hidden p-2 text-main-custom" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-card-custom backdrop-blur-2xl border border-[var(--border-color)] rounded-[2rem] p-8 flex flex-col gap-6 shadow-2xl lg:hidden animate-fade-in overflow-hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className="font-primary text-2xl text-main-custom hover:text-[#5C6BFF] transition-colors uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="h-px bg-[var(--border-color)] w-full my-2"></div>
          <a 
            href="/#contact" 
            onClick={() => setIsOpen(false)}
            className="w-full text-center font-secondary font-bold bg-[#5C6BFF] text-white py-4 rounded-2xl uppercase tracking-widest"
          >
            Связаться
          </a>
        </div>
      )}
    </nav>
  );
};
// ==========================================
// СТРАНИЦА ОТДЕЛЬНОГО ПРОЕКТА
// ==========================================
const PortfolioDetailPage = ({ theme, onToggleTheme }) => {
  const { id } = useParams();
  const work = portfolioData.find(p => p.id === id);

  if (!work) return <Layout theme={theme} onToggleTheme={onToggleTheme}><div className="text-white text-center py-32 font-primary text-3xl">Проект не найден</div></Layout>;

  return (
    <Layout theme={theme} onToggleTheme={onToggleTheme}>
      <div className="mt-10 lg:mt-20 flex flex-col lg:flex-row gap-12 items-center lg:items-start min-h-[70vh]">
        <div className="w-full lg:w-2/3">
          <div className="relative aspect-[9/16] max-h-[80vh] mx-auto rounded-[2.5rem] overflow-hidden border border-[var(--border-color)] bg-black shadow-2xl">
          {/* Передаем autoPlay={false} чтобы видео не запускалось само при загрузке страницы */}
          <CustomPlayer 
            videoUrl={`.${work.videoUrl}`} 
            posterUrl={`.${work.thumbnailUrl}`} 
            autoPlay={false} 
          />
        </div>
        </div>
        <div className="w-full lg:w-1/3 space-y-8 animate-fade-in">
          <div>
            <p className="font-secondary text-[#5C6BFF] text-xs font-bold uppercase tracking-[0.3em] mb-4">{work.category}</p>
            <h1 className="font-primary text-3xl md:text-5xl text-main-custom leading-tight uppercase mb-6">{work.title}</h1>
            <div className="w-20 h-1 bg-[#5C6BFF] rounded-full mb-8"></div>
          </div>
          <div className="bg-card-custom backdrop-blur-xl border border-[var(--border-color)] p-8 rounded-[2rem] shadow-xl">
            <p className="font-secondary text-lg text-muted-custom leading-relaxed italic">«{work.description}»</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {work.features.map((f, i) => (
              <span key={i} className="px-4 py-2 bg-white/5 border border-[var(--border-color)] rounded-full text-[10px] text-white/50 uppercase tracking-widest">
                {f}
              </span>
            ))}
          </div>
          <div className="pt-8">
            <Link to="/#portfolio" className="inline-flex items-center gap-3 text-main-custom hover:text-[#5C6BFF] transition-colors font-secondary text-sm font-bold uppercase tracking-widest group">
              <div className="w-10 h-10 rounded-full border border-[var(--border-color)] flex items-center justify-center group-hover:border-[#5C6BFF] transition-all">
                <ChevronRight className="rotate-180" size={18} />
              </div>
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
const ScrollHandler = () => {
  // Теперь вызываем импортированный хук напрямую
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Убираем слеш из пути, чтобы получить чистый ID (например, "showreel")
    const id = pathname.replace('/', '');
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        // Небольшая задержка, чтобы страница успела отрисоваться
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
};
// ==========================================
// ГЛАВНЫЙ КОМПОНЕНТ
// ==========================================
export default function App() {
  const [modalData, setModalData] = useState({ url: null, poster: null });
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Router>
  <Routes>
    {/* Страницы проектов с префиксом, чтобы не путались с якорями */}
    <Route path="/project/:id" element={<PortfolioDetailPage theme={theme} onToggleTheme={toggleTheme} />} />
    
    {/* Все остальные пути (*) теперь ведут на главную страницу */}
    <Route path="*" element={
      <Layout theme={theme} onToggleTheme={toggleTheme}>
        <ScrollHandler /> {/* Добавляем обработчик скролла */}
        <HeroSection />
        <ShowreelSection onPlay={(url) => setModalData({ url, poster: './content/10.webp' })} />
        <PortfolioSection onPlay={(url, poster) => setModalData({ url, poster })} />
        <AboutSection /> 
        <ToolsSection />
        <WorkflowSection />
        <PricingSection />
        
        <section id="contact" className="mt-12 bg-card-custom backdrop-blur-2xl border border-[var(--border-color)] rounded-[3rem] p-16 text-center relative overflow-hidden shadow-xl transition-all duration-300">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#5C6BFF]/10 blur-[120px] pointer-events-none"></div>
          <h2 className="font-primary text-5xl md:text-7xl text-white mb-8 uppercase relative z-10 tracking-tight drop-shadow-md">Начнем работу?</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 relative z-10 flex-wrap">
            <a href="https://t.me/reelz4biz" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-[#0088CC] text-white px-8 py-4 rounded-full font-secondary font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95 w-full md:w-auto justify-center">
              <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /> Telegram
            </a>
            <a href="https://wa.me/79815871462" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-secondary font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95 w-full md:w-auto justify-center">
              <MessageCircle size={20} fill="currentColor" className="text-white" /> WhatsApp
            </a>
            <a href="https://www.instagram.com/reelz4biz" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white px-8 py-4 rounded-full font-secondary font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95 w-full md:w-auto justify-center">
              <Camera size={20} className="text-white" /> Instagram
            </a>
            <a href="mailto:drantonch@yandex.ru" className="group flex items-center gap-3 bg-[#1F2937]/90 backdrop-blur-xl border border-white/10 text-white px-8 py-4 rounded-full font-secondary font-bold text-sm uppercase tracking-widest hover:bg-[#374151] hover:scale-105 transition-all active:scale-95 w-full md:w-auto justify-center shadow-lg">
              <Mail size={18} className="text-white" /> <span>Почта</span>
            </a>
          </div>
        </section>

        <VideoModal isOpen={!!modalData.url} videoUrl={modalData.url} posterUrl={modalData.poster} onClose={() => setModalData({ url: null, poster: null })} />
      </Layout>
    } />
  </Routes>
    </Router>
  );
}

// Вспомогательные компоненты, которые были в твоем коде (Workflow и Pricing)
const WorkflowStep = ({ number, title, description, icon: Icon }) => (
  <div className="bg-card-custom backdrop-blur-xl border border-[var(--border-color)] rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:border-[#5C6BFF]/50 transition-all duration-500 group">
    <div className="flex justify-between items-start mb-10">
      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#5C6BFF] group-hover:bg-[#5C6BFF] group-hover:text-white transition-all duration-500">
        <Icon size={28} />
      </div>
      <span className="font-primary text-5xl text-main-custom opacity-5 group-hover:opacity-20 transition-opacity tracking-tighter">0{number}</span>
    </div>
    <h3 className="font-primary text-2xl text-main-custom mb-4 uppercase">{title}</h3>
    <p className="font-secondary text-sm text-muted-custom font-light leading-relaxed">{description}</p>
  </div>
);  
  const AboutSection = () => (
  <section id="about" className="scroll-mt-32">
    {/* Заголовок в стиле "Этапы сотрудничества" */}
    <div className="text-center mb-16">
      <h2 className="font-primary text-5xl md:text-6xl text-white mb-4 uppercase drop-shadow-md">Обо мне</h2>
    </div>

    {/* Карточка "Обо мне" */}
    <div className="max-w-5xl mx-auto bg-card-custom backdrop-blur-2xl border border-[var(--border-color)] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#5C6BFF]/30 group">
      <div className="flex flex-col lg:flex-row items-stretch">
        
        {/* Вертикальное фото */}
        <div className="w-full lg:w-[40%] relative overflow-hidden h-[500px] md:h-auto">
          <img 
            src="./content/myphoto.webp" 
            alt="Горбенко Антон" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-body)] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[var(--bg-card)] opacity-60"></div>
        </div>

        {/* Инфо-блок */}
        <div className="w-full lg:w-[60%] p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="font-primary text-3xl md:text-4xl text-white mb-2 uppercase drop-shadow-md">
              Горбенко Антон
            </h3>
            <p className="font-secondary text-[#5C6BFF] font-bold text-sm uppercase tracking-[0.2em]">
              25 лет • Digital Creator & Motion Designer
            </p>
          </div>

          <div className="space-y-6 text-muted-custom font-secondary leading-relaxed">
            <p>
              С самого детства я увлечен искусством монтажа. То, что начиналось как хобби, переросло в профессиональное стремление создавать контент, который выделяется в бесконечной ленте.
            </p>
            <p>
              Я регулярно анализирую вирусные Reels, чтобы пополнять свой арсенал приёмов. Мой стек включает: 
              создание вирусных сценариев, профессиональный цветокор, динамичные субтитры, моушн-графику и 
              работу с передовыми ИИ-инструментами — от генерации ассетов до создания 
              <strong> ИИ-аватаров с липсинком</strong>.
            </p>
            
            <div className="relative pt-6">
              <div className="absolute top-0 left-0 w-12 h-1 bg-[#5C6BFF]/30 rounded-full"></div>
              <p className="font-secondary italic text-main-custom/90 text-lg">
                «Для меня главное, чтобы видео хотелось пересматривать десятки раз. Только когда результат вызывает такой эффект, я получаю истинное удовольствие от создания чего-то нового».
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);
const ToolsSection = () => {
  const tools = [
    { title: "Davinci Resolve", desc: "Большая часть работы: профессиональный монтаж и цветокоррекция.", icon: Scissors },
    { title: "After Effects", desc: "Сложные спецэффекты, моушн-графика и композитинг.", icon: Wand2 },
    { title: "KlingAI", desc: "Генерация кинематографичного видео и создание UGC контента.", icon: Film },
    { title: "HeyGen", desc: "Создание полноценных ИИ-аватаров и безупречный липсинк.", icon: Sparkles },
    { title: "Topaz AI", desc: "Интеллектуальный апскейл и восстановление качества видео.", icon: Maximize },
    { title: "Nano Banana PRO", desc: "Продвинутая работа с ИИ-изображениями и ассетами.", icon: MonitorPlay },
    { title: "Gemini", desc: "Генерация креативных идей и проработка вирусных сценариев.", icon: MessageSquare },
  ];

  return (
    <section id="tools" className="scroll-mt-32">
      <div className="text-center mb-16">
        <h2 className="font-primary text-3xl sm:text-5xl md:text-6xl text-white mb-4 uppercase drop-shadow-md break-words">
          Мои инструменты
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool, idx) => (
          <WorkflowStep 
            key={idx}
            number={idx + 1}
            title={tool.title}
            description={tool.desc}
            icon={tool.icon}
          />
        ))}
      </div>
    </section>
  );
};
  const WorkflowSection = () => (
    <section id="workflow" className="scroll-mt-32">
      <div className="text-center mb-20">
        <h2 className="font-primary text-3xl sm:text-5xl md:text-6xl text-white mb-4 uppercase drop-shadow-md break-words">
          Этапы сотрудничества
        </h2>
        <p className="font-secondary text-gray-400 font-light">Прозрачный процесс от первой идеи до начала работы</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <WorkflowStep 
          number="1" 
          title="Предложение" 
          description="Вы оставляете заявку с описанием ваших идей и техническим заданием." 
          icon={MessageSquare} 
        />
        <WorkflowStep 
          number="2" 
          title="Черновая смета" 
          description="Составляем предварительный список всех работ и расчет стоимости." 
          icon={FileText} 
        />
        <WorkflowStep 
          number="3" 
          title="Согласование" 
          description="Финальная смета после обсуждения деталей и утверждение сроков." 
          icon={FileCheck} 
        />
        <WorkflowStep 
          number="4" 
          title="Оплата" 
          description="Внесение оплаты и запуск проекта." 
          icon={CreditCard} 
        />
      </div>
    </section>
  );
  
  const PricingCard = ({ title, price, features, isPopular = false }) => (
    <div className={`relative bg-card-custom backdrop-blur-xl border ${isPopular ? 'border-[#5C6BFF] shadow-2xl' : 'border-[var(--border-color)] shadow-xl'} rounded-3xl p-10 flex flex-col transition-all hover:shadow-2xl hover:-translate-y-2 duration-500`}>
      {isPopular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#5C6BFF] text-white font-secondary text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-widest">Best Value</div>}
      <h3 className="font-primary text-3xl text-main-custom mb-2 uppercase">{title}</h3>
      <div className="flex items-baseline gap-2 mb-8"><span className="font-primary text-5xl text-main-custom">{price}</span></div>
      <ul className="flex flex-col gap-5 mb-12 flex-grow">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-4">
            <CheckCircle2 size={18} className="text-[#5C6BFF] shrink-0 mt-0.5" />
            <span className="font-secondary text-sm text-muted-custom font-light leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>
      {/* Теперь это ссылка, ведущая на блок #contact */}
      <a 
        href="/#contact" 
        className={`w-full py-5 rounded-2xl font-secondary font-bold text-sm uppercase tracking-widest transition-all text-center block ${isPopular ? 'bg-[#5C6BFF] text-white hover:bg-[#5C6BFF]/80 shadow-lg' : 'bg-[#5C6BFF]/10 text-main-custom hover:bg-[#5C6BFF]/20 border border-[#5C6BFF]/20'}`}
      >
        Заказать
      </a>
    </div>
  );
  
const PricingSection = () => (
    <section id="pricing" className="scroll-mt-32">
      <div className="text-center mb-16">
        <h2 className="font-primary text-5xl md:text-7xl text-white mb-6 uppercase drop-shadow-md">Стоимость</h2>
        <p className="font-secondary text-gray-400 font-light max-w-2xl mx-auto">
          Цены являются примерными. Для каждого проекта составляется <span className="text-[#5C6BFF] font-semibold">индивидуальная смета</span> в зависимости от сложности ТЗ.
        </p>
      </div>

      {/* Основные тарифы */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        <PricingCard 
          title="Basic" 
          price="1 000 ₽" 
          features={[
            "Нарезка готового видео",
            "Цветокоррекция",
            "Динамичные субтитры",
            "Подбор музыки"
          ]} 
        />
        <PricingCard 
          title="Advanced" 
          price="2 500 ₽" 
          isPopular={true} 
          features={[
            "Все из тарифа Basic",
            "ИИ-вставки и генерации",
            "Элементы Motion-графики",
            "Вставки с ИИ-ассистентом"
          ]} 
        />
        <PricingCard 
          title="Complex" 
          price="4 000 ₽" 
          features={[
            "Сложный монтаж (много ИИ)",
            "Продвинутая анимация",
            "Моушн-дизайн",
            "Липсинк (Lip Sync)"
          ]} 
        />
      </div>

      {/* Блок скидок */}
      {/* Блок скидок — теперь в стиле основных карточек */}
      <div className="max-w-4xl mx-auto bg-card-custom backdrop-blur-xl border border-[var(--border-color)] rounded-[2.5rem] p-8 md:p-12 text-center shadow-xl">
        <h3 className="font-primary text-2xl text-main-custom mb-8 uppercase tracking-wider">Оптовые скидки</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { count: '10', discount: '10%' },
            { count: '50', discount: '20%' },
            { count: '100', discount: '30%' }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-[var(--border-color)] transition-colors hover:border-[#5C6BFF]/40 group">
              <div className="font-primary text-3xl text-[#5C6BFF] mb-1">от {item.count} Reels</div>
              <div className="font-secondary text-sm text-muted-custom uppercase tracking-widest font-bold group-hover:text-main-custom transition-colors">
                скидка {item.discount}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );