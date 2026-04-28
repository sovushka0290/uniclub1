import React from 'react';
import { motion } from 'motion/react';
import { Heart, Calendar, Ticket, MessageSquare, ArrowRight, Star, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const EVENTS = [
  { date: '15 МАЯ', title: 'SECRET GUEST: Акустический вечер', type: 'Квартирник', status: 'Доступно' },
  { date: '28 МАЯ', title: 'Мастер-класс по вокалу от Ирины К.', type: 'Воркшоп', status: 'Sold Out' },
  { date: '10 ИЮН', title: 'Летний отчетный концерт резидентов', type: 'Концерт', status: 'Скоро' },
];

const FEED = [
  { author: 'Aigul', time: '2 часа назад', content: 'Ребята, кто завтра идет на репу в студию? Есть свободный бас-гитарист!', likes: 12 },
  { author: 'Temirlan', time: '5 часов назад', content: 'Выложил свой первый кавер, зацените 🔥', likes: 45 },
  { author: 'Uniclub Admin', time: 'Вчера', content: 'Открыт предзаказ на новые худи! Количество ограничено.', likes: 120, official: true },
];

export default function FanClubPage() {
  return (
    <div className="min-h-screen bg-rose-50 text-slate-800 font-sans selection:bg-rose-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-rose-100">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Heart className="text-rose-500 fill-rose-500 group-hover:scale-110 transition-transform" size={20} />
            <span className="font-display tracking-[0.1em] font-black uppercase text-slate-900">
              Uniclub Fam
            </span>
          </Link>
          <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
            <a href="#events" className="hover:text-rose-500 transition-colors">Афиша</a>
            <a href="#feed" className="hover:text-rose-500 transition-colors">Сообщество</a>
            <a href="#merch" className="hover:text-rose-500 transition-colors">Мерч</a>
          </div>
          <button className="px-5 py-2 bg-rose-500 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-rose-600 transition-colors">
            Войти
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-32 pb-20 container mx-auto px-6 text-center">
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-rose-500 text-xs font-bold uppercase tracking-widest shadow-sm mb-8 border border-rose-100"
        >
          <Star size={14} className="fill-rose-500" /> Официальный фан-клуб
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 tracking-tighter mb-6">
          Музыка нас <span className="text-rose-500">связала</span>.
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10 font-medium">
          Добро пожаловать в Uniclub Fam — закрытое комьюнити для учеников, артистов и слушателей. Эксклюзивный контент, секретные концерты и свой мерч.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-4 bg-slate-900 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
            Получить инвайт
          </button>
          <button className="px-8 py-4 bg-white text-slate-900 font-bold uppercase tracking-widest text-sm rounded-full hover:bg-slate-50 transition-colors shadow-sm border border-slate-200">
            Смотреть афишу
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Feed / News */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <MessageSquare className="text-rose-500" /> Живая лента
              </h2>
            </div>
            
            {FEED.map((post, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${post.official ? 'bg-rose-500' : 'bg-slate-800'}`}>
                    {post.author[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm flex items-center gap-2">
                      {post.author}
                      {post.official && <Star size={12} className="text-rose-500 fill-rose-500" />}
                    </div>
                    <div className="text-xs text-slate-400">{post.time}</div>
                  </div>
                </div>
                <p className="font-medium text-slate-700 leading-relaxed mb-6">
                  {post.content}
                </p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors">
                    <Heart size={16} /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors">
                    Ответить
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Events Widget */}
            <div id="events" className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="text-rose-500" />
                <h3 className="text-lg font-black">События</h3>
              </div>
              <div className="space-y-4">
                {EVENTS.map((ev, i) => (
                  <div key={i} className="flex gap-4 items-start p-3 rounded-2xl hover:bg-rose-50 transition-colors cursor-pointer group">
                    <div className="bg-rose-100 text-rose-500 font-black text-xs text-center rounded-xl p-2 min-w-[60px]">
                      {ev.date.split(' ')[0]}<br/>
                      <span className="text-[10px]">{ev.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 mb-1">{ev.type}</div>
                      <div className="text-sm font-bold text-slate-800 leading-tight mb-2 group-hover:text-rose-500 transition-colors">{ev.title}</div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest ${ev.status === 'Sold Out' ? 'text-slate-400' : 'text-rose-500'}`}>
                        {ev.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-colors">
                Все события
              </button>
            </div>

            {/* Merch Widget */}
            <div id="merch" className="bg-slate-900 p-6 rounded-3xl shadow-sm text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-rose-400">
                  <ShoppingBag size={20} />
                  <h3 className="text-lg font-black text-white">Мерч Store</h3>
                </div>
                <p className="text-sm text-slate-400 mb-6 font-medium">Новая коллекция базовых худи "Uniclub Academy" уже доступна.</p>
                <div className="aspect-video bg-slate-800 rounded-xl mb-6 flex items-center justify-center border border-white/5 font-black text-slate-700 tracking-widest uppercase">
                  Photo
                </div>
                <button className="w-full py-3 bg-white text-slate-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-colors">
                  Перейти в магазин
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
