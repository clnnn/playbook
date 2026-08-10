# Graph server

One server for the whole session. It watches every context file and pushes live reloads, so the user reads the current map at any moment.

## Start

Start it once, right after you write `docs/CONTEXT-MAP.yaml` for the first time. The server reads that file at startup, so it fails before the file exists.

```bash
curl -s http://localhost:8765/api/hash >/dev/null 2>&1 || \
  nohup node "$(git rev-parse --show-toplevel)/.agents/skills/grill-and-align/scripts/serve_graph.js" \
    --no-browser > /tmp/context-graph.log 2>&1 &
```

- It starts: tell the user **"Graph live at http://localhost:8765"**
- It fails: tell the user **"Graph server didn't start — check `/tmp/context-graph.log` if you need it. You can work from the YAML directly."**

## Stop

Stop it once, after the user confirms the shared understanding — that view is what they read to answer you. Skip this when the server never started.

```bash
lsof -ti tcp:8765 -sTCP:LISTEN | xargs -r kill 2>/dev/null || true
```

`-sTCP:LISTEN` is load-bearing: without it, `lsof -ti tcp:8765` also returns every process *connected* to the port — including the editor's port-forwarder (e.g. the VS Code Remote / devcontainer server). Killing that tears down the whole session. Only ever kill the listener.

Tell the user **"Graph server stopped."**
