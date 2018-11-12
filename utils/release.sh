#!/usr/bin/env bash

# The dumbest way to tell Atom that we have a new version. APM tries to do way too much for my
# taste. 🤬

read -r -d BODY <<BODY
{"tag": "${TRAVIS_TAG}"}
BODY

curl -v \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H "Authorization: ${ATOM_TOKEN}" \
  -X POST \
  -d "${BODY}" \
  https://atom.io/api/packages/ide-mocha/versions
