#!/usr/bin/env node
/**
 * Context Map Live Visualizer
 * Reads CONTEXT-MAP.yaml (and referenced CONTEXT.yaml files) and serves a
 * dynamic 3D graph in your browser.  Watches for file changes and pushes
 * live reloads so the diagram always reflects the current state.
 *
 * Usage
 * -----
 *   node serve_graph.js                          # auto-discover CONTEXT-MAP.yaml
 *   node serve_graph.js docs/CONTEXT-MAP.yaml    # explicit path
 *   node serve_graph.js docs/CONTEXT-MAP.yaml --port 9000
 *   node serve_graph.js docs/CONTEXT-MAP.yaml --no-browser
 *
 * Then open  http://localhost:8765
 */

'use strict';

const fs      = require('fs');
const http    = require('http');
const path    = require('path');
const crypto  = require('crypto');
const { execSync } = require('child_process');

const yaml    = require(resolveYaml());

// ─── resolve js-yaml from workspace node_modules ─────────────────────────────
function resolveYaml() {
  const dirs = [
    path.join(__dirname, '..', '..', '..', '..', 'node_modules', 'js-yaml'),
    path.join(process.cwd(), 'node_modules', 'js-yaml'),
  ];
  for (const d of dirs) {
    if (fs.existsSync(d)) return d;
  }
  // fallback: let Node resolve it normally
  return 'js-yaml';
}

// ─── Layout ───────────────────────────────────────────────────────────────────
const TIER = {
  core:       { y: -1.6, radius: 2.2, phase: 0.0  },
  supporting: { y:  0.3, radius: 3.3, phase: 0.78 },
  generic:    { y:  1.5, radius: 4.0, phase: 1.57  },
};

function circular(count, y, radius, phase) {
  return Array.from({ length: count }, (_, i) => ({
    x: +( radius * Math.cos(phase + (i / count) * 2 * Math.PI) ).toFixed(2),
    y: +y.toFixed(2),
    z: +( radius * Math.sin(phase + (i / count) * 2 * Math.PI) ).toFixed(2),
  }));
}

function nodeId(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '_');
}

// ─── Graph builder ────────────────────────────────────────────────────────────
function buildGraph(contextMapPath) {
  const base = path.dirname(contextMapPath);
  let raw;
  try {
    raw = yaml.load(fs.readFileSync(contextMapPath, 'utf8')) || {};
  } catch (e) {
    return { nodes: [], edges: [], meta: { title: `Error: ${e.message}`, error: true, nodeCount: 0, edgeCount: 0 } };
  }

  const contexts      = raw.contexts      || [];
  const relationships = raw.relationships || [];

  // Group by tag
  const byTag = {};
  for (const ctx of contexts) {
    const tag = ctx.tag || 'supporting';
    (byTag[tag] = byTag[tag] || []).push(ctx);
  }

  const nodes     = [];
  const idReg     = {};   // name → assigned id
  const usedIds   = new Set();

  for (const [tag, ctxs] of Object.entries(byTag)) {
    const cfg       = TIER[tag] || TIER.supporting;
    const positions = circular(ctxs.length, cfg.y, cfg.radius, cfg.phase);

    ctxs.forEach((ctx, i) => {
      const name   = ctx.name || `context_${i}`;
      let   nid    = nodeId(name);
      let   suffix = 1;
      while (usedIds.has(nid)) nid = `${nodeId(name)}_${suffix++}`;
      usedIds.add(nid);
      idReg[name] = nid;

      const pos = positions[i] || { x: 0, y: cfg.y, z: 0 };

      // Load individual CONTEXT.yaml for term tags
      const terms = [];
      const ctxPathStr = ctx.path || '';
      if (ctxPathStr) {
        try {
          const ctxData = yaml.load(fs.readFileSync(path.join(base, ctxPathStr), 'utf8')) || {};
          (ctxData.language || []).slice(0, 4).forEach(e => { if (e.term) terms.push(e.term); });
        } catch (_) { /* file missing — skip */ }
      }

      const det = [['Category', tag]];
      if (ctxPathStr) det.push(['Spec', ctxPathStr]);

      nodes.push({
        id:    nid,
        label: name,
        sub:   tag,
        group: tag,
        core:  tag === 'core',
        x:     pos.x,
        y:     pos.y,
        z:     pos.z,
        desc:  ctx.description || '',
        det,
        tags:  [tag.charAt(0).toUpperCase() + tag.slice(1), ...terms],
      });
    });
  }

  // Resolve id — handles names with punctuation
  const resolve = name => idReg[name] || nodeId(name);

  const edges   = [];
  const seen    = new Set();

  function addEdge(a, b) {
    const aid = resolve(a), bid = resolve(b);
    const key = [aid, bid].sort().join('\0');
    if (!seen.has(key) && aid !== bid) { seen.add(key); edges.push([aid, bid]); }
  }

  for (const rel of relationships) {
    if (rel.upstream && rel.downstream) {
      addEdge(rel.upstream, rel.downstream);
    } else if (Array.isArray(rel.peers)) {
      for (let k = 0; k < rel.peers.length - 1; k++) addEdge(rel.peers[k], rel.peers[k+1]);
    }
  }

  return {
    nodes,
    edges,
    meta: { title: path.basename(contextMapPath), path: contextMapPath, nodeCount: nodes.length, edgeCount: edges.length },
  };
}

// ─── File watcher ─────────────────────────────────────────────────────────────
function hashFiles(contextMapPath) {
  const h = crypto.createHash('md5');
  const addFile = p => { try { h.update(fs.readFileSync(p)); } catch (_) {} };
  addFile(contextMapPath);
  try {
    const raw  = yaml.load(fs.readFileSync(contextMapPath, 'utf8')) || {};
    const base = path.dirname(contextMapPath);
    for (const ctx of (raw.contexts || [])) {
      if (ctx.path) addFile(path.join(base, ctx.path));
    }
  } catch (_) {}
  return h.digest('hex');
}

class Watcher {
  constructor(contextMapPath) {
    this.path     = contextMapPath;
    this._hash    = '';
    this._data    = {};
    this._clients = [];   // SSE response objects
    this._refresh();
    setInterval(() => this._refresh(), 2000);
  }

  _refresh() {
    const newHash = hashFiles(this.path);
    if (newHash !== this._hash) {
      this._hash = newHash;
      this._data = buildGraph(this.path);
      this._notify();
    }
  }

  _notify() {
    const dead = [];
    for (const res of this._clients) {
      try { res.write('event: reload\ndata: ok\n\n'); }
      catch (_) { dead.push(res); }
    }
    for (const r of dead) this.removeClient(r);
  }

  data()   { return this._data; }
  hash()   { return this._hash; }

  addClient(res)    { this._clients.push(res); }
  removeClient(res) { this._clients = this._clients.filter(c => c !== res); }
}

// ─── HTTP server ──────────────────────────────────────────────────────────────
const SCRIPTS_DIR = __dirname;

function serve(watcher, port) {
  const server = http.createServer((req, res) => {
    const url = req.url.split('?')[0];

    if (url === '/' || url === '/index.html') {
      const viewer = path.join(SCRIPTS_DIR, 'context_map_viewer.html');
      const fallback = path.join(SCRIPTS_DIR, 'polygraph_3d_graph_v4.html');
      const file = fs.existsSync(viewer) ? viewer : fallback;
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync(file));

    } else if (url === '/api/data') {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify(watcher.data()));

    } else if (url === '/api/hash') {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ hash: watcher.hash() }));

    } else if (url === '/api/events') {
      res.writeHead(200, {
        'Content-Type':  'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection':    'keep-alive',
        'Access-Control-Allow-Origin': '*',
      });
      res.write('event: ping\ndata: connected\n\n');

      const keepalive = setInterval(() => {
        try { res.write(': keepalive\n\n'); } catch (_) { clearInterval(keepalive); }
      }, 20_000);

      watcher.addClient(res);
      req.on('close', () => { clearInterval(keepalive); watcher.removeClient(res); });

    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`Watching : ${watcher.path}`);
    console.log(`Server   : http://localhost:${port}`);
    console.log('Press Ctrl+C to stop.\n');
  });
  return server;
}

// ─── Auto-discover CONTEXT-MAP.yaml ──────────────────────────────────────────
function findContextMap(start) {
  let dir = path.resolve(start);
  for (let i = 0; i < 12; i++) {
    for (const candidate of [
      path.join(dir, 'docs', 'CONTEXT-MAP.yaml'),
      path.join(dir, 'CONTEXT-MAP.yaml'),
    ]) {
      if (fs.existsSync(candidate)) return candidate;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

// ─── Entry point ─────────────────────────────────────────────────────────────
const args        = process.argv.slice(2);
const noIndex     = args.findIndex(a => a === '--no-browser');
const noBrowser   = noIndex !== -1;
if (noBrowser) args.splice(noIndex, 1);

const portIndex   = args.findIndex(a => a === '--port');
const port        = portIndex !== -1 ? parseInt(args[portIndex + 1], 10) || 8765 : 8765;
if (portIndex !== -1) args.splice(portIndex, 2);

const cmArg       = args[0];
let   cmPath;

if (cmArg) {
  cmPath = path.resolve(cmArg);
  if (!fs.existsSync(cmPath)) {
    console.error(`ERROR: ${cmPath} not found`);
    process.exit(1);
  }
} else {
  cmPath = findContextMap(process.cwd());
  if (!cmPath) {
    console.error(
      'ERROR: Could not find CONTEXT-MAP.yaml.\n' +
      '       Pass the path as an argument: node serve_graph.js path/to/CONTEXT-MAP.yaml'
    );
    process.exit(1);
  }
}

const watcher = new Watcher(cmPath);
serve(watcher, port);

if (!noBrowser) {
  const url = `http://localhost:${port}`;
  const open = process.platform === 'darwin' ? 'open'
             : process.platform === 'win32'  ? 'start'
             : 'xdg-open';
  try { execSync(`${open} ${url}`); } catch (_) {
    console.log(`Open in browser: ${url}`);
  }
}
