import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve } from 'node:path';

const args = process.argv.slice(2);
const optionNamesWithValue = new Set(['--host', '--port']);
const positional = [];
for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  if (arg.startsWith('--host=') || arg.startsWith('--port=')) continue;
  if (optionNamesWithValue.has(arg)) { index += 1; continue; }
  if (!arg.startsWith('-')) positional.push(arg);
}
const rootArg = positional[0] || '.';
const option = (name, fallback) => {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.split('=').slice(1).join('=');
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] && !args[index + 1].startsWith('-') ? args[index + 1] : fallback;
};

const root = resolve(rootArg);
const host = option('--host', process.env.HOST || '0.0.0.0');
const port = Number(option('--port', process.env.PORT || 5173));
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.ico': 'image/x-icon' };

function resolveFile(pathname) {
  const cleanPath = decodeURIComponent(pathname).replace(/^\/+/, '') || 'index.html';
  const requested = resolve(root, cleanPath);
  const index = resolve(root, 'index.html');
  if (!requested.startsWith(root)) return index;
  if (existsSync(requested) && !statSync(requested).isDirectory()) return requested;
  return index;
}

createServer((req, res) => {
  const { pathname } = new URL(req.url, `http://${host}:${port}`);
  const file = resolveFile(pathname);
  if (!existsSync(file)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 - index.html não encontrado. Execute npm run build antes do preview.');
    return;
  }
  res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  if (req.method === 'HEAD') return res.end();
  createReadStream(file).pipe(res);
}).listen(port, host, () => {
  console.log(`Terminal Engenharia disponível em http://${host === '0.0.0.0' ? 'localhost' : host}:${port}`);
});
