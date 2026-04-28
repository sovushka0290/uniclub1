import fs from 'fs';

let content = fs.readFileSync('src/components/MiniApp.tsx', 'utf8');

const reverts = {
  '#10b981': '#58cc02',
  '#059669': '#46a302',
  '#ecfdf5': '#e2f5e9',
  
  '#3b82f6': '#1cb0f6',
  '#2563eb': '#168ec6',
  '#eff6ff': '#e0f2ff',
  
  '#f59e0b': '#ffc800',
  '#d97706': '#e5b400',
  '#fffbeb': '#fff9db',
};

for (const [k, v] of Object.entries(reverts)) {
  content = content.split(k).join(v);
}
fs.writeFileSync('src/components/MiniApp.tsx', content);
