import fs from 'fs';
let content = fs.readFileSync('src/components/MiniApp.tsx', 'utf8');

// Colors
const replaces = {
  '#58cc02': '#10b981',
  '#46a302': '#059669',
  '#e2f5e9': '#ecfdf5',
  
  '#1cb0f6': '#3b82f6',
  '#168ec6': '#2563eb',
  '#e0f2ff': '#eff6ff',
  
  '#ffc800': '#f59e0b',
  '#e5b400': '#d97706',
  '#fff9db': '#fffbeb',

  "icon: '🥁'": "icon: <Activity size={32} />",
  "icon: '👂'": "icon: <Headphones size={32} />",
  "icon: '🧘'": "icon: <Brain size={32} />",
  "📦": "<Package size={40} className=\"text-slate-400 group-hover:text-slate-600 transition-colors\" strokeWidth={2} />",
  "className=\"bg-slate-50 min-h-screen": "className=\"bg-slate-50 bg-ornament min-h-screen"
};

for (const [k, v] of Object.entries(replaces)) {
  content = content.split(k).join(v);
}

fs.writeFileSync('src/components/MiniApp.tsx', content);
