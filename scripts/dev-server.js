import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve } from 'node:path';

const root = resolve(process.argv[2] || '.');
const port = Number(process.env.PORT || 5173);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8' };

createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  const requested = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
  let file = join(root, requested);
  if (!existsSync(file) || statSync(file).isDirectory()) file = join(root, 'index.html');
  res.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
  createReadStream(file).pipe(res);
}).listen(port, '0.0.0.0', () => {
  console.log(`Terminal Engenharia disponível em http://localhost:${port}`);
});
