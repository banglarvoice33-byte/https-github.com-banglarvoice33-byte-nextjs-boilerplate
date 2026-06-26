#!/usr/bin/env bash
set -euo pipefail

# Config — edit if you want different tag/title/notes
REPO="https://github.com/hizlanews46-design/Banglarvoice-apps1.git"
CLONE_DIR="Banglarvoice-apps1"
TAG="${1:-v1.0.0}"                # pass tag as first arg or defaults to v1.0.0
TITLE="${2:-Banglarvoice $TAG — Refactor + Docker}"
NOTES="${3:-Refactor into components, added TypeScript interfaces, added Dockerfile & docker-compose.}"
UPLOAD_WITH_GH="${4:-yes}"        # 'yes' to upload draft release with gh CLI, 'no' to skip

OUT_ZIP="../${CLONE_DIR}-${TAG}-prod.zip"

echo "== Step 1: Cleanup any previous clone =="
rm -rf "$CLONE_DIR"

echo "== Step 2: Clone repo =="
git clone "$REPO" "$CLONE_DIR"
cd "$CLONE_DIR"

echo "== Step 3: Install dependencies for build =="
npm ci

echo "== Step 4: Build production =="
npm run build

echo "== Step 5: Reduce to production dependencies =="
# Remove full node_modules then install only production deps
rm -rf node_modules
npm ci --production

echo "== Step 6: Create zip (includes .next, public, package.json, production node_modules) =="
zip -r "$OUT_ZIP" . -x ".git/*" "node_modules/.cache/*" "tests/*"
echo "Zip created at: $OUT_ZIP"

if [ "$UPLOAD_WITH_GH" = "yes" ]; then
  if command -v gh >/dev/null 2>&1; then
    echo "== Step 7: Create draft GitHub release and upload asset =="
    # Create draft release (will fail if tag already exists)
    gh release create "$TAG" "$OUT_ZIP" --title "$TITLE" --notes "$NOTES" --draft
    echo "Draft release created and asset uploaded."
    gh release view "$TAG" --web || true
  else
    echo "gh CLI not found — skipping release upload. Install GitHub CLI (https://cli.github.com/) and run again to auto-upload."
  fi
else
  echo "Upload with gh CLI disabled. Zip is ready."
fi

echo "== Done =="