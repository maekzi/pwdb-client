#!/usr/bin/env just --justfile
set dotenv-load := true

set shell := ["bash", "-c"]

node *command:
    docker run -t --init --rm -v $(pwd):/app -p "3001:3000"  --user 1000 -w /app node:18 {{ command }}

npm *command="":
    just node npm {{ command }}

install:
    just npm install

start:
    just npm run start

codegen:
    just npm run codegen

audit:
    just npm run audit

test:
    just npm run test

