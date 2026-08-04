#!/bin/bash
set -euo pipefail

# Installs the okf CLI, which reads and validates the OKF knowledge bundle in
# .okf/. Pinned rather than tracking latest: okf is early-development, and the
# skills depend on the shape of its JSON output.
OKF_VERSION="0.2.1"

case "$(uname -m)" in
  x86_64) ARCH=amd64 ;;
  aarch64 | arm64) ARCH=arm64 ;;
  *)
    echo "okf: unsupported architecture $(uname -m)" >&2
    exit 1
    ;;
esac

ASSET="okf_${OKF_VERSION}_linux_${ARCH}.tar.gz"
BASE="https://github.com/okfcli/okf/releases/download/v${OKF_VERSION}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

curl -fsSL -o "$TMP/$ASSET" "$BASE/$ASSET"
curl -fsSL -o "$TMP/checksums.txt" "$BASE/checksums.txt"

# Anchored to end-of-line: an unanchored match also hits the .sbom.json entry,
# which checks the tarball against the wrong hash and fails.
(cd "$TMP" && grep -E "  ${ASSET//./\\.}\$" checksums.txt | sha256sum -c -)

tar xzf "$TMP/$ASSET" -C "$TMP" okf
sudo install -m 0755 "$TMP/okf" /usr/local/bin/okf

echo "okf installed: $(okf version)"
