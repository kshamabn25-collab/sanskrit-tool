#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/Distribute"
mkdir -p "$DIST"

# ── macOS ──────────────────────────────────────────────────────────────────────
BUILT_APP="$ROOT/src-tauri/target/release/bundle/macos/Script Tool.app"
if [ -d "$BUILT_APP" ]; then
  cp -rf "$BUILT_APP" "$DIST/Script Tool.app"
  echo "Done: $DIST/Script Tool.app"
else
  echo "Warning: macOS app not found (skipping) — expected: $BUILT_APP"
fi

# ── Windows (.exe via NSIS) ────────────────────────────────────────────────────
NSIS_DIR="$ROOT/src-tauri/target/release/bundle/nsis"
if ls "$NSIS_DIR"/*.exe 2>/dev/null | grep -q .; then
  cp "$NSIS_DIR"/*.exe "$DIST/"
  echo "Done: $(ls "$NSIS_DIR"/*.exe | head -1 | xargs basename)"
else
  echo "Warning: Windows .exe not found (skipping) — build on Windows to produce it"
fi

echo ""
echo "Distribute/ contents:"
ls -1 "$DIST/"
