import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  BookOpen, 
  Zap, 
  Globe, 
  Wallet, 
  ChevronRight, 
  ArrowRight,
  Star,
  Users,
  Shield,
  Search,
  Settings,
  Music,
  Smartphone,
  Plus
} from 'lucide-react';

const COURSES = [
  { 
    id: 1, 
    title: 'Уроки Вокала', 
    price: '15,000 ₸', 
    level: 'Начинающим', 
    category: 'Голос', 
    duration: '60 мин',
    description: 'Развитие диапазона, постановка дыхания и работа над тембром. Подходит для любого уровня подготовки.',
    program: ['Постановка дыхания', 'Разогрев связок', 'Работа над интонацией', 'Разбор репертуара'],
    curriculum: [
      { id: 1, title: 'Анатомия голоса', type: 'video', duration: '12 мин', completed: true },
      { id: 2, title: 'Диафрагмальное дыхание', type: 'video', duration: '15 мин', completed: false, active: true },
      { id: 3, title: 'Тест: Закрепление', type: 'quiz', duration: '5 вопр.', completed: false },
      { id: 4, title: 'ДЗ: Запись упражнения', type: 'task', duration: 'Проверка в ТГ', completed: false }
    ]
  },
  { 
    id: 2, 
    title: 'Обучение на Домбре', 
    price: '12,000 ₸', 
    level: 'Все уровни', 
    category: 'Инструменты',
    duration: '45 мин',
    description: 'Основы игры на национальном инструменте. Изучение кюев и современных мелодий.',
    program: ['Постановка рук', 'Основы ритма', 'Изучение простых кюев', 'Скоростная техника'],
    curriculum: [
      { id: 1, title: 'История инструмента', type: 'video', duration: '8 мин', completed: true },
      { id: 2, title: 'Первые щипки', type: 'video', duration: '12 мин', completed: false, active: true },
      { id: 3, title: 'Кюй: Махамбет', type: 'video', duration: '20 мин', completed: false }
    ]
  },
  { 
    id: 3, 
    title: 'Курс Гитары', 
    price: '14,000 ₸', 
    level: 'Средний', 
    category: 'Инструменты',
    duration: '50 мин',
    description: 'Акустическая и электрогитара. От аккордов до сложных соло-партий.',
    program: ['Аккорды и переборы', 'Теория музыки', 'Импровизация', 'Работа с эффектами'],
    curriculum: [
      { id: 1, title: 'Базовая постановка', type: 'video', duration: '15 мин', completed: true },
      { id: 2, title: 'Баррэ: Мастер-класс', type: 'video', duration: '25 мин', completed: false, active: true },
      { id: 3, title: 'Творческое задание', type: 'task', duration: 'Видео-отчет', completed: false }
    ]
  },
];

const TARIFFS = [
  { name: 'LITE', price: '0 ₸/мес', features: ['Ежедневные квесты', 'Музыкальное комьюнити', 'Базовая аналитика'], color: 'bg-white', current: true },
  { name: 'ACADEMY', price: '14,900 ₸/мес', features: ['Персональный ИИ-ментор 24/7', 'Все развивающие игры', 'Эксклюзивные мастер-классы'], color: 'bg-[#e0f2ff]', featured: true },
];

const Particle = ({ x, y, angle, color, onComplete }: { x: number, y: number, angle: number, color: string, onComplete: () => void }) => {
  const distance = 25 + Math.random() * 40;
  const targetX = x + Math.cos(angle) * distance;
  const targetY = y + Math.sin(angle) * distance;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x, y }}
      animate={{ 
        opacity: [0, 0.7, 0.5, 0], 
        scale: [0, 1, 0.8, 0.6], 
        x: targetX, 
        y: targetY,
        rotate: Math.random() * 360
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onAnimationComplete={onComplete}
      className="fixed top-0 left-0 pointer-events-none z-[100] font-black text-[14px] opacity-40 blur-[0.2px]"
      style={{ color }}
    >
      {['♪', '♫', '♬', '♭', '♯'][Math.floor(Math.random() * 5)]}
    </motion.div>
  );
};

export const MiniApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState<typeof COURSES[0] | null>(null);
  const [particles, setParticles] = useState<{ id: string; x: number; y: number; angle: number; color: string }[]>([]);

  const spawnParticles = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const timestamp = Date.now();
    const colors = ['#58cc02', '#1cb0f6', '#ffc800', '#ce82ff', '#ff4b4b'];
    
    const newParticles = Array.from({ length: 5 }).map((_, i) => {
      const angle = (i / 5) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const x = centerX + (rect.width / 2) * Math.cos(angle);
      const y = centerY + (rect.height / 2) * Math.sin(angle);

      return {
        id: `${timestamp}-${i}-${Math.random()}`,
        x,
        y,
        angle,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    });
    setParticles(prev => [...prev, ...newParticles].slice(-30));
  };

  const removeParticle = (id: string) => {
    setParticles(prev => prev.filter(p => p.id !== id));
  };
  const [userProfile] = useState({
    name: 'Арман',
    rank: 'Меломан',
    xp: 2450,
    level: 12,
    inventory: ['Медиатор Fender', 'Тюнер', 'Ноты "Көзімнің қарасы"'],
    completedCourses: ['Гитара: Аккорды', 'Вокал: Дыхание'],
    stats: { focus: 78, rhythm: 92, theory: 65 },
    quests: [
      { id: 1, title: 'Утренняя распевка', progress: 1, total: 3, xp: 50, icon: <Music /> },
      { id: 2, title: 'Мастер ритма', progress: 15, total: 20, xp: 200, icon: <Zap /> },
    ],
    milestones: [
      { stage: 1, title: 'Новичок', completed: true },
      { stage: 2, title: 'Слушатель', completed: true },
      { stage: 3, title: 'Исполнитель', completed: false, active: true },
      { stage: 4, title: 'Виртуоз', completed: false },
    ]
  });

  const renderProfile = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-32"
    >
      {/* Profile Header Card */}
      <div className="bg-white rounded-[2.5rem] border-b-8 border-slate-100 p-8 text-slate-800 relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-[2rem] bg-[#58cc02] border-b-8 border-[#46a302] flex items-center justify-center text-4xl font-black italic shadow-xl text-white transform -rotate-3 transition-transform hover:rotate-0 cursor-pointer active:scale-90 active:border-b-0 group" onClick={spawnParticles}>
            <span className="group-hover:animate-pulse">{userProfile.name[0]}</span>
          </div>
          <div>
            <h2 className="text-2xl font-display font-black leading-none mb-2 italic uppercase text-slate-800 tracking-tighter">{userProfile.name}</h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-indigo-50 rounded-full text-[9px] font-black uppercase tracking-widest text-indigo-500">
                LVL {userProfile.level}
              </span>
              <span className="px-3 py-1 bg-amber-50 rounded-full text-[9px] font-black uppercase tracking-widest text-amber-500">
                {userProfile.rank}
              </span>
            </div>
          </div>
        </div>

        <div className="duo-progress-bar mb-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            className="duo-progress-fill"
          />
        </div>
        <div className="flex justify-between text-[10px] font-black text-slate-300 uppercase tracking-widest px-1">
          <span>Прогресс уровня</span>
          <span>{userProfile.xp}/5000 XP</span>
        </div>
      </div>

      {/* Path / Stages */}
      <div className="space-y-6 px-2">
        <h3 className="text-xl font-display font-black text-slate-800 uppercase italic tracking-tighter ml-2">Путь Артиста</h3>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-10 top-0 bottom-0 w-2 bg-slate-100 rounded-full" />
          
          <div className="space-y-12 relative z-10">
            {userProfile.milestones.map((ms, i) => (
              <div key={i} className="flex items-center gap-8">
                <div 
                  onClick={spawnParticles}
                  className={`w-20 h-20 rounded-[2rem] flex items-center justify-center border-b-8 shadow-lg transition-transform active:translate-y-1 active:border-b-0 cursor-pointer
                  ${ms.completed ? 'bg-[#58cc02] border-[#46a302] text-white' : 
                    ms.active ? 'bg-[#1cb0f6] border-[#168ec6] text-white animate-bounce' : 
                    'bg-slate-50 border-slate-200 text-slate-300'}
                `}>
                  {ms.completed ? <Star size={32} fill="white" /> : <Zap size={32} />}
                </div>
                <div>
                  <h4 className={`text-lg font-black uppercase italic tracking-tighter leading-none mb-1 ${ms.completed || ms.active ? 'text-slate-800' : 'text-slate-300'}`}>
                    Этап {ms.stage}: {ms.title}
                  </h4>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    {ms.completed ? 'Завершено' : ms.active ? 'Текущая цель' : 'Заблокировано'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quests Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-end px-2">
          <h3 className="text-xl font-display font-black text-slate-800 uppercase italic tracking-tighter">Ежедневные квесты</h3>
          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Обновление через 12ч</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {userProfile.quests.map(quest => (
            <div key={quest.id} className="bg-white border-2 border-b-6 border-slate-100 rounded-[2rem] p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-700">
                    {React.cloneElement(quest.icon as React.ReactElement, { size: 24 })}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800 uppercase italic leading-none mb-1">{quest.title}</h4>
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">+{quest.xp} XP</span>
                  </div>
                </div>
                <span className="text-xs font-black text-slate-300">{quest.progress}/{quest.total}</span>
              </div>
              <div className="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                <div 
                  className="h-full bg-[#1cb0f6] rounded-full transition-all duration-1000"
                  style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory & Assets */}
      <div className="space-y-4 px-2">
        <h3 className="text-xl font-display font-black text-slate-800 uppercase italic tracking-tighter">Снаряжение</h3>
        <div className="grid grid-cols-3 gap-3">
          {userProfile.inventory.map((item, i) => (
            <div 
              key={i} 
              onClick={spawnParticles}
              className="aspect-square bg-white border-2 border-b-6 border-slate-100 rounded-3xl p-4 flex flex-col items-center justify-center text-center gap-2 group cursor-pointer hover:scale-105 active:scale-95 active:border-b-0 transition-all"
            >
              <div className="text-2xl group-hover:scale-110 transition-transform">📦</div>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter leading-tight">{item}</span>
            </div>
          ))}
        <button 
          onClick={spawnParticles}
          className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 group cursor-pointer hover:border-indigo-100 transition-colors"
        >
          <Plus size={24} className="text-slate-300 group-hover:text-slate-400" />
        </button>
        </div>
      </div>
    </motion.div>
  );

  const renderGames = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8 pb-32"
    >
      <div className="px-2">
        <h2 className="text-3xl font-display font-black text-slate-800 leading-tight italic uppercase tracking-tighter mb-2">
          Тренажеры навыков
        </h2>
        <p className="text-sm font-bold text-slate-400 italic">Тренируй навыки и зарабатывай XP</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {[
          { id: 'rhythm', title: 'Ритм-Мастер', desc: 'Улучшай чувство темпа, попадая в такт.', xp: '+50 XP', color: 'bg-[#e2f5e9]', border: 'border-[#58cc02]', accent: 'text-[#58cc02]', icon: '🥁' },
          { id: 'ear', title: 'Слухач', desc: 'Угадывай ноты и интервалы на слух.', xp: '+100 XP', color: 'bg-[#e0f2ff]', border: 'border-[#1cb0f6]', accent: 'text-[#1cb0f6]', icon: '👂' },
          { id: 'focus', title: 'Фокус-Дзен', desc: 'Медитативная игра на концентрацию.', xp: '+30 XP', color: 'bg-[#fff9db]', border: 'border-[#ffc800]', accent: 'text-[#ffc800]', icon: '🧘' },
        ].map((game) => (
          <div 
            key={game.id} 
            onClick={spawnParticles}
            className={`${game.color} rounded-[2.5rem] p-8 border-b-8 ${game.border} group cursor-pointer active:translate-y-2 active:border-b-2 shadow-sm transition-all`}
          >
             <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">{game.icon}</div>
                  <h3 className="text-2xl font-display font-black text-slate-800 italic uppercase tracking-tighter">{game.title}</h3>
                </div>
                <span className={`text-[11px] font-black uppercase tracking-widest ${game.accent} bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-100`}>{game.xp}</span>
             </div>
             <p className="text-slate-600 text-sm font-bold mb-8 leading-relaxed italic">{game.desc}</p>
             <button 
                onClick={spawnParticles}
                className="duo-btn-primary w-full bg-white text-slate-800 border-slate-200"
              >
                Начать тренировку
             </button>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderCourseDetail = (course: typeof COURSES[0]) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="space-y-6 pb-24"
    >
      <button 
        onClick={() => setSelectedCourse(null)}
        className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-4"
      >
        <ArrowRight className="w-4 h-4 rotate-180" /> Назад к списку
      </button>

      <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
          <Music size={32} />
        </div>
        <h2 className="text-3xl font-display font-black text-slate-800 mb-2 leading-none uppercase italic">{course.title}</h2>
        <div className="flex gap-2 mb-6">
          <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase text-slate-500">{course.category}</span>
          <span className="px-3 py-1 bg-indigo-50 rounded-full text-[10px] font-black uppercase text-indigo-600">{course.level}</span>
        </div>
        
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          {course.description}
        </p>

        <div className="space-y-4 mb-8">
          <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-6">Этапы твоего обучения</h4>
          <div className="relative space-y-8">
          {/* Vertical Path */}
          <div className="absolute left-[19px] top-4 bottom-4 w-1 bg-slate-100 rounded-full" />
          
          {(course as any).curriculum?.map((step: any, idx: number) => (
            <div 
              key={idx} 
              onClick={spawnParticles}
              className="flex gap-5 items-start relative z-10 group cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border-b-4 transition-all group-hover:scale-110 active:scale-95 active:border-b-0 ${
                  step.completed ? 'bg-[#58cc02] border-[#46a302] text-white shadow-lg' : 
                  step.active ? 'bg-[#1cb0f6] border-[#168ec6] text-white animate-pulse shadow-md' : 
                  'bg-white border-slate-200 text-slate-300'
                }`}>
                  {step.type === 'video' ? <Smartphone size={18} /> : 
                   step.type === 'quiz' ? <Zap size={18} /> : <BookOpen size={18} />}
                </div>
                <div className="flex-1 pt-1 bg-white">
                  <h5 className={`text-sm font-black uppercase italic leading-none mb-1.5 ${step.completed || step.active ? 'text-slate-800' : 'text-slate-300'}`}>
                    {step.title}
                  </h5>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      {step.duration}
                    </span>
                    {step.completed && (
                      <span className="text-[9px] font-black text-[#58cc02] uppercase tracking-widest">+50 XP</span>
                    )}
                  </div>
                </div>
                {step.completed && (
                  <div className="bg-[#58cc02] rounded-full p-1 self-center">
                    <ChevronRight size={14} fill="white" className="text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-6 bg-slate-900 rounded-3xl text-white">
          <div>
            <p className="text-[10px] font-black uppercase opacity-50 mb-1">Стоимость занятия</p>
            <p className="text-xl font-display font-black">{course.price}</p>
          </div>
          <button 
            onClick={spawnParticles}
            className="bg-indigo-500 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Записаться
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderHome = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-24"
    >
      <AnimatePresence mode="wait">
        {selectedCourse ? renderCourseDetail(selectedCourse) : (
          <>
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Найти курс или учителя..."
                className="w-full bg-white border-2 border-b-4 border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-200 transition-colors font-bold"
              />
            </div>

            {/* Hero Mini Section */}
            <div className="bg-[#e0f2ff] rounded-[2.5rem] p-8 border-b-8 border-[#1cb0f6] relative overflow-hidden group">
              <div className="relative z-10">
                <h2 className="text-3xl font-display font-black text-[#1cb0f6] leading-tight mb-2 italic uppercase tracking-tighter">
                  Твой путь <br />в музыке
                </h2>
                <p className="text-slate-500 text-xs font-bold mb-6 max-w-[160px]">
                  Запишись на первое пробное занятие бесплатно.
                </p>
                <button 
                  onClick={spawnParticles}
                  className="duo-btn-primary bg-[#1cb0f6] border-[#168ec6]"
                >
                  Записаться
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-20 transform group-hover:scale-110 transition-transform duration-700">
                <Music size={140} strokeWidth={1} className="text-white" />
              </div>
            </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <BookOpen />, label: 'Курсы', color: 'bg-[#e0f2ff]', border: 'border-[#1cb0f6]', iconColor: 'text-[#1cb0f6]', action: () => setActiveTab('home') },
            { icon: <Users />, label: 'Учителя', color: 'bg-[#f3e8ff]', border: 'border-[#ce82ff]', iconColor: 'text-[#ce82ff]', action: () => { spawnParticles({ currentTarget: document.body } as any); } },
            { icon: <Zap />, label: 'Тарифы', color: 'bg-white', border: 'border-slate-200', iconColor: 'text-[#1cb0f6]', action: () => setActiveTab('tariffs') },
            { icon: <Globe />, label: 'О школе', color: 'bg-white', border: 'border-slate-200', iconColor: 'text-[#ce82ff]', action: () => setActiveTab('ecosystem') },
          ].map((item, i) => (
            <div 
              key={i} 
              onClick={(e) => { spawnParticles(e); item.action(); }}
              className={`${item.color} border-b-4 ${item.border} rounded-[2rem] p-6 flex flex-col items-center gap-3 cursor-pointer hover:scale-[1.02] active:scale-95 active:border-b-0 transition-all`}
            >
              <div className={item.iconColor}>{React.cloneElement(item.icon as React.ReactElement, { size: 32, strokeWidth: 2.5 })}</div>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-700">{item.label}</span>
            </div>
          ))}
        </div>

            {/* Recent Updates */}
            <div className="pt-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-display font-black text-slate-800 uppercase italic tracking-tighter">Популярные направления</h3>
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full">Все</span>
              </div>
              <div className="space-y-4">
                {COURSES.map(course => (
                  <div 
                    key={course.id} 
                    onClick={(e) => { spawnParticles(e); setSelectedCourse(course); }}
                    className="bg-white border-2 border-b-4 border-slate-100 rounded-[2rem] p-5 flex items-center justify-between hover:border-slate-200 transition-all cursor-pointer active:translate-y-1 active:border-b-0"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border-2 border-slate-100/50">
                        <Music className="w-6 h-6 text-[#1cb0f6]" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-slate-800 leading-none mb-1.5 uppercase italic tracking-tighter">{course.title}</h4>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{course.category} • {course.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-[#58cc02]">{course.price}</p>
                      <span className="text-[10px] text-slate-300 font-black uppercase">{course.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const renderTariffs = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8 pb-24"
    >
       <h2 className="text-4xl font-display font-black text-slate-800 leading-tight italic uppercase tracking-tighter">
        Наши <br />Тарифы
      </h2>
      <div className="space-y-6">
        {TARIFFS.map((tariff, i) => (
          <div key={i} className={`border-2 border-b-8 border-slate-100 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden transition-all hover:border-indigo-100 ${tariff.color}`}>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <h3 className="text-2xl font-display font-black text-slate-800 italic uppercase tracking-tighter">
                {tariff.name}
              </h3>
              <p className="text-sm font-black text-[#58cc02] bg-white px-4 py-1.5 rounded-full shadow-sm border border-slate-50">
                {tariff.price}
              </p>
            </div>
            <ul className="space-y-3 mb-8 relative z-10">
              {tariff.features.map((f, j) => (
                <li key={j} className="text-sm text-slate-600 flex items-center gap-3 font-bold italic">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={spawnParticles}
              className="duo-btn-primary w-full bg-slate-900 border-slate-700 text-white leading-none"
            >
              Выбрать план
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderEcosystem = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8 pb-24"
    >
       <h2 className="text-4xl font-display font-black text-slate-800 leading-tight italic uppercase tracking-tighter">
        О школе <br />UNICLUB
      </h2>
      <div className="bg-[#f3e8ff] rounded-[2.5rem] p-10 border-b-8 border-[#ce82ff] space-y-6">
        <p className="text-slate-700 text-base leading-relaxed font-bold italic">
          UNICLUB — это современная музыкальная школа, где мы учим не просто играть на инструментах, а чувствовать музыку.
        </p>
        <div className="space-y-5 pt-6 border-t border-[#ce82ff]/20">
          {[
            { label: 'Современный подход', desc: 'Учим на поп, рок и джаз композициях.', icon: <Music size={20} /> },
            { label: 'Профессиональное оборудование', desc: 'Студийные микрофоны и качественные инструменты.', icon: <Zap size={20} /> },
            { label: 'Творческое комьюнити', desc: 'Участвуйте в концертах и находите единомышленников.', icon: <Users size={20} /> },
          ].map((item, i) => (
            <div 
              key={i} 
              onClick={spawnParticles}
              className="flex gap-5 items-start p-4 hover:bg-white/50 rounded-2xl transition-colors cursor-pointer active:scale-[0.98]"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white flex items-center justify-center border-b-4 border-slate-100 shadow-sm text-[#ce82ff]">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-tighter mb-1 italic leading-none">{item.label}</h4>
                <p className="text-[11px] text-slate-500 font-bold leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

       <div className="p-10 bg-slate-900 rounded-[2.5rem] border-b-8 border-slate-700 text-white overflow-hidden relative group">
          <div className="relative z-10">
            <h3 className="text-2xl font-display font-black mb-3 uppercase italic tracking-tighter">Telegram Канал</h3>
            <p className="text-sm text-white/50 mb-10 font-bold leading-relaxed italic">Следите за новостями, мастер-классами <br /> и лайфхаками от наших учителей.</p>
            <button 
              onClick={spawnParticles}
              className="duo-btn-primary w-full bg-[#1cb0f6] border-[#168ec6]"
            >
               Вступить в группу
            </button>
          </div>
          <div className="absolute top-[-20%] right-[-10%] opacity-10 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
            <Smartphone size={220} />
          </div>
       </div>
    </motion.div>
  );

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-0 sm:p-4 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Particles Overlay */}
      <AnimatePresence>
        {particles.map(p => (
          <Particle key={p.id} x={p.x} y={p.y} angle={p.angle} color={p.color} onComplete={() => removeParticle(p.id)} />
        ))}
      </AnimatePresence>

      <div className="w-full max-w-[440px] bg-white min-h-[100dvh] shadow-2xl relative flex flex-col overflow-x-hidden">
        {/* Header */}
        <header className="p-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-slate-50">
          <div className="flex items-center gap-2">
            <div 
              onClick={() => { setActiveTab('home'); setSelectedCourse(null); }}
              className="w-10 h-10 rounded-2xl bg-[#1cb0f6] flex items-center justify-center text-white font-black italic cursor-pointer hover:scale-105 transition-transform"
            >
              U
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block leading-none">UNICLUB</span>
              <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest block leading-none mt-1">Music Academy</span>
            </div>
          </div>
          <button 
            onClick={spawnParticles}
            className="p-2.5 bg-slate-50 rounded-2xl text-slate-400 hover:text-[#1cb0f6] transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 px-6 pt-6">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && renderHome()}
            {activeTab === 'tariffs' && renderTariffs()}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'games' && renderGames()}
          </AnimatePresence>
        </main>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 w-full max-w-[440px] bg-white border-t-2 border-slate-100 px-6 py-4 flex justify-around items-end z-50 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          {[
            { id: 'home', icon: <Home />, label: 'Уроки' },
            { id: 'tariffs', icon: <Zap />, label: 'Магазин' },
            { id: 'games', icon: <Smartphone />, label: 'Квесты' },
            { id: 'profile', icon: <Users />, label: 'Профиль' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={(e) => { spawnParticles(e); setActiveTab(tab.id); setSelectedCourse(null); }}
              className={`flex flex-col items-center gap-1 transition-all duration-200 group active:scale-90 ${
                activeTab === tab.id ? 'text-[#1cb0f6]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={`p-2 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-[#e0f2ff] ring-4 ring-[#e0f2ff]' : ''}`}>
                {React.cloneElement(tab.icon as React.ReactElement, { 
                    size: 24, 
                    strokeWidth: activeTab === tab.id ? 2.5 : 2 
                })}
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest mt-1">
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute -top-1 w-12 h-1 bg-[#1cb0f6] rounded-full"
                />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
