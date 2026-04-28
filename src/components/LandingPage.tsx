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
    title: 'Вокал',
    desc: 'Раскрой свой голос: от классики до современного попа с нашими мастерами.',
    icon: <Music />,
    linkText: 'ПОДРОБНЕЕ',
    details: 'Индивидуальные занятия, работа над дыханием, расширение диапазона и подготовка к выступлениям.'
  },
  {
    title: 'Домбра',
    desc: 'Погрузись в традиции: обучение игре на национальном инструменте с нуля.',
    icon: <Zap />,
    linkText: 'ПОДРОБНЕЕ',
    details: 'Изучение кюев, техники перебора и современных аранжировок на домбре.'
  },
  {
    title: 'Гитара',
    desc: 'Стань душой компании: аккорды, соло и драйв на акустике или электрогитаре.',
    icon: <Star />,
    linkText: 'ПОДРОБНЕЕ',
    details: 'Теория музыки, работа с ритмом, изучение любимых композиций и импровизация.'
  },
  {
    title: 'Студия',
    desc: 'Запиши свой хит: доступ к профессиональному оборудованию и сведению.',
    icon: <Disc />,
    linkText: 'ЗАБРОНИРОВАТЬ',
    details: 'Студийная запись, мастеринг, создание аранжировок и работа в Ableton/Logic.'
  },
  {
    title: 'Сообщество',
    desc: 'Твой нетворкинг: концерты, квартирники и совместные проекты с артистами.',
    icon: <Users />,
    linkText: 'ВСТУПИТЬ',
    details: 'Доступ к закрытым чатам, участие в ежемесячных отчетных концертах и мастер-классах.'
  }
];

const BrandCard = ({ card, onClick, onSpawn }: { card: typeof BRAND_CARDS[0], onClick: () => void, onSpawn: (e: React.MouseEvent) => void, key?: React.Key }) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={(e) => { onSpawn(e); onClick(); }}
      className="relative h-[320px] w-full rounded-[2rem] p-8 overflow-hidden cursor-pointer bg-white border border-slate-100 group transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 hover:border-slate-300"
    >
      <div className="relative z-10 flex flex-col h-full text-slate-800">
        <h3 className="text-3xl font-display font-black leading-tight mb-4 tracking-tight">
          {card.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed max-w-[220px]">
          {card.desc}
        </p>
        
        <div className="mt-auto flex items-center gap-2 text-slate-900 text-[11px] font-black uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
          {card.linkText} <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      <div className="absolute top-8 right-8 text-slate-100 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
        {React.cloneElement(card.icon as React.ReactElement, { size: 80, strokeWidth: 1, className: 'text-slate-100 group-hover:text-slate-800 transition-colors duration-500' })}
      </div>
    </motion.div>
  );
};

const Particle = ({ x, y, angle, color, icon, onComplete }: { x: number, y: number, angle: number, color: string, icon: string, onComplete: () => void, key?: React.Key }) => {
  const distance = 30 + Math.random() * 60;
  const targetX = x + Math.cos(angle) * distance;
  const targetY = y + Math.sin(angle) * distance;
  const randomScale = 0.5 + Math.random() * 0.7;
  const rotation = (Math.random() - 0.5) * 360;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x, y, rotate: 0 }}
      animate={{ 
        opacity: [0, 1, 0.8, 0], 
        scale: [0, randomScale, randomScale * 0.9, 0], 
        x: [x, targetX, targetX + (Math.random() - 0.5) * 20], 
        y: [y, targetY - 20, targetY + 30 + Math.random() * 20],
        rotate: rotation
      }}
      transition={{ 
        duration: 0.6 + Math.random() * 0.4, 
        ease: [0.23, 1, 0.32, 1] 
      }}
      onAnimationComplete={onComplete}
      className="fixed top-0 left-0 pointer-events-none z-[1000] font-black text-2xl drop-shadow-sm"
      style={{ color }}
    >
      {icon}
    </motion.div>
  );
};

export function LandingPage() {
  const [selectedCard, setSelectedCard] = React.useState<typeof BRAND_CARDS[0] | null>(null);
  const [greetingIndex, setGreetingIndex] = React.useState(0);
  const [particles, setParticles] = React.useState<{ id: string; x: number; y: number; angle: number; color: string; icon: string }[]>([]);

  const spawnParticles = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const timestamp = Date.now();
    const colors = ['#f8fafc', '#e2e8f0', '#94a3b8', '#ffc800'];
    const icons = ['✧', '✦', '⭐', '♪', '♫'];
    
    const newParticles = Array.from({ length: 8 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const x = centerX + (Math.random() - 0.5) * (rect.width * 0.5);
      const y = centerY + (Math.random() - 0.5) * (rect.height * 0.5);

      return {
        id: `${timestamp}-${i}-${Math.random()}`,
        x,
        y,
        angle,
        color: colors[Math.floor(Math.random() * colors.length)],
        icon: icons[Math.floor(Math.random() * icons.length)]
      };
    });
    setParticles(prev => [...prev, ...newParticles].slice(-50));
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
          <Link 
            to="/"
            onClick={spawnParticles}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black shadow-sm group-hover:scale-110 transition-transform">U</div>
            <span className="font-display font-black text-2xl tracking-tighter text-slate-900 uppercase">UNICLUB</span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {[{ name: 'КУРСЫ', id: '#courses' }, { name: 'ЭКОСИСТЕМА', id: '#ecosystem' }, { name: 'ТАРИФЫ', id: '#pricing' }, { name: 'КОНТАКТЫ', id: '#footer' }].map((link) => (
              <a 
                key={link.name} 
                href={link.id} 
                className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link 
               to="/app"
               onClick={spawnParticles}
               className="ml-4 bg-slate-100 text-slate-900 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-200 transition-colors"
            >
               <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-[#0088cc]"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.98 1.25-5.59 3.69-.53.36-1.01.53-1.44.52-.47-.01-1.37-.26-2.03-.48-.81-.27-1.46-.41-1.4-.87.03-.24.34-.48.92-.74 3.6-1.57 6.01-2.61 7.22-3.11 3.43-1.41 4.14-1.65 4.6-1.66.1 0 .32.02.44.11.1.08.13.2.14.31.02.06.02.13.01.21z"/></svg>
               АКАДЕМИЯ
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
                  className="px-5 py-2 bg-yellow-50 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-[#e5b400] inline-block border border-yellow-100"
                >
                   {greetings[greetingIndex]} 🎸 UNICLUB ACADEMY
                </motion.span>
              </AnimatePresence>
            </div>
            <h1 className="text-4xl md:text-7xl font-display font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              ТВОЯ <br />МУЗЫКАЛЬНАЯ <br /><span className="text-[#ffc800]">ВСЕЛЕННАЯ.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 font-medium max-w-lg mb-8 leading-relaxed">
              Современное пространство для обучения вокалу, игре на инструментах и музыкальному продакшну.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center">
              <Link 
                to="/app" 
                onClick={spawnParticles}
                className="bg-slate-900 text-white rounded-full flex items-center justify-center gap-3 px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 w-full sm:w-auto"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.98 1.25-5.59 3.69-.53.36-1.01.53-1.44.52-.47-.01-1.37-.26-2.03-.48-.81-.27-1.46-.41-1.4-.87.03-.24.34-.48.92-.74 3.6-1.57 6.01-2.61 7.22-3.11 3.43-1.41 4.14-1.65 4.6-1.66.1 0 .32.02.44.11.1.08.13.2.14.31.02.06.02.13.01.21z"/></svg>
                ПЕРЕЙТИ В ТЕЛЕГРАМ-АКАДЕМИЮ
              </Link>
              <a 
                href="#ecosystem" 
                onClick={spawnParticles}
                className="bg-white border-2 border-slate-100 text-slate-900 rounded-full flex items-center justify-center gap-2 px-8 py-4 font-black uppercase text-xs tracking-widest hover:border-slate-300 hover:bg-slate-50 transition-colors w-full sm:w-auto"
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
        <section id="ecosystem" className="bg-slate-50 py-32 rounded-[4rem] mx-4 md:mx-10 my-20 border border-slate-100 overflow-hidden relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1">
                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6 block">ЦЕЛОСТНАЯ СРЕДА</span>
                <h2 className="text-5xl md:text-7xl font-display font-black text-slate-900 tracking-tight mb-8 leading-none uppercase">
                  НАША <br />ЭКОСИСТЕМА
                </h2>
                <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10 max-w-xl">
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
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-900 shadow-sm transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-base font-display font-black text-slate-900 uppercase tracking-tight mb-1">{item.title}</h4>
                        <p className="text-slate-500 text-sm leading-tight max-w-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 relative">
                <div className="w-full aspect-square bg-slate-900 rounded-[3rem] p-12 relative z-10 shadow-xl overflow-hidden group text-white">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white text-xl font-black">U</div>
                    <h3 className="text-xl font-display font-black tracking-tight">PROGRESS SYSTEM</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full w-[70%]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10"><p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Опыт</p><p className="text-xl font-display font-black">2,450 XP</p></div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10"><p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Уровень</p><p className="text-xl font-display font-black">12 LVL</p></div>
                    </div>
                  </div>

                  <div className="absolute bottom-[-10%] right-[-10%] opacity-5 transform scale-150 group-hover:rotate-12 transition-all duration-700">
                    <Music size={300} />
                  </div>
                </div>
                {/* Background Blobs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-slate-200/50 rounded-full blur-[100px] -z-10 opacity-60"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="container mx-auto px-6 py-20 border-t border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
             <div className="flex items-center gap-3 mb-6">
               <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black">U</div>
               <span className="font-display font-black text-xl tracking-tight text-slate-900 uppercase">UNICLUB</span>
             </div>
             <p className="text-slate-500 leading-relaxed">
               Учись. Создавай. Будь частью музыкальной революции вместе с UNICLUB.
             </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-20 gap-y-10">
             <div>
               <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">АКАДЕМИЯ</h5>
               <ul className="space-y-4 font-bold text-sm text-slate-600">
                 <li><a href="#" className="hover:text-slate-900 transition-colors">Курсы</a></li>
                 <li><a href="#" className="hover:text-slate-900 transition-colors">Учителя</a></li>
                 <li><a href="#" className="hover:text-slate-900 transition-colors">Студия</a></li>
               </ul>
             </div>
             <div>
               <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">РЕСУРСЫ</h5>
               <ul className="space-y-4 font-bold text-sm text-slate-600">
                 <li><a href="#" className="hover:text-slate-900 transition-colors">Mini App</a></li>
                 <li><a href="#" className="hover:text-slate-900 transition-colors">Сообщество</a></li>
                 <li><a href="#" className="hover:text-slate-900 transition-colors">Wiki</a></li>
               </ul>
             </div>
             <div className="col-span-2 sm:col-span-1">
               <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">СОЦСЕТИ</h5>
               <div className="flex gap-4">
                 <div 
                   onClick={spawnParticles}
                   className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200 hover:scale-110 active:scale-95 transition-all text-slate-400 hover:text-slate-900 cursor-pointer"
                 >
                   <ArrowRight className="w-5 h-5" />
                 </div>
                 <div 
                   onClick={spawnParticles}
                   className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200 hover:scale-110 active:scale-95 transition-all text-slate-400 hover:text-slate-900 cursor-pointer"
                 >
                   <Star className="w-5 h-5" />
                 </div>
               </div>
             </div>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 UNICLUB MUSIC ACADEMY. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
             <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border text-slate-900 border-slate-100 w-full max-w-xl p-12 rounded-[2rem] shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCard(null)}
                className="absolute top-8 right-8 w-10 h-10 bg-slate-100 hover:bg-slate-200 transition-colors rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>

              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 mb-8">
                {React.cloneElement(selectedCard.icon as React.ReactElement, { size: 32 })}
              </div>

              <h2 className="text-4xl font-display font-black text-slate-900 tracking-tight mb-4 leading-none">
                {selectedCard.title}
              </h2>
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                {selectedCard.details}
              </p>

                <div className="flex gap-4">
                  <Link 
                    to="/app"
                    onClick={spawnParticles}
                    className="flex-1 bg-slate-900 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 py-4 font-bold uppercase text-xs tracking-widest hover:bg-slate-800 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.98 1.25-5.59 3.69-.53.36-1.01.53-1.44.52-.47-.01-1.37-.26-2.03-.48-.81-.27-1.46-.41-1.4-.87.03-.24.34-.48.92-.74 3.6-1.57 6.01-2.61 7.22-3.11 3.43-1.41 4.14-1.65 4.6-1.66.1 0 .32.02.44.11.1.08.13.2.14.31.02.06.02.13.01.21z"/></svg>
                    В TELEGRAM
                  </Link>
                  <button 
                    onClick={(e) => { spawnParticles(e); setSelectedCard(null); }}
                    className="flex-1 bg-white border border-slate-200 text-slate-700 py-4 font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Закрыть
                  </button>
                </div>

              <div className="absolute bottom-[-10%] right-[-5%] opacity-5 -rotate-12 pointer-events-none">
                {React.cloneElement(selectedCard.icon as React.ReactElement, { size: 240 })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LandingPage;
