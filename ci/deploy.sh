#!/usr/bin/env bash

set -o errexit
set -o pipefail

# The dumbest way to tell Atom that we have a new version. APM tries to do way too much for my
# taste. 🤬

read -r -d '' BODY <<JSON
{"tag": "${TRAVIS_TAG}"}
JSON

echo "Sending: ${BODY}"

curl -v \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H "Authorization: ${ATOM_TOKEN}" \
  -d "${BODY}" \
  https://atom.io/api/packages/ide-mocha/versions
