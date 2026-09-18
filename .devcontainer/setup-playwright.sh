#!/bin/bash
set -euo pipefail

# Installs the Playwright CLI (playwright-cli), which drives a headless browser
# from the terminal so agents can open pages, take snapshots and click around.
# Pinned so the browser build it expects matches what install-browser fetches.
PLAYWRIGHT_CLI_VERSION="0.1.20"

npm install -g "@playwright/cli@${PLAYWRIGHT_CLI_VERSION}"

# Chromium plus the system libraries it links against. --with-deps runs apt
# through sudo. The default browser channel is set to chromium in
# .playwright/cli.config.json at the repo root; without it the CLI looks for
# Google Chrome under /opt and fails to launch.
playwright-cli install-browser chromium --with-deps

echo "playwright-cli installed: $(playwright-cli --version)"
