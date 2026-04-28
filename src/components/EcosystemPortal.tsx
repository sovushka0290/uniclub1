import React, { useState } from 'react';
import { GraduationCap, Mic2, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useTelegram } from '../hooks/useTelegram';

export default function EcosystemPortal() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { isTMA } = useTelegram();

  const CARDS = [
    {
      id: 1,
      title: 'Academy',
      subtitle: 'Образование',
      desc: 'Онлайн-курсы, вокал, продюсирование. Интерактивная платформа обучения.',
      icon: <GraduationCap size={56} strokeWidth={1.5} />,
      btnText: 'Платформа',
      link: '/academy',
      hoverBg: 'bg-[#fff9db]',
      activeColor: 'text-[#ffc800]',
      darkColor: 'text-[#e5b400]',
    },
    {
      id: 2,
      title: 'Production',
      subtitle: 'Лейбл',
      desc: 'Студия звукозаписи, продюсирование артистов, профессиональное сведение.',
      icon: <Mic2 size={56} strokeWidth={1.5} />,
      btnText: 'Услуги',
      link: '/production',
      hoverBg: 'bg-[#e0f2ff]',
      activeColor: 'text-[#1cb0f6]',
      darkColor: 'text-[#168ec6]',
    },
    {
      id: 3,
      title: 'Fan-Club',
      subtitle: 'Сообщество',
      desc: 'Закрытое комьюнити, эксклюзивные мероприятия и встречи с артистами.',
      icon: <Users size={56} strokeWidth={1.5} />,
      btnText: 'Присоединиться',
      link: '/fanclub',
      hoverBg: 'bg-[#fce7f3]',
      activeColor: 'text-[#ec4899]',
      darkColor: 'text-[#db2777]',
    }
  ];

  return (
    <div className="fixed inset-0 flex flex-col md:flex-row overflow-hidden bg-white font-sans">
      {/* Absolute Logo */}
      <div className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none drop-shadow-sm mix-blend-multiply">
        <h1 className="text-xl md:text-2xl font-black tracking-[0.3em] uppercase text-slate-800">
          UNICLUB
        </h1>
      </div>

      {CARDS.map((card) => {
        const isHovered = hoveredCard === card.id;
        const isOtherHovered = hoveredCard !== null && hoveredCard !== card.id;

        return (
          <Link
            key={card.id}
            to={card.link}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`
              relative flex flex-col justify-center items-center h-full
              border-b md:border-b-0 md:border-r border-slate-100 last:border-0
              transition-all duration-700 ease-in-out cursor-pointer overflow-hidden
              ${isHovered ? 'flex-[1.5] md:flex-[2]' : 'flex-1'}
              ${isHovered ? card.hoverBg : 'bg-white'}
              ${isOtherHovered ? 'opacity-70 grayscale-[20%]' : 'opacity-100'}
            `}
          >
            <div className={`relative z-10 w-[300px] md:w-[340px] flex flex-col items-center text-center transition-transform duration-700 ease-out ${isHovered ? 'scale-105 md:-translate-y-4' : 'scale-100'}`}>
              
              <div className={`mb-4 md:mb-6 transition-colors duration-500 ${isHovered ? card.activeColor : 'text-slate-300'}`}>
                {card.icon}
              </div>

              <p className={`text-xs font-bold uppercase tracking-widest mb-3 transition-colors duration-500 ${isHovered ? card.darkColor : 'text-slate-400'}`}>
                {card.subtitle}
              </p>

              <h3 className={`text-4xl md:text-5xl font-display font-black tracking-tight mb-4 transition-colors duration-500 ${isHovered ? 'text-slate-900' : 'text-slate-700'}`}>
                {card.title}
              </h3>

              <div 
                className={`
                  overflow-hidden transition-all duration-700 ease-in-out flex flex-col items-center
                  ${isHovered ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0'}
                `}
              >
                <p className="text-sm md:text-base font-bold text-slate-500 leading-relaxed mb-6 opacity-90">
                  {card.desc}
                </p>

                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white shadow-sm border-2 border-white transition-all duration-300 hover:scale-105 active:scale-95">
                  <span className={`text-sm font-black uppercase tracking-widest ${card.darkColor}`}>
                    {card.btnText}
                  </span>
                  <ArrowRight size={18} className={card.darkColor} />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
