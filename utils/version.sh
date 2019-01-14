#!/usr/bin/env bash

set -o errexit
set -o pipefail

pkgversion=$(npm info atom-ide-mocha-core dist-tags.latest)

echo "Preparing version: ${pkgversion}"
echo
echo "Installing..."
npm install --save-exact "atom-ide-mocha-core@${pkgversion}"
rm package-lock.json

# Sync changelog so that it's easily readable from within Atom
echo "Syncing CHANGELOG.md..."
cp node_modules/atom-ide-mocha-core/CHANGELOG.md .

echo "Updating package version info..."
npm version "${pkgversion}" --no-git-tag-version

echo "Committing & tagging..."
git add -A
git commit --message "chore: release ${pkgversion}"
git tag "v${pkgversion}"
