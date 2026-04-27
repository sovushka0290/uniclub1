import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Play, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Volume2, 
  ShieldCheck,
  Star,
  RefreshCcw,
  Trophy
} from 'lucide-react';
import { useTelegram } from '../../hooks/useTelegram';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Какая основная функция у мажорного трезвучия в этой композиции?',
    options: ['Создание напряжения', 'Разрешение в тонику', 'Переход в минор', 'Акцент на ритме'],
    correctAnswer: 1
  }
];

export default function CoursePlayer({ onBack }: { onBack: () => void }) {
  const { user } = useTelegram();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(33); // 33% progress
  const [showWatermark, setShowWatermark] = useState(true);

  // Динамический водяной знак (двигается по экрану для защиты)
  const [watermarkPos, setWatermarkPos] = useState({ top: '20%', left: '20%' });

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setWatermarkPos({
          top: `${Math.floor(Math.random() * 60 + 20)}%`,
          left: `${Math.floor(Math.random() * 60 + 20)}%`
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleAction = () => {
    if (!isPracticeMode) {
      setIsPracticeMode(true);
      setProgress(66);
    } else if (isCorrect) {
      setProgress(100);
    }
  };

  const checkAnswer = (idx: number) => {
    if (isCorrect !== null) return;
    setSelectedOption(idx);
    const correct = idx === MOCK_QUESTIONS[0].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      (window as any).Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
    } else {
      (window as any).Telegram?.WebApp?.HapticFeedback?.notificationOccurred('error');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#fcfcfd] text-slate-800 font-sans overflow-hidden">
      {/* Duolingo-style Header */}
      <div className="px-6 pt-8 pb-4 bg-white flex items-center gap-4">
        <button onClick={onBack} className="p-2 text-slate-400 active:scale-90 transition-transform">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-[#58cc02] shadow-[0_0_10px_rgba(88,204,2,0.3)]"
          />
        </div>
        <div className="flex items-center gap-1 text-[#ffc800]">
          <Star className="w-5 h-5 fill-current" />
          <span className="font-black text-sm">12</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <AnimatePresence mode="wait">
          {!isPracticeMode ? (
            <motion.div 
              key="video-stage"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-6 space-y-6"
            >
              <div className="space-y-2 mt-4">
                <h1 className="text-2xl font-black tracking-tight text-slate-800">
                  Урок 3: Гармония и Текстуры
                </h1>
                <p className="text-slate-400 text-sm font-medium">Посмотри короткое видео перед практикой</p>
              </div>

              <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl shadow-indigo-100 ring-4 ring-white">
                {!isPlaying ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1520529612392-628d6978170c?q=80&w=2070" 
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                      alt="Thumbnail"
                    />
                    <div className="absolute inset-0 bg-indigo-900/20" />
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsPlaying(true)}
                      className="relative z-20 w-20 h-20 bg-[#1cb0f6] text-white rounded-full flex items-center justify-center shadow-[0_8px_0_#1899d6] active:shadow-none active:translate-y-2 transition-all"
                    >
                      <Play className="w-10 h-10 fill-current ml-1" />
                    </motion.button>
                  </div>
                ) : (
                  <div className="w-full h-full bg-black relative">
                    <div className="w-full h-full flex flex-col items-center justify-center text-white px-8 text-center space-y-4">
                       <Volume2 className="w-12 h-12 text-indigo-400 animate-pulse" />
                       <p className="text-xs font-bold opacity-60">Стриминг зашифрованного контента...</p>
                       <div className="w-full bg-white/10 h-1 rounded-full">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 15, ease: "linear" }}
                            className="h-full bg-indigo-400"
                          />
                       </div>
                    </div>

                    <div 
                      className="absolute inset-0 z-30 cursor-default select-none" 
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    
                    {showWatermark && user && (
                      <motion.div 
                        animate={watermarkPos}
                        transition={{ duration: 0.8 }}
                        className="absolute z-40 pointer-events-none opacity-[0.07] whitespace-nowrap"
                      >
                        <span className="text-white font-black text-xs select-none">
                          ID: {user.id} | @{user.username || 'uniclub_user'}
                        </span>
                      </motion.div>
                    )}

                    <div className="absolute top-4 right-4 z-50">
                        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full ring-1 ring-white/20">
                            <ShieldCheck className="w-3 h-3 text-green-400" />
                            <span className="text-[8px] font-black text-white/80 uppercase">Content Protected</span>
                        </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-indigo-50 border-2 border-indigo-100 rounded-3xl p-6 flex gap-4 items-start">
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-500 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                      <h4 className="font-extrabold text-indigo-900 text-sm mb-1 uppercase tracking-tight">Безопасное обучение</h4>
                      <p className="text-indigo-700/70 text-xs leading-relaxed">
                        Этот контент доступен только студентам UniClub. Любое копирование нарушает закон об авторском праве.
                      </p>
                  </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="practice-stage"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-6 pt-6 space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-800 leading-tight">
                  {MOCK_QUESTIONS[0].text}
                </h2>
                <div className="w-full aspect-video bg-indigo-50 rounded-[2rem] border-2 border-indigo-100 flex items-center justify-center border-dashed overflow-hidden">
                   <div className="flex flex-col items-center gap-3">
                      <div className="flex gap-2">
                        {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-lg bg-white shadow-sm" />)}
                      </div>
                      <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Анализ текущего отрывка</span>
                   </div>
                </div>
              </div>

              <div className="grid gap-3">
                {MOCK_QUESTIONS[0].options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => checkAnswer(idx)}
                    className={`p-6 rounded-[2rem] text-left font-bold transition-all border-b-4 active:border-b-0 active:translate-y-1 ${
                      selectedOption === idx 
                        ? isCorrect === true
                          ? 'bg-[#d7ffb8] border-[#a8e074] text-[#46a302]'
                          : isCorrect === false
                            ? 'bg-[#ffdfe0] border-[#f6a0a0] text-[#ea2b2b]'
                            : 'bg-white border-slate-200'
                        : 'bg-white border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                        selectedOption === idx ? 'bg-transparent' : 'bg-slate-50 text-slate-400'
                      }`}>
                         {idx + 1}
                      </div>
                      <span className="text-[15px]">{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t-2 border-slate-50 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] z-50">
        <div className="max-w-[440px] mx-auto flex gap-3">
          {isPracticeMode && isCorrect === false && (
            <motion.button 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => { setIsCorrect(null); setSelectedOption(null); }}
              className="w-16 h-16 bg-[#ffdfe0] text-[#ea2b2b] rounded-2xl flex items-center justify-center active:scale-95 transition-all"
            >
              <RefreshCcw className="w-6 h-6" />
            </motion.button>
          )}
          
          <button 
            disabled={isPracticeMode && isCorrect === null}
            onClick={handleAction}
            className={`flex-1 py-5 rounded-[2rem] font-black uppercase tracking-[0.15em] text-[12px] flex items-center justify-center gap-2 shadow-xl transition-all active:translate-y-1 active:shadow-none ${
              isCorrect === true
              ? 'bg-[#58cc02] text-white border-b-4 border-[#46a302]'
              : isCorrect === false
              ? 'bg-[#ea2b2b] text-white border-b-4 border-[#b81d1d]'
              : isPlaying || isPracticeMode
              ? 'bg-[#1cb0f6] text-white border-b-4 border-[#1899d6]'
              : 'bg-slate-100 text-slate-300'
            } disabled:opacity-50 disabled:grayscale`}
          >
            {isPracticeMode 
              ? isCorrect === true ? 'Отлично! Дальше' : isCorrect === false ? 'Попробуй еще раз' : 'Проверить'
              : 'Начать практику'} 
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {progress === 100 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center"
          >
             <motion.div 
               initial={{ scale: 0, rotate: -20 }}
               animate={{ scale: 1, rotate: 0 }}
               className="w-32 h-32 bg-[#ffc800] rounded-[2.5rem] flex items-center justify-center mb-8 shadow-[0_12px_0_#ce82ff]"
             >
                <Trophy className="w-16 h-16 text-white" />
             </motion.div>
             <h2 className="text-3xl font-black text-slate-800 italic uppercase mb-2">Урок пройден!</h2>
             <p className="text-slate-400 font-bold mb-12">Ты сделал огромный шаг в понимании гармонии!</p>
             
             <div className="grid grid-cols-2 gap-4 w-full mb-12">
                <div className="bg-slate-50 p-6 rounded-3xl">
                   <div className="text-[10px] font-black text-slate-300 uppercase mb-1">XP Получено</div>
                   <div className="text-2xl font-black text-slate-800 tracking-tighter">+150</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl">
                   <div className="text-[10px] font-black text-slate-300 uppercase mb-1">Точность</div>
                   <div className="text-2xl font-black text-indigo-500 tracking-tighter">100%</div>
                </div>
             </div>

             <button 
               onClick={onBack}
               className="w-full bg-[#58cc02] text-white py-6 rounded-[2.5rem] font-black uppercase tracking-widest border-b-8 border-[#46a302] active:border-b-0 active:translate-y-2 transition-all shadow-2xl shadow-green-100"
             >
                Вернуться к курсу
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

