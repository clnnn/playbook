#!/bin/bash
set -e

sudo chown -R vscode:vscode /home/vscode/.claude

cp "$(dirname "$0")/claude-settings.json" /home/vscode/.claude/settings.json
echo "Claude settings written to /home/vscode/.claude/settings.json"
