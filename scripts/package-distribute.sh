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

# ── Windows ────────────────────────────────────────────────────────────────────
# Tauri produces an .msi under bundle/msi/ and an .exe under bundle/nsis/
MSI_DIR="$ROOT/src-tauri/target/release/bundle/msi"
NSIS_DIR="$ROOT/src-tauri/target/release/bundle/nsis"

if ls "$MSI_DIR"/*.msi 2>/dev/null | grep -q .; then
  cp "$MSI_DIR"/*.msi "$DIST/"
  echo "Done: $(ls "$MSI_DIR"/*.msi | head -1 | xargs basename)"
elif ls "$NSIS_DIR"/*.exe 2>/dev/null | grep -q .; then
  cp "$NSIS_DIR"/*.exe "$DIST/"
  echo "Done: $(ls "$NSIS_DIR"/*.exe | head -1 | xargs basename)"
else
  echo "Warning: Windows installer not found (skipping) — build on Windows to produce .msi"
fi

echo ""
echo "Distribute/ contents:"
ls -1 "$DIST/"
