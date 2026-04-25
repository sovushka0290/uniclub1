import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Play, MoreVertical, CheckCircle2, Clock, Lock, Share2, ArrowRight } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
}

const LESSONS: Lesson[] = [
  { id: '1', title: 'The Harmony of uniclub', duration: '12:40', completed: true, locked: false },
  { id: '2', title: 'Technical Theory I', duration: '08:15', completed: true, locked: false },
  { id: '3', title: 'Chord Progressions & Texture', duration: '15:20', completed: false, locked: false },
  { id: '4', title: 'Advanced Sonic Structures', duration: '11:05', completed: false, locked: true },
  { id: '5', title: 'The Final Audition', duration: '20:00', completed: false, locked: true },
];

export default function CoursePlayer({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-screen bg-[#fcfcfd] text-slate-800 font-sans overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between bg-white border-b border-slate-50">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 active:scale-90 transition-transform">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-black text-slate-800 tracking-tight text-sm">Piano Mastery</span>
        <div className="flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-slate-400">
                <Share2 className="w-4 h-4" />
            </button>
        </div>
      </div>

      {/* Immersive Video Section */}
      <div className="w-full aspect-video bg-slate-900 flex items-center justify-center relative shadow-2xl shadow-indigo-50 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1520529612392-628d6978170c?q=80&w=2070" 
          className="absolute inset-0 w-full h-full object-cover opacity-70" 
          alt="Course"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative z-10 w-16 h-16 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-2xl cursor-pointer"
        >
            <Play className="w-8 h-8 fill-current ml-1" />
        </motion.div>
        
        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center">
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Lesson 03</span>
                <span className="text-[9px] font-bold text-white/60 tracking-wider">HARMONIC VOICING</span>
            </div>
            <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[9px] font-black text-white uppercase tabular-nums">
                15:20 / 24:00
            </div>
        </div>
      </div>

      {/* Lesson Index */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 no-scrollbar">
        <section>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight mb-2 leading-tight">Chord Progressions & Texture</h1>
            <p className="text-slate-400 text-xs font-medium leading-relaxed">Let's dive into the world of sonic textures and how they define your signature sound as a musician.</p>
        </section>

        <div className="space-y-3">
          <div className="flex justify-between items-center mb-2 px-1">
              <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Curriculum Index</h3>
          </div>
          
          {LESSONS.map((lesson, idx) => (
            <motion.div 
                key={lesson.id} 
                whileTap={!lesson.locked ? { scale: 0.98 } : {}}
                className={`flex gap-4 items-center p-5 rounded-[2rem] transition-all border ${
                    idx === 2 
                    ? 'bg-white border-indigo-100 shadow-xl shadow-indigo-50 ring-1 ring-indigo-50' 
                    : 'bg-transparent border-transparent'
                }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 ${
                  idx === 2 ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-100' : 'bg-slate-50 text-slate-300'
              }`}>
                {idx + 1}
              </div>
              <div className="flex-1">
                <h4 className={`text-sm font-extrabold ${lesson.locked ? 'text-slate-300' : 'text-slate-800'}`}>
                  {lesson.title}
                </h4>
                <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="w-3 h-3 text-slate-300" />
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{lesson.duration}</span>
                </div>
              </div>
              {lesson.locked ? (
                  <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center">
                    <Lock className="w-3 h-3 text-slate-300" />
                  </div>
              ) : lesson.completed ? (
                <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Footer Nav */}
      <div className="px-6 py-6 bg-white border-t border-slate-50">
        <button className="w-full bg-indigo-500 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.15em] text-[10px] flex items-center justify-center gap-2 shadow-2xl shadow-indigo-100 active:scale-[0.97] transition-all">
            Unlock Next Module <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
