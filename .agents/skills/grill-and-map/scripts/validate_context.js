#!/usr/bin/env node
/**
 * Context File Validator
 * Validates CONTEXT-MAP.yaml and the CONTEXT.yaml files it references.
 *
 * Two stages:
 *   1. Schema      — each file is validated against its JSON Schema in
 *                    ../schemas via ajv. Covers syntax, required keys, enums
 *                    (tag, relationship label), shapes (peers is a 2-item
 *                    list), and the directed-vs-symmetric relationship rule.
 *   2. Referential — checks a schema fundamentally cannot express:
 *                    every `path:` resolves on disk, every relationship name
 *                    is a defined context, and no context name is duplicated.
 *
 * Semantic rules ("no implementation details", tag justified in description)
 * are NOT checked here — those stay with the grilling loop.
 *
 * --final adds the end-of-session completeness checks: at least one context
 * exists, and every context defines at least one term. These are off by
 * default because a map is legitimately empty during round one.
 *
 * Usage
 * -----
 *   node validate_context.js                       # auto-discover CONTEXT-MAP.yaml
 *   node validate_context.js docs/CONTEXT-MAP.yaml # explicit path
 *   node validate_context.js --final               # + completeness checks
 *
 * Exit code: 0 = valid, 1 = errors found, 2 = could not locate inputs
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const yaml = require(resolveDep('js-yaml'));
const Ajv  = require(resolveDep('ajv'));

// ─── resolve workspace deps (js-yaml, ajv) from node_modules ─────────────────
function resolveDep(name) {
  const dirs = [
    path.join(__dirname, '..', '..', '..', '..', 'node_modules', name),
    path.join(process.cwd(), 'node_modules', name),
  ];
  for (const d of dirs) {
    if (fs.existsSync(d)) return d;
  }
  return name;
}

const SCHEMA_DIR = path.join(__dirname, '..', 'schemas');

// ─── report accumulator ──────────────────────────────────────────────────────
const errors = [];
const warnings = [];
const err  = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

// ─── ajv setup ───────────────────────────────────────────────────────────────
const ajv = new Ajv({ allErrors: true, strict: false });

function loadSchema(file) {
  const p = path.join(SCHEMA_DIR, file);
  try {
    return ajv.compile(JSON.parse(fs.readFileSync(p, 'utf8')));
  } catch (e) {
    console.error(`ERROR: cannot load schema ${file} — ${e.message}`);
    process.exit(2);
  }
}

const validateMapSchema     = loadSchema('context-map.schema.json');
const validateContextSchema = loadSchema('context.schema.json');

function reportAjv(validate, data, label) {
  if (validate(data)) return true;
  for (const e of validate.errors) {
    const at = e.instancePath ? `${label}${e.instancePath}` : label;
    let msg = e.message;
    if (e.keyword === 'enum' && e.params.allowedValues) {
      msg += ` (${e.params.allowedValues.join(', ')})`;
    }
    if (e.keyword === 'additionalProperties') {
      msg += ` "${e.params.additionalProperty}"`;
    }
    err(at, msg);
  }
  return false;
}

// ─── YAML load helper ────────────────────────────────────────────────────────
function loadYaml(file, label) {
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch (e) {
    err(label, `cannot read file (${e.code || e.message})`);
    return null;
  }
  try {
    return yaml.load(text) || {};
  } catch (e) {
    err(label, `invalid YAML — ${e.reason || e.message}`);
    return null;
  }
}

// ─── main ────────────────────────────────────────────────────────────────────
function validate(mapPath, final) {
  const label = path.basename(mapPath);
  const data = loadYaml(mapPath, label);
  if (data === null) return;

  // stage 1 — schema
  reportAjv(validateMapSchema, data, label);

  // stage 3 — completeness (--final only)
  if (final && !(data.contexts || []).length) {
    err(label, 'no contexts defined — every session establishes at least one');
  }

  const base = path.dirname(mapPath);
  const contextNames = new Set();
  const duplicate = new Set();

  // collect names (referential) + schema-check each referenced CONTEXT.yaml
  for (let i = 0; i < (data.contexts || []).length; i++) {
    const ctx = data.contexts[i];
    if (!ctx || typeof ctx !== 'object') continue;
    const at = `${label} › contexts[${i}]`;

    if (ctx.name) {
      if (contextNames.has(ctx.name)) duplicate.add(ctx.name);
      contextNames.add(ctx.name);
    }

    // stage 2 — referential: path resolves; then schema-check the file
    if (ctx.path) {
      const resolved = path.join(base, ctx.path);
      if (!fs.existsSync(resolved)) {
        err(at, `path does not exist: ${ctx.path}`);
      } else {
        const ctxData = loadYaml(resolved, ctx.path);
        if (ctxData !== null) {
          reportAjv(validateContextSchema, ctxData, ctx.path);
          if (final && !(ctxData.language || []).length) {
            err(ctx.path, 'no terms defined — every context carries at least one');
          }
        }
      }
    }
  }

  for (const name of duplicate) {
    err(label, `duplicate context name "${name}"`);
  }

  // stage 2 — referential: relationship names must be defined contexts
  const referenced = new Set();
  (data.relationships || []).forEach((rel, i) => {
    if (!rel || typeof rel !== 'object') return;
    const at = `${label} › relationships[${i}]`;
    const names = [];
    if (rel.upstream)   names.push(rel.upstream);
    if (rel.downstream) names.push(rel.downstream);
    if (Array.isArray(rel.peers)) names.push(...rel.peers);
    for (const n of names) {
      referenced.add(n);
      if (contextNames.size && !contextNames.has(n)) {
        err(at, `"${n}" is not a context defined in \`contexts\``);
      }
    }
  });

  // referential warning: contexts with no relationships
  for (const name of contextNames) {
    if (!referenced.has(name)) warn(label, `context "${name}" has no relationships`);
  }
}

// ─── auto-discover CONTEXT-MAP.yaml ──────────────────────────────────────────
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

// ─── entry point ─────────────────────────────────────────────────────────────
const argv  = process.argv.slice(2);
const final = argv.includes('--final');
const arg   = argv.find(a => !a.startsWith('--'));
let mapPath;

if (arg) {
  mapPath = path.resolve(arg);
  if (!fs.existsSync(mapPath)) {
    console.error(`ERROR: ${mapPath} not found`);
    process.exit(2);
  }
} else {
  mapPath = findContextMap(process.cwd());
  if (!mapPath) {
    console.error('ERROR: could not find CONTEXT-MAP.yaml. Pass the path as an argument.');
    process.exit(2);
  }
}

validate(mapPath, final);

console.log(`Validated: ${mapPath}${final ? ' (--final)' : ''}`);
if (warnings.length) {
  console.log(`\n⚠ ${warnings.length} warning(s):`);
  warnings.forEach(w => console.log(`  - ${w}`));
}
if (errors.length) {
  console.log(`\n✗ ${errors.length} error(s):`);
  errors.forEach(e => console.log(`  - ${e}`));
  console.log('\nFix these before asking the next question.');
  process.exit(1);
}
console.log(`\n✓ All checks passed (schema + references${final ? ' + completeness' : ''}).`);
process.exit(0);
