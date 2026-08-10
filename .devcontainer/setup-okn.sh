#!/bin/bash
set -euo pipefail

# Installs the openknowledge CLI (okn), which scaffolds, queries and validates
# the OKF knowledge bundle. Pinned rather than tracking latest: okn is
# early-development, and the skills depend on the shape of its output.
OKN_VERSION="0.11.0"

case "$(uname -m)" in
  x86_64) ARCH=amd64 ;;
  aarch64 | arm64) ARCH=arm64 ;;
  *)
    echo "okn: unsupported architecture $(uname -m)" >&2
    exit 1
    ;;
esac

ASSET="openknowledge_linux_${ARCH}.tar.gz"
BASE="https://github.com/openknowledge-sh/openknowledge/releases/download/v${OKN_VERSION}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

curl -fsSL -o "$TMP/$ASSET" "$BASE/$ASSET"
curl -fsSL -o "$TMP/checksums.txt" "$BASE/checksums.txt"

# Anchored to end-of-line so the match hits this asset alone.
(cd "$TMP" && grep -E "  ${ASSET//./\\.}\$" checksums.txt | sha256sum -c -)

tar xzf "$TMP/$ASSET" -C "$TMP" openknowledge
sudo install -m 0755 "$TMP/openknowledge" /usr/local/bin/openknowledge
# okn is the name the docs and the skills use; upstream ships it as an alias.
sudo ln -sf /usr/local/bin/openknowledge /usr/local/bin/okn

# On by default, and it phones home from every command. Opt out at install time;
# drop this line to keep upstream's default.
okn telemetry disable >/dev/null

echo "okn installed: $(okn version)"
