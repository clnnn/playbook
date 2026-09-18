/* Story map board. Renders map.json and re-renders whenever the file changes. */

const COLOR = ['var(--r1)', 'var(--r2)', 'var(--r3)'];
const TONE = ['', 'r2', 'r3'];
const POLL_MS = 800;

let MAP = null;
let view = { mode: 'map' };
let jsonView = '';
let showSignals = false;
let raw = '';

const stage = document.getElementById('stage');
const live = document.getElementById('live');

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const acts = () => (MAP && MAP.activities) || [];
const slices = () => (MAP && MAP.slices) || [];
const sliceIndex = (id) => slices().findIndex((s) => s.id === id);
const steps = (a) => a.steps || [];
const tasks = (s) => s.tasks || [];
const notes = (s) => s.notes || [];

function tasksOf(activity, sliceId) {
  const out = [];
  steps(activity).forEach((s, i) => tasks(s).forEach((t) => {
    if (t.slice === sliceId) out.push({ name: t.name, step: i + 1 });
  }));
  return out;
}
const countSlice = (id) => acts().reduce((n, a) => n + tasksOf(a, id).length, 0);
const allSignals = () => {
  const out = [];
  acts().forEach((a, ai) => steps(a).forEach((s, si) => notes(s).forEach((n) => {
    out.push({ kind: n.kind === 'opportunity' ? 'opportunity' : 'pain', text: n.text, where: `${ai + 1}.${si + 1} ${s.name}` });
  })));
  return out;
};
const totals = () => {
  const st = acts().reduce((n, a) => n + steps(a).length, 0);
  const ts = acts().reduce((n, a) => n + steps(a).reduce((m, s) => m + tasks(s).length, 0), 0);
  return `${acts().length} activities · ${st} steps · ${ts} tasks`;
};

/* --- shared chrome --- */

function headerChips(activeSliceId) {
  return slices().map((s, i) => {
    const n = countSlice(s.id);
    const on = activeSliceId === s.id;
    const dim = activeSliceId && !on;
    const cls = on ? 'chip solid' : dim ? 'chip off' : i === 0 ? 'chip on' : 'chip';
    const sw = on ? '#fff' : dim ? 'var(--n300)' : COLOR[i];
    return `<button class="${cls}" data-slice="${esc(s.id)}"><i class="sw" style="background:${sw}"></i>${esc(s.id).toUpperCase()} <span class="n">${n}</span></button>`;
  }).join('');
}

function signalsButton() {
  return `<button class="btn" data-signals="1"><i class="dot" style="background:var(--pain)"></i>signals <b>${allSignals().length}</b></button>`;
}

function header(eyebrow, title, line1, line2, activeSliceId, back, actions) {
  return `<header class="hd">
    ${back ? `<button class="btn back" data-view="map"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M7 1.5 L3.5 5 L7 8.5" stroke="#0e1525" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>whole map</button>` : ''}
    <div class="hd-id"><span class="eyebrow">${esc(eyebrow)}</span><h1>${esc(title)}</h1></div>
    <div class="rule"></div>
    <div class="hd-say"><span class="hd-seg">${esc(line1)}</span><span class="hd-nar">${esc(line2)}</span></div>
    <div class="hd-acts">${actions || headerChips(activeSliceId)}<div class="rule" style="height:24px"></div>${signalsButton()}</div>
  </header>`;
}

function footer(legend) {
  const stamp = MAP.stamp ? `<span class="stamp">${esc(MAP.stamp)}</span>` : '';
  return `<footer class="ft">${legend}<span class="spacer"></span><span class="counts">${totals()}</span>${stamp}</footer>`;
}

function backboneRow() {
  return `<div class="rail">backbone</div>
  <div class="cols" style="grid-template-columns:repeat(${acts().length},minmax(0,1fr))">
    ${acts().map((a, i) => `<button class="act" data-activity="${i}">
      <span class="no">${i + 1}</span><span class="nm">${esc(a.name)}</span>
      ${i < acts().length - 1 ? '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M3 1.5 L6.5 5 L3 8.5" stroke="rgba(255,255,255,0.45)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}
    </button>`).join('')}
  </div>`;
}

function stepsRow() {
  return `<div class="rail top">steps</div>
  <div class="cols" style="grid-template-columns:repeat(${acts().length},minmax(0,1fr))">
    ${acts().map((a) => `<div class="steps">${steps(a).map((s, j) => {
      const kinds = notes(s).map((n) => n.kind);
      return `<div class="step"><span class="i">${j + 1}</span><span class="nm">${esc(s.name)}</span>
        ${kinds.includes('pain') ? '<i class="dot sm" style="background:var(--pain)"></i>' : ''}
        ${kinds.includes('opportunity') ? '<i class="dot sm" style="background:var(--opp)"></i>' : ''}</div>`;
    }).join('')}</div>`).join('')}
  </div>`;
}

/* --- view: whole map --- */

function renderMap() {
  const bands = slices().map((sl, i) => `
    <div class="rail rel">
      <span class="r"><i class="sw" style="background:${COLOR[i]}"></i>${esc(sl.id).toUpperCase()}</span>
      <span class="short">${esc(sl.short || sl.name)}</span>
      <span class="n">${countSlice(sl.id)} tasks</span>
    </div>
    <div class="band" style="grid-template-columns:repeat(${acts().length},minmax(0,1fr))">
      ${acts().map((a) => `<div class="col">${tasksOf(a, sl.id).map((t) => `
        <div class="tile ${TONE[i]}"><span class="nm">${esc(t.name)}</span><span class="st">${t.step}</span></div>`).join('')}</div>`).join('')}
    </div>`).join('');

  const legend = `<span class="key"><i class="dot" style="background:var(--pain)"></i>pain point</span>
    <span class="key"><i class="dot" style="background:var(--opp)"></i>opportunity</span>
    <span class="key"><span class="st" style="font-size:9px;font-weight:700;color:var(--n500);background:var(--n100);border-radius:4px;padding:1px 4px">2</span>the step this task belongs to</span>`;

  return header('story map', MAP.subject || 'Story map', MAP.segment || '', MAP.narrative || '', null, false)
    + `<div class="body map">${backboneRow()}${stepsRow()}${bands}</div>`
    + footer(legend);
}

/* --- view: one release --- */

function renderRelease(id) {
  const idx = Math.max(0, sliceIndex(id));
  const sl = slices()[idx];
  const rows = slices().map((s, i) => {
    if (i === idx) {
      return `
      <div class="rail rel">
        <span class="r"><i class="sw" style="background:${COLOR[i]}"></i>${esc(s.id).toUpperCase()}</span>
        <span class="short">${esc(s.short || s.name)}</span>
        <span class="n">${countSlice(s.id)} tasks</span>
      </div>
      <div class="band" style="grid-template-columns:repeat(${acts().length},minmax(0,1fr));padding:12px">
        ${acts().map((a) => `<div class="col grouped">${steps(a).map((st, j) => {
          const own = tasks(st).filter((t) => t.slice === s.id);
          return `<div class="grp">
            <div class="grp-hd"><span class="i">${j + 1}</span><span class="nm">${esc(st.name)}</span></div>
            ${own.map((t) => `<div class="tile wide ${TONE[i]}"><span class="nm">${esc(t.name)}</span></div>`).join('')}
            ${own.length === 0 && i === 0 ? '<div class="hole">no R1 task — a hole in the skeleton</div>' : ''}
          </div>`;
        }).join('')}</div>`).join('')}
      </div>`;
    }
    return `
      <div class="rail thin"><span class="r">${esc(s.id).toUpperCase()}</span><span class="n">${countSlice(s.id)}</span></div>
      <div class="band collapsed" style="grid-template-columns:repeat(${acts().length},minmax(0,1fr))">
        ${acts().map((a) => `<div class="hidden"><i></i>${tasksOf(a, s.id).length} hidden</div>`).join('')}
      </div>`;
  });

  const rowsCss = slices().map((_, i) => (i === idx ? '1fr' : '44px')).join(' ');
  return header('reading one release end to end', MAP.subject || 'Story map', sl ? sl.name : '', MAP.narrative || '', id, true)
    + `<div class="body" style="grid-template-rows:52px 58px ${rowsCss}">${backboneRow()}${stepsRow()}${rows.join('')}</div>`
    + footer('<span>a collapsed release keeps its row, so the map never changes shape</span>');
}

/* --- view: one activity --- */

function renderActivity(i) {
  const a = acts()[i];
  if (!a) return renderMap();
  const counts = slices().map((s, k) => `<span class="key" style="font-size:11px;color:var(--n600)"><i class="sw" style="background:${COLOR[k]}"></i>${esc(s.id).toUpperCase()} ${tasksOf(a, s.id).length}</span>`).join('');
  const nsig = steps(a).reduce((n, s) => n + notes(s).length, 0);

  const nav = `<nav class="nav">${acts().map((x, k) => `
    <button class="nav-chip ${k === i ? 'on' : ''}" data-activity="${k}">
      <span class="i">${k + 1}</span><span class="nm">${esc(x.name)}</span>
      ${steps(x).some((s) => notes(s).some((n) => n.kind === 'pain')) ? '<i class="dot sm" style="background:var(--pain)"></i>' : ''}
      ${steps(x).some((s) => notes(s).some((n) => n.kind === 'opportunity')) ? '<i class="dot sm" style="background:var(--opp)"></i>' : ''}
    </button>`).join('')}</nav>`;

  const cols = steps(a).map((s, j) => {
    const groups = slices().map((sl, k) => {
      const own = tasks(s).filter((t) => t.slice === sl.id);
      if (!own.length) return '';
      return `<div class="rel-label"><i class="sw" style="background:${COLOR[k]}"></i><span>${esc(sl.short || sl.name)}</span></div>`
        + own.map((t) => `<div class="card ${TONE[k]}">${esc(t.name)}</div>`).join('');
    }).join('');
    const hole = tasks(s).some((t) => t.slice === (slices()[0] || {}).id) ? '' : '<div class="hole">no walking-skeleton task on this step</div>';
    const quote = notes(s).map((n) => `<div class="quote"><i class="dot" style="background:${n.kind === 'opportunity' ? 'var(--opp)' : 'var(--pain)'}"></i><span>“${esc(n.text)}”</span></div>`).join('');
    return `<div class="scol">
      <div class="scol-hd"><div class="t"><span class="i">${j + 1}</span><h2>${esc(s.name)}</h2></div>${quote}</div>
      ${groups}${hole}
    </div>`;
  }).join('');

  const line = `${steps(a).length} steps · ${steps(a).reduce((n, s) => n + tasks(s).length, 0)} tasks · ${nsig} signals`;
  return header(`activity ${i + 1} of ${acts().length}`, a.name, '', line, null, true, counts)
    + nav
    + `<div class="focus">${cols}${signalsPanel(false)}</div>`
    + footer('<span>a step with no R1 task is called out — the skeleton has a hole there</span>');
}

function signalsPanel(overlay) {
  const list = allSignals();
  const body = list.length
    ? list.map((s) => `<div class="signal ${s.kind}"><span class="who">${s.kind} · ${esc(s.where)}</span><span class="txt">“${esc(s.text)}”</span></div>`).join('')
    : '<span class="empty">nothing recorded yet — the review gate fills this in</span>';
  return `<aside class="signals"${overlay ? ' data-stop="1"' : ''}>
    <div class="hd-row"><h2>signals</h2><span class="src">from the review gate</span></div>${body}</aside>`;
}

/* --- fit, trim, mount --- */

function fit() {
  stage.style.transform = `scale(${Math.min(window.innerWidth / 1440, window.innerHeight / 900)})`;
}

/* Drop the tiles that do not fit and say how many were dropped, so a column never scrolls. */
function trim(col) {
  const last = () => Array.from(col.querySelectorAll('.tile, .card')).pop();
  let hidden = 0;
  while (col.scrollHeight > col.clientHeight + 1) {
    const t = last();
    if (!t) break;
    const grp = t.closest('.grp');
    t.remove();
    if (grp && !grp.querySelector('.tile, .card, .hole')) grp.remove();
    hidden += 1;
  }
  if (!hidden) return;
  const badge = document.createElement('div');
  badge.className = 'more';
  badge.textContent = `+${hidden} more`;
  col.appendChild(badge);
  while (col.scrollHeight > col.clientHeight + 1) {
    const t = last();
    if (!t) break;
    t.remove();
    hidden += 1;
    badge.textContent = `+${hidden} more`;
  }
}

function render() {
  if (!MAP) return;
  const mode = view.mode === 'activity' && acts().length ? 'activity' : view.mode === 'release' ? 'release' : 'map';
  stage.innerHTML = mode === 'activity' ? renderActivity(view.activity || 0)
    : mode === 'release' ? renderRelease(view.release || (slices()[0] || {}).id)
    : renderMap();
  if (showSignals) {
    const veil = document.createElement('div');
    veil.className = 'veil';
    veil.innerHTML = signalsPanel(true);
    stage.appendChild(veil);
  }
  document.title = `Story map — ${MAP.subject || ''}`;
  requestAnimationFrame(() => stage.querySelectorAll('.col, .scol').forEach(trim));
}

stage.addEventListener('click', (e) => {
  if (e.target.closest('.veil') && !e.target.closest('aside')) { showSignals = false; return render(); }
  if (e.target.closest('[data-signals]')) { showSignals = !showSignals; return render(); }
  const act = e.target.closest('[data-activity]');
  if (act) { view = { mode: 'activity', activity: Number(act.dataset.activity) }; return render(); }
  const sl = e.target.closest('[data-slice]');
  if (sl) {
    view = view.mode === 'release' && view.release === sl.dataset.slice
      ? { mode: 'map' }
      : { mode: 'release', release: sl.dataset.slice };
    return render();
  }
  if (e.target.closest('[data-view="map"]')) { view = { mode: 'map' }; render(); }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { showSignals = false; view = { mode: 'map' }; render(); }
});

window.addEventListener('resize', fit);

async function poll() {
  try {
    const res = await fetch(`map.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(res.status);
    const text = await res.text();
    live.classList.remove('down');
    live.querySelector('span').textContent = 'live';
    if (text !== raw) {
      raw = text;
      MAP = JSON.parse(text);
      const v = JSON.stringify(MAP.view || null);
      if (v !== jsonView) {
        jsonView = v;
        if (MAP.view) view = MAP.view;
      }
      render();
    }
  } catch {
    live.classList.add('down');
    live.querySelector('span').textContent = 'waiting for map.json';
  }
}

fit();
poll();
setInterval(poll, POLL_MS);
