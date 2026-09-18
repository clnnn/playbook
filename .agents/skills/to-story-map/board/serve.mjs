/* Serves the board and one map file, with no dependencies.
   node serve.mjs <path/to/map.json> [port]   →  http://localhost:<port> (default 4321) */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { basename, dirname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const mapFile = resolve(process.argv[2] || join(root, 'map.example.json'));
const port = Number(process.argv[3] || 4321);
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json' };

createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  const file = path === '/map.json' ? mapFile : join(root, path === '/' ? 'index.html' : path);
  try {
    const body = await readFile(file);
    res.writeHead(200, {
      'content-type': TYPES[file.slice(file.lastIndexOf('.'))] || 'application/octet-stream',
      'cache-control': 'no-store',
    });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
  }
}).listen(port, () => console.log(`story map board on http://localhost:${port} — reading ${basename(mapFile)}`));
