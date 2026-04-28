import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, Mic2, Disc, Speaker, Headphones, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    title: 'Запись вокала & инструментов',
    desc: 'Профессиональная запись на оборудовании топ-класса. Студийная акустика и помощь звукорежиссера.',
    price: 'от 10 000 ₸ / час'
  },
  {
    title: 'Аранжировка (Beatmaking)',
    desc: 'Создание уникального бита или полноценной аранжировки с нуля под ваш стиль и референсы.',
    price: 'от 50 000 ₸'
  },
  {
    title: 'Сведение & Мастеринг',
    desc: 'Финальная обработка трека. Идеальный баланс, плотность и громкость для цифровых площадок.',
    price: 'от 30 000 ₸'
  },
  {
    title: 'Музыкальное продюсирование',
    desc: 'Полное ведение артиста: от идеи до готового релиза. Помощь в поиске стиля и дистрибуции.',
    price: 'Индивидуально'
  }
];

const CASES = [
  { artist: 'KIMBERLY', track: 'Neon Lights', genre: 'Synthpop', color: 'bg-purple-900' },
  { artist: 'AYGUL', track: 'Steppe Wind', genre: 'Ethno / Electronic', color: 'bg-blue-900' },
  { artist: 'THE ROOTS', track: 'Midnight Groove', genre: 'R&B / Soul', color: 'bg-rose-900' },
];

export default function ProductionPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <Mic2 className="text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="font-display tracking-[0.2em] font-black uppercase text-white drop-shadow-sm">
              Uniclub Prod.
            </span>
          </Link>
          <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#about" className="hover:text-blue-500 transition-colors">О нас</a>
            <a href="#cases" className="hover:text-blue-500 transition-colors">Портфолио</a>
            <a href="#services" className="hover:text-blue-500 transition-colors">Услуги</a>
            <a href="#contact" className="hover:text-blue-500 transition-colors">Контакты</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Студия звукозаписи и лейбл
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter leading-[1.1] mb-8">
              Создаем звук,<br /> который покоряет <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">чарты</span>.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
              От первой демо-записи до финального мастеринга и релиза. Uniclub Production — это профессиональная команда звукорежиссеров, продюсеров и музыкантов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-widest uppercase text-sm rounded-full transition-colors flex items-center justify-center gap-2">
                Забронировать студию <ArrowRight size={18} />
              </a>
              <a href="#cases" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold tracking-widest uppercase text-sm rounded-full transition-colors border border-white/10 flex items-center justify-center">
                Послушать портфолио
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6">Больше, чем просто студия.</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Uniclub Production был основан с одной целью — дать музыкантам место, где технические ограничения не мешают творчеству. Мы используем передовое оборудование и акустически подготовленные комнаты, чтобы каждый инструмент звучал идеально.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Мы берем на себя не только звук: наша команда помогает с аранжировками, саунд-дизайном и поиском вашего уникального стиля.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-black text-blue-500 mb-2">5+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Лет опыта</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-blue-500 mb-2">200+</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Выпущенных треков</div>
                </div>
              </div>
            </div>
            <div className="flex-1 relative w-full aspect-square md:aspect-video rounded-3xl overflow-hidden bg-slate-800 border border-white/10">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section id="cases" className="py-20 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="mb-16">
             <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4">Наши кейсы</h2>
             <p className="text-slate-400 max-w-xl">Треки, созданные в стенах Uniclub Production. Звучат на всех площадках.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASES.map((item, i) => (
              <div key={i} className={`group relative h-80 rounded-3xl overflow-hidden p-8 flex flex-col justify-end cursor-pointer ${item.color}`}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    <Play className="text-white ml-1" fill="currentColor" size={20} />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">{item.genre}</div>
                  <h3 className="text-2xl font-black text-white mb-1">{item.track}</h3>
                  <p className="text-white/90 font-medium">{item.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center max-w-2xl mx-auto">
             <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4">Прайс-лист</h2>
             <p className="text-slate-400">Точные цены зависят от сложности проекта. Свяжитесь с нами для индивидуального расчета.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {SERVICES.map((srv, i) => (
              <div key={i} className="p-8 md:p-10 rounded-3xl bg-slate-950 border border-white/5 hover:border-blue-500/30 transition-colors flex flex-col">
                <h3 className="text-xl font-bold text-white mb-4">{srv.title}</h3>
                <p className="text-slate-400 mb-8 flex-1">{srv.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-black text-blue-400">{srv.price}</span>
                  <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors text-white">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer id="contact" className="pt-20 md:pt-32 pb-10 border-t border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 tracking-tighter">Готовы звучать<br/>громче?</h2>
              <p className="text-slate-400 mb-10 max-w-md leading-relaxed">Оставьте заявку на бронь студии или консультацию с продюсером. Мы подберем лучшее время.</p>
              
              <div className="space-y-6 text-slate-300 font-medium">
                <div className="flex items-center gap-4">
                  <MapPin className="text-blue-500" />
                  Алматы, ул. Тимирязева 42, БЦ "Экспо"
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-blue-500" />
                  +7 (777) 123-45-67
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-blue-500" />
                  studio@uniclub.kz
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-white/5 rounded-3xl p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Имя</label>
                  <input type="text" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Ваше имя" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Телефон</label>
                  <input type="tel" className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="+7 (___) ___-__-__" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Сообщение (необязательно)</label>
                  <textarea className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors min-h-[100px]" placeholder="Кратко опишите задачу..."></textarea>
                </div>
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest text-sm rounded-xl transition-colors">
                  Отправить заявку
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs font-bold tracking-widest uppercase text-slate-600">
            <p>© 2026 UNICLUB PRODUCTION</p>
            <div className="flex gap-6 mt-4 md:mt-0">
               <a href="#" className="hover:text-slate-300">Instagram</a>
               <a href="#" className="hover:text-slate-300">Telegram</a>
               <a href="#" className="hover:text-slate-300">YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
