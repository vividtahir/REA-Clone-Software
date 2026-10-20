import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('====================================================');
console.log('   Starting Virtual Try On Full-Stack Application   ');
console.log('====================================================');

// 1. Start Express API Server on 3001
const serverProcess = spawn('node', ['server/index.js'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

// 2. Start Vite Dev Server on 3000
const viteProcess = spawn('npx', ['vite', '--port', '3000', '--host'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

process.on('SIGINT', () => {
  serverProcess.kill();
  viteProcess.kill();
  process.exit();
});
