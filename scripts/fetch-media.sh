#!/usr/bin/env bash
# Download every media file referenced by the scraped Canva export into $1.
# Usage: bash scripts/fetch-media.sh <empty-output-dir>
set -euo pipefail
OUT="$1"
mkdir -p "$OUT"
grep -o '_assets/media/[0-9a-f]*\.[a-z]*' "raw messy data/ajgtherapeuticsllc.com/index.html" | sort -u |
  xargs -P 8 -I{} sh -c 'curl -sSf -o "$0/$(basename {})" "https://ajgtherapeuticsllc.com/{}"' "$OUT"
