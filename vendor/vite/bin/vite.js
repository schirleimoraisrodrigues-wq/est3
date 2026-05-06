#!/usr/bin/env node
import { mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
const command = process.argv[2] || 'dev';
if (command === 'build') {
  mkdirSync('dist', { recursive: true });
  if (existsSync('index.html')) copyFileSync('index.html', resolve('dist/index.html'));
  console.log('offline vite shim: copied index.html to dist/');
  process.exit(0);
}
console.log(`offline vite shim: ${command} is unavailable without registry-installed Vite.`);
