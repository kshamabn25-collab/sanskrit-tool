#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUILT_APP="$ROOT/src-tauri/target/release/bundle/macos/Script Tool.app"
DIST="$ROOT/Distribute"

if [ ! -d "$BUILT_APP" ]; then
  echo "Error: built app not found at: $BUILT_APP"
  echo "Run 'npm run build:release' first."
  exit 1
fi

mkdir -p "$DIST"
cp -rf "$BUILT_APP" "$DIST/Script Tool.app"
echo "Done: $DIST/Script Tool.app"
echo ""
echo "Distribute/ is ready. Share both files with users:"
echo "  • Script Tool.app"
echo "  • Install Script Tool.app  (double-click to install, no Terminal needed)"
