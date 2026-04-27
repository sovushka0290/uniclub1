import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Music, 
  ArrowRight,
  Zap,
  Globe,
  Disc,
  Users,
  Menu,
  ChevronRight,
  Star,
  Smartphone
} from 'lucide-react';

const BRAND_CARDS = [
  {
    title: 'вокал',
    desc: 'Раскрой свой голос: от классики до современного попа с нашими мастерами.',
    color: 'bg-[#e2f5e9]',
    borderColor: 'border-[#58cc02]',
    icon: <Music />,
    linkText: 'ПОДРОБНЕЕ',
    details: 'Индивидуальные занятия, работа над дыханием, расширение диапазона и подготовка к выступлениям.'
  },
  {
    title: 'домбра',
    desc: 'Погрузись в традиции: обучение игре на национальном инструменте с нуля.',
    color: 'bg-[#ffebf2]',
    borderColor: 'border-[#ff4b4b]',
    icon: <Zap />,
    linkText: 'ПОДРОБНЕЕ',
    details: 'Изучение кюев, техники перебора и современных аранжировок на домбре.'
  },
  {
    title: 'гитара',
    desc: 'Стань душой компании: аккорды, соло и драйв на акустике или электрогитаре.',
    color: 'bg-[#fff9db]',
    borderColor: 'border-[#ffc800]',
    icon: <Star />,
    linkText: 'ПОДРОБНЕЕ',
    details: 'Теория музыки, работа с ритмом, изучение любимых композиций и импровизация.'
  },
  {
    title: 'студия',
    desc: 'Запиши свой хит: доступ к профессиональному оборудованию и сведению.',
    color: 'bg-[#f3e8ff]',
    borderColor: 'border-[#ce82ff]',
    icon: <Disc />,
    linkText: 'ЗАБРОНИРОВАТЬ',
    details: 'Студийная запись, мастеринг, создание аранжировок и работа в Ableton/Logic.'
  },
  {
    title: 'сообщество',
    desc: 'Твой нетворкинг: концерты, квартирники и совместные проекты с артистами.',
    color: 'bg-[#e0f2ff]',
    borderColor: 'border-[#1cb0f6]',
    icon: <Users />,
    linkText: 'ВСТУПИТЬ',
    details: 'Доступ к закрытым чатам, участие в ежемесячных отчетных концертах и мастер-классах.'
  }
];

const BrandCard = ({ card, onClick, onSpawn }: { card: typeof BRAND_CARDS[0], onClick: () => void, onSpawn: (e: React.MouseEvent) => void, key?: React.Key }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={(e) => { onSpawn(e); onClick(); }}
      className={`relative h-[340px] w-full rounded-[2.5rem] p-8 overflow-hidden cursor-pointer ${card.color} border-b-8 ${card.borderColor} group transition-all duration-200 shadow-sm`}
    >
      <div className="relative z-10 flex flex-col h-full text-slate-800">
        <h3 className="text-4xl font-display font-black leading-tight mb-4 lowercase tracking-tighter italic">
          {card.title}
        </h3>
        <p className="text-slate-600 text-sm font-bold leading-relaxed max-w-[220px] italic">
          {card.desc}
        </p>
        
        <div className="mt-auto flex items-center gap-3 text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] group-hover:text-slate-600 transition-all">
          {card.linkText} <ChevronRight className="w-5 h-5" />
        </div>
      </div>

      <div className="absolute bottom-[-5%] right-[-5%] p-4 opacity-10 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
        {React.cloneElement(card.icon as React.ReactElement, { size: 180, strokeWidth: 1.5, className: 'text-slate-900' })}
      </div>
    </motion.div>
  );
};

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
      className="fixed top-0 left-0 pointer-events-none z-[200] font-black text-[14px] opacity-40 blur-[0.2px]"
      style={{ color }}
    >
      {['♪', '♫', '♬', '♭', '♯'][Math.floor(Math.random() * 5)]}
    </motion.div>
  );
};

export function LandingPage() {
  const [selectedCard, setSelectedCard] = React.useState<typeof BRAND_CARDS[0] | null>(null);
  const [greetingIndex, setGreetingIndex] = React.useState(0);
  const [particles, setParticles] = React.useState<{ id: string; x: number; y: number; angle: number; color: string }[]>([]);

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
  
  const greetings = [
    'Привет', 'Hello', 'Sälem', 'Bonjour', 'Hola', 'Ciao', 'Hallo', 'Olá', 'Konnichiwa', 'Annyeong',
    'Namaste', 'Salaam', 'Shalom', 'Sawubona', 'Jambo', 'Marhaba', 'Zdravstvuyte', 'Ahoj', 'Hej', 'Hei',
    'Vitayu', 'Labas', 'Sveiki', 'Tere', 'Dia duit', 'Bok', 'Aloha', 'Merhaba', 'Szia', 'Privet',
    'Grüezi', 'Moïen', 'Yasou', 'Pryvit', 'Bula'
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [greetings.length]);

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      <AnimatePresence>
        {particles.map(p => (
          <Particle key={p.id} x={p.x} y={p.y} angle={p.angle} color={p.color} onComplete={() => removeParticle(p.id)} />
        ))}
      </AnimatePresence>

      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b-2 border-slate-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            onClick={spawnParticles}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black italic shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">U</div>
            <span className="font-display font-black text-2xl tracking-tighter text-slate-900 italic">UNICLUB</span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {[{ name: 'КУРСЫ', id: '#courses' }, { name: 'ЭКОСИСТЕМА', id: '#ecosystem' }, { name: 'ТАРИФЫ', id: '#pricing' }, { name: 'КОНТАКТЫ', id: '#footer' }].map((link) => (
              <a 
                key={link.name} 
                href={link.id} 
                className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link 
               to="/app"
               onClick={spawnParticles}
               className="ml-4 bg-[#58cc02] border-b-4 border-[#46a302] text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 hover:translate-y-[-2px] active:translate-y-[2px] active:border-b-0 transition-all shadow-lg shadow-green-100"
            >
               <Smartphone className="w-4 h-4" /> ПОСМОТРЕТЬ MINI APP
            </Link>
          </div>

          <button className="lg:hidden text-slate-900">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <main className="pt-32">
        <section id="courses" className="container mx-auto px-6 py-20">
          <div className="max-w-3xl mb-20">
            <div className="h-12 mb-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={greetingIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="px-5 py-2 bg-indigo-50 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-indigo-500 inline-block border border-indigo-100"
                >
                   {greetings[greetingIndex]} 🎸 UNICLUB ACADEMY
                </motion.span>
              </AnimatePresence>
            </div>
            <h1 className="text-4xl md:text-7xl font-display font-black text-slate-900 tracking-tighter italic leading-[1.1] mb-6">
              ТВОЯ <br />МУЗЫКАЛЬНАЯ <br /><span className="text-indigo-600">ВСЕЛЕННАЯ.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 font-medium max-w-lg mb-8 leading-relaxed italic">
              Современное пространство для обучения вокалу, игре на инструментах и музыкальному продакшну.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center">
              <Link 
                to="/app" 
                onClick={spawnParticles}
                className="duo-btn-primary bg-[#58cc02] border-[#46a302] flex items-center justify-center gap-3 px-8 w-full sm:w-auto"
              >
                <Smartphone className="w-5 h-5" /> ПОСМОТРЕТЬ MINI APP
              </Link>
              <a 
                href="#ecosystem" 
                onClick={spawnParticles}
                className="duo-btn-secondary flex items-center justify-center gap-2 px-8 w-full sm:w-auto"
              >
                Узнать больше <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BRAND_CARDS.map((card, i) => (
              <BrandCard key={i} card={card} onClick={() => setSelectedCard(card)} onSpawn={spawnParticles} />
            ))}
          </div>
        </section>

        {/* Ecosystem Section */}
        <section id="ecosystem" className="bg-slate-50 py-32 rounded-[4rem] mx-4 md:mx-10 my-20 border-2 border-slate-100 overflow-hidden relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1">
                <span className="text-indigo-500 font-black text-[12px] uppercase tracking-[0.3em] mb-6 block">ЦЕЛОСТНАЯ СРЕДА</span>
                <h2 className="text-5xl md:text-7xl font-display font-black text-slate-900 tracking-tighter italic mb-8 leading-none uppercase">
                  НАША <br />ЭКОСИСТЕМА
                </h2>
                <p className="text-xl text-slate-600 font-medium leading-relaxed mb-10 max-w-xl">
                  UNICLUB — это не просто школа. Это живой организм, где обучение переплетается с практикой, 
                  сообществом и современными технологиями. Мы создаем среду, в которой таланты растут быстрее.
                </p>

                <div className="space-y-6">
                  {[
                    { title: 'UNICLUB APP', desc: 'Единая платформа для записи на уроки, общения с наставником и отслеживания успеха.', icon: <Smartphone className="w-5 h-5" /> },
                    { title: 'RECORDING STUDIO', desc: 'Собственная профессиональная студия для записи твоих первых треков и каверов.', icon: <Disc className="w-5 h-5" /> },
                    { title: 'CREATIVE COMMUNITY', desc: 'Закрытые встречи, отчетные концерты и творческая среда для роста артиста.', icon: <Users className="w-5 h-5" /> },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-12 h-12 rounded-2xl bg-white border-2 border-b-4 border-slate-200 flex items-center justify-center text-indigo-500 shadow-sm group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-base font-display font-black text-slate-900 italic uppercase tracking-tight mb-1">{item.title}</h4>
                        <p className="text-slate-500 text-sm font-medium leading-tight max-w-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 relative">
                <div className="w-full aspect-square bg-white border-b-8 border-slate-200 rounded-[3rem] p-12 relative z-10 shadow-2xl overflow-hidden group">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 bg-[#58cc02] border-b-4 border-[#46a302] rounded-2xl flex items-center justify-center text-white text-3xl font-black italic">U</div>
                    <h3 className="text-2xl font-display font-black italic tracking-tighter">PROGRESS SYSTEM</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="duo-progress-bar"><div className="duo-progress-fill" style={{ width: '70%' }}></div></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border-b-4 border-slate-200"><p className="text-[10px] font-black text-slate-400 uppercase">Опыт</p><p className="text-xl font-display font-black">2,450 XP</p></div>
                      <div className="p-4 bg-slate-50 rounded-2xl border-b-4 border-slate-200"><p className="text-[10px] font-black text-slate-400 uppercase">Уровень</p><p className="text-xl font-display font-black">12 LVL</p></div>
                    </div>
                  </div>

                  <div className="absolute bottom-[-10%] right-[-10%] opacity-10 transform scale-150 group-hover:rotate-12 transition-all duration-700">
                    <Music size={300} />
                  </div>
                </div>
                {/* Background Blobs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-50 rounded-full blur-[100px] -z-10 opacity-60"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="container mx-auto px-6 py-20 border-t-2 border-slate-50">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
             <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black italic">U</div>
               <span className="font-display font-black text-xl italic tracking-tighter">UNICLUB</span>
             </div>
             <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
               Учись. Создавай. Будь частью музыкальной революции вместе с UNICLUB.
             </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-20 gap-y-10">
             <div>
               <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6">АКАДЕМИЯ</h5>
               <ul className="space-y-4 font-bold text-sm text-slate-600">
                 <li><a href="#" className="hover:text-indigo-600 transition-colors">Курсы</a></li>
                 <li><a href="#" className="hover:text-indigo-600 transition-colors">Учителя</a></li>
                 <li><a href="#" className="hover:text-indigo-600 transition-colors">Студия</a></li>
               </ul>
             </div>
             <div>
               <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6">РЕСУРСЫ</h5>
               <ul className="space-y-4 font-bold text-sm text-slate-600">
                 <li><a href="#" className="hover:text-indigo-600 transition-colors">Mini App</a></li>
                 <li><a href="#" className="hover:text-indigo-600 transition-colors">Сообщество</a></li>
                 <li><a href="#" className="hover:text-indigo-600 transition-colors">Wiki</a></li>
               </ul>
             </div>
             <div className="col-span-2 sm:col-span-1">
               <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-6">СОЦСЕТИ</h5>
               <div className="flex gap-4">
                 <div 
                   onClick={spawnParticles}
                   className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border-2 border-slate-100 hover:scale-110 active:scale-95 transition-all text-slate-400 hover:text-indigo-500 cursor-pointer"
                 >
                   <ArrowRight className="w-5 h-5" />
                 </div>
                 <div 
                   onClick={spawnParticles}
                   className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border-2 border-slate-100 hover:scale-110 active:scale-95 transition-all text-slate-400 hover:text-pink-500 cursor-pointer"
                 >
                   <Star className="w-5 h-5" />
                 </div>
               </div>
             </div>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">© 2026 UNICLUB MUSIC ACADEMY. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">
             <a href="#" className="hover:text-slate-500 transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-slate-500 transition-colors">Terms of Service</a>
           </div>
        </div>
      </footer>

      {/* Modal Detail */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`${selectedCard.color} border-b-[12px] ${selectedCard.borderColor} w-full max-w-xl p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCard(null)}
                className="absolute top-8 right-8 w-12 h-12 bg-white/20 hover:bg-white/40 transition-colors rounded-2xl flex items-center justify-center text-slate-800"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>

              <div className="w-20 h-20 bg-white border-b-4 border-slate-100 rounded-[2rem] flex items-center justify-center text-slate-800 mb-8 shadow-sm">
                {React.cloneElement(selectedCard.icon as React.ReactElement, { size: 40 })}
              </div>

              <h2 className="text-5xl font-display font-black italic text-slate-900 uppercase tracking-tighter mb-4 leading-none">
                {selectedCard.title}
              </h2>
              <p className="text-lg font-bold text-slate-600 mb-10 italic leading-relaxed">
                {selectedCard.details}
              </p>

                <div className="space-y-4">
                  <button 
                    onClick={spawnParticles}
                    className="duo-btn-primary w-full shadow-lg"
                  >
                    Записаться на курс
                  </button>
                  <button 
                    onClick={(e) => { spawnParticles(e); setSelectedCard(null); }}
                    className="duo-btn-secondary w-full"
                  >
                    Закрыть
                  </button>
                </div>

              <div className="absolute bottom-[-15%] left-[-10%] opacity-10 -rotate-12 pointer-events-none">
                {React.cloneElement(selectedCard.icon as React.ReactElement, { size: 300 })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LandingPage;
