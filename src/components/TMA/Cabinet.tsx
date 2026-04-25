import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTelegram } from '../../hooks/useTelegram';
import { BookOpen, Trophy, User as UserIcon, Layout, ChevronRight, Play, Cloud, Eye, Compass, Sparkles, Music } from 'lucide-react';
import CoursePlayer from './CoursePlayer';

const MY_COURSES = [
  {
    id: 'piano-mastery',
    title: 'Piano Mastery',
    progress: 45,
    lessons: 24,
    completed: 11,
    color: 'amber',
    icon: <Music className="w-5 h-5 text-amber-600" />
  },
  {
    id: 'music-production',
    title: 'Sound Architecture',
    progress: 80,
    lessons: 30,
    completed: 24,
    color: 'indigo',
    icon: <Cloud className="w-5 h-5 text-indigo-600" />
  }
];

export default function Cabinet() {
  const { user } = useTelegram();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  if (selectedCourse) {
    return <CoursePlayer onBack={() => setSelectedCourse(null)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-[#fcfcfd] overflow-hidden font-sans text-slate-800">
      {/* Mobile Top Bar */}
      <div className="px-6 pt-6 pb-2 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-50">
                    <Music className="w-4 h-4" />
                </div>
                <span className="text-xl font-black tracking-tight text-slate-800">uni<span className="text-indigo-500">club</span></span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.first_name || 'UC'}`} alt="avatar" />
            </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-4 space-y-8 no-scrollbar">
        {/* Welcome Section */}
        <section>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Welcome back,</p>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{user?.first_name || 'Explorer'} 👋</h2>
        </section>

        {/* Security / Status Badges */}
        <div className="flex gap-2">
          <div className="px-3 py-1.5 bg-green-50 text-green-600 text-[10px] font-bold rounded-xl border border-green-100 flex items-center gap-1.5 shadow-sm shadow-green-50">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            TRUSTED SESSION
          </div>
          <div className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-xl border border-indigo-100 flex items-center gap-1.5 shadow-sm shadow-indigo-50">
            <Sparkles className="w-3 h-3" />
            ELITE MEMBER
          </div>
        </div>

        {/* Course Grid */}
        <section className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-800">Your Learning Path</h3>
                <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            
            <div className="space-y-4">
                {MY_COURSES.map((course) => (
                  <motion.div
                    key={course.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedCourse(course.id)}
                    className="p-5 bg-white border border-slate-50 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] cursor-pointer active:bg-slate-50 transition-all flex flex-col gap-4"
                  >
                    <div className="flex gap-4 items-center">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          course.color === 'amber' ? 'bg-amber-50 shadow-amber-100' : 'bg-indigo-50 shadow-indigo-100'
                      } shadow-inner`}>
                        {course.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-extrabold text-slate-800 text-base">{course.title}</h4>
                        <p className="text-[10px] uppercase font-bold text-slate-400">
                            {course.completed} of {course.lessons} steps
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300" />
                    </div>
                    <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        className={`h-full rounded-full bg-gradient-to-r ${course.color === 'amber' ? 'from-amber-400 to-amber-500' : 'from-indigo-500 to-indigo-600 shadow-md shadow-indigo-100'}`} 
                      />
                    </div>
                  </motion.div>
                ))}
            </div>
        </section>

        {/* Catalog Banner */}
        <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[2.5rem] text-white relative overflow-hidden shadow-xl shadow-indigo-200"
        >
            <div className="relative z-10">
                <h4 className="font-black text-xl mb-1">New Masterclass</h4>
                <p className="text-white/80 text-xs font-medium mb-4">Master jazz improvisation with Marcus Miller.</p>
                <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Enroll Now</button>
            </div>
            <Compass className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-white/10" />
        </motion.div>
      </main>

      {/* Modern Tab Bar */}
      <nav className="h-24 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-8 pb-6 flex items-center justify-between">
        <TabButton 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
            icon={<Layout />} 
            label="Home" 
        />
        <TabButton 
            active={activeTab === 'catalog'} 
            onClick={() => setActiveTab('catalog')} 
            icon={<BookOpen />} 
            label="Catalog" 
        />
        <TabButton 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
            icon={<UserIcon />} 
            label="Profile" 
        />
      </nav>
    </div>
  );
}

function TabButton({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
    return (
        <button onClick={onClick} className={`relative flex flex-col items-center gap-1.5 transition-all duration-300 ${active ? 'scale-110' : 'opacity-30'}`}>
            <div className={`w-6 h-6 ${active ? 'text-indigo-600' : 'text-slate-800'}`}>
                {React.cloneElement(icon as React.ReactElement, { strokeWidth: 2.5 })}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-tighter ${active ? 'text-indigo-600' : 'text-slate-800'}`}>
                {label}
            </span>
            {active && (
                <motion.div 
                    layoutId="tab_dot"
                    className="absolute -bottom-3 w-1.5 h-1.5 bg-indigo-600 rounded-full shadow-sm shadow-indigo-200" 
                />
            )}
        </button>
    );
}
