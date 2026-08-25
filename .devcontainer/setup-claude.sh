#!/bin/bash
set -e

sudo chown -R vscode:vscode /home/vscode/.claude

cp "$(dirname "$0")/claude-settings.json" /home/vscode/.claude/settings.json
echo "Claude settings written to /home/vscode/.claude/settings.json"

cp "$(dirname "$0")/statusline.sh" /home/vscode/.claude/statusline.sh
chmod +x /home/vscode/.claude/statusline.sh
echo "Claude status line written to /home/vscode/.claude/statusline.sh"
