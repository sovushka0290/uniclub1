import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTelegram } from '../hooks/useTelegram';
import CoursePlayer from './TMA/CoursePlayer';
import { 
  Home, 
  BookOpen, 
  Zap, 
  Globe, 
  Wallet, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  Star,
  Users,
  Shield,
  Search,
  CheckCircle2,
  Play,
  Settings,
  Music,
  Smartphone,
  Plus,
  MessageCircle,
  Heart,
  Package,
  Activity,
  Headphones,
  Brain
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

const Particle = ({ x, y, angle, color, onComplete }: { x: number, y: number, angle: number, color: string, onComplete: () => void, key?: React.Key }) => {
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
  const { user } = useTelegram();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState<typeof COURSES[0] | null>(null);
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);
  const [showCoursePath, setShowCoursePath] = useState<string | null>(null);
  const [showMyCoursesList, setShowMyCoursesList] = useState(false);
  const [activeLesson, setActiveLesson] = useState<boolean>(false);
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

  const userName = user?.first_name || 'Студент';
  const userLastName = user?.last_name || '';
  const fullName = `${userName} ${userLastName}`.trim();

  const userProfile = {
    name: userName,
    fullName: fullName,
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
  };

  const renderProfile = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-32"
    >
      {/* Profile Header Card */}
      <div className="duo-card p-8 bg-white text-slate-800 relative overflow-hidden flex flex-col items-center text-center">
        <div className="relative z-10 flex flex-col items-center gap-4 mb-6">
          <div className="w-24 h-24 rounded-[2rem] bg-[#58cc02] border-b-8 border-[#46a302] flex items-center justify-center text-4xl font-black shadow-lg text-white transform hover:scale-105 transition-transform cursor-pointer overflow-hidden" onClick={spawnParticles}>
            {user?.photo_url ? (
              <img src={user.photo_url} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <span>{userProfile.name[0]}</span>
            )}
          </div>
          <div>
            <h2 className="text-3xl font-display font-black leading-none mb-3 text-slate-800 tracking-tight">{userProfile.fullName}</h2>
            <div className="flex justify-center gap-2">
              <span className="px-4 py-1.5 bg-[#e0f2ff] rounded-2xl text-xs font-black uppercase tracking-widest text-[#1cb0f6]">
                Уровень {userProfile.level}
              </span>
              <span className="px-4 py-1.5 bg-[#fff9db] rounded-2xl text-xs font-black uppercase tracking-widest text-[#ffc800]">
                {userProfile.rank}
              </span>
            </div>
          </div>
        </div>

        <div className="duo-progress-bar mb-3 w-full">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '65%' }}
            className="duo-progress-fill bg-[#1cb0f6] border-none"
          />
        </div>
        <div className="flex justify-between w-full text-xs font-bold text-slate-400 uppercase tracking-widest">
          <span>Прогресс</span>
          <span>{userProfile.xp}/5000 XP</span>
        </div>
      </div>

      {/* Path / Stages */}
      <div className="space-y-6">
        <h3 className="text-2xl font-display font-black text-slate-800 tracking-tight">Достижения</h3>
        <div className="relative pl-4">
          <div className="absolute left-11 top-4 bottom-4 w-2 bg-slate-100 rounded-full" />
          
          <div className="space-y-8 relative z-10">
            {userProfile.milestones.map((ms, i) => (
              <div key={i} className="flex items-center gap-6">
                <div 
                  onClick={spawnParticles}
                  className={`w-16 h-16 rounded-[2rem] flex items-center justify-center border-2 border-b-[6px] transition-transform hover:scale-105 active:scale-95 active:border-b-2 cursor-pointer
                  ${ms.completed ? 'bg-[#58cc02] border-[#58cc02] border-b-[#46a302] text-white shadow-sm' : 
                    ms.active ? 'bg-[#ffc800] border-[#ffc800] border-b-[#e5b400] text-white animate-bounce shadow-sm' : 
                    'bg-slate-100 border-slate-200 border-b-slate-300 text-slate-300'}
                `}>
                  {ms.completed ? <Star size={28} className="fill-current" /> : <Zap size={28} className={ms.active ? "fill-current" : ""} />}
                </div>
                <div>
                  <h4 className={`text-lg font-black tracking-tight leading-none mb-1 text-slate-800`}>
                    Этап {ms.stage}: {ms.title}
                  </h4>
                  <p className={`text-xs font-bold uppercase tracking-widest ${ms.completed ? 'text-[#58cc02]' : ms.active ? 'text-[#ffc800]' : 'text-slate-400'}`}>
                    {ms.completed ? 'Завершено' : ms.active ? 'Текущая цель' : 'Заблокировано'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quests Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <h3 className="text-2xl font-display font-black text-slate-800 tracking-tight">Задания</h3>
          <span className="text-xs font-black text-[#1cb0f6] uppercase tracking-widest bg-[#e0f2ff] px-3 py-1 rounded-2xl">Еще 12ч</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {userProfile.quests.map(quest => (
            <div key={quest.id} className="duo-card p-6 bg-white flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-[1.5rem] bg-[#e0f2ff] text-[#1cb0f6] flex items-center justify-center border-2 border-[#1cb0f6] border-b-4">
                  {React.cloneElement(quest.icon as React.ReactElement, { size: 28 })}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-black text-slate-800 leading-none mb-2 tracking-tight">{quest.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#ffc800] uppercase tracking-widest">+{quest.xp} XP</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">{quest.progress}/{quest.total} Пройдено</span>
                  </div>
                </div>
              </div>
              <div className="duo-progress-bar">
                <div 
                  className="duo-progress-fill"
                  style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory & Assets */}
      <div className="space-y-6">
        <h3 className="text-2xl font-display font-black text-slate-800 tracking-tight">Инвентарь</h3>
        <div className="grid grid-cols-3 gap-4">
          {userProfile.inventory.map((item, i) => (
            <div 
              key={i} 
              onClick={spawnParticles}
              className="aspect-square duo-card bg-white p-4 flex flex-col items-center justify-center text-center gap-3 cursor-pointer group"
            >
              <div className="text-4xl transform group-hover:scale-110 group-active:scale-95 transition-transform text-[#1cb0f6]">
                 <Package size={40} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-tight">{item}</span>
            </div>
          ))}
          <button 
            onClick={spawnParticles}
            className="aspect-square bg-slate-50 border-2 border-dashed border-slate-300 rounded-[2rem] flex items-center justify-center text-slate-300 hover:bg-slate-100 hover:text-slate-400 transition-colors active:scale-95"
          >
            <Plus size={32} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderGames = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 pb-32"
    >
      <div className="mb-8">
        <h2 className="text-4xl font-display font-black text-slate-800 leading-none tracking-tight mb-3">
          Игры и Тренажеры
        </h2>
        <p className="text-base font-bold text-slate-500">Улучшай навыки, играя и получая опыт.</p>
      </div>
      
      <div className="space-y-6">
        {[
          { id: 'rhythm', title: 'Ритм-Мастер', desc: 'Улучшай чувство темпа, попадая в такт.', xp: '+50 XP', color: 'bg-[#e2f5e9]', border: 'border-[#58cc02]', borderColor: 'border-[#46a302]', accent: 'text-[#58cc02]', icon: <Activity size={32} strokeWidth={2.5} /> },
          { id: 'ear', title: 'Слухач', desc: 'Угадывай ноты и интервалы на слух.', xp: '+100 XP', color: 'bg-[#e0f2ff]', border: 'border-[#1cb0f6]', borderColor: 'border-[#168ec6]', accent: 'text-[#1cb0f6]', icon: <Headphones size={32} strokeWidth={2.5} /> },
          { id: 'focus', title: 'Фокус-Дзен', desc: 'Медитативная игра на концентрацию.', xp: '+30 XP', color: 'bg-[#fff9db]', border: 'border-[#ffc800]', borderColor: 'border-[#e5b400]', accent: 'text-[#ffc800]', icon: <Brain size={32} strokeWidth={2.5} /> },
        ].map((game) => (
          <div 
            key={game.id} 
            onClick={spawnParticles}
            className={`${game.color} rounded-[2rem] p-6 border-2 ${game.border} border-b-[8px] ${game.borderColor} group cursor-pointer active:translate-y-[6px] active:border-b-2 transition-all flex flex-col`}
          >
             <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform shadow-sm">
                  {game.icon}
                </div>
                <span className={`text-xs font-black uppercase tracking-widest ${game.accent} bg-white px-4 py-2 rounded-2xl shadow-sm border-2 border-white`}>{game.xp}</span>
             </div>
             <div>
                <h3 className="text-2xl font-display font-black text-slate-800 tracking-tight mb-2">{game.title}</h3>
                <p className={`text-sm font-bold opacity-80 mb-6 ${game.accent}`}>{game.desc}</p>
             </div>
             <button 
                onClick={spawnParticles}
                className="duo-btn-secondary w-full border-none shadow-sm group-hover:text-slate-800"
              >
                Начать мини-игру
             </button>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderCourseDetail = (course: typeof COURSES[0]) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-6 pb-24"
    >
      <button 
        onClick={() => setSelectedCourse(null)}
        className="flex items-center gap-2 text-slate-400 font-bold text-sm uppercase tracking-widest mb-2 hover:text-slate-600 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" /> Назад
      </button>

      <div className="duo-card p-8 group">
        <div className="w-20 h-20 rounded-2xl bg-[#e0f2ff] flex items-center justify-center text-[#1cb0f6] border-2 border-[#1cb0f6] border-b-[6px] mb-6 shadow-sm">
          <Music size={40} strokeWidth={2.5} />
        </div>
        <h2 className="text-4xl font-display font-black text-slate-800 mb-3 leading-none tracking-tight">{course.title}</h2>
        <div className="flex gap-3 mb-6">
          <span className="px-4 py-1.5 bg-slate-100 rounded-2xl text-xs font-black uppercase text-slate-500 tracking-wider">
            {course.category}
          </span>
          <span className="px-4 py-1.5 bg-[#e0f2ff] rounded-2xl text-xs font-black uppercase text-[#1cb0f6] tracking-wider">
            {course.level}
          </span>
        </div>
        
        <p className="text-slate-600 text-base font-bold leading-relaxed mb-10">
          {course.description}
        </p>

        <div className="space-y-4 mb-10">
          <h4 className="text-sm font-black uppercase tracking-widest text-[#1cb0f6] mb-6 bg-[#e0f2ff] inline-block px-4 py-2 rounded-2xl">Этапы обучения</h4>
          <div className="relative space-y-6">
            <div className="absolute left-[22px] top-6 bottom-6 w-2 bg-slate-100 rounded-full" />
            
            {(course as any).curriculum?.map((step: any, idx: number) => (
              <div 
                key={idx} 
                onClick={spawnParticles}
                className="flex gap-6 items-center relative z-10 group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-2 border-b-[6px] transition-all group-hover:scale-105 active:scale-95 active:border-b-2 ${
                    step.completed ? 'bg-[#58cc02] border-[#58cc02] border-b-[#46a302] text-white shadow-lg' : 
                    step.active ? 'bg-[#1cb0f6] border-[#1cb0f6] border-b-[#168ec6] text-white animate-pulse shadow-md' : 
                    'bg-slate-100 border-slate-200 border-b-slate-300 text-slate-400'
                  }`}>
                    {step.type === 'video' ? <Play size={24} className="ml-1" /> : 
                     step.type === 'quiz' ? <Zap size={24} /> : <BookOpen size={24} />}
                </div>
                <div className="flex-1 bg-white">
                  <h5 className={`text-lg font-black leading-none mb-2 tracking-tight ${step.completed || step.active ? 'text-slate-800' : 'text-slate-400'}`}>
                    {step.title}
                  </h5>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      {step.duration}
                    </span>
                    {step.completed && (
                      <span className="text-xs font-black text-[#58cc02] uppercase tracking-wider">+50 XP</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t-2 border-slate-100">
          <div className="flex flex-col items-center gap-4 text-center">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">
                {purchasedCourses.includes(course.title) ? 'Разблокировано' : 'Стоимость курса'}
              </p>
              <p className="text-3xl font-display font-black text-slate-800 tracking-tight">
                {purchasedCourses.includes(course.title) ? 'Бесплатно' : course.price}
              </p>
            </div>
            
            <button 
              onClick={(e) => {
                spawnParticles(e);
                if (purchasedCourses.includes(course.title)) {
                  setShowCoursePath(course.title);
                } else {
                  setPurchasedCourses(prev => [...prev, course.title]);
                  (window as any).Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
                }
              }}
              className="duo-btn-primary w-full mt-4"
            >
              {purchasedCourses.includes(course.title) ? 'Открыть уроки' : 'Начать обучение'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderMyCoursesList = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#f8f9fa] bg-ornament overflow-y-auto no-scrollbar pb-32"
    >
      <div className="px-6 pt-8 pb-4 flex items-center gap-4 bg-white sticky top-0 z-20 border-b-2 border-slate-100 shadow-sm">
        <button onClick={() => setShowMyCoursesList(false)} className="p-3 bg-slate-100 rounded-2xl text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-colors active:scale-95">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="flex-1 text-2xl font-display font-black text-slate-800 tracking-tight text-center relative right-6">Мои уроки</h2>
      </div>

      <div className="p-6 space-y-6">
        {purchasedCourses.length > 0 ? (
          COURSES.filter(c => purchasedCourses.includes(c.title)).map(course => (
            <motion.div 
              key={course.id} 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => { spawnParticles(e); setShowCoursePath(course.title); }}
              className="duo-card p-6 flex flex-col hover:bg-slate-50 cursor-pointer bg-white"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-[#e2f5e9] flex items-center justify-center text-[#58cc02] border-2 border-[#58cc02] border-b-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-display font-black text-slate-800 leading-none mb-2 tracking-tight">{course.title}</h4>
                  <span className="text-xs font-black uppercase text-[#58cc02] tracking-wider bg-[#e2f5e9] px-3 py-1 rounded-xl">Курс начат</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                 <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>Пройдено 1/4</span>
                    <span className="text-[#58cc02]">33%</span>
                 </div>
                 <div className="duo-progress-bar bg-slate-100 h-4">
                    <div className="duo-progress-fill w-1/3 border-b-4 border-b-[#46a302]"></div>
                 </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="mt-20 text-center flex flex-col items-center">
            <div className="w-32 h-32 rounded-[2rem] bg-slate-100 flex items-center justify-center text-slate-300 mb-6 border-4 border-white shadow-sm">
                <Music size={64} />
            </div>
            <h3 className="text-2xl font-display font-black text-slate-600 mb-2">Здесь пока пусто</h3>
            <p className="text-slate-400 font-bold max-w-xs px-4">Купите свой первый курс, чтобы начать обучение в нашей академии</p>
            <button
               onClick={() => setShowMyCoursesList(false)}
               className="duo-btn-primary mt-8"
            >
                Найти курс
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderCoursePath = (courseTitle: string) => (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#e0f2ff] bg-ornament overflow-y-auto no-scrollbar"
      >
        <div className="px-6 pt-8 pb-4 flex items-center justify-between bg-white/80 backdrop-blur-xl sticky top-0 z-30 border-b-2 border-[#1cb0f6]/20">
          <button onClick={() => setShowCoursePath(null)} className="p-3 bg-white border-2 border-slate-200 border-b-[4px] rounded-2xl text-slate-500 hover:text-[#1cb0f6] active:scale-95 transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center px-4">
              <h2 className="text-xl font-display font-black text-slate-800 tracking-tight leading-none">{courseTitle}</h2>
          </div>
          <div className="p-3 bg-white border-2 border-slate-200 border-b-[4px] rounded-2xl flex items-center gap-1 text-[#ffc800]">
            <Heart size={20} className="fill-[#ffc800]" />
            <span className="font-black">5</span>
          </div>
        </div>

        <div className="relative py-16 flex flex-col items-center min-h-[1200px] bg-[#e0f2ff]">
          {/* SVG Winding Path background */}
          <svg className="absolute top-0 w-full h-[1200px] pointer-events-none opacity-20">
            <path 
              d="M 200 0 Q 300 150 200 300 T 200 600 T 200 900 T 200 1200" 
              fill="none" 
              stroke="#1cb0f6" 
              strokeWidth="24" 
              strokeLinecap="round"
              className="path-line"
            />
          </svg>

          <div className="space-y-[4.5rem] relative z-10 w-full px-6 flex flex-col">
            {[
              { title: 'Введение', type: 'video', completed: true, align: 'self-center' },
              { title: 'Гармония', type: 'quiz', completed: true, active: false, align: 'self-start ml-8' },
              { title: 'Теория I', type: 'video', completed: false, active: true, align: 'self-end mr-8' },
              { title: 'Практика', type: 'video', completed: false, align: 'self-center' },
              { title: 'Экзамен', type: 'quiz', completed: false, align: 'self-start ml-12' },
              { title: 'ДЗ Админу', type: 'homework', completed: false, align: 'self-center' },
            ].map((node, i) => (
              <div 
                key={i}
                className={`flex flex-col items-center gap-3 relative ${node.align}`}
              >
                {node.active && (
                   <motion.div 
                     animate={{ y: [0, -10, 0] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute -top-12 bg-white px-4 py-2 rounded-2xl border-2 border-[#1cb0f6] text-[#1cb0f6] font-black uppercase tracking-widest text-xs z-10 shadow-lg"
                   >
                     Начать!
                     <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-[#1cb0f6] rotate-45" />
                   </motion.div>
                )}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (node.type === 'homework') {
                       if ((window as any).Telegram?.WebApp) {
                         (window as any).Telegram.WebApp.openTelegramLink('https://t.me/UniClubMusicBot');
                       } else {
                         window.open('https://t.me/UniClubMusicBot', '_blank');
                       }
                    } else if (node.completed || node.active) {
                       setActiveLesson(true);
                    }
                  }}
                  className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center relative cursor-pointer border-2 border-b-[8px] transition-all ${
                    node.completed 
                      ? 'bg-[#58cc02] border-[#58cc02] border-b-[#46a302] text-white shadow-lg' 
                      : node.active 
                        ? 'bg-[#1cb0f6] border-[#1cb0f6] border-b-[#168ec6] text-white shadow-[0_10px_30px_rgba(28,176,246,0.3)]'
                        : 'bg-white border-slate-200 border-b-slate-300 text-slate-300'
                  }`}
                >
                  {node.completed ? <CheckCircle2 className="w-10 h-10" /> : (
                    node.type === 'video' ? <Play className="w-10 h-10 fill-current ml-1" /> :
                    node.type === 'homework' ? <MessageCircle className="w-10 h-10" /> :
                    <Zap className="w-10 h-10 fill-current" />
                  )}
                  
                  {/* Floating badge */}
                  <div className={`absolute -right-2 -bottom-2 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black shadow-sm ${
                    node.completed ? 'bg-white text-[#58cc02] border-[#58cc02]' :
                    node.active ? 'bg-white text-[#1cb0f6] border-[#1cb0f6]' :
                    'bg-white text-slate-400 border-slate-200'
                  }`}>
                    {i + 1}
                  </div>
                </motion.div>
                <span className={`text-[13px] font-black tracking-tight ${node.completed || node.active ? 'text-slate-800' : 'text-slate-400'}`}>
                  {node.title}
                </span>
              </div>
            ))}
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
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Искать курсы или учителей..."
                className="w-full bg-slate-100/50 border-2 border-slate-200 border-b-[4px] rounded-2xl py-4 pl-12 pr-4 text-base focus:outline-none focus:border-[#1cb0f6] focus:border-b-[#1cb0f6] transition-colors font-bold text-slate-700 placeholder:text-slate-400"
              />
            </div>

            {/* Hero Mini Section */}
            <div className={`duo-card p-8 relative overflow-hidden group ${purchasedCourses.length > 0 ? 'bg-[#e2f5e9] border-[#58cc02] border-b-[8px]' : 'bg-[#e0f2ff] border-[#1cb0f6] border-b-[8px]'}`}>
              <div className="relative z-10 flex flex-col items-start">
                <h2 className={`text-4xl font-display font-black leading-none mb-3 tracking-tight ${purchasedCourses.length > 0 ? 'text-[#46a302]' : 'text-[#168ec6]'}`}>
                  {purchasedCourses.length > 0 ? 'Мои\nуроки' : 'Твой путь\nв музыке'}
                </h2>
                <p className={`text-sm font-bold mb-6 max-w-[170px] ${purchasedCourses.length > 0 ? 'text-[#58cc02]' : 'text-[#1cb0f6]'}`}>
                  {purchasedCourses.length > 0 ? 'Продолжи свое обучение сегодня!' : 'Запишись на первое пробное занятие бесплатно.'}
                </p>
                <button 
                  onClick={(e) => {
                    spawnParticles(e);
                    if (purchasedCourses.length > 0) {
                      setShowMyCoursesList(true);
                    } else {
                      setActiveTab('home'); 
                    }
                  }}
                  className={`duo-btn-secondary ${purchasedCourses.length > 0 ? 'text-[#58cc02]' : 'text-[#1cb0f6]'}`}
                >
                  {purchasedCourses.length > 0 ? 'Мои уроки' : 'Записаться'}
                </button>
              </div>
              <div className="absolute -right-6 -bottom-6 opacity-20 transform group-hover:scale-110 transition-transform duration-700">
                <Music size={160} strokeWidth={2} className={purchasedCourses.length > 0 ? 'text-[#58cc02]' : 'text-[#1cb0f6]'} />
              </div>
            </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <BookOpen />, label: 'Курсы', color: 'bg-[#e0f2ff]', border: 'border-[#1cb0f6] border-b-[6px]', iconColor: 'text-[#1cb0f6]', action: () => setActiveTab('home') },
            { icon: <Users />, label: 'Учителя', color: 'bg-[#f3e8ff]', border: 'border-[#ce82ff] border-b-[6px]', iconColor: 'text-[#ce82ff]', action: () => { spawnParticles({ currentTarget: document.body } as any); } },
            { icon: <MessageCircle />, label: 'Чат-бот', color: 'bg-[#e2f5e9]', border: 'border-[#58cc02] border-b-[6px]', iconColor: 'text-[#58cc02]', action: () => { 
                const tg = (window as any).Telegram?.WebApp;
                if (tg) {
                  tg.openTelegramLink('https://t.me/UniClubMusicBot');
                } else {
                  window.open('https://t.me/UniClubMusicBot', '_blank');
                }
              } 
            },
            { icon: <Zap />, label: 'Тарифы', color: 'bg-white', border: 'border-slate-200 border-b-[6px]', iconColor: 'text-[#1cb0f6]', action: () => setActiveTab('tariffs') },
          ].map((item, i) => (
            <div 
              key={i} 
              onClick={(e) => { spawnParticles(e); item.action(); }}
              className={`${item.color} border-2 ${item.border} rounded-3xl p-5 flex flex-col justify-center items-center gap-3 cursor-pointer hover:scale-[1.02] active:scale-95 active:translate-y-[4px] active:border-b-2 transition-all`}
            >
              <div className={item.iconColor}>{React.cloneElement(item.icon as React.ReactElement, { size: 36, strokeWidth: 2.5 })}</div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-700">{item.label}</span>
            </div>
          ))}
        </div>

            {/* Popular directions */}
            <div className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-display font-black text-slate-800 tracking-tight">Популярное</h3>
                <span className="text-xs font-black text-[#1cb0f6] uppercase tracking-widest px-4 py-2 bg-[#e0f2ff] rounded-2xl cursor-pointer hover:opacity-80 active:scale-95">Все</span>
              </div>
              <div className="space-y-4">
                {COURSES.map(course => (
                  <div 
                    key={course.id} 
                    onClick={(e) => { spawnParticles(e); setSelectedCourse(course); }}
                    className="duo-card p-5 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#e0f2ff] flex items-center justify-center text-[#1cb0f6] border-2 border-[#1cb0f6] border-b-4">
                        <Music className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-display font-black text-slate-800 leading-none mb-1.5 tracking-tight">{course.title}</h4>
                        <p className="text-xs text-slate-500 font-bold tracking-wide">{course.category} • {course.level}</p>
                      </div>
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
      className="space-y-6 pb-24"
    >
       <h2 className="text-4xl font-display font-black text-slate-800 leading-none tracking-tight mb-2">
        Наши Подписки
      </h2>
      <p className="text-sm font-bold text-slate-500 mb-8">Выбери тариф, который подходит именно тебе.</p>

      <div className="space-y-6">
        {TARIFFS.map((tariff, i) => (
          <div key={i} className={`duo-card p-8 relative overflow-hidden transition-all ${tariff.color === 'bg-white' ? 'bg-white border-slate-200' : 'bg-[#e0f2ff] border-[#1cb0f6] border-b-[8px]'}`}>
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className={`text-3xl font-display font-black tracking-tight ${tariff.color === 'bg-white' ? 'text-slate-800' : 'text-[#168ec6]'}`}>
                {tariff.name}
              </h3>
              <p className="text-sm font-black text-slate-600 bg-white px-4 py-2 rounded-2xl border-2 border-slate-100 shadow-sm">
                {tariff.price}
              </p>
            </div>
            <ul className="space-y-4 mb-8 relative z-10">
              {tariff.features.map((f, j) => (
                <li key={j} className="text-sm text-slate-700 flex items-center gap-3 font-bold">
                  <CheckCircle2 size={20} className={tariff.color === 'bg-white' ? 'text-slate-300' : 'text-[#1cb0f6]'} /> {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={spawnParticles}
              className={tariff.color === 'bg-white' ? 'duo-btn-secondary w-full' : 'duo-btn-blue w-full'}
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
            { label: 'Поддержка 24/7', desc: 'Наш бот-ментор всегда готов помочь с любым вопросом.', icon: <MessageCircle size={20} />, action: () => { 
                const tg = (window as any).Telegram?.WebApp;
                if (tg) {
                  tg.openTelegramLink('https://t.me/UniClubMusicBot');
                } else {
                  window.open('https://t.me/UniClubMusicBot', '_blank');
                }
              } 
            },
          ].map((item, i) => (
            <div 
              key={i} 
              onClick={(e) => { spawnParticles(e); (item as any).action?.(); }}
              className={`flex gap-5 items-start p-4 hover:bg-white/50 rounded-2xl transition-colors cursor-pointer active:scale-[0.98] ${(item as any).action ? 'border-2 border-indigo-100 bg-indigo-50/30' : ''}`}
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
    <div className="bg-slate-50 bg-ornament min-h-screen flex items-center justify-center p-0 sm:p-4 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <AnimatePresence>
        {showMyCoursesList && renderMyCoursesList()}
        {showCoursePath && renderCoursePath(showCoursePath)}
        {activeLesson && <div className="fixed inset-0 z-[100]"><CoursePlayer onBack={() => setActiveLesson(false)} /></div>}
      </AnimatePresence>

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
