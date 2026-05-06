import { copyFileSync, cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
copyFileSync('index.html', 'dist/index.html');
copyFileSync('index.html', 'dist/404.html');
writeFileSync('dist/.nojekyll', '');
cpSync('src', 'dist/src', { recursive: true });
console.log('Build estático gerado em dist/ com fallback 404.html para GitHub Pages.');
